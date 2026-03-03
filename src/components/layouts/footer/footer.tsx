"use client"

import { footerConfig } from "@/config/footer"
import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"
import { FooterSection } from "./footer-section"
import { FooterSocialSection } from "./footer-social-section"
import { LogoSvg } from "@/components/ui/animated-logo/logo-svg"

export function Footer() {
	const t = useTranslations("footer")
	const pathname = usePathname()

	const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
		const currentPath = pathname.split("/").slice(2).join("/") || ""
		const targetPath = href.replace(/^\//, "")

		if (currentPath === targetPath || pathname.endsWith(href)) {
			e.preventDefault()
			window.scrollTo({ top: 0, behavior: "smooth" })
		}
	}

	return (
		<footer className="bg-gray-50 text-black overflow-hidden">
			{/* Large PLEXOS Logo */}
			<div className="relative w-full min-h-[22vh] md:min-h-[50vh] flex items-center justify-center py-8 md:py-12 overflow-hidden text-gray-200">
				<LogoSvg className="h-auto w-full px-6 select-none" />
			</div>

		{/* Footer Content */}
		<div className="relative z-10 container mx-auto py-12 md:py-16">
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-6 px-6 md:px-10 lg:px-12">
				<FooterSection
					title={t("sections.getStarted")}
					items={footerConfig.getStarted}
					translationPrefix="links"
					onLinkClick={handleLinkClick}
				/>

				<FooterSection
					title={t("sections.discover")}
					items={footerConfig.discover}
					translationPrefix="links"
					onLinkClick={handleLinkClick}
				/>

				<FooterSection
					title={t("legal")}
					items={footerConfig.legal}
					translationPrefix="legalLinks"
					onLinkClick={handleLinkClick}
				/>

				<FooterSection
					title={t("sections.help")}
					items={footerConfig.help}
					translationPrefix="links"
					onLinkClick={handleLinkClick}
				/>

				<FooterSocialSection title={t("socialMedia")} social={footerConfig.social} />
			</div>
		</div>

		{/* Regulatory Information */}
		<div className="border-t border-gray-200">
			<div className="container mx-auto px-6 md:px-10 lg:px-12 py-10 md:py-12">
				<p className="text-xs text-gray-500 mb-4 font-medium">
					© {footerConfig.company.name} {new Date().getFullYear()}
				</p>
				<div className="space-y-3 text-xs text-gray-400 leading-relaxed">
					<p>{t("regulatory.paragraph1")}</p>
					<p>{t("regulatory.paragraph2")}</p>
					<p>{t("regulatory.paragraph3")}</p>
					<p>{t("regulatory.paragraph4")}</p>
					<p>{t("regulatory.paragraph5")}</p>
				</div>
			</div>
		</div>
		</footer>
	)
}
