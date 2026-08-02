import { neon } from "@neondatabase/serverless"

function getSql() {
	const url = process.env.DATABASE_URL
	if (!url) throw new Error("DATABASE_URL is not set")
	return neon(url)
}

let schemaReady: Promise<void> | null = null

function ensureSchema(): Promise<void> {
	if (!schemaReady) {
		const sql = getSql()
		schemaReady = (async () => {
			await sql`CREATE SCHEMA IF NOT EXISTS investor`
			await sql`
				CREATE TABLE IF NOT EXISTS investor.deck_opens (
					id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
					slug        VARCHAR(64)  NOT NULL,
					ip_address  VARCHAR(45),
					user_agent  VARCHAR(500),
					referer     VARCHAR(500),
					opened_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW()
				)
			`
			await sql`CREATE INDEX IF NOT EXISTS idx_deck_opens_slug ON investor.deck_opens (slug, opened_at)`
		})().catch(err => {
			schemaReady = null
			throw err
		})
	}
	return schemaReady
}

export async function logDeckOpen(
	slug: string,
	ipAddress: string | null,
	userAgent: string | null,
	referer: string | null,
): Promise<void> {
	const sql = getSql()
	await ensureSchema()

	const ua = userAgent ? userAgent.slice(0, 500) : null
	const ref = referer ? referer.slice(0, 500) : null

	await sql`
		INSERT INTO investor.deck_opens (slug, ip_address, user_agent, referer)
		VALUES (${slug}, ${ipAddress}, ${ua}, ${ref})
	`
}

export type DeckSummaryRow = {
	slug: string
	opens: number
	unique_ips: number
	first_opened: string
	last_opened: string
}

export type DeckOpenRow = {
	slug: string
	ip_address: string | null
	user_agent: string | null
	referer: string | null
	opened_at: string
}

export async function deckStats(): Promise<{ summary: DeckSummaryRow[]; recent: DeckOpenRow[] }> {
	const sql = getSql()
	await ensureSchema()

	const summary = (await sql`
		SELECT slug,
		       count(*)::int             AS opens,
		       count(DISTINCT ip_address)::int AS unique_ips,
		       min(opened_at)            AS first_opened,
		       max(opened_at)            AS last_opened
		FROM investor.deck_opens
		GROUP BY slug
		ORDER BY max(opened_at) DESC
	`) as DeckSummaryRow[]

	const recent = (await sql`
		SELECT slug, ip_address, user_agent, referer, opened_at
		FROM investor.deck_opens
		ORDER BY opened_at DESC
		LIMIT 50
	`) as DeckOpenRow[]

	return { summary, recent }
}
