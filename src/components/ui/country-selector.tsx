"use client"

import { AnimatePresence, motion } from "framer-motion"
import { NavArrowDown } from "iconoir-react"
import { useLocale } from "next-intl"
import { useEffect, useRef, useState, useTransition } from "react"
import { cn } from "@/lib/utils"
import { usePathname, useRouter } from "@/i18n/routing"
import type { Locale } from "@/i18n/config"

type Country = {
	id: string
	name: string
	language: string
	locale: Locale
}

const countries: Country[] = [
	{ id: "gb", name: "United Kingdom", language: "English", locale: "en" },
	{ id: "pt", name: "Portugal", language: "Português", locale: "pt" },
	{ id: "br", name: "Brazil", language: "Português", locale: "pt" },
	{ id: "ao", name: "Angola", language: "Português", locale: "pt" },
	{ id: "mz", name: "Mozambique", language: "Português", locale: "pt" },
	{ id: "cv", name: "Cape Verde", language: "Português", locale: "pt" },
	{ id: "gw", name: "Guinea-Bissau", language: "Português", locale: "pt" },
	{ id: "st", name: "São Tomé and Príncipe", language: "Português", locale: "pt" },
	{ id: "us", name: "United States", language: "English", locale: "en" },
]

export function CountrySelector() {
	const locale = useLocale()
	const router = useRouter()
	const pathname = usePathname()
	const [isOpen, setIsOpen] = useState(false)
	const [isPending, startTransition] = useTransition()
	const dropdownRef = useRef<HTMLDivElement>(null)
	
	// Select default country based on current locale
	const defaultCountry = locale === "pt" ? countries[1] : countries[0] // Portugal or UK
	const [selectedCountry, setSelectedCountry] = useState(defaultCountry)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false)
			}
		}
		document.addEventListener("mousedown", handleClickOutside)
		return () => document.removeEventListener("mousedown", handleClickOutside)
	}, [])

	const handleSelect = (country: Country) => {
		setSelectedCountry(country)
		setIsOpen(false)
		
		// Change locale if different from current
		if (country.locale !== locale) {
			startTransition(() => {
				router.replace(pathname, { locale: country.locale })
			})
		}
	}

	return (
		<motion.div ref={dropdownRef} className="relative">
			{/* Trigger button */}
			<motion.button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				disabled={isPending}
				className={cn(
					"flex items-center gap-2",
					"text-black text-sm font-medium",
					"border border-gray-200 rounded-xl",
					"bg-white",
					"hover:bg-gray-50 hover:border-gray-300",
					"transition-colors duration-200",
					"focus:outline-none focus:ring-2 focus:ring-primary-500",
					"px-4 py-2.5",
					isPending && "opacity-50 cursor-not-allowed"
				)}
				aria-label="Select country"
				aria-haspopup="menu"
				aria-expanded={isOpen}
			>
				<span>{selectedCountry.name} ({selectedCountry.language})</span>
				<NavArrowDown 
					className={cn("w-4 h-4 opacity-70 transition-transform duration-200", isOpen && "rotate-180")} 
					strokeWidth={2} 
				/>
			</motion.button>

			{/* Dropdown */}
			<AnimatePresence mode="wait">
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.2 }}
						className={cn(
							"absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50",
							"min-w-[280px] py-2",
							"bg-white rounded-2xl shadow-xl",
							"border border-gray-100"
						)}
						role="menu"
					>
						{countries.map((country) => (
							<motion.button
								key={country.id}
								type="button"
								onClick={() => handleSelect(country)}
								className={cn(
									"w-full flex items-center gap-3 px-4 py-3",
									"text-left text-sm font-medium",
									"transition-colors duration-150",
									selectedCountry.id === country.id
										? "text-black bg-primary-500/10"
										: "text-gray-700 hover:bg-gray-50"
								)}
								role="menuitem"
								aria-current={selectedCountry.id === country.id ? "true" : undefined}
							>
								<span className="flex-1">
									{country.name} ({country.language})
								</span>
								{selectedCountry.id === country.id && (
									<svg
										className="w-5 h-5 text-primary-500"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth={2.5}
										aria-label="Selected"
										role="img"
									>
										<title>Selected</title>
										<path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
									</svg>
								)}
							</motion.button>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	)
}
