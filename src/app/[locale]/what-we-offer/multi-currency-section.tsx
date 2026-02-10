"use client"

import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { feesAnimations } from "./animations"

export function MultiCurrencySection() {
	const t = useTranslations("fees.multiCurrency")

	return (
		<motion.section
			className="w-full bg-surface-cyan text-black"
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, margin: "-50px", amount: 0.1 }}
		>
			<div className="min-h-[70vh] flex flex-col justify-center py-16 md:py-24 lg:py-32">
				<div className="px-6 md:px-10 lg:px-12">
					<div className="w-full max-w-[1400px] mx-auto">
						<motion.div
							className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-8 md:gap-12"
							variants={feesAnimations.content.variants}
						>
							{/* Left side - small tagline */}
							<motion.div
								className="lg:max-w-[200px]"
								variants={feesAnimations.tagline.variants}
							>
								<p className="text-neutral-500 uppercase tracking-wide font-medium text-sm md:text-base">
									{t("tagline")}
								</p>
							</motion.div>

							{/* Right side - main content */}
							<motion.div
								className="flex-1 max-w-3xl"
								variants={feesAnimations.titleSection.variants}
							>
								<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight">
									{t("title")}
								</h2>
								<p className="text-sm md:text-base text-neutral-700 mb-5 md:mb-6 leading-relaxed max-w-xl">
									{t("description")}
								</p>
								<Button variant="primary" size="lg">
									<Link href="/download-app">
										{t("button")}
									</Link>
								</Button>
							</motion.div>
						</motion.div>

						{/* Card Product Image */}
						<motion.div
							className="relative w-full h-[350px] md:h-[500px] lg:h-[700px] rounded-2xl overflow-hidden mt-12 md:mt-16"
							variants={feesAnimations.image.variants}
						>
							<Image
								src="/cards/card-product-2.webp"
								alt="Plexos cards"
								fill
								className="object-cover rounded-2xl"
								style={{ objectPosition: "center 60%" }}
							/>
						</motion.div>
					</div>
				</div>
			</div>
		</motion.section>
	)
}
