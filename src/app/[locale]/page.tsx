import type { Metadata } from "next"
import { HeroSection } from "@/components/layouts/pages/home/hero-section/hero-section";
import { ServicesSection } from "@/components/layouts/pages/home/services-section";
import { ToolsSection } from "@/components/layouts/pages/home/tools-section";
import { RewardsSection } from "@/components/layouts/pages/home/rewards-section";
import { FeaturesSection } from "@/components/layouts/pages/home/features-section";
import { AppSection } from "@/components/layouts/pages/home/app-section";
import { CardsSection } from "@/components/layouts/pages/home/cards-section";
import { pageSeo } from "@/config/seo";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const seo = pageSeo.home[locale] || pageSeo.home.en

	return {
		title: seo.title,
		description: seo.description,
		alternates: {
			canonical: "/",
			languages: { en: "/en", pt: "/pt" },
		},
		openGraph: {
			title: seo.ogTitle,
			description: seo.ogDescription,
			images: [{ url: "/cards/card-in-hands.png", width: 2048, height: 2048, alt: seo.ogTitle }],
		},
	}
}

export default function Home() {
	return (
		<main className="relative pb-24 md:pb-0">
			<HeroSection />
			<ServicesSection />
			<ToolsSection />
			<RewardsSection />
			<FeaturesSection />
			{/* <AppSection /> */}
			<CardsSection />
		</main>
	)
}
