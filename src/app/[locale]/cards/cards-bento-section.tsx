"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import { motion } from "framer-motion"

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.12,
			delayChildren: 0.1,
		},
	},
}

const itemVariants = {
	hidden: { opacity: 0, y: 30, scale: 0.98 },
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			duration: 0.5,
			ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
		},
	},
}

const panelClass = "bg-white rounded-2xl md:rounded-3xl"

export function CardsBentoSection() {
	const t = useTranslations("cards.bento")

	return (
		<section className="w-full bg-gray-100 text-black py-6 sm:py-8 md:py-12 xl:py-16 xl:h-screen px-4 sm:px-6 md:px-10 lg:px-16 xl:px-40 2xl:px-52">
			<motion.div
				className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[1.3fr_1fr_1.1fr] xl:grid-rows-2 gap-3 xl:h-full w-full max-w-[1800px] mx-auto"
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.1 }}
			>
				{/* Left Panel - Phone with Apple Pay (tall, spans 2 rows) */}
				<motion.div
					className={`${panelClass} px-6 sm:px-8 pt-8 sm:pt-10 md:pt-12 pb-4 sm:pb-6 flex flex-col items-center text-center xl:row-span-2 min-h-[400px] sm:min-h-[500px] xl:min-h-0 overflow-hidden`}
					variants={itemVariants}
				>
					<h3 className="text-2xl sm:text-3xl md:text-4xl xl:text-[2.5rem] font-bold text-black leading-tight">
						{t("shopOnline")}
					</h3>
					<div className="relative w-full flex-1 mt-6 sm:mt-8 flex items-end justify-center">
						<div className="relative w-[70%] sm:w-[80%] max-w-[380px] h-[90%] sm:h-[92%]">
							<Image
								src="/cards/applepayphone.png"
								alt="Apple Pay with Sinku Card"
								fill
								className="object-contain object-bottom"
							/>
						</div>
					</div>
				</motion.div>

				{/* Center Top - Apple Pay / Contactless / Google Pay */}
				<motion.div
					className={`${panelClass} p-6 sm:p-8 md:p-10 flex flex-col items-center text-center justify-between min-h-[200px] sm:min-h-[240px] overflow-hidden`}
					variants={itemVariants}
				>
					<h3 className="text-2xl sm:text-3xl md:text-4xl xl:text-[2.5rem] font-bold text-black leading-tight">
						{t("tapToPay")}
					</h3>
					<div className="flex items-center justify-center gap-3 sm:gap-5 md:gap-8 xl:gap-10 mt-auto pb-2 w-full min-w-0">
						<Image
							src="/cards/apple-pay.svg"
							alt="Apple Pay"
							width={140}
							height={58}
							className="h-8 sm:h-10 md:h-12 xl:h-14 w-auto min-w-0 shrink"
						/>
						<div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 xl:w-20 xl:h-20 rounded-full border-2 border-black/10 flex items-center justify-center flex-shrink-0">
							<Image
								src="/cards/contactless.svg"
								alt="Contactless"
								width={56}
								height={56}
								className="w-6 h-6 sm:w-7 sm:h-7 md:w-10 md:h-10 xl:w-12 xl:h-12"
							/>
						</div>
						<Image
							src="/cards/google-pay.svg"
							alt="Google Pay"
							width={140}
							height={58}
							className="h-8 sm:h-10 md:h-12 xl:h-14 w-auto min-w-0 shrink"
						/>
					</div>
				</motion.div>

				{/* Right Panel - Cards (tall, spans 2 rows) */}
				<motion.div
					className={`${panelClass} p-4 sm:p-6 md:p-8 pb-6 sm:pb-8 md:pb-10 flex flex-col items-center text-center xl:row-span-2 min-h-[350px] sm:min-h-[500px] xl:min-h-0`}
					variants={itemVariants}
				>
					<div className="relative flex-1 w-full flex items-center justify-center">
						<div className="relative w-full h-full">
							<Image
								src="/cards/cards3.png"
								alt="Sinku Mastercard cards"
								fill
								className="object-contain"
							/>
						</div>
					</div>
					<h3 className="text-2xl sm:text-3xl md:text-4xl xl:text-[2.5rem] font-bold text-black leading-tight mt-4">
						{t("withdrawATM")}
					</h3>
				</motion.div>

				{/* Center Bottom - Send money */}
				<motion.div
					className={`${panelClass} p-6 sm:p-8 md:p-10 flex flex-col items-center text-center justify-center min-h-[180px] sm:min-h-[240px]`}
					variants={itemVariants}
				>
					<h3 className="text-2xl sm:text-3xl md:text-4xl xl:text-[2.5rem] font-bold text-black leading-tight">
						{t("sendMoney")}
					</h3>
				</motion.div>
			</motion.div>
		</section>
	)
}
