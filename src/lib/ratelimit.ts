import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

let limiter: Ratelimit | null | undefined

function getLimiter(): Ratelimit | null {
	if (limiter !== undefined) return limiter

	const url = process.env.UPSTASH_REDIS_REST_URL
	const token = process.env.UPSTASH_REDIS_REST_TOKEN
	if (!url || !token) {
		limiter = null
		return null
	}

	limiter = new Ratelimit({
		redis: new Redis({ url, token }),
		limiter: Ratelimit.slidingWindow(5, "1 h"),
		prefix: "rl",
	})
	return limiter
}

export async function allowRequest(name: string, ip: string | null): Promise<boolean> {
	const rl = getLimiter()
	if (!rl || !ip) return true
	try {
		const { success } = await rl.limit(`${name}:${ip}`)
		return success
	} catch {
		return true
	}
}
