import { neon } from "@neondatabase/serverless"
import type { ReferralInput } from "./validate"

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
			await sql`CREATE SCHEMA IF NOT EXISTS referrals`
			await sql`
				CREATE TABLE IF NOT EXISTS referrals.referral_claims (
					id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
					phone_full    VARCHAR(25)  NOT NULL UNIQUE,
					referral_code VARCHAR(50)  NOT NULL,
					claimed_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
					processed     BOOLEAN      NOT NULL DEFAULT FALSE,
					processed_at  TIMESTAMPTZ,
					expires_at    TIMESTAMPTZ  NOT NULL DEFAULT (NOW() + INTERVAL '90 days')
				)
			`
			await sql`
				CREATE INDEX IF NOT EXISTS idx_referral_claims_phone_pending
				ON referrals.referral_claims (phone_full) WHERE processed = FALSE
			`
		})().catch(err => {
			schemaReady = null
			throw err
		})
	}
	return schemaReady
}

export async function saveClaim(input: ReferralInput): Promise<void> {
	const sql = getSql()
	await ensureSchema()

	const phoneFull = input.phoneCountryCode + input.phoneNumber
	await sql`
		INSERT INTO referrals.referral_claims (phone_full, referral_code)
		VALUES (${phoneFull}, ${input.referralCode})
		ON CONFLICT (phone_full) DO NOTHING
	`
}
