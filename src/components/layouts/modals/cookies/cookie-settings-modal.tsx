"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Xmark } from "iconoir-react"

interface CookieSettingsModalProps {
	isOpen: boolean
	onClose: () => void
	onSave: (preferences: CookiePreferences) => void
}

export interface CookiePreferences {
	essential: boolean
	preferences: boolean
	analytics: boolean
	advertising: boolean
}

export function CookieSettingsModal({ isOpen, onClose, onSave }: CookieSettingsModalProps) {
	const t = useTranslations("cookieSettings")
	const [preferences, setPreferences] = useState<CookiePreferences>({
		essential: true, // Always active
		preferences: false,
		analytics: false,
		advertising: false,
	})

	const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())

	const toggleSection = (section: string) => {
		const newExpanded = new Set(expandedSections)
		if (newExpanded.has(section)) {
			newExpanded.delete(section)
		} else {
			newExpanded.add(section)
		}
		setExpandedSections(newExpanded)
	}

	const handleToggle = (category: keyof CookiePreferences) => {
		if (category === "essential") return // Essential cookies cannot be disabled
		setPreferences({ ...preferences, [category]: !preferences[category] })
	}

	const handleConfirm = () => {
		onSave(preferences)
		onClose()
	}

	const handleAcceptAll = () => {
		const allAccepted: CookiePreferences = {
			essential: true,
			preferences: true,
			analytics: true,
			advertising: true,
		}
		onSave(allAccepted)
		onClose()
	}

	const handleCloseSettings = () => {
		// Don't allow closing settings without making a choice - user must confirm or accept all
		// onClose() is intentionally not called here
	}

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* Overlay - Non-clickable, user must make a choice */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
						className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 pointer-events-none"
					/>

					{/* Sliding Panel from Right */}
					<motion.div
						initial={{ x: "100%" }}
						animate={{ x: 0 }}
						exit={{ x: "100%" }}
						transition={{ type: "spring", damping: 30, stiffness: 300 }}
						className="fixed right-0 top-0 h-full w-full md:w-[600px] bg-white shadow-2xl z-50 overflow-y-auto"
					>
						{/* Header */}
						<div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
							<button
								onClick={handleCloseSettings}
								className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors opacity-50 cursor-not-allowed"
								aria-label="Close"
								disabled
							>
								<Xmark className="w-6 h-6 text-black" strokeWidth={2} />
							</button>
						</div>

						{/* Content */}
						<div className="p-6">
							<h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
								{t("title")}
							</h2>
							<p className="text-sm md:text-base text-gray-700 mb-4 leading-relaxed">
								{t("description")}
							</p>
							<p className="text-sm md:text-base text-gray-700 mb-4 leading-relaxed">
								{t("findOutMore")}{" "}
								<a
									href="/legal/cookies"
									className="text-black underline hover:no-underline font-medium"
								>
									{t("cookiePolicyLink")}
								</a>{" "}
								{t("learnMoreText")}
							</p>

							{/* Cookie Categories */}
							<div className="space-y-4 mb-8">
								{/* Essential Cookies */}
								<div className="border border-gray-200 rounded-lg">
									<button
										onClick={() => toggleSection("essential")}
										className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
									>
										<div className="flex items-center gap-3">
											<span className="text-xl">{expandedSections.has("essential") ? "−" : "+"}</span>
											<span className="text-base font-medium text-black">{t("categories.essential.title")}</span>
										</div>
										<span className="text-sm text-green-600 font-medium">{t("alwaysActive")}</span>
									</button>
									{expandedSections.has("essential") && (
										<div className="px-4 pb-4 text-sm text-gray-700">
											{t("categories.essential.description")}
										</div>
									)}
								</div>

								{/* Preferences Cookies */}
								<div className="border border-gray-200 rounded-lg">
									<button
										onClick={() => toggleSection("preferences")}
										className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
									>
										<div className="flex items-center gap-3">
											<span className="text-xl">{expandedSections.has("preferences") ? "−" : "+"}</span>
											<span className="text-base font-medium text-black">{t("categories.preferences.title")}</span>
										</div>
										<button
											onClick={(e) => {
												e.stopPropagation()
												handleToggle("preferences")
											}}
											className={`w-12 h-6 rounded-full transition-colors ${
												preferences.preferences ? "bg-black" : "bg-gray-300"
											}`}
										>
											<div
												className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
													preferences.preferences ? "translate-x-6" : "translate-x-1"
												}`}
											/>
										</button>
									</button>
									{expandedSections.has("preferences") && (
										<div className="px-4 pb-4 text-sm text-gray-700">
											{t("categories.preferences.description")}
										</div>
									)}
								</div>

								{/* Analytics Cookies */}
								<div className="border border-gray-200 rounded-lg">
									<button
										onClick={() => toggleSection("analytics")}
										className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
									>
										<div className="flex items-center gap-3">
											<span className="text-xl">{expandedSections.has("analytics") ? "−" : "+"}</span>
											<span className="text-base font-medium text-black">{t("categories.analytics.title")}</span>
										</div>
										<button
											onClick={(e) => {
												e.stopPropagation()
												handleToggle("analytics")
											}}
											className={`w-12 h-6 rounded-full transition-colors ${
												preferences.analytics ? "bg-black" : "bg-gray-300"
											}`}
										>
											<div
												className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
													preferences.analytics ? "translate-x-6" : "translate-x-1"
												}`}
											/>
										</button>
									</button>
									{expandedSections.has("analytics") && (
										<div className="px-4 pb-4 text-sm text-gray-700">
											{t("categories.analytics.description")}
										</div>
									)}
								</div>

								{/* Advertising Cookies */}
								<div className="border border-gray-200 rounded-lg">
									<button
										onClick={() => toggleSection("advertising")}
										className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
									>
										<div className="flex items-center gap-3">
											<span className="text-xl">{expandedSections.has("advertising") ? "−" : "+"}</span>
											<span className="text-base font-medium text-black">{t("categories.advertising.title")}</span>
										</div>
										<button
											onClick={(e) => {
												e.stopPropagation()
												handleToggle("advertising")
											}}
											className={`w-12 h-6 rounded-full transition-colors ${
												preferences.advertising ? "bg-black" : "bg-gray-300"
											}`}
										>
											<div
												className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
													preferences.advertising ? "translate-x-6" : "translate-x-1"
												}`}
											/>
										</button>
									</button>
									{expandedSections.has("advertising") && (
										<div className="px-4 pb-4 text-sm text-gray-700">
											{t("categories.advertising.description")}
										</div>
									)}
								</div>
							</div>
						</div>

						{/* Footer Buttons - Sticky at Bottom */}
						<div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex flex-col sm:flex-row gap-3">
							<Button
								variant="default"
								size="lg"
								onClick={handleConfirm}
								className="w-full sm:flex-1"
							>
								{t("confirmChoices")}
							</Button>
							<Button
								variant="outline"
								size="lg"
								onClick={handleAcceptAll}
								className="w-full sm:w-auto"
							>
								{t("acceptAll")}
							</Button>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	)
}
