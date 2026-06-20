"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Globe, PercentageCircle, CreditCard, HandCard } from "iconoir-react"

export function VirtualCardSection() {
	const t = useTranslations("cards.virtual")
	const [currentCard, setCurrentCard] = useState(0)

	const cards = [
		{
			id: "card1",
			icon: "🔔",
			image: "/services/Notification.png",
			title: t("benefits.cards.card1.title"),
			description: t("benefits.cards.card1.description"),
			bgColor: "bg-white text-black",
		},
		{
			id: "card2",
			icon: "⚡",
			image: "/services/instant-freeze.jpeg",
			title: t("benefits.cards.card2.title"),
			description: t("benefits.cards.card2.description"),
			bgColor: "bg-black",
		},
		{
			id: "card3",
			icon: "🎛️",
			title: t("benefits.cards.card3.title"),
			description: t("benefits.cards.card3.description"),
			bgColor: "bg-blue-600",
		},
	]

	return (
		<section className="w-full bg-white text-black">
			{/* Banner Section */}
			<div className="w-full bg-surface-cyan py-20 md:py-32 lg:py-40">
				<div className="px-6 md:px-10 lg:px-12">
					<div className="w-full max-w-[1400px] mx-auto">
						{/* Content Section */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
							className="mb-12 md:mb-16 max-w-3xl"
						>
							<p className="text-neutral-500 uppercase tracking-wide font-medium text-sm md:text-base mb-4">
								{t("banner.subtitle")}
							</p>
							<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight">
								{t("banner.title")}
							</h2>
						</motion.div>

						{/* Image below content */}
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className="relative w-full h-[300px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden"
						>
							<Image
								src="/banners/cards.webp"
								alt="Virtual Cards"
								fill
								className="object-cover"
							/>
						</motion.div>

						{/* Account Section below image */}
						<motion.div
							className="rounded-2xl p-8 md:p-12 lg:p-16 mt-12 md:mt-16"
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-50px" }}
							transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
						>
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
								{/* Left Side - Text Content */}
								<div>
									<h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-4 md:mb-6 leading-tight">
										{t("banner.accountTitle")}
									</h3>
									<p className="text-sm md:text-base text-neutral-600 leading-relaxed max-w-md">
										{t("banner.accountSubtitle")}
									</p>
								</div>

								{/* Right Side - 2x2 Feature Grid */}
								<div className="grid grid-cols-2 gap-3 md:gap-4">
									{([
										{ icon: Globe, label: t("banner.features.globalPayments") },
										{ icon: PercentageCircle, label: t("banner.features.lowFees") },
										{ icon: HandCard, label: t("banner.features.noCash") },
										{ icon: CreditCard, label: t("banner.features.accepted") },
									] as const).map((feature) => (
										<div
											key={feature.label}
											className="bg-white/60 rounded-2xl p-5 md:p-6 flex flex-col items-center text-center gap-3 md:gap-4 hover:bg-white/80 transition-all duration-300"
										>
											<div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary-100 flex items-center justify-center">
												<feature.icon className="w-6 h-6 md:w-7 md:h-7 text-primary-700" />
											</div>
											<p className="text-sm md:text-base font-medium text-black leading-snug">
												{feature.label}
											</p>
										</div>
									))}
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</div>

			{/* Benefits Section - Split Layout */}
			<div className="min-h-[90vh] flex items-center py-20 md:py-32 lg:py-40 px-6 md:px-10 lg:px-12 bg-surface-lavender">
				<div className="w-full max-w-[1400px] mx-auto">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
						{/* Left Side - Text Content */}
						<motion.div
							initial={{ opacity: 0, x: -30 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
						>
							<h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6 leading-tight">
								{t("benefits.title")}
							</h3>
							<p className="text-base md:text-lg text-gray-700 leading-relaxed mb-8">
								{t("benefits.description")}
							</p>
							<Button variant="primary" size="lg">
								<Link href="/download-app">
									{t("benefits.cta")}
								</Link>
							</Button>
						</motion.div>

						{/* Right Side - 3 Cards with center bigger */}
						<motion.div
							initial={{ opacity: 0, x: 30 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
							className="relative"
						>
							<div className="flex items-end justify-center gap-3 md:gap-4">
								{cards.map((card, index) => {
									const isSelected = index === currentCard

									return (
										<motion.div
											key={card.id}
											className={`${card.bgColor} rounded-2xl p-4 md:p-6 flex flex-col cursor-pointer shadow-xl w-[150px] h-[230px] md:w-[180px] md:h-[280px] ${card.bgColor.includes("white") ? "text-black" : "text-white"}`}
											animate={{
												opacity: isSelected ? 1 : 0.6,
												scale: isSelected ? 1.08 : 1,
												y: isSelected ? -16 : 0,
											}}
											transition={{
												type: "spring",
												stiffness: 300,
												damping: 30,
											}}
											style={{ transformOrigin: "bottom center" }}
											onClick={() => setCurrentCard(index)}
										>
											{/* Icon */}
											<div className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-lg mb-3 md:mb-4 ${card.bgColor.includes("white") ? "bg-black/10" : "bg-white/10"}`}>
												<span className="text-base md:text-lg">{card.icon}</span>
											</div>

											{/* Card Image */}
											{card.image && (
												<div className="flex-1 flex items-center justify-center">
													<div className="relative w-full h-[50px] md:h-[70px] rounded-lg overflow-hidden">
														<Image src={card.image} alt={card.title} fill className="object-contain rounded-lg" />
													</div>
												</div>
											)}

											{/* Content */}
											<div className="mt-auto">
												<h4 className="font-bold text-xs md:text-sm mb-1 md:mb-2 leading-tight">
													{card.title}
												</h4>
												<p className={`text-[10px] md:text-xs leading-relaxed ${card.bgColor.includes("white") ? "text-black/70" : "text-white/90"}`}>
													{card.description}
												</p>
											</div>
										</motion.div>
									)
								})}
							</div>

							{/* Dots Indicator */}
							<div className="flex justify-center gap-2 mt-8 md:mt-10">
								{cards.map((_, index) => (
									<button
										key={index}
										onClick={() => setCurrentCard(index)}
										className={`h-2 rounded-full transition-all ${
											index === currentCard
												? "w-8 bg-black"
												: "w-2 bg-black/20"
										}`}
										aria-label={`Go to card ${index + 1}`}
									/>
								))}
							</div>
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	)
}
