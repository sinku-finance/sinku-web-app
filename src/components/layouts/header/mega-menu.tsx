"use client"

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { footerConfig } from "@/config/footer"
import { AppStoreButton } from "@/components/ui/app-store-button"

interface MegaMenuProps {
	isOpen: boolean
	onClose: () => void
}

export function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
	const t = useTranslations("footer")
	const tApp = useTranslations("app")

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ height: 0, opacity: 0 }}
					animate={{ height: "auto", opacity: 1 }}
					exit={{ height: 0, opacity: 0 }}
					transition={{
						height: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
						opacity: { duration: 0.4, delay: 0.15 }
					}}
					className="absolute left-0 right-0 top-full bg-white border-t border-gray-200 shadow-lg overflow-hidden"
					onMouseLeave={onClose}
				>
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
						className="w-full max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12 py-8"
					>
						<div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-8 md:gap-6">
							{/* Get Started with QR Code and App Buttons */}
							<div className="pr-8 border-r border-gray-200">
								<h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
									{t("sections.getStarted")}
								</h3>
								
								{/* QR Code and Text */}
								<div className="flex items-center gap-4 mb-6">
									<div className="relative w-28 h-28 rounded-lg overflow-hidden flex-shrink-0 bg-gray-50">
										<Image
											src="/qrcode.svg"
											alt="QR Code to download Sinku app"
											fill
											className="object-contain p-1"
										/>
									</div>
									<p className="text-sm text-gray-600 max-w-[120px] leading-relaxed">
										{tApp("qrText")}
									</p>
								</div>

								{/* App Store Buttons */}
								<div className="flex flex-col gap-3">
									<AppStoreButton 
										store="apple" 
										href="https://apps.apple.com" 
										className="w-full h-[45px] bg-black text-white border-black hover:bg-gray-900"
									/>
									<AppStoreButton 
										store="google" 
										href="https://play.google.com" 
										className="w-full h-[45px] bg-black text-white border-black hover:bg-gray-900"
									/>
								</div>
							</div>

							{/* Discover */}
							<div>
								<h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
									{t("sections.discover")}
								</h3>
								<ul className="space-y-2">
									{footerConfig.discover.map(item => (
										<li key={item.key}>
											<Link
												href={item.href}
												className="text-sm text-gray-700 hover:text-primary-600 transition-colors"
												onClick={onClose}
											>
												{t(`links.${item.key}`)}
											</Link>
										</li>
									))}
								</ul>
							</div>

							{/* Company section hidden for now */}
							{/* <div>
								<h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
									{t("sections.company")}
								</h3>
								<ul className="space-y-2">
									{footerConfig.companyLinks.map(item => (
										<li key={item.key}>
											<Link
												href={item.href}
												className="text-sm text-gray-700 hover:text-primary-600 transition-colors"
												onClick={onClose}
											>
												{t(`links.${item.key}`)}
											</Link>
										</li>
									))}
								</ul>
							</div> */}

							{/* Help */}
							<div>
								<h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
									{t("sections.help")}
								</h3>
								<ul className="space-y-2">
									{footerConfig.help.map(item => (
										<li key={item.key}>
											<Link
												href={item.href}
												className="text-sm text-gray-700 hover:text-primary-600 transition-colors"
												onClick={onClose}
											>
												{t(`links.${item.key}`)}
											</Link>
										</li>
									))}
								</ul>
							</div>

							{/* Legal */}
							<div>
								<h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
									{t("legal")}
								</h3>
								<ul className="space-y-2">
									{footerConfig.legal.map(item => (
										<li key={item.key}>
											<Link
												href={item.href}
												className="text-sm text-gray-700 hover:text-primary-600 transition-colors"
												onClick={onClose}
											>
												{t(`legalLinks.${item.key}`)}
											</Link>
										</li>
									))}
								</ul>
							</div>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
