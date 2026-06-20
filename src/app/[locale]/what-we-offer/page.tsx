import type { Metadata } from "next"
import { Header } from "@/components/layouts/header/header"
import { FeesBanner } from "./fees-banner"
import { PaymentsHeroSection } from "./payments-hero-section"
import { PaymentsFeatureSection } from "./payments-feature-section"
import { PaymentMethodsSection } from "./payment-methods-section"
import { MultiCurrencySection } from "./multi-currency-section"
// import { ComparisonSection } from "./comparison-section"
import { TransferCalculatorSection } from "./transfer-calculator-section"
import { AccountFeesSection } from "./account-fees-section"
import { pageSeo } from "@/config/seo"

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const seo = pageSeo.whatWeOffer[locale] || pageSeo.whatWeOffer.en

	return {
		title: seo.title,
		description: seo.description,
		alternates: {
			canonical: "/what-we-offer",
			languages: { en: "/en/what-we-offer", pt: "/pt/what-we-offer" },
		},
		openGraph: {
			title: seo.ogTitle,
			description: seo.ogDescription,
			images: [{ url: "/cards/card-in-hands.png", width: 2048, height: 2048, alt: seo.ogTitle }],
		},
	}
}

export default async function WhatWeOfferPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params

	return (
		<>
			<Header />
			{/* Divider */}
			<div className="border-b border-gray-200" />

			{/* Hero Banner with Background Image */}
			<FeesBanner />

			<main id="main-content" className="relative bg-white overflow-hidden">
				{/* Hero - Payments */}
				<PaymentsHeroSection />

				{/* Feature - Pay friends */}
				<PaymentsFeatureSection />

				{/* Payment Methods Cards */}
				<PaymentMethodsSection />

				{/* Multi-currency Section */}
				<MultiCurrencySection />

				{/* Transfer Calculator Section */}
				<TransferCalculatorSection />

				{/* Old Comparison Section - hidden */}
				{/* <ComparisonSection locale={locale} /> */}

				{/* Account Fees Section - hidden for now */}
				{/* <AccountFeesSection locale={locale} /> */}
			</main>
		</>
	)
}
