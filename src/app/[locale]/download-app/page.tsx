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
		title: `${t("title")} | Plexos`,
		description: t("subtitle"),
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
