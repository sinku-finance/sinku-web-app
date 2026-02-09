"use client"

import { useTranslations } from "next-intl"
import { Group, Link as LinkIcon, Globe } from "iconoir-react"
import { motion } from "framer-motion"
import { feesAnimations } from "./animations"

const methodCards = [
	{ key: "contacts", icon: Group },
	{ key: "links", icon: LinkIcon },
	{ key: "global", icon: Globe },
] as const

export function PaymentMethodsSection() {
	const t = useTranslations("fees.methods")

	return (
		<motion.section
			className="w-full bg-gray-50 text-black py-16 md:py-24 lg:py-32"
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, margin: "-50px", amount: 0.1 }}
		>
			<div className="px-6 md:px-10 lg:px-12">
				<div className="w-full max-w-[1400px] mx-auto">
					{/* Section Title */}
					<motion.h2
						className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-10 md:mb-16 leading-tight max-w-3xl mx-auto"
						variants={feesAnimations.fadeUp.variants}
					>
						{t("title")}
					</motion.h2>

					{/* Cards Grid */}
					<motion.div
						className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5"
						variants={feesAnimations.cardsContainer.variants}
					>
						{methodCards.map(({ key, icon: Icon }) => (
							<motion.div
								key={key}
								className="group bg-white rounded-2xl p-6 md:p-8 border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-sm"
								variants={feesAnimations.card.variants}
							>
								<div className="mb-4 w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
									<Icon className="w-5 h-5 text-primary-700" strokeWidth={1.8} />
								</div>
								<h3 className="text-lg md:text-xl font-bold text-black mb-2 leading-snug">
									{t(`cards.${key}.title`)}
								</h3>
								<p className="text-sm md:text-base text-gray-500 leading-relaxed">
									{t(`cards.${key}.description`)}
								</p>
							</motion.div>
						))}
					</motion.div>
				</div>
			</div>
		</motion.section>
	)
}
