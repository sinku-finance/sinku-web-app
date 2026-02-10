"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import { motion } from "framer-motion"
import { AppStoreButton } from "@/components/ui/app-store-button"
import { downloadAppAnimations } from "./animations"

export function DownloadAppSection() {
	const t = useTranslations("downloadApp")

	return (
		<section className="bg-white min-h-[calc(100vh-65px)] flex items-center">
			<div className="px-6 md:px-10 lg:px-12 py-20 md:py-32 lg:py-40 w-full">
				<div className="w-full max-w-[1400px] mx-auto">
					<motion.div
						className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center"
						initial="hidden"
						animate="visible"
						variants={downloadAppAnimations.container.variants}
					>
						{/* Left side - Content + QR + App Store Buttons */}
						<div className="flex flex-col">
							<motion.h1
								className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight"
								variants={downloadAppAnimations.title.variants}
							>
								{t("title")}
							</motion.h1>

							<motion.p
								className="text-lg md:text-xl text-neutral-600 mb-10 md:mb-12 leading-relaxed max-w-xl"
								variants={downloadAppAnimations.subtitle.variants}
							>
								{t("subtitle")}
							</motion.p>

							{/* QR Code Block */}
							<motion.div
								className="flex items-center gap-4 mb-8 md:mb-10"
								variants={downloadAppAnimations.qrCode.variants}
							>
								<div className="relative w-28 h-28 md:w-32 md:h-32 rounded-2xl border border-gray-200 bg-white overflow-hidden flex-shrink-0 shadow-sm">
									<Image
										src="/qrcode.svg"
										alt={t("qrAlt")}
										fill
										className="object-contain p-1"
									/>
								</div>
								<div className="flex flex-col gap-1">
									<p className="text-sm md:text-base font-semibold text-black">
										{t("qrTitle")}
									</p>
									<p className="text-xs md:text-sm text-neutral-500 max-w-[180px]">
										{t("qrDescription")}
									</p>
								</div>
							</motion.div>

							{/* App Store Buttons */}
							<motion.div
								className="flex flex-col sm:flex-row gap-3 md:gap-4"
								variants={downloadAppAnimations.buttons.variants}
							>
								<AppStoreButton
									store="apple"
									href="https://apps.apple.com"
									className="min-w-[160px] sm:min-w-[180px] h-[50px] md:h-[55px] bg-black text-white border-black hover:bg-gray-900"
								/>
								<AppStoreButton
									store="google"
									href="https://play.google.com"
									className="min-w-[160px] sm:min-w-[180px] h-[50px] md:h-[55px] bg-black text-white border-black hover:bg-gray-900"
								/>
							</motion.div>
						</div>

						{/* Right side - App Mockup Placeholder */}
						<motion.div
							className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden"
							variants={downloadAppAnimations.image.variants}
						>
							<div className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl">
								<div className="w-16 h-16 mb-4 rounded-2xl flex items-center justify-center">
									<Image src="/download-app/app-store.svg" alt="Plexos app interface" fill className="object-contain" />
								</div>
								<p className="text-sm font-medium text-gray-400">
									{t("imagePlaceholder")}
								</p>
							</div>
						</motion.div>
					</motion.div>
				</div>
			</div>
		</section>
	)
}
