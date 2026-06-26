"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CardsBanner() {
	const t = useTranslations("cards")

	return (
		<section
			className="relative w-full min-h-[85vh] md:min-h-[90vh] lg:min-h-[95vh] overflow-hidden flex items-center"
			style={{
				backgroundImage: "url('/banners/cards-banner-mobile.webp')",
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
			}}
		>
			<style jsx>{`
				@media (min-width: 768px) {
					section {
						background-image: url('/banners/cards-banner.webp') !important;
						background-position: 20% center !important;
					}
				}
			`}</style>
			{/* Overlay for better text readability */}
			<div className="absolute inset-0 bg-gradient-to-l from-black/50 via-black/30 to-transparent" />

			{/* Hero Content */}
			<div className="relative z-10 flex-1 hidden md:flex items-center px-6 md:px-10 lg:px-12">
				<div className="w-full max-w-[1400px] mx-auto flex justify-end">
					<div className="max-w-2xl lg:max-w-3xl text-right">
						<motion.h1
							className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 md:mb-8 leading-tight"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.6,
								ease: [0.25, 0.46, 0.45, 0.94],
							}}
						>
							{t("heroTitle")}
						</motion.h1>
						<motion.p
							className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-xl ml-auto md:mx-0 md:ml-auto"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.6,
								delay: 0.15,
								ease: [0.25, 0.46, 0.45, 0.94],
							}}
						>
							{t("heroSubtitle")}
						</motion.p>
						<motion.div
							className="flex justify-center md:justify-end"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.6,
								delay: 0.3,
								ease: [0.25, 0.46, 0.45, 0.94],
							}}
						>
							<Button variant="primary" size="lg">
								<Link href="/download-app">
									{t("heroButton")}
								</Link>
							</Button>
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	)
}
