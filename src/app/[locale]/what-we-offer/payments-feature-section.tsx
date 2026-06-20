"use client"

import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { feesAnimations } from "./animations"

export function PaymentsFeatureSection() {
	const t = useTranslations("fees.feature")

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
						<motion.div
							className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
							variants={feesAnimations.content.variants}
						>
							{/* Left side - Text Content */}
							<motion.div variants={feesAnimations.titleSection.variants}>
								<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight">
									{t("title")}
								</h2>
								<p className="text-sm md:text-base text-neutral-600 mb-4 md:mb-5 leading-relaxed max-w-lg">
									{t("description")}
								</p>
								<p className="text-xs text-neutral-400 mb-6">
									{t("disclaimer")}
								</p>
								<Button variant="primary" size="lg">
									<Link href="/download-app">
										{t("button")}
									</Link>
								</Button>
							</motion.div>

							{/* Right side - Image placeholder with notification card overlay */}
							<motion.div
								className="relative"
								variants={feesAnimations.image.variants}
							>
								<div className="relative w-full h-[400px] md:h-[450px] lg:h-[520px] rounded-2xl overflow-hidden bg-gray-100">
									<Image
										src="/home/sending.webp"
										alt="Sending money with Sinku"
										fill
										className="object-cover object-center"
										sizes="(max-width: 1024px) 100vw, 50vw"
									/>
								</div>
							</motion.div>
						</motion.div>

						{/* Feature Pills */}
						<motion.div
							className="flex flex-wrap gap-3 mt-10 md:mt-14 justify-center lg:justify-start"
							initial={{ opacity: 0, y: 15 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: 0.2 }}
						>
							{(["payFriends", "splitPayments", "sendAbroad"] as const).map(
								(pill) => (
									<span
										key={pill}
										className="px-5 py-2.5 rounded-full bg-black text-white text-sm font-medium"
									>
										{t(`pills.${pill}`)}
									</span>
								),
							)}
						</motion.div>
					</div>
				</div>
			</div>
		</motion.section>
	)
}
