import type { Metadata } from "next"
import { Header } from "@/components/layouts/header/header"
import { getTranslations } from "next-intl/server"
import { FeaturedCardsSection } from "./featured-cards-section"
import { VirtualCardSection } from "./virtual-card-section"
import { CardsCollectionSection } from "./cards-collection-section"
import { HowToGetCardSection } from "./how-to-get-card-section"
import { PlansSection } from "./plans-section"
import { CardsBanner } from "./cards-banner"

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: "cards" })

	return {
		title: `Cards | Plexos`,
		description: t("heroSubtitle"),
	}
}

export default function CardsPage() {
	return (
		<>
			<Header />
			{/* Divider */}
			<div className="border-b border-gray-200" />

			{/* Hero Banner with Cards Image */}
			<CardsBanner />

			<main className="relative min-h-screen bg-white overflow-hidden">
				<FeaturedCardsSection />
				<PlansSection />
				<VirtualCardSection />
				<CardsCollectionSection />
				<HowToGetCardSection />
			</main>
		</>
	)
}
