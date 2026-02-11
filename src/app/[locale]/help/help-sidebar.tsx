"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

interface Topic {
	id: string
	title: string
}

interface HelpSidebarProps {
	topicsLabel: string
	topics: Topic[]
	activeTopicId?: string
}

export function HelpSidebar({
	topicsLabel,
	topics,
	activeTopicId,
}: HelpSidebarProps) {
	const pathname = usePathname()

	return (
		<aside className="w-full lg:w-[220px] flex-shrink-0">
			<h3 className="text-sm font-semibold text-gray-500 mb-4">
				{topicsLabel}
			</h3>
			<nav aria-label="Help topics">
				<ul className="space-y-1">
					{topics.map((topic) => {
						const isActive = activeTopicId === topic.id
						return (
							<li key={topic.id}>
								<Link
									href={`/help/${topic.id}`}
									className={`block text-sm py-2 px-3 rounded-lg transition-all duration-150 ${
										isActive
											? "bg-gray-100 text-black font-medium"
											: "text-gray-600 hover:text-black hover:bg-gray-50"
									}`}
								>
									{topic.title}
								</Link>
							</li>
						)
					})}
				</ul>
			</nav>
		</aside>
	)
}
