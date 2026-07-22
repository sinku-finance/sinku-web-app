import type { NextRequest } from "next/server"

export function clientIp(request: NextRequest): string | null {
	const vercelIp = request.headers.get("x-vercel-forwarded-for")
	if (vercelIp) return vercelIp.split(",")[0].trim()
	const realIp = request.headers.get("x-real-ip")
	if (realIp) return realIp.trim()
	const xff = request.headers.get("x-forwarded-for")
	if (xff) return xff.split(",")[0].trim()
	return null
}
