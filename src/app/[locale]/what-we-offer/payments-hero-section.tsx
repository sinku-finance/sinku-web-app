"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import Image from "next/image"
import Link from "next/link"
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
							className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
							variants={feesAnimations.header.variants}
						>
							{/* Left side - Text content */}
							<motion.div variants={feesAnimations.titleSection.variants}>
								<p className="text-neutral-500 uppercase tracking-wide font-medium text-sm md:text-base mb-6">
									{t("tagline")}
								</p>
								<h1 className="text-3xl md:text-5xl lg:text-6xl mb-4 md:mb-6 font-bold leading-[1.15]">
									{t("heroTitle")}
								</h1>
								<p className="text-sm md:text-base text-neutral-600 mb-5 md:mb-6 leading-relaxed max-w-lg">
									{t("heroSubtitle")}
								</p>
								<Button variant="primary" size="lg">
									<Link href="/download-app">{t("heroButton")}</Link>
								</Button>
							</motion.div>

							{/* Right side - Image */}
							<motion.div
								className="relative w-full h-[350px] md:h-[450px] lg:h-[550px] rounded-2xl overflow-hidden"
								variants={feesAnimations.image.variants}
							>
								<Image
									src="/cards/gitl-card.webp"
									alt="Person holding Sinku card"
									fill
									className="object-cover object-right"
									sizes="(max-width: 1024px) 100vw, 50vw"
									priority
								/>
							</motion.div>
						</motion.div>
					</div>
				</div>
			</div>
		</motion.section>
	)
}
