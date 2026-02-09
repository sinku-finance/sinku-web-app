import type { Metadata } from "next"
import { Header } from "@/components/layouts/header/header"
import { getTranslations } from "next-intl/server"
import { FeesBanner } from "./fees-banner"
import { PaymentsHeroSection } from "./payments-hero-section"
import { PaymentsFeatureSection } from "./payments-feature-section"
import { PaymentMethodsSection } from "./payment-methods-section"
import { MultiCurrencySection } from "./multi-currency-section"
import { ComparisonSection } from "./comparison-section"
import { AccountFeesSection } from "./account-fees-section"

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: "fees" })

	return {
		title: `${t("title")} | Plexos`,
		description: t("heroSubtitle"),
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

			<main className="relative bg-white overflow-hidden">
				{/* Hero - Payments */}
				<PaymentsHeroSection />

				{/* Feature - Pay friends */}
				<PaymentsFeatureSection />

				{/* Payment Methods Cards */}
				<PaymentMethodsSection />

				{/* Multi-currency Section */}
				<MultiCurrencySection />

				{/* Comparison Section */}
				<ComparisonSection locale={locale} />

				{/* Account Fees Section */}
				<AccountFeesSection locale={locale} />
			</main>
		</>
	)
}
