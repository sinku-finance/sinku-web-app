"use client"

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { footerConfig } from "@/config/footer"

interface MobileMenuProps {
	isOpen: boolean
	onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
	const t = useTranslations("footer")

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
				>
					<motion.div
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
						className="max-h-[calc(100dvh-80px)] overflow-y-auto px-6 py-8 space-y-8"
						style={{ minHeight: "calc(100vh - 80px)" }}
					>
							{/* Discover */}
							<div>
								<h3 className="text-sm font-semibold text-gray-900 mb-3">
									{t("sections.discover")}
								</h3>
								<ul className="space-y-3">
									{footerConfig.discover.map(item => (
										<li key={item.key}>
											<Link
												href={item.href}
												className="text-base text-gray-700 hover:text-primary-600 transition-colors block"
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
								<h3 className="text-sm font-semibold text-gray-900 mb-3">
									{t("sections.company")}
								</h3>
								<ul className="space-y-3">
									{footerConfig.companyLinks.map(item => (
										<li key={item.key}>
											<Link
												href={item.href}
												className="text-base text-gray-700 hover:text-primary-600 transition-colors block"
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
								<h3 className="text-sm font-semibold text-gray-900 mb-3">
									{t("sections.help")}
								</h3>
								<ul className="space-y-3">
									{footerConfig.help.map(item => (
										<li key={item.key}>
											<Link
												href={item.href}
												className="text-base text-gray-700 hover:text-primary-600 transition-colors block"
												onClick={onClose}
											>
												{t(`links.${item.key}`)}
											</Link>
										</li>
									))}
								</ul>
							</div>

							{/* Legal */}
							<div className="pb-4">
								<h3 className="text-sm font-semibold text-gray-900 mb-3">
									{t("legal")}
								</h3>
								<ul className="space-y-3">
									{footerConfig.legal.map(item => (
										<li key={item.key}>
											<Link
												href={item.href}
												className="text-base text-gray-700 hover:text-primary-600 transition-colors block"
												onClick={onClose}
											>
												{t(`legalLinks.${item.key}`)}
											</Link>
										</li>
									))}
								</ul>
							</div>
						</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
