"use client"

import { useTranslations } from "next-intl"
import { ArrowRight } from "iconoir-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

interface Provider {
	id: string
	name: string
	logo?: string
	logoImage?: string
	badge?: string
	costToSend: string
	recipientGets: string
	difference: string
	highlighted?: boolean
	highlightMessage?: string
}

interface ComparisonSectionProps {
	locale: string
}

export function ComparisonSection({ locale }: ComparisonSectionProps) {
	const t = useTranslations("fees.comparison")

	// Comparison data for EUR 100 international transfer
	// Based on market rates: 1 EUR = 110.775 CVE
	// Wise charges 1.09% fee (€1.09 for €100)
	// Revolut charges 0.30% fee (€0.30 for €100) based on real data
	const providers: Provider[] = [
		{
			id: "plexos",
			name: "Plexos",
			logoImage: "/favicon.png",
			badge: t("cheapest"),
			costToSend: "€0.00",
			recipientGets: "11,077 CVE",
			difference: "+131 CVE",
		},
		{
			id: "revolut",
			name: "Revolut",
			logoImage: "/providers/revolut.webp",
			costToSend: "€0.30",
			recipientGets: "10,946 CVE",
			difference: "-11 CVE",
			highlighted: true,
			highlightMessage: "We strive to always be the cheapest available option on the market. However, when we are not, we make up for it with super fast, secure international transfer options that are trusted by 70+ million customers worldwide.",
		},
		{
			id: "wise",
			name: "Wise",
			logoImage: "/providers/wise.webp",
			costToSend: "€1.09",
			recipientGets: "10,957 CVE",
			difference: "0 CVE",
		},
		{
			id: "worldremit",
			name: "WorldRemit",
			logoImage: "/providers/worldremit.webp",
			costToSend: "€2.99",
			recipientGets: "10,778 CVE",
			difference: "-179 CVE",
		},
		{
			id: "moneygram",
			name: "MoneyGram",
			logoImage: "/providers/moneygram.jpg",
			costToSend: "€4.99",
			recipientGets: "10,578 CVE",
			difference: "-379 CVE",
		},
		{
			id: "western-union",
			name: "Western Union",
			logoImage: "/providers/western-union.webp",
			costToSend: "€5.90",
			recipientGets: "10,477 CVE",
			difference: "-480 CVE",
		},
	]

	const getLogoStyle = (providerId: string) => {
		switch (providerId) {
			case "plexos":
				return "bg-green-500 text-white"
			case "wise":
				return "bg-[#00B9FF] text-white"
			case "revolut":
				return "bg-[#0075FF] text-white"
			case "western-union":
				return "bg-[#FFCD00] text-black"
			case "moneygram":
				return "bg-[#E2001A] text-white"
			case "worldremit":
				return "bg-[#F05C4E] text-white"
			default:
				return "bg-primary-100 text-primary-600"
		}
	}

	return (
		<section className="py-20 md:py-32 bg-gray-50">
			<div className="container mx-auto px-6">
				<div className="max-w-6xl mx-auto">
					{/* Header */}
					<div className="text-center mb-12 md:mb-16">
						<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4">
							{t("title")}
						</h2>
						<p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto">
							{t("subtitle")}
						</p>
					</div>

					{/* Comparison Table - Desktop */}
					<div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
						{/* Table Header */}
						<div className="grid grid-cols-3 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200">
							<div className="text-sm font-medium text-gray-600">
								{t("sendingAmount")}
							</div>
							<div className="text-sm font-medium text-gray-600 text-center">
								{t("costToSend")}
							</div>
							<div className="text-sm font-medium text-gray-600 text-right">
								{t("recipientGets")}
							</div>
						</div>

						{/* Providers List */}
						<div className="divide-y divide-gray-200">
							{providers.map((provider) => (
								<div key={provider.id}>
									{provider.highlighted ? (
										<>
											{/* Regular Row */}
										<div className="grid grid-cols-3 gap-4 px-6 py-5 items-center hover:bg-gray-50 transition-colors">
											<div className="flex items-center gap-3">
												{provider.logoImage ? (
													<div className="w-10 h-10 rounded-full overflow-hidden bg-white flex items-center justify-center border border-gray-200">
														<Image
															src={provider.logoImage}
															alt={provider.name}
															width={40}
															height={40}
															className="w-full h-full object-contain p-1.5"
														/>
													</div>
												) : (
													<div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
														provider.highlighted 
															? 'bg-[#0075FF] text-white' 
															: getLogoStyle(provider.id)
													}`}>
														{provider.logo}
													</div>
												)}
												<span className="font-medium text-black">{provider.name}</span>
											</div>
											<div className="text-center font-semibold text-black">
												{provider.costToSend}
											</div>
											<div className="text-right">
												<div className="font-semibold text-black">{provider.recipientGets}</div>
											</div>
										</div>
											{/* Highlighted Message Bar */}
											<div className="bg-gray-100 px-6 py-4 flex items-center justify-between gap-4 border-t border-gray-200">
												<p className="text-sm text-gray-700 flex-1">
													{provider.highlightMessage}
												</p>
												<Button variant="primary" size="sm" className="shrink-0">
													<Link href="/download-app" className="flex items-center">
														{t("sendMoney")}
														<ArrowRight className="w-4 h-4 ml-2" strokeWidth={2} />
													</Link>
												</Button>
											</div>
										</>
									) : (
										<div className="grid grid-cols-3 gap-4 px-6 py-5 items-center hover:bg-gray-50 transition-colors">
											<div className="flex items-center gap-3">
												{provider.logoImage ? (
													<div className="w-10 h-10 rounded-full overflow-hidden bg-white flex items-center justify-center border border-gray-200">
														<Image
															src={provider.logoImage}
															alt={provider.name}
															width={40}
															height={40}
															className="w-full h-full object-contain p-1.5"
														/>
													</div>
												) : (
													<div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${getLogoStyle(provider.id)}`}>
														{provider.logo}
													</div>
												)}
												<div className="flex items-center gap-2">
													<span className="font-medium text-black">{provider.name}</span>
													{provider.badge && (
														<span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
															✓ {provider.badge}
														</span>
													)}
												</div>
											</div>
											<div className="text-center font-semibold text-black">
												{provider.costToSend}
											</div>
											<div className="text-right">
												<div className="font-semibold text-black">{provider.recipientGets}</div>
												{provider.difference && (
													<div className={`text-sm ${provider.difference.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
														{provider.difference}
													</div>
												)}
											</div>
										</div>
									)}
								</div>
							))}
						</div>
					</div>

					{/* Comparison Cards - Mobile */}
					<div className="md:hidden space-y-4">
						{providers.map((provider) => (
							<div key={provider.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
								{/* Provider Header */}
								<div className="px-4 py-4 bg-gray-50 border-b border-gray-200">
									<div className="flex items-center gap-3">
										{provider.logoImage ? (
											<div className="w-12 h-12 rounded-full overflow-hidden bg-white flex items-center justify-center border border-gray-200">
												<Image
													src={provider.logoImage}
													alt={provider.name}
													width={48}
													height={48}
													className="w-full h-full object-contain p-1.5"
												/>
											</div>
										) : (
											<div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
												provider.highlighted 
													? 'bg-[#0075FF] text-white' 
													: getLogoStyle(provider.id)
											}`}>
												{provider.logo}
											</div>
										)}
										<div className="flex-1">
											<div className="flex items-center gap-2 flex-wrap">
												<span className="font-semibold text-black">{provider.name}</span>
												{provider.badge && (
													<span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
														✓ {provider.badge}
													</span>
												)}
											</div>
										</div>
									</div>
								</div>

								{/* Provider Details */}
								<div className="px-4 py-4 space-y-3">
									<div className="flex justify-between items-center">
										<span className="text-sm text-gray-600">{t("costToSend")}</span>
										<span className="font-semibold text-black">{provider.costToSend}</span>
									</div>
									<div className="flex justify-between items-center">
										<span className="text-sm text-gray-600">{t("recipientGets")}</span>
										<div className="text-right">
											<div className="font-semibold text-black">{provider.recipientGets}</div>
											{provider.difference && (
												<div className={`text-xs ${provider.difference.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
													{provider.difference}
												</div>
											)}
										</div>
									</div>
								</div>

								{/* Highlighted Message */}
								{provider.highlighted && provider.highlightMessage && (
									<div className="bg-gray-100 px-4 py-4 border-t border-gray-200">
										<p className="text-sm text-gray-700 mb-3 leading-relaxed">
											{provider.highlightMessage}
										</p>
										<Button variant="primary" size="sm" className="w-full">
											<Link href="/download-app" className="flex items-center justify-center w-full">
												{t("sendMoney")}
												<ArrowRight className="w-4 h-4 ml-2" strokeWidth={2} />
											</Link>
										</Button>
									</div>
								)}
							</div>
						))}
					</div>

					{/* Disclaimer */}
					<p className="text-xs md:text-sm text-gray-500 text-center mt-8 max-w-4xl mx-auto leading-relaxed">
						{t("disclaimer")}
					</p>
				</div>
			</div>
		</section>
	)
}
