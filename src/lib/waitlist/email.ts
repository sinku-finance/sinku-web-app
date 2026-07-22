import { Resend } from "resend"
import { WELCOME_SUBJECT, welcomeEmailHtml } from "./welcome-email"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://sinku.finance"

function getResend(): Resend | null {
	const key = process.env.RESEND_API_KEY
	if (!key) return null
	return new Resend(key)
}

function fromAddress(): string | null {
	const email = process.env.RESEND_FROM_EMAIL
	if (!email) return null
	const name = process.env.RESEND_FROM_NAME
	return name ? `${name} <${email}>` : email
}

export async function sendWelcomeEmail(to: string): Promise<boolean> {
	const resend = getResend()
	const from = fromAddress()
	if (!resend || !from) return false

	const { error } = await resend.emails.send({
		from,
		to,
		subject: WELCOME_SUBJECT,
		html: welcomeEmailHtml(BASE_URL),
	})
	return !error
}
