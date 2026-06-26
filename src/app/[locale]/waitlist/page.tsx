import type { Metadata } from "next"
import { Header } from "@/components/layouts/header/header"
import { WaitlistSection } from "./waitlist-section"
import { pageSeo } from "@/config/seo"

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>
}): Promise<Metadata> {
	const { locale } = await params
	const seo = pageSeo.waitlist[locale] || pageSeo.waitlist.en

	return {
		title: seo.title,
		description: seo.description,
		alternates: {
			canonical: "/waitlist",
			languages: { en: "/en/waitlist", pt: "/pt/waitlist" },
		},
		openGraph: {
			title: seo.ogTitle,
			description: seo.ogDescription,
			images: [{ url: "/cards/card-in-hands.webp", width: 1060, height: 1484, alt: seo.ogTitle }],
		},
	}
}

export default function WaitlistPage() {
	return (
		<>
			<Header />
			<main id="main-content" className="relative bg-white overflow-hidden">
				<WaitlistSection />
			</main>
		</>
	)
}
