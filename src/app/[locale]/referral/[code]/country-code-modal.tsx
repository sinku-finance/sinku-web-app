"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Search } from "iconoir-react"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"
import { phoneCountries, getFlagPath, type PhoneCountry } from "@/data/phone-countries"

interface CountryCodeDropdownProps {
	isOpen: boolean
	onClose: () => void
	onSelect: (country: PhoneCountry) => void
	selectedCountry: PhoneCountry
}

const dropdownAnimations = {
	initial: { opacity: 0, y: 8, scale: 0.96 },
	animate: { opacity: 1, y: 0, scale: 1 },
	exit: { opacity: 0, y: 8, scale: 0.95 },
	transition: {
		duration: 0.2,
		ease: [0.32, 0.72, 0, 1] as const,
		exit: {
			duration: 0.15,
			ease: [0.4, 0, 1, 1] as const,
		},
	},
}

export function CountryCodeDropdown({
	isOpen,
	onClose,
	onSelect,
	selectedCountry,
}: CountryCodeDropdownProps) {
	const t = useTranslations("referral")
	const [search, setSearch] = useState("")
	const searchInputRef = useRef<HTMLInputElement>(null)
	const dropdownRef = useRef<HTMLDivElement>(null)

	const filteredCountries = useMemo(() => {
		if (!search.trim()) return phoneCountries
		const query = search.toLowerCase().trim()
		return phoneCountries.filter(
			(c) =>
				c.name.toLowerCase().includes(query) ||
				c.dialCode.includes(query) ||
				c.id.toLowerCase().includes(query)
		)
	}, [search])

	// Focus search input when dropdown opens
	useEffect(() => {
		if (isOpen) {
			setSearch("")
			setTimeout(() => searchInputRef.current?.focus(), 50)
		}
	}, [isOpen])

	// Close on click outside
	useEffect(() => {
		if (!isOpen) return
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				onClose()
			}
		}
		document.addEventListener("mousedown", handleClickOutside)
		return () => document.removeEventListener("mousedown", handleClickOutside)
	}, [isOpen, onClose])

	// Close on escape
	useEffect(() => {
		if (!isOpen) return
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose()
		}
		document.addEventListener("keydown", handleKeyDown)
		return () => document.removeEventListener("keydown", handleKeyDown)
	}, [isOpen, onClose])

	return (
		<AnimatePresence mode="wait">
			{isOpen && (
				<motion.div
					ref={dropdownRef}
					{...dropdownAnimations}
					className={cn(
						"absolute left-0 top-full mt-2 z-50",
						"w-[320px] sm:w-[360px]",
						"bg-white rounded-2xl shadow-xl",
						"border border-neutral-100",
						"flex flex-col overflow-hidden"
					)}
					role="menu"
				>
					{/* Search */}
					<div className="p-3 border-b border-neutral-100">
						<div className="relative">
							<Search
								className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
								strokeWidth={2}
							/>
							<input
								ref={searchInputRef}
								type="text"
								placeholder={t("searchCountries")}
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								className={cn(
									"w-full h-10 pl-10 pr-3",
									"bg-neutral-50 border border-neutral-200 rounded-xl",
									"text-sm text-black placeholder:text-gray-400",
									"transition-colors duration-200",
									"focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
								)}
							/>
						</div>
					</div>

					{/* Country List */}
					<div className="overflow-y-auto max-h-[280px] overscroll-contain py-1">
						{filteredCountries.length === 0 ? (
							<div className="px-4 py-8 text-center text-sm text-gray-400">
								{t("noCountriesFound")}
							</div>
						) : (
							filteredCountries.map((country) => (
								<button
									key={`${country.id}-${country.dialCode}`}
									type="button"
									onClick={() => onSelect(country)}
									className={cn(
										"w-full flex items-center gap-3 px-4 py-3",
										"text-left text-sm font-medium",
										"transition-colors duration-150",
										selectedCountry.id === country.id
											? "text-black bg-primary-500/10"
											: "text-neutral-700 hover:bg-neutral-50"
									)}
									role="menuitem"
									aria-current={selectedCountry.id === country.id ? "true" : undefined}
								>
									<Image
										src={getFlagPath(country.flag)}
										alt={country.name}
										width={24}
										height={24}
										className="w-6 h-6 rounded-sm object-cover shrink-0"
									/>
									<span className="flex-1">{country.name}</span>
									<span className="text-neutral-400 text-xs tabular-nums">
										{country.dialCode}
									</span>
									{selectedCountry.id === country.id && (
										<svg
											className="w-5 h-5 text-primary-500 shrink-0"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											strokeWidth={2.5}
											aria-label="Selected"
											role="img"
										>
											<title>Selected</title>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M5 13l4 4L19 7"
											/>
										</svg>
									)}
								</button>
							))
						)}
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
