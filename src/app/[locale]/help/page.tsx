import type { Metadata } from "next"
import { Header } from "@/components/layouts/header/header"
import Link from "next/link"
import { getTranslations } from "next-intl/server"
import helpCenterData from "@/data/help-center.json"
import { pageSeo } from "@/config/seo"
import { Search, ArrowRight } from "iconoir-react"
import { HelpSearchBar } from "./help-search-bar"
import { AnimateIn, AnimateStagger, AnimateStaggerChild } from "@/components/ui/animate-in"

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const seo = pageSeo.help[locale] || pageSeo.help.en

	return {
		title: seo.title,
		description: seo.description,
		alternates: {
			canonical: "/help",
			languages: { en: "/en/help", pt: "/pt/help" },
		},
		openGraph: {
			title: seo.ogTitle,
			description: seo.ogDescription,
		},
	}
}

export default async function HelpCenterPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	const data =
		helpCenterData[locale as keyof typeof helpCenterData] ||
		helpCenterData.en

	return (
		<>
			<Header />
			{/* Divider */}
			<div className="border-b border-gray-200" />

			<main id="main-content" className="relative min-h-screen bg-white overflow-hidden">
				{/* Hero Section */}
				<section className="pt-32 pb-12 md:pt-40 md:pb-16">
					<div className="px-6 md:px-10 lg:px-12">
						<div className="w-full max-w-[800px] mx-auto text-center">
							<AnimateIn delay={0}>
								<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4">
									{data.title}
								</h1>
							</AnimateIn>
							<AnimateIn delay={0.1}>
								<p className="text-base md:text-lg text-gray-500 mb-8">
									{data.subtitle}
								</p>
							</AnimateIn>

							{/* Search Bar */}
							<AnimateIn delay={0.2}>
								<HelpSearchBar
									placeholder={data.searchPlaceholder}
									topics={data.topics}
								/>
							</AnimateIn>
						</div>
					</div>
				</section>

				{/* Topics Grid */}
				<section className="pb-20 md:pb-32">
					<div className="px-6 md:px-10 lg:px-12">
						<div className="w-full max-w-[1100px] mx-auto">
							<AnimateStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5" staggerDelay={0.08}>
								{data.topics.map((topic) => (
									<AnimateStaggerChild key={topic.id}>
										<div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-7 hover:border-gray-300 hover:shadow-sm transition-all duration-200 h-full">
											<h2 className="text-lg font-bold text-black mb-4">
												{topic.title}
											</h2>

											<ul className="space-y-2.5 mb-5">
												{topic.articles
													.slice(0, 3)
													.map((article) => (
														<li key={article.id}>
															<Link
																href={`/help/${topic.id}/${article.id}`}
																className="text-sm text-gray-600 hover:text-black transition-colors duration-150"
															>
																{article.title}
															</Link>
														</li>
													))}
											</ul>

											<Link
												href={`/help/${topic.id}`}
												className="inline-flex items-center gap-1.5 text-sm font-medium text-black hover:text-gray-600 transition-colors duration-150"
											>
												{data.viewAll}
												<ArrowRight className="w-3.5 h-3.5" />
											</Link>
										</div>
									</AnimateStaggerChild>
								))}
							</AnimateStagger>
						</div>
					</div>
				</section>
			</main>
		</>
	)
}
