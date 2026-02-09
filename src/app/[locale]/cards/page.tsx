import type { Metadata } from "next"
import { Header } from "@/components/layouts/header/header"
import { FeaturedCardsSection } from "./featured-cards-section"
import { VirtualCardSection } from "./virtual-card-section"
import { CardsCollectionSection } from "./cards-collection-section"
import { HowToGetCardSection } from "./how-to-get-card-section"
import { PlansSection } from "./plans-section"
import { CardsBanner } from "./cards-banner"
import { pageSeo } from "@/config/seo"

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const seo = pageSeo.cards[locale] || pageSeo.cards.en

	return {
		title: seo.title,
		description: seo.description,
		alternates: {
			canonical: "/cards",
			languages: { en: "/en/cards", pt: "/pt/cards" },
		},
		openGraph: {
			title: seo.ogTitle,
			description: seo.ogDescription,
			images: [{ url: "/cards/card-product.png", width: 1200, height: 630, alt: seo.ogTitle }],
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
