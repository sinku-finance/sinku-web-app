"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import { Search } from "iconoir-react"
import Link from "next/link"

interface Article {
	id: string
	title: string
}

interface Topic {
	id: string
	title: string
	articles: Article[]
}

interface HelpSearchBarProps {
	placeholder: string
	topics: Topic[]
}

export function HelpSearchBar({ placeholder, topics }: HelpSearchBarProps) {
	const [query, setQuery] = useState("")
	const [isFocused, setIsFocused] = useState(false)
	const containerRef = useRef<HTMLDivElement>(null)

	const results = useMemo(() => {
		if (!query.trim()) return []

		const q = query.toLowerCase()
		const matches: { topic: Topic; article: Article }[] = []

		for (const topic of topics) {
			for (const article of topic.articles) {
				if (article.title.toLowerCase().includes(q)) {
					matches.push({ topic, article })
				}
			}
			if (topic.title.toLowerCase().includes(q)) {
				for (const article of topic.articles) {
					if (
						!matches.find(
							(m) =>
								m.article.id === article.id &&
								m.topic.id === topic.id,
						)
					) {
						matches.push({ topic, article })
					}
				}
			}
		}

		return matches.slice(0, 8)
	}, [query, topics])

	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (
				containerRef.current &&
				!containerRef.current.contains(e.target as Node)
			) {
				setIsFocused(false)
			}
		}
		document.addEventListener("mousedown", handleClickOutside)
		return () =>
			document.removeEventListener("mousedown", handleClickOutside)
	}, [])

	return (
		<div ref={containerRef} className="relative w-full max-w-[560px] mx-auto">
			<div
				className={`flex items-center gap-3 px-5 py-3.5 bg-white border rounded-full transition-all duration-200 ${
					isFocused
						? "border-gray-400 shadow-sm"
						: "border-gray-300"
				}`}
			>
				<input
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					onFocus={() => setIsFocused(true)}
					placeholder={placeholder}
					aria-label={placeholder}
					aria-autocomplete="list"
					aria-expanded={isFocused && results.length > 0}
					className="flex-1 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:outline-none focus-visible:outline-none [&]:focus-visible:!outline-none"
				/>
				<Search className="w-4.5 h-4.5 text-gray-400 flex-shrink-0" />
			</div>

			{/* Search Results Dropdown */}
			{isFocused && results.length > 0 && (
				<div
					role="listbox"
					aria-label="Search results"
					className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden z-50"
				>
					<ul className="py-2">
						{results.map(({ topic, article }) => (
							<li key={`${topic.id}-${article.id}`}>
								<Link
									href={`/help/${topic.id}/${article.id}`}
									onClick={() => {
										setIsFocused(false)
										setQuery("")
									}}
									className="flex flex-col px-5 py-3 hover:bg-gray-50 transition-colors"
								>
									<span className="text-sm text-gray-900">
										{article.title}
									</span>
									<span className="text-xs text-gray-400 mt-0.5">
										{topic.title}
									</span>
								</Link>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	)
}
