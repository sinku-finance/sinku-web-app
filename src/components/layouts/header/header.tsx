"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { NavArrowDown, Menu, Xmark } from "iconoir-react"
import { motion, AnimatePresence } from "framer-motion"

import { AnimatedLogo } from "@/components/ui/animated-logo"
import { LanguageSelector } from "@/components/ui/language-selector"
import { Button } from "@/components/ui/button"
import { MegaMenu } from "./mega-menu"
import { MobileMenu } from "./mobile-menu"

export function Header() {
	const t = useTranslations("common")
	const tFooter = useTranslations("footer")
	const pathname = usePathname()
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	const [isScrolled, setIsScrolled] = useState(false)

	const isHomePage = pathname === "/" || pathname === "/en" || pathname === "/pt" || pathname === "/en/" || pathname === "/pt/"

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10)
			if (isMobileMenuOpen) {
				setIsMobileMenuOpen(false)
			}
		}

		window.addEventListener('scroll', handleScroll, { passive: true })
		return () => window.removeEventListener('scroll', handleScroll)
	}, [isMobileMenuOpen])

	return (
		<>
			<header className={`absolute top-0 left-0 right-0 z-50 transition-all duration-300 ${
				isScrolled
					? 'bg-white/90 backdrop-blur-xl shadow-[0_1px_0_0_rgba(0,0,0,0.06)]'
					: 'bg-white'
			}`}>
				<div className="px-6 py-3.5 md:px-10 md:py-4 lg:px-12">
					<div className="w-full max-w-[1400px] mx-auto">
						<nav className="flex items-center justify-between" aria-label="Main navigation">
							<div className="flex items-center gap-8">
								<Link href="/" className="transition-opacity hover:opacity-80">
									<AnimatedLogo />
								</Link>

								{/* Discover Button - Desktop only */}
								<button
									onMouseEnter={() => setIsMenuOpen(true)}
									className="hidden lg:flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-black transition-colors duration-200"
								>
									{tFooter("sections.discover")}
									<NavArrowDown className={`w-4 h-4 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} />
								</button>
							</div>

							{/* Desktop Navigation */}
							<div className="hidden sm:flex items-center gap-2.5">
								<Button id="header-login" variant="outline">
									<Link href="/download-app">{t("login")}</Link>
								</Button>

								<Button id="header-signup" variant="outline">
									<Link href="/download-app">{t("signup")}</Link>
								</Button>

								<div className="ml-1">
									<LanguageSelector />
								</div>
							</div>

							{/* Mobile Navigation */}
							<div className="flex sm:hidden items-center gap-2">
								<AnimatePresence mode="wait">
									{!isMobileMenuOpen ? (
										<motion.div
											key="login-button"
											initial={{ opacity: 0, scale: 0.9 }}
											animate={{ opacity: 1, scale: 1 }}
											exit={{ opacity: 0, scale: 0.9 }}
											transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
										>
											<Button id="header-login-mobile" variant="outline">
												<Link href="/download-app">{t("login")}</Link>
											</Button>
										</motion.div>
									) : (
										<motion.div
											key="language-selector"
											initial={{ opacity: 0, scale: 0.9 }}
											animate={{ opacity: 1, scale: 1 }}
											exit={{ opacity: 0, scale: 0.9 }}
											transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
										>
											<LanguageSelector />
										</motion.div>
									)}
								</AnimatePresence>

								<button
									onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
									className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors relative"
									aria-label="Toggle menu"
								>
									<AnimatePresence mode="wait">
										{!isMobileMenuOpen ? (
											<motion.div
												key="menu-icon"
												initial={{ opacity: 0, rotate: -90 }}
												animate={{ opacity: 1, rotate: 0 }}
												exit={{ opacity: 0, rotate: 90 }}
												transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
											>
												<Menu className="w-5 h-5 text-gray-700" />
											</motion.div>
										) : (
											<motion.div
												key="x-icon"
												initial={{ opacity: 0, rotate: -90 }}
												animate={{ opacity: 1, rotate: 0 }}
												exit={{ opacity: 0, rotate: 90 }}
												transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
											>
												<Xmark className="w-5 h-5 text-gray-700" />
											</motion.div>
										)}
									</AnimatePresence>
								</button>
							</div>
						</nav>
					</div>
				</div>

				{/* Desktop Mega Menu */}
				<MegaMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

				{/* Mobile Menu */}
				<MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
			</header>
		</>
	)
}
