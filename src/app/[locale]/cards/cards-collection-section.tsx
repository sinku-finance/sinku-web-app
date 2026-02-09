"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import { motion } from "framer-motion"

export function CardsCollectionSection() {
	const t = useTranslations("cards.collection")

	return (
		<section className="w-full bg-gray-50 text-black py-20 md:py-32 lg:py-40">
			<div className="px-6 md:px-10 lg:px-12">
				<div className="w-full max-w-[1400px] mx-auto">
					{/* Header Section */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="text-center mb-12 md:mb-16"
					>
						<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4 md:mb-6 leading-tight">
							{t("title")}
						</h2>
						<p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
							{t("subtitle")}
						</p>
					</motion.div>

					{/* Cards Grid Image */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="relative w-full"
					>
						{/* Mobile image */}
						<div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden md:hidden">
							<Image
								src="/cards/collection-mobile.png"
								alt="Collection of Plexos cards"
								fill
								className="object-cover object-center"
								priority
							/>
						</div>
						{/* Desktop image */}
						<div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden hidden md:block">
							<Image
								src="/cards/collection-desktop.png"
								alt="Collection of Plexos cards"
								fill
								className="object-cover object-center"
								priority
							/>
						</div>
					</motion.div>

					{/* Bottom copy */}
					<motion.p
						className="text-sm md:text-base text-neutral-600 text-center max-w-2xl mx-auto leading-relaxed mt-10 md:mt-14"
						initial={{ opacity: 0, y: 15 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						{t("bottomText")}
					</motion.p>

					<div className="flex w-full border-b border-gray-200 mt-16" />
				</div>
			</div>
		</section>
	)
}
