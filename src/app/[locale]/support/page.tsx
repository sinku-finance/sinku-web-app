import type { Metadata } from "next"
import { Header } from "@/components/layouts/header/header"
import { SecurityReportSection } from "@/components/layouts/security-report-section"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { getTranslations } from "next-intl/server"
import supportFaqsData from "@/data/support-faqs.json"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
import { SupportBanner } from "./support-banner"
import { pageSeo } from "@/config/seo"

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const seo = pageSeo.support[locale] || pageSeo.support.en

	return {
		title: seo.title,
		description: seo.description,
		alternates: {
			canonical: "/support",
			languages: { en: "/en/support", pt: "/pt/support" },
		},
		openGraph: {
			title: seo.ogTitle,
			description: seo.ogDescription,
		},
	}
}

export default async function SupportPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: "support" })
	const tSecurity = await getTranslations({ locale, namespace: "security" })
	
	// Get support FAQs for the current locale
	const supportFaqs = supportFaqsData[locale as keyof typeof supportFaqsData] || supportFaqsData.en

	return (
		<>
			<Header />
			{/* Divider */}
			<div className="border-b border-gray-200" />
			
			{/* Hero Banner with Support Image */}
			<SupportBanner />

			<main className="relative min-h-screen bg-white overflow-hidden">
				{/* Talk to us directly Section */}
				<section className="py-20 md:py-32">
					<div className="px-6 md:px-10 lg:px-12">
						<div className="w-full max-w-[1400px] mx-auto">
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
								{/* Left side - Image */}
								<div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
									<Image
										src="/support/support-hero.png"
										alt={t("talkToUs.title")}
										fill
										className="object-contain"
										priority
									/>
								</div>

								{/* Right side - Content */}
								<div className="lg:pl-8">
									<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6 leading-tight">
										{t("talkToUs.title")}
									</h2>
									<div className="space-y-6 text-base md:text-lg text-gray-600 mb-8">
										<p className="leading-relaxed" dangerouslySetInnerHTML={{ __html: t("talkToUs.description1") }} />
										<p className="leading-relaxed">
											{t("talkToUs.description2")}
										</p>
									</div>
									<Button variant="primary" size="lg">
										<Link href="/download-app">
											{t("talkToUs.button")}
										</Link>
									</Button>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Ready-to-go answers Section */}
				<section className="py-20 md:py-32 bg-gray-50">
					<div className="px-6 md:px-10 lg:px-12">
						<div className="w-full max-w-[1400px] mx-auto">
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
								{/* Left side - Content */}
								<div className="lg:pr-8">
									<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6 leading-tight">
										{t("readyAnswers.title")}
									</h2>
									<p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed">
										{t("readyAnswers.description")}
									</p>
									<Button variant="outline" size="lg">
										<Link href="/faqs">
											{t("readyAnswers.button")}
										</Link>
									</Button>
								</div>

								{/* Right side - Image */}
								<div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden">
									<Image
										src="/support/support-contact.png"
										alt={t("readyAnswers.title")}
										fill
										className="object-cover"
									/>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Getting back into your account Section */}
				<section className="py-20 md:py-32">
					<div className="px-6 md:px-10 lg:px-12">
						<div className="w-full max-w-[900px] mx-auto">
							<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black text-center mb-12 md:mb-16">
								{t("accountAccess.title")}
							</h2>
							<Accordion type="single" collapsible className="w-full space-y-4">
								{supportFaqs.map((faq) => (
									<AccordionItem key={faq.id} value={faq.id}>
										<AccordionTrigger>{faq.question}</AccordionTrigger>
										<AccordionContent>
											<div className="whitespace-pre-line">{faq.answer}</div>
										</AccordionContent>
									</AccordionItem>
								))}
							</Accordion>
						</div>
					</div>
				</section>
			</main>
			
			{/* Security Report Section */}
			<SecurityReportSection 
				title={tSecurity("title")}
				description={tSecurity("description")}
				buttonText={tSecurity("button")}
				buttonHref="/support"
			/>
		</>
	)
}
