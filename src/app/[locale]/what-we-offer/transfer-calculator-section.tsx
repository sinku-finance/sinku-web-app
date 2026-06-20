"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import { useTranslations } from "next-intl"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { NavArrowDown, Clock, Coins, ArrowRight, Check } from "iconoir-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getFlagPath } from "@/data/phone-countries"

interface Country {
	id: string
	name: string
	currency: string
	currencySymbol: string
	flag: string
}

interface ProviderConfig {
	id: string
	name: string
	logo: string
	fixedFee: number
	rateMarkup: number
	speed: string
	corridors: string[]
}

const countries: Country[] = [
	{ id: "us", name: "United States", currency: "USD", currencySymbol: "$", flag: "united-states" },
	{ id: "pt", name: "Portugal", currency: "EUR", currencySymbol: "\u20ac", flag: "portugal" },
	{ id: "fr", name: "France", currency: "EUR", currencySymbol: "\u20ac", flag: "france" },
	{ id: "es", name: "Spain", currency: "EUR", currencySymbol: "\u20ac", flag: "spain" },
	{ id: "br", name: "Brazil", currency: "BRL", currencySymbol: "R$", flag: "brazil" },
	{ id: "cv", name: "Cape Verde", currency: "CVE", currencySymbol: "ECV", flag: "cape-verde" },
	{ id: "ao", name: "Angola", currency: "AOA", currencySymbol: "Kz", flag: "angola" },
	{ id: "mz", name: "Mozambique", currency: "MZN", currencySymbol: "MT", flag: "mozambique" },
	{ id: "gb", name: "United Kingdom", currency: "GBP", currencySymbol: "\u00a3", flag: "united-kingdom" },
]

const midMarketRates: Record<string, Record<string, number>> = {
	USD: { EUR: 0.92, BRL: 5.05, CVE: 110.775, AOA: 920.5, MZN: 63.8, GBP: 0.79, USD: 1 },
	EUR: { USD: 1.087, BRL: 5.49, CVE: 110.265, AOA: 1000.8, MZN: 69.3, GBP: 0.86, EUR: 1 },
	GBP: { USD: 1.265, EUR: 1.163, BRL: 6.39, CVE: 128.2, AOA: 1164.0, MZN: 80.7, GBP: 1 },
	BRL: { USD: 0.198, EUR: 0.182, GBP: 0.157, CVE: 21.94, AOA: 182.3, MZN: 12.64, BRL: 1 },
	CVE: { USD: 0.00903, EUR: 0.00907, GBP: 0.0078, BRL: 0.0456, AOA: 8.31, MZN: 0.576, CVE: 1 },
	AOA: { USD: 0.00109, EUR: 0.001, GBP: 0.00086, BRL: 0.00549, CVE: 0.1204, MZN: 0.0693, AOA: 1 },
	MZN: { USD: 0.01567, EUR: 0.01443, GBP: 0.01239, BRL: 0.0791, CVE: 1.736, AOA: 14.43, MZN: 1 },
}

const providerConfigs: ProviderConfig[] = [
{ id: "moneygram", name: "MoneyGram", logo: "/providers/moneygram.jpg", fixedFee: 4.99, rateMarkup: 0.035, speed: "Instant**", corridors: ["CVE", "AOA", "MZN", "BRL"] },
	{ id: "western-union", name: "Western Union", logo: "/providers/western-union.webp", fixedFee: 5.90, rateMarkup: 0.04, speed: "Instant**", corridors: ["CVE", "AOA", "MZN", "BRL"] },
]

