"use client"

import { AnimatePresence, motion } from "framer-motion"
import { NavArrowDown, Globe } from "iconoir-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"
import { regions, type RegionId } from "@/data/regions"
import { cn } from "@/lib/utils"

interface RegionSelectorProps {
	value: RegionId
	onChange: (regionId: RegionId) => void
	className?: string
}

export function RegionSelector({ value, onChange, className }: RegionSelectorProps) {
	const [isOpen, setIsOpen] = useState(false)
	const dropdownRef = useRef<HTMLDivElement>(null)
	const t = useTranslations("regions")

	const selectedRegion = regions.find((r) => r.id === value) || regions[0]

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false)
			}
		}
		document.addEventListener("mousedown", handleClickOutside)
		return () => document.removeEventListener("mousedown", handleClickOutside)
	}, [])

	const renderIcon = (region: typeof regions[number], iconClassName: string) => {
		if ("icon" in region && region.icon === "globe") {
			return <Globe className={cn(iconClassName, "text-primary-600")} strokeWidth={2} />
		}
		if ("flag" in region) {
			return (
				<Image
					src={region.flag}
					alt={t(region.nameKey)}
					width={24}
					height={24}
					className={iconClassName}
				/>
			)
		}
		return null
	}

	return (
		<motion.div ref={dropdownRef} className={cn("relative", className)}>
			{/* Trigger button */}
			<motion.button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className={cn(
					"flex items-center gap-2",
					"text-black text-sm font-medium",
					"border border-gray-200 rounded-xl",
					"bg-white",
					"hover:bg-gray-50 hover:border-gray-300",
					"transition-colors duration-200",
					"focus:outline-none focus:ring-2 focus:ring-primary-500",
					"px-4 py-2.5"
				)}
				aria-label="Select region"
				aria-haspopup="menu"
				aria-expanded={isOpen}
			>
				{renderIcon(selectedRegion, "w-5 h-5 rounded-sm object-cover")}
				<span>{t(selectedRegion.nameKey)}</span>
				<NavArrowDown className={cn("w-4 h-4 opacity-70 transition-transform duration-200", isOpen && "rotate-180")} strokeWidth={2} />
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
							"absolute right-0 top-full mt-2 z-50",
							"min-w-[220px] py-2",
							"bg-white rounded-2xl shadow-xl",
							"border border-gray-100"
						)}
						role="menu"
					>
						{regions.map((region) => (
							<motion.button
								key={region.id}
								type="button"
								onClick={() => {
									onChange(region.id)
									setIsOpen(false)
								}}
								className={cn(
									"w-full flex items-center gap-3 px-4 py-3",
									"text-left text-sm font-medium",
									"transition-colors duration-150",
									value === region.id
										? "text-black bg-primary-500/10"
										: "text-gray-700 hover:bg-gray-50"
								)}
								role="menuitem"
								aria-current={value === region.id ? "true" : undefined}
							>
								{renderIcon(region, "w-6 h-6 rounded-sm object-cover")}
								<span className="flex-1">{t(region.nameKey)}</span>
								{value === region.id && (
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
