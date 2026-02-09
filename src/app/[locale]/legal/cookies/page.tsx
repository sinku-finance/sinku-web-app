import type { Metadata } from "next"
import { Header } from "@/components/layouts/header/header"
import { getTranslations } from "next-intl/server"
import cookiePolicyData from "@/data/cookie-policy.json"
import { CountrySelector } from "@/components/ui/country-selector"

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const policyData = cookiePolicyData[locale as keyof typeof cookiePolicyData] || cookiePolicyData.en

	return {
		title: policyData.title,
		description: policyData.sections[0].content[0],
		robots: {
			index: false,
			follow: true,
		},
		alternates: {
			canonical: "/legal/cookies",
			languages: { en: "/en/legal/cookies", pt: "/pt/legal/cookies" },
		},
	}
}

export default async function CookiePolicyPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const policyData = cookiePolicyData[locale as keyof typeof cookiePolicyData] || cookiePolicyData.en

	return (
		<>
			<Header />
			{/* Divider */}
			<div className="border-b border-gray-200" />

			<main className="relative min-h-screen bg-white">
				{/* Hero Section */}
				<div className="bg-gray-50 py-16 md:py-24">
					<div className="container mx-auto px-6 md:px-10 lg:px-12">
						{/* Terms & Policies Label */}
						<p className="text-center text-gray-600 text-base md:text-lg mb-8">
							Terms & Policies
						</p>

						{/* Title */}
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black text-center mb-8">
							{policyData.title}
						</h1>

						{/* Country Selector */}
						<div className="flex justify-center">
							<CountrySelector />
						</div>
					</div>
				</div>

				{/* Content */}
				<div className="container mx-auto px-6 md:px-10 lg:px-12 py-12 md:py-20">
					<div className="max-w-4xl mx-auto">
						{policyData.sections.map((section, index) => (
							<section key={section.id} className={index > 0 ? "mt-12 md:mt-16" : ""}>
								{/* Section Title */}
								<h2 className="text-2xl md:text-3xl font-bold text-black mb-6">
									{section.title}
								</h2>

								{/* Section Content */}
								<div className="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
									{section.content.map((paragraph, pIndex) => (
										<p key={pIndex}>{paragraph}</p>
									))}
								</div>

								{/* Subsections (for cookie types) */}
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

								{/* Third Party Cookies Table */}
								{section.cookies && (
									<div className="mt-8 overflow-x-auto">
										<table className="min-w-full border border-gray-200 rounded-lg">
											<thead className="bg-gray-50">
												<tr>
													<th className="px-6 py-4 text-left text-sm font-semibold text-black border-b border-gray-200">
														Cookie name
													</th>
													<th className="px-6 py-4 text-left text-sm font-semibold text-black border-b border-gray-200">
														Purpose
													</th>
												</tr>
											</thead>
											<tbody className="divide-y divide-gray-200">
												{section.cookies.map((cookie, cIndex) => (
													<tr key={cIndex} className="hover:bg-gray-50 transition-colors">
														<td className="px-6 py-4 text-sm md:text-base font-medium text-black whitespace-nowrap">
															{cookie.name}
														</td>
														<td className="px-6 py-4 text-sm md:text-base text-gray-700">
															{cookie.purpose}
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								)}
							</section>
						))}

						{/* Last Updated */}
						<div className="mt-16 pt-8 border-t border-gray-200">
							<p className="text-sm text-gray-500 text-center">
								Last updated: January 2026
							</p>
						</div>
					</div>
				</div>
			</main>
		</>
	)
}
