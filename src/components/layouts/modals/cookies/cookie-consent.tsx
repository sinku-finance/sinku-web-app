"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { CookieSettingsModal, type CookiePreferences } from "./cookie-settings-modal"

// Regions where cookie consent is mandatory (GDPR compliance)
const REGIONS_REQUIRING_CONSENT = [
	"portugal",
	"angola",
	"mozambique",
	"capeVerde",
	"guineaBissau",
	"saoTome",
	// Add other EU/GDPR regions as needed
]

export function CookieConsent() {
	const t = useTranslations("cookies")
	const [isVisible, setIsVisible] = useState(false)
	const [isSettingsOpen, setIsSettingsOpen] = useState(false)
	const [userRegion, setUserRegion] = useState<string | null>(null)

	useEffect(() => {
		// Check if user has already made a cookie choice
		const cookieConsent = localStorage.getItem("cookieConsent")
		if (cookieConsent) {
			setIsVisible(false)
			return
		}

		// Get user's region from localStorage or detect it
		const storedRegion = localStorage.getItem("selectedRegion") || "portugal"
		setUserRegion(storedRegion)

		// Only show consent if in a region that requires it
		if (REGIONS_REQUIRING_CONSENT.includes(storedRegion)) {
			// Small delay to prevent flash on page load
			setTimeout(() => setIsVisible(true), 500)
		}
	}, [])

	const handleAcceptAll = () => {
		localStorage.setItem("cookieConsent", "all")
		setIsVisible(false)
	}

	const handleRejectNonEssential = () => {
		localStorage.setItem("cookieConsent", "essential")
		setIsVisible(false)
	}

	const handleOpenSettings = () => {
		setIsVisible(false) // Close the initial consent modal
		setIsSettingsOpen(true)
	}

	const handleSavePreferences = (preferences: CookiePreferences) => {
		// Save preferences to localStorage
		localStorage.setItem("cookieConsent", JSON.stringify(preferences))
		setIsVisible(false)
		setIsSettingsOpen(false)
	}

	if (!isVisible && !isSettingsOpen) return null

	return (
		<>
			<AnimatePresence>
				{isVisible && (
					<>
						{/* Blur Overlay - Non-clickable, user must make a choice */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.3 }}
							className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 pointer-events-none"
						/>

						{/* Cookie Modal - Bottom Right */}
						<div className="fixed bottom-6 right-6 z-50 max-w-md w-full px-6 md:px-0">
							<motion.div
								initial={{ opacity: 0, scale: 0.95, y: 20 }}
								animate={{ opacity: 1, scale: 1, y: 0 }}
								exit={{ opacity: 0, scale: 0.95, y: 20 }}
								transition={{ duration: 0.3, ease: "easeOut" }}
								className="bg-white rounded-2xl shadow-2xl p-8 md:p-10"
							>
								<h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
									{t("title")}
								</h2>
								<p className="text-sm md:text-base text-gray-700 mb-2 leading-relaxed">
									{t("description")}
								</p>
								<button
									onClick={handleOpenSettings}
									className="text-sm md:text-base text-black underline hover:no-underline mb-6"
								>
									{t("learnMore")}
								</button>

								{/* Buttons */}
								<div className="flex flex-col gap-3">
									<Button
										variant="default"
										size="lg"
										onClick={handleAcceptAll}
										className="w-full"
									>
										{t("acceptAll")}
									</Button>
									<Button
										variant="outline"
										size="lg"
										onClick={handleRejectNonEssential}
										className="w-full"
									>
										{t("rejectNonEssential")}
									</Button>
								</div>
							</motion.div>
						</div>
					</>
				)}
			</AnimatePresence>

			{/* Cookie Settings Modal */}
			<CookieSettingsModal
				isOpen={isSettingsOpen}
				onClose={() => setIsSettingsOpen(false)}
				onSave={handleSavePreferences}
			/>
		</>
	)
}
