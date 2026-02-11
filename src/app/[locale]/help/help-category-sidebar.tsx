"use client"

import Link from "next/link"

interface Article {
	id: string
	title: string
	category?: string
}

interface HelpCategorySidebarProps {
	topicsLabel: string
	topicId: string
	articles: Article[]
	activeArticleId?: string
}

function getUniqueCategories(articles: Article[]) {
	const categories: { name: string; firstArticleId: string }[] = []
	const seen = new Set<string>()

	for (const article of articles) {
		const cat = article.category || article.title
		if (!seen.has(cat)) {
			seen.add(cat)
			categories.push({ name: cat, firstArticleId: article.id })
		}
	}

	return categories
}

export function HelpCategorySidebar({
	topicsLabel,
	topicId,
	articles,
	activeArticleId,
}: HelpCategorySidebarProps) {
	const categories = getUniqueCategories(articles)

	// Find which category the active article belongs to
	const activeArticle = articles.find((a) => a.id === activeArticleId)
	const activeCategory = activeArticle?.category || activeArticle?.title

	return (
		<aside className="w-full lg:w-[220px] flex-shrink-0">
			<h3 className="text-sm font-semibold text-gray-500 mb-4">
				{topicsLabel}
			</h3>
			<nav aria-label="Article categories">
				<ul className="space-y-1">
					{categories.map((cat) => {
						const isActive = activeCategory === cat.name
						return (
							<li key={cat.name}>
								<Link
									href={`/help/${topicId}/${cat.firstArticleId}`}
									className={`block text-sm py-2 px-3 rounded-lg transition-all duration-150 ${
										isActive
											? "bg-gray-100 text-black font-medium"
											: "text-gray-600 hover:text-black hover:bg-gray-50"
									}`}
								>
									{cat.name}
								</Link>
							</li>
						)
					})}
				</ul>
			</nav>
		</aside>
	)
}
