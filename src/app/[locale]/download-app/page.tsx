import type { Metadata } from "next"
import { Header } from "@/components/layouts/header/header"
import { DownloadAppSection } from "./download-app-section"
import { pageSeo } from "@/config/seo"

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const seo = pageSeo.downloadApp[locale] || pageSeo.downloadApp.en

	return {
		title: seo.title,
		description: seo.description,
		alternates: {
			canonical: "/download-app",
			languages: { en: "/en/download-app", pt: "/pt/download-app" },
		},
		openGraph: {
			title: seo.ogTitle,
			description: seo.ogDescription,
			images: [{ url: "/cards/card-in-hands.png", width: 2048, height: 2048, alt: seo.ogTitle }],
		},
	}
}

export default function DownloadAppPage() {
	return (
		<>
			<Header />
			<main className="relative bg-white overflow-hidden border-t border-gray-400">
				<DownloadAppSection />
			</main>
		</>
	)
}
