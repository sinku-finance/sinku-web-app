"use client"

import { useTranslations } from "next-intl"
import Link from "next/link"

interface FooterSectionProps {
	title: string
	items: Array<{ key: string; href: string }>
	translationPrefix: string
	onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void
}

export function FooterSection({ title, items, translationPrefix, onLinkClick }: FooterSectionProps) {
	const t = useTranslations("footer")

	return (
		<div>
			<h3 className="text-xs font-semibold text-black uppercase tracking-wider mb-4">{title}</h3>
			<ul className="space-y-2">
				{items.map(item => (
					<li key={item.key}>
						<Link
							href={item.href}
							className="text-sm text-gray-700 hover:text-green-600 transition-colors"
							onClick={e => onLinkClick(e, item.href)}
						>
							{t(`${translationPrefix}.${item.key}`)}
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}
