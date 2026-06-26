"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import { motion } from "framer-motion"

export function FeesBanner() {
	const t = useTranslations("fees")

	return (
		<section className="relative w-full min-h-[85vh] md:min-h-[90vh] lg:min-h-[95vh] overflow-hidden flex items-end md:items-center">
			{/* Mobile background image */}
			<Image
				src="/banners/what-we-offer-mobile.webp"
				alt="Sinku card payment"
				fill
				className="object-cover object-center md:hidden"
				priority
				quality={90}
				sizes="(max-width: 768px) 100vw, 1px"
			/>
			{/* Desktop background image */}
			<Image
				src="/banners/what-we-offer-desktop.webp"
				alt="Sinku card payment"
				fill
				className="object-cover object-top hidden md:block"
				priority
				quality={90}
				sizes="(max-width: 768px) 1px, 100vw"
			/>

			{/* Overlay for better text readability */}
			<div className="absolute inset-0 bg-gradient-to-l from-black/50 via-black/30 to-transparent" />

			{/* Hero Content */}
			<div className="relative z-10 flex-1 flex items-end pb-16 md:pb-0 px-6 md:px-10 lg:px-12">
				<div className="w-full max-w-[1400px] mx-auto flex md:justify-end">
					<div className="max-w-2xl lg:max-w-3xl text-center md:text-right">
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
							className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-xl ml-auto md:mx-0 md:ml-auto"
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
