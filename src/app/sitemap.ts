import type { MetadataRoute } from "next"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://sinku.finance"

// Key crawlable images per page (public source files, directly fetchable by Google)
// for image-sitemap discovery → helps surface them in Google Images.
const PAGE_IMAGES: Record<string, string[]> = {
	"": [
		"/banners/home-desktop.jpeg",
		"/cards/card-showcase-1.webp",
		"/cards/card-showcase-2.webp",
		"/cards/couple-with-card.webp",
		"/cards/card-product.webp",
		"/home/tools-section.webp",
		"/services/international-debit-card.webp",
		"/services/send-receive-money.webp",
		"/services/global-transfer.webp",
	],
	"/cards": [
		"/banners/cards-banner.webp",
		"/banners/cards.webp",
		"/cards/card-in-hands.webp",
		"/cards/card-lateral-green.webp",
		"/cards/card-lateral-white.webp",
		"/cards/card-lateral-black.webp",
		"/cards/applepayphone.webp",
	],
	"/what-we-offer": ["/banners/what-we-offer-desktop.webp", "/cards/supported-countries.webp", "/cards/gitl-card.webp"],
	"/download-app": ["/download-app/app-store.webp"],
}

export default function sitemap(): MetadataRoute.Sitemap {
	const locales = ["en", "pt"]

	const pages = [
		{ path: "", priority: 1.0, changeFrequency: "weekly" as const },
		{ path: "/cards", priority: 0.9, changeFrequency: "weekly" as const },
		{
			path: "/what-we-offer",
			priority: 0.9,
			changeFrequency: "weekly" as const,
		},
		{
			path: "/download-app",
			priority: 0.8,
			changeFrequency: "monthly" as const,
		},
		{ path: "/faqs", priority: 0.7, changeFrequency: "monthly" as const },
		{ path: "/support", priority: 0.7, changeFrequency: "monthly" as const },
		{
			path: "/legal/cookies",
			priority: 0.3,
			changeFrequency: "yearly" as const,
		},
	]

	const entries: MetadataRoute.Sitemap = []

	for (const page of pages) {
		const images = (PAGE_IMAGES[page.path] ?? []).map(src => `${BASE_URL}${src}`)

		for (const locale of locales) {
			const url = locale === "en" ? `${BASE_URL}${page.path}` : `${BASE_URL}/${locale}${page.path}`

			entries.push({
				url,
				lastModified: new Date(),
				changeFrequency: page.changeFrequency,
				priority: page.priority,
				...(images.length > 0 && { images }),
				alternates: {
					languages: {
						en: `${BASE_URL}${page.path}`,
						pt: `${BASE_URL}/pt${page.path}`,
					},
				},
			})
		}
	}

	return entries
}
