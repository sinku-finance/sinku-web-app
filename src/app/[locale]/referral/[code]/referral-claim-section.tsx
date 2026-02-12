"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"
import { phoneCountries, getFlagPath, type PhoneCountry } from "@/data/phone-countries"
import { CountryCodeDropdown } from "./country-code-modal"
import { SuccessModal } from "./success-modal"

interface ReferralClaimSectionProps {
	referralCode: string
}

export function ReferralClaimSection({ referralCode }: ReferralClaimSectionProps) {
	const t = useTranslations("referral")
	const [selectedCountry, setSelectedCountry] = useState<PhoneCountry>(phoneCountries[0])
	const [phoneNumber, setPhoneNumber] = useState("")
	const [isCountryModalOpen, setIsCountryModalOpen] = useState(false)
	const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const displayName = referralCode.replace(/_/g, " ")

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/[^0-9]/g, "")
		setPhoneNumber(value)
		if (error) setError(null)
	}

	const handleSubmit = useCallback(async () => {
		if (!phoneNumber.trim()) {
			setError(t("errors.phoneRequired"))
			return
		}

		if (phoneNumber.length < 6) {
			setError(t("errors.phoneInvalid"))
			return
		}

		setIsLoading(true)
		setError(null)

		try {
			const response = await fetch("http://localhost:8082/api/v1/referrals/claim", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					referralCode,
					phoneCountryCode: selectedCountry.dialCode,
					phoneNumber: phoneNumber.trim(),
				}),
			})

			const data = await response.json()

			if (data.success) {
				setIsSuccessModalOpen(true)
			} else {
				setError(data.message || t("errors.genericError"))
			}
		} catch {
			setError(t("errors.connectionError"))
		} finally {
			setIsLoading(false)
		}
	}, [phoneNumber, referralCode, selectedCountry.dialCode, t])

	const isSubmitDisabled = !phoneNumber.trim() || phoneNumber.length < 6 || isLoading

	return (
		<>
			<section className="min-h-[calc(100vh-65px)] flex flex-col items-center justify-center px-6 py-20">
				{/* Content */}
				<motion.div
					className="w-full text-center"
					initial="hidden"
					animate="visible"
					variants={{
						hidden: { opacity: 0 },
						visible: {
							opacity: 1,
							transition: { staggerChildren: 0.1, delayChildren: 0.15 },
						},
					}}
				>
					{/* Title */}
					<motion.h1
						className="text-4xl sm:text-5xl md:text-6xl font-bold text-black leading-tight mb-4 sm:whitespace-nowrap"
						variants={{
							hidden: { opacity: 0, y: 20 },
							visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
						}}
					>
						{t("title")}
					</motion.h1>

					{/* Subtitle */}
					<motion.p
						className="text-base sm:text-lg text-neutral-500 mb-10 max-w-sm mx-auto"
						variants={{
							hidden: { opacity: 0, y: 20 },
							visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
						}}
					>
						<span className="capitalize font-medium text-neutral-700">{displayName}</span>{" "}
						{t("invitedBy")}
						<br />
						{t("subtitle")}
					</motion.p>

					{/* Phone Input Group */}
					<motion.div
						className="flex items-center justify-center gap-2 mb-4 max-w-md mx-auto"
						variants={{
							hidden: { opacity: 0, y: 20 },
							visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
						}}
					>
						{/* Country Code Selector */}
						<div className="relative shrink-0">
							<button
								type="button"
								onClick={() => setIsCountryModalOpen(!isCountryModalOpen)}
								className={cn(
									"flex items-center gap-2",
									"h-[52px] px-4",
									"bg-gray-50 hover:bg-gray-100",
									"border border-gray-200 rounded-xl",
									"transition-colors duration-200",
									"focus:outline-none focus:ring-2 focus:ring-primary-500",
								)}
								aria-label={t("selectCountry")}
								aria-haspopup="menu"
								aria-expanded={isCountryModalOpen}
							>
								<Image
									src={getFlagPath(selectedCountry.flag)}
									alt={selectedCountry.name}
									width={24}
									height={24}
									className="w-6 h-6 rounded-sm object-cover"
								/>
								<span className="text-sm font-medium text-black">{selectedCountry.dialCode}</span>
							</button>

							<CountryCodeDropdown
								isOpen={isCountryModalOpen}
								onClose={() => setIsCountryModalOpen(false)}
								onSelect={(country) => {
									setSelectedCountry(country)
									setIsCountryModalOpen(false)
								}}
								selectedCountry={selectedCountry}
							/>
						</div>

						{/* Phone Number Input */}
						<div className="relative flex-1">
							<input
								type="tel"
								inputMode="numeric"
								placeholder={t("phonePlaceholder")}
								value={phoneNumber}
								onChange={handlePhoneChange}
								onKeyDown={(e) => {
									if (e.key === "Enter" && !isSubmitDisabled) {
										handleSubmit()
									}
								}}
								className={cn(
									"w-full h-[52px] px-4",
									"bg-gray-50",
									"border rounded-xl",
									"text-sm text-black placeholder:text-gray-400",
									"transition-colors duration-200",
									"focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
									error
										? "border-red-300 focus:ring-red-500"
										: "border-gray-200"
								)}
							/>
						</div>

						{/* Submit Arrow Button */}
						<motion.button
							type="button"
							onClick={handleSubmit}
							disabled={isSubmitDisabled}
							className={cn(
								"w-[52px] h-[52px] shrink-0",
								"rounded-full flex items-center justify-center",
								"transition-all duration-200",
								"focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
								isSubmitDisabled
									? "bg-gray-200 cursor-not-allowed"
									: "bg-primary-500 hover:bg-primary-600 cursor-pointer"
							)}
							whileHover={!isSubmitDisabled ? { scale: 0.96 } : undefined}
							whileTap={!isSubmitDisabled ? { scale: 0.92 } : undefined}
							aria-label={t("continue")}
						>
							{isLoading ? (
								<svg
									className="w-5 h-5 text-white animate-spin"
									fill="none"
									viewBox="0 0 24 24"
								>
									<circle
										className="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										strokeWidth="4"
									/>
									<path
										className="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									/>
								</svg>
							) : (
								<svg
									className={cn(
										"w-5 h-5",
										isSubmitDisabled ? "text-gray-400" : "text-white"
									)}
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={2.5}
								>
									<path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
								</svg>
							)}
						</motion.button>
					</motion.div>

					{/* Error Message */}
					{error && (
						<motion.p
							initial={{ opacity: 0, y: -5 }}
							animate={{ opacity: 1, y: 0 }}
							className="text-sm text-red-500 mb-4"
						>
							{error}
						</motion.p>
					)}

					{/* Disclaimer */}
					<motion.p
						className="text-xs text-gray-400 max-w-sm mx-auto leading-relaxed"
						variants={{
							hidden: { opacity: 0 },
							visible: { opacity: 1, transition: { duration: 0.6, delay: 0.3 } },
						}}
					>
						{t("disclaimer")}
					</motion.p>
				</motion.div>
			</section>

			{/* Success Modal */}
			<SuccessModal
				isOpen={isSuccessModalOpen}
				onClose={() => setIsSuccessModalOpen(false)}
			/>
		</>
	)
}
