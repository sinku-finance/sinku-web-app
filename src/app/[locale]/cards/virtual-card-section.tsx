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
			icon: "$+",
			title: t("benefits.cards.card1.title"),
			description: t("benefits.cards.card1.description"),
			bgColor: "bg-black",
		},
		{
			id: "card2",
			icon: "⚡",
			title: t("benefits.cards.card2.title"),
			description: t("benefits.cards.card2.description"),
			bgColor: "bg-green-700",
		},
		{
			id: "card3",
			icon: "🎛️",
			title: t("benefits.cards.card3.title"),
			description: t("benefits.cards.card3.description"),
			bgColor: "bg-green-900",
		},
	]

	// Handle swipe to change cards
	const handleDragEnd = (_event: any, info: any) => {
		const threshold = 50

		if (info.offset.x > threshold && currentCard > 0) {
			// Swipe right - go to previous card
			setCurrentCard(currentCard - 1)
		} else if (info.offset.x < -threshold && currentCard < cards.length - 1) {
			// Swipe left - go to next card
			setCurrentCard(currentCard + 1)
		}
	}

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
			<div className="py-20 md:py-32 lg:py-40 px-6 md:px-10 lg:px-12 bg-surface-lavender">
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
							<Button
								variant="primary"
								size="lg"
							>
								<Link href="/download-app">
									{t("benefits.cta")}
								</Link>
							</Button>
						</motion.div>

						{/* Right Side - Card Stack */}
						<motion.div
							initial={{ opacity: 0, x: 30 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
							className="relative"
						>
							{/* Cards Container */}
							<div className="relative w-full h-[400px] md:h-[500px] flex justify-center md:justify-end items-center">
								<div className="relative w-[280px] h-[360px] md:w-[450px] md:h-[550px]">
									{cards.map((card, index) => {
										const isActive = index === currentCard
										const offset = isActive ? 0 : (currentCard - index) * 40

										return (
											<motion.div
												key={card.id}
												className={`absolute top-0 ${card.bgColor} rounded-2xl md:rounded-3xl p-6 md:p-8 flex flex-col text-white cursor-pointer shadow-2xl w-[280px] h-[360px] md:w-[450px] md:h-[550px]`}
												animate={{
													right: `${offset}px`,
													scale: isActive ? 1 : 0.95,
													opacity: isActive ? 1 : 0.7,
												}}
												transition={{
													type: "spring",
													stiffness: 300,
													damping: 30
												}}
												style={{
													zIndex: isActive ? 10 : 9 - Math.abs(currentCard - index),
												}}
												onClick={() => setCurrentCard(index)}
												drag="x"
												dragConstraints={{ left: 0, right: 0 }}
												dragElastic={0.2}
												onDragEnd={handleDragEnd}
												whileTap={{ cursor: 'grabbing' }}
											>
												{/* Icon */}
												<div className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-xl bg-white/10 mb-6 md:mb-8">
													<span className="text-3xl md:text-4xl">{card.icon}</span>
												</div>

												{/* Content */}
												<div className="mt-auto">
													<h4 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 leading-tight">
														{card.title}
													</h4>
													<p className="text-base md:text-lg text-white/90 leading-relaxed">
														{card.description}
													</p>
												</div>
											</motion.div>
										)
									})}
								</div>
							</div>

							{/* Dots Indicator */}
							<div className="flex justify-center gap-2 mt-12 md:mt-16">
								{cards.map((_, index) => (
									<button
										key={index}
										onClick={() => setCurrentCard(index)}
										className={`h-2 rounded-full transition-all ${
											index === currentCard
												? "w-8 bg-black"
												: "w-2 bg-gray-300"
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
