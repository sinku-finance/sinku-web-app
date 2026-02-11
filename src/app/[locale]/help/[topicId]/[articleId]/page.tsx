import type { Metadata } from "next"
import { Header } from "@/components/layouts/header/header"
import Link from "next/link"
import { notFound } from "next/navigation"
import helpCenterData from "@/data/help-center.json"
import { HelpSidebar } from "../../help-sidebar"
import { HelpCategorySidebar } from "../../help-category-sidebar"
import { HelpSearchBar } from "../../help-search-bar"

type ContentBlock =
	| { type: "heading"; text: string }
	| { type: "paragraph"; text: string }
	| { type: "list"; items: string[] }

type Article = {
	id: string
	title: string
	category?: string
	content: ContentBlock[]
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string; topicId: string; articleId: string }>
}): Promise<Metadata> {
	const { locale, topicId, articleId } = await params
	const data =
		helpCenterData[locale as keyof typeof helpCenterData] ||
		helpCenterData.en
	const topic = data.topics.find((t) => t.id === topicId)
	const article = topic?.articles.find((a) => a.id === articleId)

	if (!topic || !article) return { title: "Not Found" }

	return {
		title: `${article.title} — Plexos Help Centre`,
		description: `${article.title}. Get help with your Plexos account.`,
	}
}

function renderContentBlock(block: ContentBlock, index: number) {
	switch (block.type) {
		case "heading":
			return (
				<h2
					key={index}
					className="text-xl font-bold text-black mt-8 mb-3 first:mt-0"
				>
					{block.text}
				</h2>
			)
		case "paragraph":
			return (
				<p
					key={index}
					className="text-base text-gray-700 leading-relaxed mb-4"
				>
					{block.text}
				</p>
			)
		case "list":
			return (
				<ul
					key={index}
					className="list-disc list-outside pl-6 space-y-2 mb-4"
				>
					{block.items.map((item, i) => (
						<li
							key={i}
							className="text-base text-gray-700 leading-relaxed"
						>
							{item}
						</li>
					))}
				</ul>
			)
		default:
			return null
	}
}

export default async function ArticlePage({
	params,
}: {
	params: Promise<{ locale: string; topicId: string; articleId: string }>
}) {
	const { locale, topicId, articleId } = await params
	const data =
		helpCenterData[locale as keyof typeof helpCenterData] ||
		helpCenterData.en
	const topic = data.topics.find((t) => t.id === topicId)
	const article = topic?.articles.find((a) => a.id === articleId) as
		| Article
		| undefined

	if (!topic || !article) notFound()

	const hasCategories = (topic.articles as unknown as Article[]).some(
		(a) => "category" in a && a.category,
	)

	// Build breadcrumb parts
	const breadcrumbParts = [topic.title]
	if (article.category && article.category !== article.title) {
		breadcrumbParts.push(article.category)
	}

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
								{/* Sidebar — show categories if topic has them, otherwise global topics */}
								{hasCategories ? (
									<HelpCategorySidebar
										topicsLabel={data.topicsLabel}
										topicId={topic.id}
										articles={
											topic.articles as Article[]
										}
										activeArticleId={article.id}
									/>
								) : (
									<HelpSidebar
										topicsLabel={data.topicsLabel}
										topics={data.topics}
										activeTopicId={topic.id}
									/>
								)}

								{/* Article Content */}
								<div className="flex-1 min-w-0">
									{/* Breadcrumb */}
									<div className="flex items-center gap-1.5 text-sm text-gray-400 mb-8 flex-wrap">
										<Link
											href={`/help/${topic.id}`}
											className="hover:text-gray-600 transition-colors"
										>
											{topic.title}
										</Link>
										{article.category &&
											article.category !==
												article.title && (
												<>
													<span>·</span>
													<span>
														{article.category}
													</span>
												</>
											)}
									</div>

									{/* Article Title */}
									<h1 className="text-2xl md:text-3xl font-bold text-black mb-8">
										{article.title}
									</h1>

									{/* Article Body */}
									<div className="max-w-[720px]">
										{article.content.map(
											(block, index) =>
												renderContentBlock(
													block,
													index,
												),
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	)
}
