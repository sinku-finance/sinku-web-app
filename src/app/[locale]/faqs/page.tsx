import type { Metadata } from "next"
import { Header } from "@/components/layouts/header/header"
import { SecurityReportSection } from "@/components/layouts/security-report-section"
import Link from "next/link"
import { getTranslations } from "next-intl/server"
import faqsData from "@/data/faqs.json"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
import { pageSeo } from "@/config/seo"
import { AnimateIn } from "@/components/ui/animate-in"

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const seo = pageSeo.faqs[locale] || pageSeo.faqs.en

	return {
		title: seo.title,
		description: seo.description,
		alternates: {
			canonical: "/faqs",
			languages: { en: "/en/faqs", pt: "/pt/faqs" },
		},
		openGraph: {
			title: seo.ogTitle,
			description: seo.ogDescription,
		},
	}
}

// Helper function to convert markdown links to JSX
function renderAnswer(text: string) {
	const parts = text.split(/(\[.*?\]\(.*?\))/)

	return parts.map((part, index) => {
		const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/)
		if (linkMatch) {
			const [, linkText, href] = linkMatch
			return (
				<Link
					key={index}
					href={href}
					className="text-primary-600 underline hover:text-primary-700 transition-colors"
				>
					{linkText}
				</Link>
			)
		}
		return part
	})
}

export default async function FAQsPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: "navigation" })
	const tSecurity = await getTranslations({ locale, namespace: "security" })

	// Get FAQs for the current locale
	const faqs = faqsData[locale as keyof typeof faqsData] || faqsData.en

	return (
		<>
			<Header />
			{/* Divider */}
			<div className="border-b border-gray-200" />

			<main id="main-content" className="relative min-h-screen bg-white">
				{/* Hero Section */}
				<div className="bg-gray-50 pt-28 pb-16 md:pt-32 md:pb-24">
					<div className="container mx-auto px-6 md:px-10 lg:px-12">
						<AnimateIn delay={0}>
							<p className="text-center text-gray-600 text-base md:text-lg mb-8">
								{t("faqsSubtitle")}
							</p>
						</AnimateIn>

						<AnimateIn delay={0.1}>
							<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black text-center">
								{t("faqsTitle")}
							</h1>
						</AnimateIn>
					</div>
				</div>

				{/* Content */}
				<div className="container mx-auto px-6 md:px-10 lg:px-12 py-12 md:py-20">
					<div className="max-w-[900px] mx-auto">
						<AnimateIn>
							<Accordion type="single" collapsible className="w-full space-y-4">
								{faqs.map((faq) => (
									<AccordionItem key={faq.id} value={faq.id}>
										<AccordionTrigger>{faq.question}</AccordionTrigger>
										<AccordionContent>{renderAnswer(faq.answer)}</AccordionContent>
									</AccordionItem>
								))}
							</Accordion>
						</AnimateIn>
					</div>
				</div>

				{/* Security Report Section */}
				<SecurityReportSection
					title={tSecurity("title")}
					description={tSecurity("description")}
					buttonText={tSecurity("button")}
					buttonHref="/support"
				/>
			</main>
		</>
	)
}
