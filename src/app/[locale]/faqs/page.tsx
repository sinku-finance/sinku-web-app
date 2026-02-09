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

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: "navigation" })

	return {
		title: t("faqsTitle"),
		description: t("faqsSubtitle"),
		alternates: {
			canonical: "/faqs",
			languages: { en: "/en/faqs", pt: "/pt/faqs" },
		},
		openGraph: {
			title: `${t("faqsTitle")} — Plexos`,
			description: t("faqsSubtitle"),
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
			
			{/* Hero Banner with FAQs Image */}
			<section 
				className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden"
				style={{ 
					backgroundImage: "url('/banners/faqs.png')",
					backgroundSize: "cover",
					backgroundPosition: "center center",
					backgroundRepeat: "no-repeat"
				}}
			>
				{/* Optional overlay for better text readability if needed */}
				<div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/20" />
			</section>

			<main className="relative min-h-screen bg-white overflow-hidden">
				{/* Content */}
				<div className="relative px-6 md:px-10 lg:px-12 py-20 md:py-32">
					<div className="w-full max-w-[1400px] mx-auto">
						{/* Subtitle */}
						<p className="text-base md:text-lg text-gray-500 text-center max-w-3xl mx-auto mb-6 md:mb-8">
							{t("faqsSubtitle")}
						</p>

						{/* Title */}
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black text-center mb-12 md:mb-16">
							{t("faqsTitle")}
						</h1>

						<div className="max-w-[900px] mx-auto">
							<Accordion type="single" collapsible className="w-full space-y-4">
								{faqs.map((faq) => (
									<AccordionItem key={faq.id} value={faq.id}>
										<AccordionTrigger>{faq.question}</AccordionTrigger>
										<AccordionContent>{renderAnswer(faq.answer)}</AccordionContent>
									</AccordionItem>
								))}
							</Accordion>
						</div>
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
