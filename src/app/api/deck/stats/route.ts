import { timingSafeEqual } from "node:crypto"
import { deckStats } from "@/lib/deck/db"
import { clientIp } from "@/lib/http"
import { allowRequest } from "@/lib/ratelimit"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export const runtime = "nodejs"

function keyMatches(provided: string | null, expected: string): boolean {
	if (!provided) return false
	const a = Buffer.from(provided)
	const b = Buffer.from(expected)
	return a.length === b.length && timingSafeEqual(a, b)
}

export async function GET(request: NextRequest) {
	const expected = process.env.DECK_STATS_KEY
	if (!expected) {
		return NextResponse.json({ success: false, error: "Not configured" }, { status: 503 })
	}

	const ip = clientIp(request)
	if (!(await allowRequest("deck-stats", ip))) {
		return NextResponse.json({ success: false, error: "Too many requests" }, { status: 429 })
	}

	if (request.nextUrl.searchParams.has("key")) {
		return NextResponse.json(
			{ success: false, error: "Pass the key as 'Authorization: Bearer <key>', not in the URL" },
			{ status: 400 },
		)
	}

	const provided = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? null
	if (!keyMatches(provided, expected)) {
		return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
	}

	try {
		const stats = await deckStats()
		return NextResponse.json({ success: true, data: stats })
	} catch (err) {
		console.error("deck stats failed", err)
		return NextResponse.json({ success: false, error: "Something went wrong" }, { status: 500 })
	}
}
