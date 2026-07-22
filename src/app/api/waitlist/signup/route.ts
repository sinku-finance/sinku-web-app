import { clientIp } from "@/lib/http"
import { allowRequest } from "@/lib/ratelimit"
import { insertIfNew, ipOverLimit, markEmailSent } from "@/lib/waitlist/db"
import { sendWelcomeEmail } from "@/lib/waitlist/email"
import { validateWaitlist } from "@/lib/waitlist/validate"
import { NextResponse, after } from "next/server"
import type { NextRequest } from "next/server"

export const runtime = "nodejs"

const MAX_BODY_BYTES = 2048
const SUCCESS = {
	success: true,
	message: "You're on the list! We'll notify you when your spot is ready.",
}

export async function POST(request: NextRequest) {
	const contentLength = Number(request.headers.get("content-length"))
	if (!Number.isFinite(contentLength) || contentLength > MAX_BODY_BYTES) {
		return NextResponse.json({ success: false, error: "Payload too large" }, { status: 413 })
	}

	const ip = clientIp(request)
	if (!(await allowRequest("waitlist", ip))) {
		return NextResponse.json({ success: false, error: "Too many requests" }, { status: 429 })
	}

	let body: unknown
	try {
		body = await request.json()
	} catch {
		return NextResponse.json({ success: false, error: "Invalid request body" }, { status: 400 })
	}

	const result = validateWaitlist(body)
	if (!result.ok) {
		return NextResponse.json(
			{ success: false, error: "VALIDATION_ERROR", fieldErrors: result.fieldErrors },
			{ status: 400 },
		)
	}

	const userAgent = request.headers.get("user-agent")

	try {
		if (await ipOverLimit(ip)) {
			return NextResponse.json(SUCCESS)
		}

		const isNew = await insertIfNew(result.value, ip, userAgent)
		if (isNew) {
			const input = result.value
			after(async () => {
				const sent = await sendWelcomeEmail(input.email).catch(() => false)
				if (sent) await markEmailSent(input.email).catch(() => undefined)
			})
		}

		return NextResponse.json(SUCCESS)
	} catch (err) {
		console.error("waitlist signup failed", err)
		return NextResponse.json({ success: false, error: "Something went wrong. Please try again." }, { status: 500 })
	}
}
