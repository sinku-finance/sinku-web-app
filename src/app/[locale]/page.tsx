import { HeroSection } from "@/components/layouts/pages/home/hero-section/hero-section";
import { ServicesSection } from "@/components/layouts/pages/home/services-section";
import { ToolsSection } from "@/components/layouts/pages/home/tools-section";
import { RewardsSection } from "@/components/layouts/pages/home/rewards-section";
import { FeaturesSection } from "@/components/layouts/pages/home/features-section";
import { AppSection } from "@/components/layouts/pages/home/app-section";
import { CardsSection } from "@/components/layouts/pages/home/cards-section";

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
