import type { Metadata } from "next"
import { Header } from "@/components/layouts/header/header"
import { getTranslations } from "next-intl/server"
import { DownloadAppSection } from "./download-app-section"

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: "downloadApp" })

	return {
		title: "Download the Plexos App",
		description: t("subtitle"),
		alternates: {
			canonical: "/download-app",
			languages: { en: "/en/download-app", pt: "/pt/download-app" },
		},
		openGraph: {
			title: "Get the Plexos App — Your Money, Everywhere",
			description: t("subtitle"),
			images: [{ url: "/cards/card-in-hands.png", width: 1200, height: 630, alt: "Download the Plexos app" }],
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
