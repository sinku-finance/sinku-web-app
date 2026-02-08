"use client"

import Link from "next/link"

interface FooterSocialSectionProps {
	title: string
	social: {
		twitter?: string
		instagram?: string
		linkedin?: string
	}
}

export function FooterSocialSection({ title, social }: FooterSocialSectionProps) {
	return (
		<div>
			<h3 className="text-xs font-semibold text-black uppercase tracking-wider mb-4">{title}</h3>
			<ul className="space-y-2">
				{social.twitter && (
					<li>
						<Link
							href={social.twitter}
							target="_blank"
							rel="noopener noreferrer"
							className="text-sm text-gray-700 hover:text-green-600 transition-colors"
						>
							X/Twitter
						</Link>
					</li>
				)}
				{social.instagram && (
					<li>
						<Link
							href={social.instagram}
							target="_blank"
							rel="noopener noreferrer"
							className="text-sm text-gray-700 hover:text-green-600 transition-colors"
						>
							Instagram
						</Link>
					</li>
				)}
				{social.linkedin && (
					<li>
						<Link
							href={social.linkedin}
							target="_blank"
							rel="noopener noreferrer"
							className="text-sm text-gray-700 hover:text-green-600 transition-colors"
						>
							LinkedIn
						</Link>
					</li>
				)}
			</ul>
		</div>
	)
}
