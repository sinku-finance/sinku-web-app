"use client"

import { type PhoneCountry, getFlagPath, phoneCountries } from "@/data/phone-countries"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { Check, CreditCard, SendDollars } from "iconoir-react"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"
import { WaitlistCountryDropdown } from "./country-dropdown"

const stagger = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.08, delayChildren: 0.1 },
	},
}

const fadeUp = {
	hidden: { opacity: 0, y: 24 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
	},
}

const scaleIn = {
	hidden: { opacity: 0, scale: 0.9 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
	},
}

const featureIcons = {
	transfers: SendDollars,
	card: CreditCard,
} as const

export function WaitlistSection() {
	const t = useTranslations("waitlist")
	const [selectedCountry, setSelectedCountry] = useState<PhoneCountry>(phoneCountries[0])
	const [phoneNumber, setPhoneNumber] = useState("")
	const [email, setEmail] = useState("")
	const [isCountryOpen, setIsCountryOpen] = useState(false)
	const [isSubmitted, setIsSubmitted] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [errors, setErrors] = useState<{ email?: string; phone?: string }>({})
	const sectionRef = useRef<HTMLElement>(null)

	useEffect(() => {
		if (isSubmitted) {
			window.scrollTo({ top: 0, behavior: "smooth" })
		}
	}, [isSubmitted])

	const validateEmail = (value: string) => {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
	}

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/[^0-9]/g, "")
		setPhoneNumber(value)
		if (errors.phone) setErrors(prev => ({ ...prev, phone: undefined }))
	}

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value)
		if (errors.email) setErrors(prev => ({ ...prev, email: undefined }))
	}

	const handleSubmit = useCallback(async () => {
		const newErrors: { email?: string; phone?: string } = {}

		if (!email.trim()) {
			newErrors.email = t("errors.emailRequired")
		} else if (!validateEmail(email)) {
			newErrors.email = t("errors.emailInvalid")
		}

		if (!phoneNumber.trim()) {
			newErrors.phone = t("errors.phoneRequired")
		} else if (phoneNumber.length < 4) {
			newErrors.phone = t("errors.phoneInvalid")
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors)
			return
		}

		setIsLoading(true)
		setErrors({})

		try {
			const response = await fetch("/api/waitlist/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: email.trim(),
					countryCode: selectedCountry.dialCode,
					phoneNumber: phoneNumber.trim(),
				}),
			})

			const data = await response.json()

			if (data.success) {
				setIsSubmitted(true)
			} else if (data.fieldErrors) {
				const fieldErrors: { email?: string; phone?: string } = {}
				if (data.fieldErrors.email) fieldErrors.email = data.fieldErrors.email
				if (data.fieldErrors.phoneNumber) fieldErrors.phone = data.fieldErrors.phoneNumber
				if (data.fieldErrors.countryCode) fieldErrors.phone = data.fieldErrors.countryCode
				setErrors(fieldErrors)
			} else {
				setErrors({ email: t("errors.genericError") })
			}
		} catch {
			setErrors({ email: t("errors.genericError") })
		} finally {
			setIsLoading(false)
		}
	}, [email, phoneNumber, selectedCountry.dialCode, t])

	const isSubmitDisabled = isLoading

	return (
		<section
			ref={sectionRef}
			className="min-h-screen flex flex-col items-center justify-center px-6 py-32 md:py-40 relative overflow-hidden"
		>
			{/* Subtle background texture */}
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary-50/40 rounded-full blur-[120px]" />
				<div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-surface-blue/30 rounded-full blur-[100px]" />
			</div>

			<div className="relative z-10 w-full max-w-lg md:max-w-2xl mx-auto">
				<AnimatePresence mode="wait">
					{isSubmitted ? (
						/* Success State */
						<motion.div
							key="success"
							initial="hidden"
							animate="visible"
							variants={stagger}
							className="text-center min-h-screen flex flex-col items-center justify-center"
						>
							{/* Checkmark */}
							<motion.div
								variants={scaleIn}
								className="mx-auto mb-8 w-20 h-20 rounded-full bg-primary-50 flex items-center justify-center"
							>
								<motion.div
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{
										delay: 0.3,
										type: "spring",
										stiffness: 200,
										damping: 12,
									}}
								>
									<Check className="w-10 h-10 text-primary-600" strokeWidth={2.5} />
								</motion.div>
							</motion.div>

							{/* Title */}
							<motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-black mb-4">
								{t("success.title")}
							</motion.h2>

							{/* Message */}
							<motion.p variants={fadeUp} className="text-base text-neutral-500 leading-relaxed mb-10 max-w-sm mx-auto">
								{t("success.message")}
							</motion.p>

							{/* Share section */}
							<motion.div variants={fadeUp}>
								<p className="text-sm font-semibold text-black mb-2">{t("success.shareTitle")}</p>
								<p className="text-sm text-neutral-500 mb-5">{t("success.shareMessage")}</p>
								<div className="flex justify-center gap-3">
									<a
										href="https://www.instagram.com/sinku.finance/"
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white text-sm font-medium hover:opacity-90 transition-opacity"
									>
										<svg aria-hidden="true" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
											<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
										</svg>
										Instagram
									</a>
									<a
										href={`https://wa.me/?text=${encodeURIComponent("Check out Sinku — a new money app with low-fee transfers and international cards: https://sinku.finance/waitlist")}`}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] text-white text-sm font-medium hover:bg-[#20BD5A] transition-colors"
									>
										<svg aria-hidden="true" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
											<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
										</svg>
										WhatsApp
									</a>
								</div>
							</motion.div>
						</motion.div>
					) : (
						<motion.div
							key="form"
							initial="hidden"
							animate="visible"
							exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
							variants={stagger}
							className="text-center"
						>
							{/* Tagline */}
							<motion.div variants={fadeUp} className="mb-6">
								<span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-700 text-xs font-semibold uppercase tracking-wider">
									<span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
									{t("tagline")}
								</span>
							</motion.div>

							{/* Title */}
							<motion.h1
								variants={fadeUp}
								className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-[1.1] mb-6"
							>
								{t("title")}
							</motion.h1>

							{/* Subtitle */}
							<motion.p
								variants={fadeUp}
								className="text-base md:text-lg text-neutral-500 leading-relaxed mb-10 max-w-xl mx-auto"
							>
								{t("subtitle")}
							</motion.p>

							{/* Feature pills */}
							<motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-2.5 mb-10">
								{(["transfers", "card"] as const).map(key => {
									const Icon = featureIcons[key]
									return (
										<span
											key={key}
											className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-100 text-sm text-neutral-600 font-medium"
										>
											<Icon className="w-4 h-4 text-primary-600" strokeWidth={1.8} />
											{t(`features.${key}`)}
										</span>
									)
								})}
							</motion.div>

							{/* Form */}
							<motion.div variants={fadeUp} className="space-y-3 mb-4 max-w-md mx-auto">
								{/* Email */}
								<div>
									<input
										type="email"
										inputMode="email"
										autoComplete="email"
										placeholder={t("emailPlaceholder")}
										value={email}
										onChange={handleEmailChange}
										onKeyDown={e => {
											if (e.key === "Enter" && !isSubmitDisabled) handleSubmit()
										}}
										className={cn(
											"w-full h-[52px] px-5",
											"bg-gray-50",
											"border rounded-xl",
											"text-sm text-black placeholder:text-gray-400",
											"transition-colors duration-200",
											"focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
											errors.email ? "border-red-300 focus:ring-red-500" : "border-gray-200",
										)}
									/>
									{errors.email && (
										<motion.p
											initial={{ opacity: 0, y: -4 }}
											animate={{ opacity: 1, y: 0 }}
											className="text-xs text-red-500 mt-1.5 text-left pl-1"
										>
											{errors.email}
										</motion.p>
									)}
								</div>

								{/* Phone */}
								<div>
									<div className="flex items-center gap-2">
										{/* Country Code Selector */}
										<div className="relative shrink-0">
											<button
												type="button"
												onClick={() => setIsCountryOpen(!isCountryOpen)}
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
												aria-expanded={isCountryOpen}
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

											<WaitlistCountryDropdown
												isOpen={isCountryOpen}
												onClose={() => setIsCountryOpen(false)}
												onSelect={country => {
													setSelectedCountry(country)
													setIsCountryOpen(false)
												}}
												selectedCountry={selectedCountry}
											/>
										</div>

										{/* Phone Number Input */}
										<input
											type="tel"
											inputMode="numeric"
											placeholder={t("phonePlaceholder")}
											value={phoneNumber}
											onChange={handlePhoneChange}
											onKeyDown={e => {
												if (e.key === "Enter" && !isSubmitDisabled) handleSubmit()
											}}
											className={cn(
												"flex-1 h-[52px] px-5",
												"bg-gray-50",
												"border rounded-xl",
												"text-sm text-black placeholder:text-gray-400",
												"transition-colors duration-200",
												"focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
												errors.phone ? "border-red-300 focus:ring-red-500" : "border-gray-200",
											)}
										/>
									</div>
									{errors.phone && (
										<motion.p
											initial={{ opacity: 0, y: -4 }}
											animate={{ opacity: 1, y: 0 }}
											className="text-xs text-red-500 mt-1.5 text-left pl-1"
										>
											{errors.phone}
										</motion.p>
									)}
								</div>

								{/* Submit Button */}
								<motion.button
									type="button"
									onClick={handleSubmit}
									disabled={isSubmitDisabled}
									className={cn(
										"w-full h-[52px]",
										"rounded-xl font-semibold text-sm",
										"transition-all duration-200",
										"focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
										isLoading
											? "bg-primary-400 cursor-wait text-white"
											: "bg-primary-500 hover:bg-primary-600 text-white cursor-pointer",
									)}
									whileHover={isLoading ? undefined : { scale: 0.98 }}
									whileTap={isLoading ? undefined : { scale: 0.96 }}
								>
									{isLoading ? (
										<span className="inline-flex items-center gap-2">
											<svg aria-hidden="true" className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
												<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
												<path
													className="opacity-75"
													fill="currentColor"
													d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
												/>
											</svg>
										</span>
									) : (
										t("submit")
									)}
								</motion.button>
							</motion.div>

							{/* Disclaimer */}
							<motion.p variants={fadeUp} className="text-xs text-gray-400 leading-relaxed max-w-sm mx-auto">
								{t("disclaimer")}
							</motion.p>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</section>
	)
}
