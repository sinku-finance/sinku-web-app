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
		title: "International Debit Cards",
		description: t("heroSubtitle"),
		alternates: {
			canonical: "/cards",
			languages: { en: "/en/cards", pt: "/pt/cards" },
		},
		openGraph: {
			title: "Plexos Cards — One Card. No Borders. No Surprises.",
			description: t("heroSubtitle"),
			images: [{ url: "/cards/card-product.png", width: 1200, height: 630, alt: "Plexos international debit card" }],
		},
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
