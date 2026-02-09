"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
	SendDollars,
	Globe,
	CreditCard,
	Group,
	BellNotification,
	StatsReport,
	ShieldCheck,
	PercentageCircle,
} from "iconoir-react";
import featuresData from "@/data/features.json";
import { featuresAnimations } from "./animations";

const iconMap: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
	SendDollars,
	Globe,
	CreditCard,
	Group,
	BellNotification,
	StatsReport,
	ShieldCheck,
	PercentageCircle,
};

export function FeaturesSection() {
	const t = useTranslations("features");

	return (
		<motion.section
			className="w-full bg-gray-50 py-16 md:py-24 lg:py-32 text-black"
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, margin: "-50px", amount: 0.1 }}
		>
			<div className="px-6 md:px-10 lg:px-12">
				<div className="w-full max-w-[1400px] mx-auto">
					<motion.div
						className="text-center mb-12 md:mb-16"
						variants={featuresAnimations.header.variants}
					>
						<p className="text-sm md:text-base text-neutral-500 uppercase tracking-wide font-medium mb-4">
							{t("title")}
						</p>
						<h2
							className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight max-w-3xl mx-auto"
						>
							{t("title")}
						</h2>
					</motion.div>

					<motion.div
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
						variants={featuresAnimations.grid.variants}
					>
						{featuresData.features.map((feature) => {
							const Icon = iconMap[feature.icon];
							return (
								<motion.div
									key={feature.id}
									className="group bg-white rounded-2xl p-6 md:p-8 border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-sm"
									variants={featuresAnimations.card.variants}
								>
									{Icon && (
										<div className="mb-4 w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
											<Icon className="w-5 h-5 text-primary-700" strokeWidth={1.8} />
										</div>
									)}
									<h3 className="text-lg md:text-xl font-bold text-black mb-2">
										{t(`items.${feature.id}.title`)}
									</h3>
									<p className="text-sm md:text-base text-gray-500 leading-relaxed">
										{t(`items.${feature.id}.description`)}
									</p>
								</motion.div>
							);
						})}
					</motion.div>
				</div>
			</div>
		</motion.section>
	);
}
