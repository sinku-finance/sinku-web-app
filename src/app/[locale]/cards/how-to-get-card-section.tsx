"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export function HowToGetCardSection() {
	const t = useTranslations("cards.howToGet")
	const [activeStep, setActiveStep] = useState(1)

	const steps = [
		{
			number: t("steps.step1.number"),
			title: t("steps.step1.title"),
			description: t("steps.step1.description"),
		},
		{
			number: t("steps.step2.number"),
			title: t("steps.step2.title"),
			description: t("steps.step2.description"),
		},
		{
			number: t("steps.step3.number"),
			title: t("steps.step3.title"),
			description: t("steps.step3.description"),
		},
	]

	return (
		<section className="w-full bg-gray-50 text-black py-20 md:py-32 lg:py-40">
			<div className="px-6 md:px-10 lg:px-12">
				<div className="w-full max-w-[1400px] mx-auto">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
						{/* Left Side - Content */}
						<motion.div
							initial={{ opacity: 0, x: -30 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
						>
							{/* Title and Subtitle */}
							<div className="mb-8 md:mb-12">
								<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4 md:mb-6 leading-tight">
									{t("title")}
								</h2>
								<p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-xl">
									{t("subtitle")}
								</p>
							</div>

							{/* Divider */}
							<div className="w-full h-px bg-gray-300 mb-8 md:mb-10" />

							{/* Steps */}
							<div className="space-y-0 mb-8 md:mb-10">
								{steps.map((step, index) => {
									const isActive = activeStep === index + 1
									
									return (
										<div
											key={step.number}
											role="button"
											tabIndex={0}
											className="relative cursor-pointer transition-all duration-500 ease-in-out"
											onClick={() => setActiveStep(index + 1)}
											onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActiveStep(index + 1) } }}
											onMouseEnter={() => setActiveStep(index + 1)}
										>
											<div className="flex gap-6">
												{/* Number and Line */}
												<div className="flex flex-col items-start pt-1">
													<div
														className={`text-base font-medium transition-colors duration-300 ${
															isActive
																? "text-black"
																: "text-gray-400"
														}`}
													>
														{step.number}
													</div>
													{index < steps.length - 1 && (
														<div
															className="w-px ml-2.5 bg-gray-300 transition-all duration-500 ease-in-out"
															style={{
																height: isActive ? "120px" : "80px",
																backgroundColor: isActive ? "#000000" : "#d1d5db"
															}}
														/>
													)}
												</div>

												{/* Content */}
												<div className="flex-1 pb-6 min-h-[120px]">
													<h3 
														className={`transition-all duration-500 ease-in-out leading-tight ${
															isActive 
																? "text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-3" 
																: "text-xl md:text-2xl font-medium text-gray-400"
														}`}
													>
														{step.title}
													</h3>
													<p
														className={`text-sm md:text-base text-gray-800 leading-relaxed max-w-md transition-all duration-500 ease-in-out ${
															isActive 
																? "opacity-100 max-h-40" 
																: "opacity-0 max-h-0 overflow-hidden"
														}`}
													>
														{step.description}
													</p>
												</div>
											</div>
										</div>
									)
								})}
							</div>

							{/* CTA Button */}
							<Button
								variant="primary"
								size="lg"
							>
								<Link href="/download-app">
									{t("cta")}
								</Link>
							</Button>
						</motion.div>

						{/* Right Side - Card Image (visible on mobile) */}
						<motion.div
							initial={{ opacity: 0, x: 30 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
							className="relative"
						>
							<div className="relative w-full max-w-md mx-auto lg:max-w-none aspect-square bg-neutral-900 rounded-2xl overflow-hidden">
								<div className="absolute inset-x-0 bottom-0 flex items-end justify-center lg:px-12">
									<div className="relative w-full aspect-square">
										<Image
											src="/cards/card-in-hands.webp"
											alt="Sinku Card"
											fill
											sizes="(max-width: 768px) 100vw, 50vw"
											className="object-contain object-bottom"
										/>
									</div>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	)
}
