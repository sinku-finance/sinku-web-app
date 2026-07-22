import { neon } from "@neondatabase/serverless"
import type { WaitlistInput } from "./validate"

const MAX_SIGNUPS_PER_IP_PER_DAY = 10
const MAX_SIGNUPS_PER_IP_PER_HOUR = 5

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
			await sql`CREATE SCHEMA IF NOT EXISTS users`
			await sql`
				CREATE TABLE IF NOT EXISTS users.waitlist_entries (
					id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
					email         VARCHAR(255) NOT NULL,
					country_code  VARCHAR(5)   NOT NULL,
					phone_number  VARCHAR(20)  NOT NULL,
					full_phone    VARCHAR(25)  NOT NULL,
					status        VARCHAR(20)  NOT NULL DEFAULT 'PENDING',
					sms_sent      BOOLEAN      NOT NULL DEFAULT FALSE,
					email_sent    BOOLEAN      NOT NULL DEFAULT FALSE,
					ip_address    VARCHAR(45),
					user_agent    VARCHAR(500),
					created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
					updated_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
				)
			`
			await sql`CREATE UNIQUE INDEX IF NOT EXISTS idx_waitlist_email ON users.waitlist_entries (LOWER(email))`
			await sql`CREATE UNIQUE INDEX IF NOT EXISTS idx_waitlist_phone ON users.waitlist_entries (full_phone)`
			await sql`CREATE INDEX IF NOT EXISTS idx_waitlist_ip ON users.waitlist_entries (ip_address, created_at)`
		})().catch(err => {
			schemaReady = null
			throw err
		})
	}
	return schemaReady
}

export async function ipOverLimit(ipAddress: string | null): Promise<boolean> {
	if (!ipAddress) return false
	const sql = getSql()
	await ensureSchema()

	const [day] = await sql`
		SELECT count(*)::int AS n FROM users.waitlist_entries
		WHERE ip_address = ${ipAddress} AND created_at > NOW() - INTERVAL '24 hours'
	`
	if (day.n >= MAX_SIGNUPS_PER_IP_PER_DAY) return true

	const [hour] = await sql`
		SELECT count(*)::int AS n FROM users.waitlist_entries
		WHERE ip_address = ${ipAddress} AND created_at > NOW() - INTERVAL '1 hour'
	`
	return hour.n >= MAX_SIGNUPS_PER_IP_PER_HOUR
}

export async function insertIfNew(
	input: WaitlistInput,
	ipAddress: string | null,
	userAgent: string | null,
): Promise<boolean> {
	const sql = getSql()
	await ensureSchema()

	const fullPhone = input.countryCode + input.phoneNumber
	const ua = userAgent ? userAgent.slice(0, 500) : null

	const rows = await sql`
		INSERT INTO users.waitlist_entries (email, country_code, phone_number, full_phone, ip_address, user_agent)
		VALUES (${input.email}, ${input.countryCode}, ${input.phoneNumber}, ${fullPhone}, ${ipAddress}, ${ua})
		ON CONFLICT DO NOTHING
		RETURNING id
	`
	return rows.length > 0
}

export async function markEmailSent(email: string): Promise<void> {
	const sql = getSql()
	await sql`UPDATE users.waitlist_entries SET email_sent = TRUE, updated_at = NOW() WHERE LOWER(email) = ${email}`
}
