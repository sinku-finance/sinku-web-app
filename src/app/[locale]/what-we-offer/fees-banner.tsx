"use client"

import { motion } from "framer-motion"
import { useTranslations } from "next-intl"

export function FeesBanner() {
	const t = useTranslations("fees")

	return (
		<section
			className="relative w-full min-h-[100vh] overflow-hidden flex items-end md:items-center"
			style={{
				backgroundImage: "url('/banners/what-we-offer-mobile.webp')",
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
			}}
		>
			{/* Desktop background image — served raw (full quality), like the home banner */}
			<style jsx>{`
				@media (min-width: 768px) {
					section {
						background-image: url('/banners/what-we-offer-desktop.webp') !important;
						background-position: center top !important;
					}
				}
			`}</style>

			{/* Overlay for text readability: darken the bottom on mobile, the left on desktop */}
			<div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent md:hidden" />
			<div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent hidden md:block" />

			{/* Hero Content */}
			<div className="relative z-10 flex-1 flex items-end md:items-center pb-16 md:pb-0 px-6 md:px-10 lg:px-12">
				<div className="w-full flex md:justify-start">
					<div className="max-w-md lg:max-w-xl text-center md:text-left">
						<motion.h1
							className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 md:mb-8 leading-tight"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.6,
								ease: [0.25, 0.46, 0.45, 0.94],
							}}
						>
							{t("bannerTitle")}
						</motion.h1>
						<motion.p
							className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-xl mx-auto md:mx-0"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.6,
								delay: 0.15,
								ease: [0.25, 0.46, 0.45, 0.94],
							}}
						>
							{t("bannerSubtitle")}
						</motion.p>
					</div>
				</div>
			</div>
		</section>
	)
}
