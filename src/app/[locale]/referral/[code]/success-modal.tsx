"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Xmark } from "iconoir-react"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"

interface SuccessModalProps {
	isOpen: boolean
	onClose: () => void
}

export function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
	const t = useTranslations("referral.success")

	// Handle escape key and body scroll
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose()
		}
		if (isOpen) {
			document.addEventListener("keydown", handleKeyDown)
			document.body.style.overflow = "hidden"
		}
		return () => {
			document.removeEventListener("keydown", handleKeyDown)
			document.body.style.overflow = ""
		}
	}, [isOpen, onClose])

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* Overlay */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.25 }}
						className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
						onClick={onClose}
					/>

					{/* Modal — always centered */}
					<motion.div
						role="dialog"
						aria-modal="true"
						aria-label={t("title")}
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.95 }}
						transition={{ type: "spring", damping: 28, stiffness: 320 }}
						className={cn(
							"fixed z-50",
							"inset-0 m-auto",
							"w-[calc(100%-2rem)] max-w-[400px] h-fit",
							"bg-white rounded-3xl",
							"shadow-2xl",
							"overflow-hidden"
						)}
					>
						{/* Close Button */}
						<div className="flex justify-end px-5 pt-5">
							<button
								onClick={onClose}
								className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
								aria-label="Close"
							>
								<Xmark className="w-5 h-5 text-black" strokeWidth={2} />
							</button>
						</div>

						{/* Content */}
						<div className="px-8 pb-10 text-center">
							{/* Success checkmark */}
							<motion.div
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								transition={{ type: "spring", damping: 15, stiffness: 300, delay: 0.15 }}
								className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary-50 flex items-center justify-center"
							>
								<motion.svg
									initial={{ pathLength: 0, opacity: 0 }}
									animate={{ pathLength: 1, opacity: 1 }}
									transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
									className="w-10 h-10 text-primary-500"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={2.5}
								>
									<motion.path
										initial={{ pathLength: 0 }}
										animate={{ pathLength: 1 }}
										transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M5 13l4 4L19 7"
									/>
								</motion.svg>
							</motion.div>

							<h2 className="text-2xl sm:text-3xl font-bold text-black mb-3">
								{t("title")}
							</h2>

							<p className="text-base text-neutral-500 max-w-xs mx-auto leading-relaxed">
								{t("message")}
							</p>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	)
}
