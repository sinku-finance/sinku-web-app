"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"

export function SupportBanner() {
	const t = useTranslations("support")

	return (
		<section
			className="relative w-full min-h-[85vh] md:min-h-[90vh] lg:min-h-[95vh] overflow-hidden flex items-center"
			style={{
				backgroundImage: "url('/banners/support.png')",
				backgroundSize: "cover",
				backgroundPosition: "center center",
				backgroundRepeat: "no-repeat",
			}}
		>
			{/* Overlay for better text readability */}
			<div className="absolute inset-0 bg-black/40" />

			{/* Hero Content */}
			<div className="relative z-10 flex-1 flex items-center px-6 md:px-10 lg:px-12">
				<div className="w-full max-w-[1400px] mx-auto">
					<div className="max-w-2xl lg:max-w-3xl text-center md:text-left">
						<motion.p
							className="text-base md:text-lg text-white/90 mb-4 md:mb-6 font-medium"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.6,
								ease: [0.25, 0.46, 0.45, 0.94],
							}}
						>
							{t("getInTouch")}
						</motion.p>
						<motion.h1
							className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 md:mb-8 leading-tight"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.6,
								delay: 0.1,
								ease: [0.25, 0.46, 0.45, 0.94],
							}}
						>
							{t("heroTitle")}
						</motion.h1>
						<motion.p
							className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-xl mx-auto md:mx-0"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.6,
								delay: 0.2,
								ease: [0.25, 0.46, 0.45, 0.94],
							}}
						>
							{t("heroSubtitle")}
						</motion.p>
					</div>
				</div>
			</div>
		</section>
	)
}
