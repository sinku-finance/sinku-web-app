import { isDeckSlug } from "@/config/deck"
import { logDeckOpen } from "@/lib/deck/db"
import { clientIp } from "@/lib/http"
import { allowRequest } from "@/lib/ratelimit"
import { after } from "next/server"
import type { NextRequest } from "next/server"

export const runtime = "nodejs"

const UPSTREAM_TIMEOUT_MS = 10_000

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	if (!isDeckSlug(slug)) {
		return new Response("Not found", { status: 404 })
	}

	const pdfUrl = process.env.DECK_PDF_URL
	if (!pdfUrl) {
		return new Response("Deck unavailable", { status: 503 })
	}

	const ip = clientIp(request)
	if (!(await allowRequest("deck", ip))) {
		return new Response("Too many requests", { status: 429 })
	}

	const userAgent = request.headers.get("user-agent")
	const referer = request.headers.get("referer")
	after(async () => {
		await logDeckOpen(slug, ip, userAgent, referer).catch(err => {
			console.error("deck open logging failed", err)
		})
	})

	let upstream: Response
	try {
		upstream = await fetch(pdfUrl, {
			cache: "no-store",
			signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
		})
	} catch {
		console.error("deck fetch failed: upstream unreachable")
		return new Response("Deck unavailable", { status: 502 })
	}
	if (!upstream.ok || !upstream.body) {
		console.error("deck fetch failed", upstream.status)
		return new Response("Deck unavailable", { status: 502 })
	}

	return new Response(upstream.body, {
		headers: {
			"Content-Type": "application/pdf",
			"Content-Disposition": 'inline; filename="Sinku_Investor_Deck.pdf"',
			"Cache-Control": "no-store",
			"X-Robots-Tag": "noindex, nofollow",
		},
	})
}
