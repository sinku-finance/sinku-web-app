"use client"

import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { feesAnimations } from "./animations"

export function PaymentsHeroSection() {
	const t = useTranslations("fees")

	return (
		<motion.section
			className="w-full bg-white text-black"
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, margin: "0px", amount: 0.1 }}
		>
			<div className="min-h-[85vh] flex flex-col justify-center py-16 md:py-24">
				<div className="px-6 md:px-10 lg:px-12">
					<div className="w-full max-w-[1400px] mx-auto">
						<motion.div
							className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 md:gap-8 mb-12 md:mb-16"
							variants={feesAnimations.header.variants}
						>
							{/* Left side tagline */}
							<motion.div
								className="lg:max-w-[140px]"
								variants={feesAnimations.tagline.variants}
							>
								<p className="text-neutral-700 max-w-[200px] leading-relaxed font-semibold text-base md:text-lg">
									{t("tagline")}
								</p>
							</motion.div>

							{/* Right side content */}
							<motion.div
								className="w-full lg:w-[600px] max-w-2xl lg:text-left"
								variants={feesAnimations.titleSection.variants}
							>
								<h1 className="text-3xl md:text-5xl lg:text-6xl mb-4 md:mb-6 font-bold leading-[1.15]">
									{t("heroTitle")}
								</h1>
								<p className="text-sm md:text-base text-neutral-600 mb-5 md:mb-6 leading-relaxed max-w-lg">
									{t("heroSubtitle")}
								</p>
								<Button variant="primary" size="lg">
									<Link href="/download-app">
										{t("heroButton")}
									</Link>
								</Button>
							</motion.div>
						</motion.div>

						{/* Hero image placeholder */}
						<motion.div
							className="relative w-full h-[300px] md:h-[450px] lg:h-[550px] rounded-2xl overflow-hidden bg-gray-100"
							variants={feesAnimations.image.variants}
						>
							{/* Image placeholder - user will add later */}
							<div className="absolute inset-0 flex items-center justify-center">
								<div className="text-gray-300 text-lg">Image placeholder</div>
							</div>
						</motion.div>
					</div>
				</div>
			</div>
		</motion.section>
	)
}
