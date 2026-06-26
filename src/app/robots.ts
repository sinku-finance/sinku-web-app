import type { MetadataRoute } from "next"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://sinku.finance"

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: "*",
				allow: "/",
				// Do NOT block /_next/ — next/image serves every image via /_next/image
				// and assets via /_next/static. Blocking it hides all images from Google
				// Images and blocks render-critical JS/CSS.
				disallow: ["/api/"],
			},
		],
		sitemap: `${BASE_URL}/sitemap.xml`,
	}
}