/* ─── Compact currency selector (flag + code) ─── */
function CurrencySelect({
	selected,
	countries: list,
	onSelect,
}: {
	selected: Country
	countries: Country[]
	onSelect: (c: Country) => void
}) {
	const [open, setOpen] = useState(false)
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const close = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
		}
		document.addEventListener("mousedown", close)
		return () => document.removeEventListener("mousedown", close)
	}, [])

	return (
		<div ref={ref} className="relative inline-flex">
			<button
				type="button"
				onClick={() => setOpen(!open)}
				className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
			>
				<Image
					src={getFlagPath(selected.flag)}
					alt={selected.name}
					width={20}
					height={20}
					className="w-5 h-5 rounded-full object-cover"
				/>
				<span className="text-sm font-semibold text-gray-900">{selected.currency}</span>
				<NavArrowDown
					className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
					strokeWidth={2.5}
				/>
			</button>

			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0, y: -6, scale: 0.97 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: -6, scale: 0.97 }}
						transition={{ duration: 0.15 }}
						className="absolute right-0 top-full mt-2 z-50 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 min-w-[220px]"
					>
						{list.map((c) => (
							<button
								key={c.id}
								type="button"
								onClick={() => { onSelect(c); setOpen(false) }}
								className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
									selected.id === c.id ? "bg-green-50" : "hover:bg-gray-50"
								}`}
							>
								<Image
									src={getFlagPath(c.flag)}
									alt={c.name}
									width={20}
									height={20}
									className="w-5 h-5 rounded-full object-cover shrink-0"
								/>
								<span className="flex-1 font-medium text-gray-900">{c.name}</span>
								<span className="text-xs text-gray-400 font-medium">{c.currency}</span>
								{selected.id === c.id && <Check className="w-4 h-4 text-green-600" strokeWidth={2.5} />}
							</button>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

function fmt(num: number, decimals = 2): string {
	return num.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
}

function isLargeCurrency(currency: string): boolean {
	return ["CVE", "AOA", "MZN"].includes(currency)
}

export function TransferCalculatorSection() {
	const t = useTranslations("fees.calculator")
	const tc = useTranslations("fees.comparison")

	const [sendFrom, setSendFrom] = useState(countries[0])
	const [sendTo, setSendTo] = useState(countries[5])
	const [amount, setAmount] = useState("200")
	const numAmount = Number.parseFloat(amount) || 0

	const getMidRate = (from: string, to: string): number => {
		if (from === to) return 1
		return midMarketRates[from]?.[to] || 1
	}

	// Default PALOP destination when we need to reset
	const defaultDestination = (excludeId: string) =>
		countries.find((c) => c.id !== excludeId && ["CVE", "AOA", "MZN"].includes(c.currency)) || countries[5]

	const corridorCurrencies = providerConfigs.flatMap((p) => p.corridors)

	// When changing "from", handle conflicts
	const handleFromSelect = (c: Country) => {
		if (c.id === sendTo.id) {
			setSendTo(sendFrom)
		} else if (c.currency === sendTo.currency || !corridorCurrencies.includes(sendTo.currency)) {
			// Same currency or destination has no corridor providers — pick a PALOP destination
			setSendTo(defaultDestination(c.id))
		}
		setSendFrom(c)
	}

	// When changing "to", handle conflicts
	const handleToSelect = (c: Country) => {
		if (c.id === sendFrom.id) {
			setSendFrom(sendTo)
		}
		setSendTo(c)
	}

	const midRate = getMidRate(sendFrom.currency, sendTo.currency)
	const sinkuRate = midRate
	const sinkuReceived = numAmount * sinkuRate
	const dec = isLargeCurrency(sendTo.currency) ? 0 : 2
	const rateDec = isLargeCurrency(sendTo.currency) ? 2 : 4

	// Filter providers by destination corridor and compute dynamic values
	const comparisonProviders = useMemo(() => {
		return providerConfigs
			.filter((p) => p.corridors.includes(sendTo.currency))
			.map((p) => {
				const effectiveAmount = Math.max(numAmount - p.fixedFee, 0)
				const providerRate = midRate * (1 - p.rateMarkup)
				const recipientGets = effectiveAmount * providerRate
				const difference = recipientGets - sinkuReceived
				return {
					...p,
					fee: `${sendFrom.currencySymbol}${fmt(p.fixedFee, 2)}`,
					recipientGets: fmt(recipientGets, dec),
					recipientCurrency: sendTo.currency,
					difference: `${fmt(difference, dec)} ${sendTo.currency}`,
				}
			})
	}, [sendFrom, sendTo, numAmount, midRate, sinkuReceived, dec])

	const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAmount(e.target.value.replace(/[^0-9.]/g, ""))
	}

	const hasComparison = comparisonProviders.length > 0

	return (
		<section className="bg-surface-green h-screen">
			<div className="h-full px-6 md:px-10 lg:px-12 flex items-center">
				<div className="w-full max-w-[1600px] mx-auto">
					<div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-16 items-start">
						{/* Left — Marketing copy */}
						<motion.div
							initial={{ opacity: 0, x: -30 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
							className="lg:sticky lg:top-32"
						>
							<h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-black leading-tight mb-6">
								{t("title")}
							</h2>
							<p className="text-base md:text-lg text-black/70 leading-relaxed mb-8 max-w-lg">
								{t("subtitle")}
							</p>
							<Button variant="primary" size="lg" className="bg-black hover:bg-black/90 text-white">
								<Link href="/download-app" className="flex items-center">
									{t("sendNow")}
									<ArrowRight className="w-5 h-5 ml-2" strokeWidth={2} />
								</Link>
							</Button>
						</motion.div>

						{/* Right — Calculator + Comparison in one card */}
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.15 }}
							className="flex flex-col gap-3"
						>
							<div className="w-full bg-white rounded-3xl shadow-2xl">
								{/* Content area */}
								<div className={`grid grid-cols-1 ${hasComparison ? "md:grid-cols-2" : ""}`}>
									{/* Left half — Calculator */}
									<div className={hasComparison ? "md:border-r md:border-gray-100" : ""}>
										{/* You send */}
										<div className="p-6 pb-5">
											<div className="flex items-center justify-between mb-2">
												<span className="text-sm text-gray-500 font-medium">{t("youSend")}</span>
												<CurrencySelect
													selected={sendFrom}
													countries={countries}
													onSelect={handleFromSelect}
												/>
											</div>
											<div className="flex items-baseline gap-1">
												<span className="text-4xl md:text-5xl font-bold text-black">{sendFrom.currencySymbol}</span>
												<input
													type="text"
													value={amount}
													onChange={handleAmountChange}
													data-no-focus-ring
													className="w-full text-4xl md:text-5xl font-bold text-black bg-transparent border-0 border-none outline-none shadow-none focus:ring-0 focus:border-0 focus:outline-none focus:shadow-none placeholder:text-gray-300 tabular-nums appearance-none"
													placeholder="200.00"
												/>
											</div>
										</div>

										<div className="h-px bg-gray-100 mx-6" />

										{/* Recipient gets */}
										<div className="p-6 pt-5 pb-4">
											<div className="flex items-center justify-between mb-2">
												<span className="text-sm text-gray-500 font-medium">{t("recipientGets")}</span>
												<CurrencySelect
													selected={sendTo}
													countries={countries.filter((c) => c.id !== sendFrom.id)}
													onSelect={handleToSelect}
												/>
											</div>
											<div className="text-4xl md:text-5xl font-bold text-black tabular-nums">
												{sendTo.currencySymbol}{fmt(sinkuReceived, dec)}
											</div>
										</div>

										<div className="h-px bg-gray-100 mx-6" />

										{/* Info rows */}
										<div className="px-6 py-4 space-y-3">
											<div className="flex items-center gap-3">
												<div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
													<Clock className="w-4.5 h-4.5 text-gray-600" strokeWidth={2} />
												</div>
												<div className="flex-1">
													<div className="text-xs text-gray-500">{t("arrivalTime")}</div>
													<div className="text-sm font-semibold text-black">Instant</div>
												</div>
											</div>
											<div className="flex items-center gap-3">
												<div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
													<Coins className="w-4.5 h-4.5 text-gray-600" strokeWidth={2} />
												</div>
												<div className="flex-1">
													<div className="text-xs text-gray-500">{t("transferFee")}</div>
													<div className="text-sm font-semibold text-green-600">{sendFrom.currencySymbol}0.00</div>
												</div>
											</div>
										</div>
									</div>

									{/* Right half — Comparison List */}
									{hasComparison && (
										<div>
											<div className="px-5 py-4 border-b border-gray-100 max-md:border-t">
												<h4 className="text-sm font-bold text-black">{tc("title")}</h4>
												<p className="text-xs text-gray-400 mt-0.5">
													{t("youSend")} {sendFrom.currencySymbol}{fmt(numAmount, 2)} {sendFrom.currency} &rarr; {sendTo.currency}
												</p>
											</div>
											<div className="divide-y divide-gray-100">
												{comparisonProviders.map((p) => (
													<div key={p.id} className="flex items-center gap-3 px-5 py-3.5">
														<div className="w-8 h-8 rounded-full overflow-hidden bg-white border border-gray-200 flex items-center justify-center shrink-0">
															<Image src={p.logo} alt={p.name} width={32} height={32} className="w-full h-full object-cover rounded-full" />
														</div>
														<div className="flex-1 min-w-0">
															<div className="text-sm font-medium text-black">{p.name}</div>
															<div className="text-xs text-gray-400">{t("transferFee")}: {p.fee} · {p.speed}</div>
														</div>
														<div className="text-right shrink-0">
															<div className="text-sm font-semibold text-black">{p.recipientGets} {p.recipientCurrency}</div>
															<div className="text-xs font-medium text-red-500">{p.difference}</div>
														</div>
													</div>
												))}
											</div>
										</div>
									)}
								</div>

								{/* Shared footer — spans full width */}
								<div className={`bg-gray-50 rounded-b-3xl ${hasComparison ? "border-t border-gray-100" : ""}`}>
									<div className={`grid grid-cols-1 ${hasComparison ? "md:grid-cols-2" : ""}`}>
										<div className="px-6 pt-3.5 pb-6">
											<p className="text-xs text-gray-500 mb-4">
												{t("exchangeRate")}: <span className="font-semibold text-gray-700">1 {sendFrom.currency} = {fmt(sinkuRate, rateDec)} {sendTo.currency}</span>
											</p>
											<Button variant="primary" className="w-full" size="lg">
												<Link href="/download-app" className="flex items-center justify-center w-full">
													{t("sendNow")}
												</Link>
											</Button>
										</div>
										{hasComparison && (
											<div className="px-5 py-3 flex items-end">
												<p className="text-[10px] text-gray-400 leading-relaxed">
													{tc("disclaimer")}
												</p>
											</div>
										)}
									</div>
								</div>
							</div>

							{/* Footnote */}
							{hasComparison && (
								<p className="text-[10px] text-black/40">
									**{t("instantFootnote")}
								</p>
							)}
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	)
}
