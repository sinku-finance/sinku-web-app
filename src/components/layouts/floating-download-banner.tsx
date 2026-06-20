"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Xmark } from "iconoir-react"

export function FloatingDownloadBanner() {
	const t = useTranslations("downloadApp.floatingBanner")
	const [isVisible, setIsVisible] = useState(false)
	const [isDismissed, setIsDismissed] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			if (isDismissed) return
			setIsVisible(window.scrollY > 300)
		}

		window.addEventListener("scroll", handleScroll, { passive: true })
		return () => window.removeEventListener("scroll", handleScroll)
	}, [isDismissed])

	const handleDismiss = () => {
		setIsDismissed(true)
		setIsVisible(false)
	}

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					initial={{ y: 100, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: 100, opacity: 0 }}
					transition={{ type: "spring", stiffness: 300, damping: 30 }}
					className="fixed bottom-6 right-6 z-50 hidden lg:flex items-center gap-5 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 pr-6"
				>
					{/* Close button */}
					<button
						onClick={handleDismiss}
						className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full shadow-md border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
						aria-label="Dismiss"
					>
						<Xmark className="w-3.5 h-3.5 text-gray-500" />
					</button>

					{/* QR Code */}
					<div className="relative w-20 h-20 rounded-xl border border-gray-200 bg-white overflow-hidden flex-shrink-0">
						<Image
							src="/qrcode.svg"
							alt={t("qrAlt")}
							fill
							className="object-contain p-0.5"
						/>
					</div>

					{/* Text */}
					<div className="flex flex-col gap-0.5">
						<p className="text-base font-bold text-black">
							{t("title")}
						</p>
						<p className="text-sm text-neutral-500">
							{t("subtitle")}
						</p>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
