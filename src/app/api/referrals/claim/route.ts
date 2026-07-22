import { clientIp } from "@/lib/http"
import { allowRequest } from "@/lib/ratelimit"
import { saveClaim } from "@/lib/referral/db"
import { validateReferral } from "@/lib/referral/validate"
import { type NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"

const MAX_BODY_BYTES = 2048
const SUCCESS = {
	success: true,
	message: "Referral claim received. Complete registration to activate.",
}

export async function POST(request: NextRequest) {
	const contentLength = Number(request.headers.get("content-length"))
	if (!Number.isFinite(contentLength) || contentLength > MAX_BODY_BYTES) {
		return NextResponse.json({ success: false, message: "Payload too large" }, { status: 413 })
	}

	const ip = clientIp(request)
	if (!(await allowRequest("referral", ip))) {
		return NextResponse.json({ success: false, message: "Too many requests" }, { status: 429 })
	}

	let body: unknown
	try {
		body = await request.json()
	} catch {
		return NextResponse.json({ success: false, message: "Invalid request body" }, { status: 400 })
	}

	const result = validateReferral(body)
	if (!result.ok) {
		return NextResponse.json({ success: false, message: "Invalid request" }, { status: 400 })
	}

	try {
		await saveClaim(result.value)
		return NextResponse.json(SUCCESS)
	} catch (err) {
		console.error("referral claim failed", err)
		return NextResponse.json({ success: false, message: "Something went wrong. Please try again." }, { status: 500 })
	}
}
