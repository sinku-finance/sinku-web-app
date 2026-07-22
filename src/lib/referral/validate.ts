export type ReferralInput = {
	referralCode: string
	phoneCountryCode: string
	phoneNumber: string
}

export type ReferralValidation = { ok: true; value: ReferralInput } | { ok: false }

const CODE_REGEX = /^[a-zA-Z0-9_]+$/
const COUNTRY_CODE_REGEX = /^\+[1-9]\d{0,3}$/
const PHONE_REGEX = /^\d{6,15}$/

export function validateReferral(body: unknown): ReferralValidation {
	const raw = (body ?? {}) as Record<string, unknown>
	const referralCode = typeof raw.referralCode === "string" ? raw.referralCode.trim() : ""
	const phoneCountryCode = typeof raw.phoneCountryCode === "string" ? raw.phoneCountryCode.trim() : ""
	const phoneNumber = typeof raw.phoneNumber === "string" ? raw.phoneNumber.trim() : ""

	if (!referralCode || referralCode.length > 50 || !CODE_REGEX.test(referralCode)) return { ok: false }
	if (!COUNTRY_CODE_REGEX.test(phoneCountryCode)) return { ok: false }
	if (!PHONE_REGEX.test(phoneNumber)) return { ok: false }

	return { ok: true, value: { referralCode, phoneCountryCode, phoneNumber } }
}
