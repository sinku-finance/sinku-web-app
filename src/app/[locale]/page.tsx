import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { HeroSection } from "@/components/layouts/pages/home/hero-section/hero-section";
import { ServicesSection } from "@/components/layouts/pages/home/services-section";
import { ToolsSection } from "@/components/layouts/pages/home/tools-section";
import { RewardsSection } from "@/components/layouts/pages/home/rewards-section";
import { FeaturesSection } from "@/components/layouts/pages/home/features-section";
import { AppSection } from "@/components/layouts/pages/home/app-section";
import { CardsSection } from "@/components/layouts/pages/home/cards-section";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: "hero" })

	return {
		title: "Plexos — Introducing You to the Global Economy",
		description: t("subtitle"),
		alternates: {
			canonical: "/",
			languages: { en: "/en", pt: "/pt" },
		},
		openGraph: {
			title: "Plexos — Your Money. Everywhere.",
			description: t("subtitle"),
			images: [{ url: "/cards/card-in-hands.png", width: 1200, height: 630, alt: "Plexos international card" }],
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
