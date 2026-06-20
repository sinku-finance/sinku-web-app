"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Bank, CreditCard, Wallet, Cash } from "iconoir-react"
import { motion } from "framer-motion"
import accountFeesData from "@/data/account-fees.json"
import { RegionSelector } from "@/components/ui/region-selector"
import type { RegionId } from "@/data/regions"

interface AccountFeesProps {
	locale: string
}

export function AccountFeesSection({ locale }: AccountFeesProps) {
	const [activeTab, setActiveTab] = useState<"deposit" | "withdraw">("deposit")
	const [selectedRegion, setSelectedRegion] = useState<RegionId>("portugal")
	const data = accountFeesData[locale as keyof typeof accountFeesData] || accountFeesData.en

	const methods = activeTab === "deposit" ? data.deposit : data.withdraw

	const getIcon = (iconName: string) => {
		switch (iconName) {
			case "bank":
				return <Bank className="w-full h-full" strokeWidth={2} />
			case "card":
				return <CreditCard className="w-full h-full" strokeWidth={2} />
			case "sinku":
				return <Wallet className="w-full h-full" strokeWidth={2} />
			case "atm":
				return <Cash className="w-full h-full" strokeWidth={2} />
			default:
				return <Bank className="w-full h-full" strokeWidth={2} />
		}
	}

	return (
		<section className="relative py-12 md:py-16 lg:py-20 bg-white">
			<div className="px-6 md:px-10 lg:px-12">
				<div className="w-full max-w-[1400px] mx-auto">
				<div className="bg-gray-50 rounded-[40px] p-6 md:p-10 border border-gray-200">
				{/* Header */}
				<div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between">
					<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black">{data.title}</h2>

					<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
						{/* Tabs */}
						<div className="relative flex items-center gap-2 bg-white rounded-full p-1 flex-1 sm:flex-initial border border-gray-200">
							<button
								onClick={() => setActiveTab("deposit")}
								className={`relative z-10 flex-1 sm:flex-initial px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
									activeTab === "deposit"
										? "text-black"
										: "text-gray-700 hover:text-black"
								}`}
							>
								{data.tabs.deposit}
							</button>
							<button
								onClick={() => setActiveTab("withdraw")}
								className={`relative z-10 flex-1 sm:flex-initial px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
									activeTab === "withdraw"
										? "text-black"
										: "text-gray-700 hover:text-black"
								}`}
							>
								{data.tabs.withdraw}
							</button>
							{/* Animated indicator */}
							<motion.div
								layoutId="activeTab"
								className="absolute inset-y-1 rounded-full bg-primary-500 shadow-lg"
								initial={false}
								transition={{
									type: "spring",
									stiffness: 500,
									damping: 30
								}}
								style={{
									left: activeTab === "deposit" ? "4px" : "50%",
									right: activeTab === "deposit" ? "50%" : "4px"
								}}
							/>
						</div>

						{/* Region Selector */}
						<RegionSelector value={selectedRegion} onChange={setSelectedRegion} className="w-full sm:w-auto" />
					</div>
				</div>

					{/* Payment Methods Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{methods.map((method) => (
							<motion.div
								key={method.id}
								className="bg-white rounded-[24px] md:rounded-[32px] p-5 md:p-6 hover:shadow-md transition-all border border-gray-200 hover:border-primary-300"
							>
								{/* Method Header */}
								<div className="flex items-center gap-3 mb-5">
									<div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary-100 flex items-center justify-center text-primary-600">
										<div className="w-6 h-6 md:w-7 md:h-7">
											{getIcon(method.icon)}
										</div>
									</div>
									<h3 className="text-lg md:text-xl font-semibold text-black">{method.name}</h3>
								</div>

								{/* Method Details */}
								<div className="space-y-3">
									<div className="flex justify-between items-center">
										<span className="text-xs md:text-sm text-gray-600">{data.labels.duration}</span>
										<span className="text-sm md:text-base font-semibold text-black">{method.duration}</span>
									</div>
									<div className="flex justify-between items-center">
										<span className="text-xs md:text-sm text-gray-600">{data.labels.senderFee}</span>
										<span className="text-sm md:text-base font-semibold text-black">{method.senderFee}</span>
									</div>
									<div className="flex justify-between items-center">
										<span className="text-xs md:text-sm text-gray-600">{data.labels.receiverFee}</span>
										<span className="text-sm md:text-base font-semibold text-black">{method.receiverFee}</span>
									</div>
									<div className="flex justify-between items-center pt-3 border-t border-gray-200">
										<span className="text-xs md:text-sm text-gray-600">{data.labels.limits}</span>
										<span className="text-sm md:text-base font-semibold text-black">{method.limits}</span>
									</div>
								</div>
								</motion.div>
							))}
						</div>
				</div>
				</div>
			</div>
		</section>
	)
}
