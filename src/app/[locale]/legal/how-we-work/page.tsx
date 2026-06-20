import type { Metadata } from "next"
import { Header } from "@/components/layouts/header/header"
import howWeWorkData from "@/data/how-we-work.json"
import { CountrySelector } from "@/components/ui/country-selector"
import { AnimateIn } from "@/components/ui/animate-in"

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const data = howWeWorkData[locale as keyof typeof howWeWorkData] || howWeWorkData.en

	return {
		title: data.title,
		description: data.sections[0].content[0],
		robots: {
			index: true,
			follow: true,
		},
		alternates: {
			canonical: "/legal/how-we-work",
			languages: { en: "/en/legal/how-we-work", pt: "/pt/legal/how-we-work" },
		},
	}
}

export default async function HowWeWorkPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const data = howWeWorkData[locale as keyof typeof howWeWorkData] || howWeWorkData.en

	return (
		<>
			<Header />
			<div className="border-b border-gray-200" />

			<main id="main-content" className="relative min-h-screen bg-white">
				{/* Hero Section */}
				<div className="bg-gray-50 pt-28 pb-16 md:pt-32 md:pb-24">
					<div className="container mx-auto px-6 md:px-10 lg:px-12">
						<AnimateIn delay={0}>
							<p className="text-center text-gray-600 text-base md:text-lg mb-8">
								Terms & Policies
							</p>
						</AnimateIn>

						<AnimateIn delay={0.1}>
							<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black text-center mb-8">
								{data.title}
							</h1>
						</AnimateIn>

						<AnimateIn delay={0.2}>
							<div className="flex justify-center">
								<CountrySelector />
							</div>
						</AnimateIn>
					</div>
				</div>

				{/* Content */}
				<div className="container mx-auto px-6 md:px-10 lg:px-12 py-12 md:py-20">
					<div className="max-w-4xl mx-auto">
						{data.sections.map((section, index) => (
							<AnimateIn key={section.id} className={index > 0 ? "mt-12 md:mt-16" : ""}>
								<section>
									<h2 className="text-2xl md:text-3xl font-bold text-black mb-6">
										{section.title}
									</h2>

									<div className="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
										{section.content.map((paragraph, pIndex) => (
											<p key={pIndex}>{paragraph}</p>
										))}
									</div>

									{section.subsections && (
										<div className="mt-8 space-y-6">
											{section.subsections.map((subsection, sIndex) => (
												<div key={sIndex} className="pl-6 border-l-4 border-black">
													<h3 className="text-xl md:text-2xl font-semibold text-black mb-3">
														{subsection.title}
													</h3>
													<p className="text-base md:text-lg text-gray-700 leading-relaxed whitespace-pre-line">
														{subsection.content}
													</p>
												</div>
											))}
										</div>
									)}
								</section>
							</AnimateIn>
						))}

						<AnimateIn>
							<div className="mt-16 pt-8 border-t border-gray-200">
								<p className="text-sm text-gray-500 text-center">
									Last updated: {data.lastUpdated}
								</p>
							</div>
						</AnimateIn>
					</div>
				</div>
			</main>
		</>
	)
}
