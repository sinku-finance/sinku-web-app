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
			className="w-full bg-white text-black"
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, margin: "-50px", amount: 0.1 }}
		>
			<div className="py-16 md:py-24 lg:py-32">
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
							className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8"
							variants={feesAnimations.cardsContainer.variants}
						>
							{methodCards.map(({ key, icon: Icon }) => (
								<motion.div
									key={key}
									className="rounded-2xl bg-gray-50 p-6 md:p-8 flex flex-col"
									variants={feesAnimations.card.variants}
								>
									<div className="mb-5 md:mb-6">
										<Icon
											className="w-7 h-7 md:w-8 md:h-8 text-black"
											strokeWidth={1.8}
										/>
									</div>
									<h3 className="text-xl md:text-2xl font-bold mb-3 leading-snug">
										{t(`cards.${key}.title`)}
									</h3>
									<p className="text-sm md:text-base text-neutral-600 leading-relaxed">
										{t(`cards.${key}.description`)}
									</p>
								</motion.div>
							))}
						</motion.div>
					</div>
				</div>
			</div>
		</motion.section>
	)
}
