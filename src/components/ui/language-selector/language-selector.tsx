"use client"

import { AnimatePresence, motion } from "framer-motion"
import { NavArrowDown } from "iconoir-react"
import { useLocale, useTranslations } from "next-intl"
import Image from "next/image"
import { useEffect, useRef, useState, useTransition } from "react"

import type { Locale } from "@/i18n/config"
import { usePathname, useRouter } from "@/i18n/routing"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import portugalFlag from "@/assets/images/countries/portugal.svg"
import ukFlag from "@/assets/images/countries/united-kingdom.svg"
import { languageSelectorAnimations } from "./animations"

type Language = {
	code: Locale
	nameKey: string
	flag: typeof ukFlag
}

const languages: Language[] = [
	{ code: "en", nameKey: "en", flag: ukFlag },
	{ code: "pt", nameKey: "pt", flag: portugalFlag },
]

type LanguageSelectorProps = {
	className?: string
	size?: "default" | "lg"
}

export function LanguageSelector({ className, size = "default" }: LanguageSelectorProps) {
	const [isOpen, setIsOpen] = useState(false)
	const [isPending, startTransition] = useTransition()
	const dropdownRef = useRef<HTMLDivElement>(null)
	const locale = useLocale()
	const router = useRouter()
	const pathname = usePathname()
	const t = useTranslations("languages")

	const selectedLang = languages.find(lang => lang.code === locale) || languages[0]

	// Close dropdown when clicking outside
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false)
			}
		}
		document.addEventListener("mousedown", handleClickOutside)
		return () => document.removeEventListener("mousedown", handleClickOutside)
	}, [])

	const handleSelect = (lang: Language) => {
		setIsOpen(false)
		startTransition(() => {
			router.replace(pathname, { locale: lang.code })
		})
	}

	return (
		<motion.div ref={dropdownRef} className={cn("relative", className)}>
			{/* Trigger button */}
			<Button
				type="button"
				variant="outline"
				size={size === "lg" ? "lg" : "default"}
				onClick={() => setIsOpen(!isOpen)}
				disabled={isPending}
				className="gap-2"
				aria-label={t("selectLanguage")}
				aria-haspopup="menu"
				aria-expanded={isOpen}
				aria-controls="language-menu"
			>
				<Image
					src={selectedLang.flag}
					alt={t(selectedLang.nameKey)}
					width={20}
					height={20}
					className="w-5 h-5 rounded-sm object-cover"
				/>
				<span>{selectedLang.code.toUpperCase()}</span>
				<NavArrowDown className={cn("w-4 h-4 opacity-70 transition-transform duration-200", isOpen && "rotate-180")} />
			</Button>

			{/* Dropdown */}
			<AnimatePresence mode="wait">
				{isOpen && (
					<motion.div
						{...languageSelectorAnimations.dropdown}
						id="language-menu"
						className={cn(
							"absolute top-full right-0 mt-2 z-50",
							"min-w-[180px] py-2",
							"bg-white rounded-2xl shadow-xl",
							"border border-neutral-100",
						)}
						role="menu"
					>
						{languages.map((lang, index) => (
							<motion.button
								key={lang.code}
								type="button"
								onClick={() => handleSelect(lang)}
								{...languageSelectorAnimations.item(index)}
								className={cn(
									"w-full flex items-center gap-3 px-4 py-3",
									"text-left text-sm font-medium",
									"transition-colors duration-150",
									selectedLang.code === lang.code
										? "text-black bg-primary-500/10"
										: "text-neutral-700 hover:bg-neutral-50",
								)}
								role="menuitem"
								aria-current={selectedLang.code === lang.code ? "true" : undefined}
							>
								<Image
									src={lang.flag}
									alt={t(lang.nameKey)}
									width={24}
									height={24}
									className="w-6 h-6 rounded-sm object-cover"
								/>
								<span className="flex-1">{t(lang.nameKey)}</span>
								{selectedLang.code === lang.code && (
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
