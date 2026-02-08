"use client"

import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"

export function CardSecuritySection() {
	const t = useTranslations("cards.security")

	const features = [
		{
			id: "freeze",
			title: t("features.freezeCard.title"),
			bgColor: "bg-gray-600",
			image: "/cards/card-freeze.png",
		},
		{
			id: "virtual",
			title: t("features.virtualCard.title"),
			bgColor: "bg-black",
			image: "/cards/card-virtual.png",
		},
		{
			id: "controls",
			title: t("features.controls.title"),
			bgColor: "bg-black",
			image: "/cards/card-controls.png",
		},
	]

	return (
		<section className="w-full bg-white text-black py-16 md:py-24">
			<div className="px-6 md:px-10 lg:px-12">
				<div className="w-full max-w-[1400px] mx-auto">
					{/* Header Section */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="text-center mb-8 md:mb-12"
					>
						<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4 md:mb-6 leading-tight">
							{t("title")}
						</h2>
						<p className="text-sm md:text-base text-gray-700 max-w-3xl mx-auto leading-relaxed mb-6 md:mb-8">
							{t("subtitle")}
						</p>
						<Button
							variant="default"
							size="lg"
							className="bg-black hover:bg-gray-800 text-white px-8"
						>
							{t("learnMore")}
						</Button>
					</motion.div>

					{/* Features Grid */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-12 md:mt-16">
						{features.map((feature, index) => (
							<motion.div
								key={feature.id}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								className={`${feature.bgColor} rounded-lg overflow-hidden p-6 md:p-8 flex flex-col min-h-[450px] md:min-h-[500px]`}
							>
								{/* Text Content */}
								<div className="mb-8">
									<p className="text-white text-base md:text-lg font-medium leading-snug">
										{feature.title}
									</p>
								</div>

								{/* Phone Mockup */}
								<div className="flex-1 flex items-end justify-center">
									<div className="relative w-full max-w-[200px] aspect-[9/19]">
										<div className="absolute inset-0 bg-gray-900 rounded-[2.5rem] border-[3px] border-gray-700 shadow-2xl overflow-hidden">
											{/* Notch */}
											<div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-3xl z-10" />
											
											{/* Screen Content */}
											<div className="absolute inset-[3px] bg-white rounded-[2.2rem] overflow-hidden">
												{feature.image ? (
													<Image
														src={feature.image}
														alt={feature.title}
														fill
														className="object-cover"
													/>
												) : (
													<div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
														<div className="text-center p-4">
															<div className="w-16 h-16 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center">
																<svg
																	className="w-8 h-8 text-white"
																	fill="none"
																	stroke="currentColor"
																	viewBox="0 0 24 24"
																>
																	<path
																		strokeLinecap="round"
																		strokeLinejoin="round"
																		strokeWidth={2}
																		d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
																	/>
																</svg>
															</div>
															<p className="text-xs text-gray-600 font-medium">
																Secure Card
															</p>
														</div>
													</div>
												)}
											</div>
										</div>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}
