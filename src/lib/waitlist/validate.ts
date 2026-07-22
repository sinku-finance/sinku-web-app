export type WaitlistFieldErrors = {
	email?: string
	countryCode?: string
	phoneNumber?: string
}

export type WaitlistInput = {
	email: string
	countryCode: string
	phoneNumber: string
}

export type WaitlistValidation = { ok: true; value: WaitlistInput } | { ok: false; fieldErrors: WaitlistFieldErrors }

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const COUNTRY_CODE_REGEX = /^\+[1-9]\d{0,3}$/
const PHONE_REGEX = /^\d{4,15}$/

export function validateWaitlist(body: unknown): WaitlistValidation {
	const fieldErrors: WaitlistFieldErrors = {}

	const raw = (body ?? {}) as Record<string, unknown>
	const email = typeof raw.email === "string" ? raw.email.trim() : ""
	const countryCode = typeof raw.countryCode === "string" ? raw.countryCode.trim() : ""
	const phoneNumber = typeof raw.phoneNumber === "string" ? raw.phoneNumber.trim() : ""

	if (!email) {
		fieldErrors.email = "Email is required"
	} else if (email.length > 255) {
		fieldErrors.email = "Email must be at most 255 characters"
	} else if (!EMAIL_REGEX.test(email)) {
		fieldErrors.email = "Invalid email format"
	}

	if (!countryCode) {
		fieldErrors.countryCode = "Country code is required"
	} else if (!COUNTRY_CODE_REGEX.test(countryCode)) {
		fieldErrors.countryCode = "Country code must be '+' followed by 1-4 digits (e.g. +258)"
	}

	if (!phoneNumber) {
		fieldErrors.phoneNumber = "Phone number is required"
	} else if (!PHONE_REGEX.test(phoneNumber)) {
		fieldErrors.phoneNumber = "Phone number must be 4-15 digits"
	}

	if (Object.keys(fieldErrors).length > 0) {
		return { ok: false, fieldErrors }
	}

	return {
		ok: true,
		value: { email: email.toLowerCase(), countryCode, phoneNumber },
	}
}
