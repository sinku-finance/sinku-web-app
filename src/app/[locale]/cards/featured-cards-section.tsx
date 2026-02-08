"use client"

import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import { CheckCircle } from "iconoir-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

export function FeaturedCardsSection() {
	const t = useTranslations("cards.featured")

	const cards = [
		{
			id: "standard",
			bgColor: "bg-surface-green",
			image: "/cards/card-green.png",
			name: t("standardCard.name"),
			badge: t("standardCard.badge"),
			features: [
				t("standardCard.features.feature1"),
				t("standardCard.features.feature2"),
				t("standardCard.features.feature3"),
			],
		},
		{
			id: "plus",
			bgColor: "bg-surface-purple",
			image: "/cards/card-purple.png",
			name: t("plusCard.name"),
			badge: t("plusCard.badge"),
			features: [
				t("plusCard.features.feature1"),
				t("plusCard.features.feature2"),
				t("plusCard.features.feature3"),
			],
		},
		{
			id: "premium",
			bgColor: "bg-surface-blue",
			image: "/cards/card-blue.png",
			name: t("premiumCard.name"),
			badge: t("premiumCard.badge"),
			features: [
				t("premiumCard.features.feature1"),
				t("premiumCard.features.feature2"),
				t("premiumCard.features.feature3"),
			],
		},
	]

	return (
		<motion.section
			className="w-full bg-white text-black"
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, margin: "0px", amount: 0.1 }}
		>
			<div className="min-h-screen flex flex-col justify-center py-16 md:py-24">
				<div className="px-6 md:px-10 lg:px-12">
					<div className="w-full max-w-[1400px] mx-auto">
						{/* Header Section */}
						<motion.div
							className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 md:gap-8 mb-12 md:mb-24"
							variants={{
								hidden: { opacity: 0 },
								visible: {
									opacity: 1,
									transition: { staggerChildren: 0.1 },
								},
							}}
						>
							{/* Left side tagline */}
							<motion.div
								className="lg:max-w-[200px]"
								variants={{
									hidden: { opacity: 0, x: -20 },
									visible: {
										opacity: 1,
										x: 0,
										transition: {
											duration: 0.5,
											ease: [0.25, 0.46, 0.45, 0.94],
										},
									},
								}}
							>
								<p className="text-neutral-700 max-w-[200px] leading-relaxed font-semibold text-base md:text-lg">
									{t("tagline")}
								</p>
							</motion.div>

							{/* Right side content */}
							<motion.div
								className="w-full lg:w-[600px] max-w-2xl lg:text-left"
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
								<h2 className="text-3xl md:text-5xl mb-4 md:mb-6 font-bold leading-[1.15]">
									{t("title")}
								</h2>
								<p className="text-sm md:text-base text-neutral-600 leading-relaxed">
									{t("subtitle")}
								</p>
							</motion.div>
						</motion.div>

						{/* Cards Grid */}
						<motion.div
							className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8"
							variants={{
								hidden: { opacity: 0 },
								visible: {
									opacity: 1,
									transition: {
										staggerChildren: 0.15,
										delayChildren: 0.1,
									},
								},
							}}
						>
							{cards.map((card) => (
								<motion.div
									key={card.id}
									className={`rounded-2xl overflow-hidden p-6 md:p-8 flex flex-col ${card.bgColor}`}
									variants={{
										hidden: { opacity: 0, y: 30, scale: 0.98 },
										visible: {
											opacity: 1,
											y: 0,
											scale: 1,
											transition: {
												duration: 0.5,
												ease: [0.25, 0.46, 0.45, 0.94],
											},
										},
									}}
								>
									{/* Badge */}
									<div className="mb-4">
										<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-black/10 text-black">
											{card.badge}
										</span>
									</div>

									{/* Card Image */}
									<div className="relative w-full aspect-[1.586/1] mb-6">
										<div className="absolute inset-0 flex items-center justify-center">
											<div className="relative w-full h-full max-w-[280px]">
												<Image
													src={card.image}
													alt={card.name}
													fill
													className="object-contain"
												/>
											</div>
										</div>
									</div>

									{/* Card Info */}
									<div className="flex-1 flex flex-col">
										<h3 className="text-xl md:text-2xl font-bold text-black mb-4">
											{card.name}
										</h3>
										<div className="space-y-2.5 mb-6 flex-1">
											{card.features.map((feature) => (
												<div
													key={feature}
													className="flex items-start gap-2.5 text-sm text-gray-700"
												>
													<CheckCircle
														className="w-5 h-5 flex-shrink-0 mt-0.5"
														strokeWidth={1.8}
													/>
													<span>{feature}</span>
												</div>
											))}
										</div>

										<Button variant="primary" className="w-full">
											<Link href="/download-app">
												{t("cta")}
											</Link>
										</Button>

										<p className="text-xs text-gray-500 text-center mt-2">
											{t("pricing")}
										</p>
									</div>
								</motion.div>
							))}
						</motion.div>
					</div>
				</div>
			</div>
		</motion.section>
	)
}
