import type { Metadata } from "next"
import { Header } from "@/components/layouts/header/header"
import Link from "next/link"
import { notFound } from "next/navigation"
import helpCenterData from "@/data/help-center.json"
import { HelpSidebar } from "../help-sidebar"
import { HelpSearchBar } from "../help-search-bar"

type Article = {
	id: string
	title: string
	category?: string
	content: unknown[]
}

function groupByCategory(articles: Article[]) {
	const groups: { category: string; articles: Article[] }[] = []
	const seen = new Map<string, number>()

	for (const article of articles) {
		const cat = article.category || article.title
		if (seen.has(cat)) {
			groups[seen.get(cat)!].articles.push(article)
		} else {
			seen.set(cat, groups.length)
			groups.push({ category: cat, articles: [article] })
		}
	}

	return groups
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string; topicId: string }>
}): Promise<Metadata> {
	const { locale, topicId } = await params
	const data =
		helpCenterData[locale as keyof typeof helpCenterData] ||
		helpCenterData.en
	const topic = data.topics.find((t) => t.id === topicId)

	if (!topic) return { title: "Not Found" }

	return {
		title: `${topic.title} — Plexos Help Centre`,
		description: `Get help with ${topic.title.toLowerCase()}. Browse articles and find answers to your questions.`,
	}
}

export default async function TopicPage({
	params,
}: {
	params: Promise<{ locale: string; topicId: string }>
}) {
	const { locale, topicId } = await params
	const data =
		helpCenterData[locale as keyof typeof helpCenterData] ||
		helpCenterData.en
	const topic = data.topics.find((t) => t.id === topicId)

	if (!topic) notFound()

	const articles = topic.articles as unknown as Article[]
	const hasCategories = articles.some(
		(a) => "category" in a && a.category,
	)
	const groups = hasCategories ? groupByCategory(articles) : null

	return (
		<>
			<Header />
			{/* Divider */}
			<div className="border-b border-gray-200" />

			<main id="main-content" className="relative min-h-screen bg-white overflow-hidden">
				{/* Hero / Search */}
				<section className="pt-32 pb-8 md:pt-40 md:pb-12 bg-white">
					<div className="px-6 md:px-10 lg:px-12">
						<div className="w-full max-w-[800px] mx-auto text-center">
							<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4">
								{data.title}
							</h1>
							<p className="text-base md:text-lg text-gray-500 mb-8">
								{data.subtitle}
							</p>
							<HelpSearchBar
								placeholder={data.searchPlaceholder}
								topics={data.topics}
							/>
						</div>
					</div>
				</section>

				{/* Content */}
				<section className="pb-20 md:pb-32">
					<div className="px-6 md:px-10 lg:px-12">
						<div className="w-full max-w-[1100px] mx-auto">
							<div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
								{/* Sidebar */}
								<HelpSidebar
									topicsLabel={data.topicsLabel}
									topics={data.topics}
									activeTopicId={topic.id}
								/>

								{/* Articles */}
								<div className="flex-1">
									{/* Breadcrumb */}
									<div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
										<span>{topic.title}</span>
									</div>

									{groups ? (
										/* Grouped display — category cards with article links */
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											{groups.map((group) => (
												<div
													key={group.category}
													className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100/70 transition-colors duration-150"
												>
													<h3 className="text-base font-bold text-black mb-3">
														{group.articles
															.length === 1 ? (
															<Link
																href={`/help/${topic.id}/${group.articles[0].id}`}
																className="hover:underline"
															>
																{
																	group.category
																}
															</Link>
														) : (
															group.category
														)}
													</h3>

													{group.articles.length >
														1 && (
														<ul className="space-y-2">
															{group.articles.map(
																(article) => (
																	<li
																		key={
																			article.id
																		}
																	>
																		<Link
																			href={`/help/${topic.id}/${article.id}`}
																			className="text-sm text-gray-600 hover:text-black transition-colors duration-150"
																		>
																			{
																				article.title
																			}
																		</Link>
																	</li>
																),
															)}
														</ul>
													)}
												</div>
											))}
										</div>
									) : (
										/* Flat display — simple article cards */
										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											{topic.articles.map((article) => (
												<Link
													key={article.id}
													href={`/help/${topic.id}/${article.id}`}
													className="block bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors duration-150"
												>
													<h3 className="text-base font-semibold text-black leading-snug">
														{article.title}
													</h3>
												</Link>
											))}
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	)
}
