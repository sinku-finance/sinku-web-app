import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://plexos.app";

export default function sitemap(): MetadataRoute.Sitemap {
	const locales = ["en", "pt"];

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
	];

	const entries: MetadataRoute.Sitemap = [];

	for (const page of pages) {
		for (const locale of locales) {
			const url =
				locale === "en"
					? `${BASE_URL}${page.path}`
					: `${BASE_URL}/${locale}${page.path}`;

			entries.push({
				url,
				lastModified: new Date(),
				changeFrequency: page.changeFrequency,
				priority: page.priority,
				alternates: {
					languages: {
						en: `${BASE_URL}${page.path}`,
						pt: `${BASE_URL}/pt${page.path}`,
					},
				},
			});
		}
	}

	return entries;
}
