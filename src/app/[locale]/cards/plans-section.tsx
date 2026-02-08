"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"

export function PlansSection() {
	const t = useTranslations("cards.plans")

	const plans = [
		{ id: "standard", key: "standard" },
		{ id: "plus", key: "plus" },
		{ id: "premium", key: "premium" },
	]

	return (
		<motion.section
			className="w-full bg-white py-16 md:py-24 lg:py-32 text-black"
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, margin: "-50px", amount: 0.1 }}
		>
			<div className="px-6 md:px-10 lg:px-12">
				<div className="w-full max-w-[1400px] mx-auto">
					<motion.h2
						className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16 leading-tight"
						variants={{
							hidden: { opacity: 0, y: 20 },
							visible: {
								opacity: 1,
								y: 0,
								transition: {
									duration: 0.6,
									ease: [0.25, 0.46, 0.45, 0.94],
								},
							},
						}}
					>
						{t("title")}
					</motion.h2>

					<motion.div
						className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5"
						variants={{
							hidden: { opacity: 0 },
							visible: {
								opacity: 1,
								transition: { staggerChildren: 0.1 },
							},
						}}
					>
						{plans.map((plan) => (
							<motion.div
								key={plan.id}
								className="bg-gray-50 rounded-2xl p-6 md:p-8"
								variants={{
									hidden: { opacity: 0, y: 20 },
									visible: {
										opacity: 1,
										y: 0,
										transition: {
											duration: 0.5,
											ease: [0.25, 0.46, 0.45, 0.94],
										},
									},
								}}
							>
								<h3 className="text-lg md:text-xl font-bold text-black mb-2">
									{t(`${plan.key}.name`)}
								</h3>
								<p className="text-sm md:text-base font-semibold text-black mb-3">
									{t(`${plan.key}.fee`)}
								</p>
								<p className="text-sm md:text-base text-gray-600 leading-relaxed">
									{t(`${plan.key}.description`)}
								</p>
							</motion.div>
						))}
					</motion.div>
				</div>
			</div>
		</motion.section>
	)
}
