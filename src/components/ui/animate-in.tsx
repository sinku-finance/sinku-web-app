"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface AnimateInProps {
	children: ReactNode
	className?: string
	delay?: number
	duration?: number
	y?: number
	once?: boolean
}

export function AnimateIn({
	children,
	className,
	delay = 0,
	duration = 0.5,
	y = 20,
	once = true,
}: AnimateInProps) {
	return (
		<motion.div
			className={className}
			initial={{ opacity: 0, y }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once, margin: "-50px" }}
			transition={{ duration, delay, ease: "easeOut" }}
		>
			{children}
		</motion.div>
	)
}

export function AnimateStagger({
	children,
	className,
	staggerDelay = 0.1,
	once = true,
}: {
	children: ReactNode
	className?: string
	staggerDelay?: number
	once?: boolean
}) {
	return (
		<motion.div
			className={className}
			initial="hidden"
			whileInView="visible"
			viewport={{ once, margin: "-50px" }}
			variants={{
				hidden: {},
				visible: {
					transition: {
						staggerChildren: staggerDelay,
					},
				},
			}}
		>
			{children}
		</motion.div>
	)
}

export function AnimateStaggerChild({
	children,
	className,
}: {
	children: ReactNode
	className?: string
}) {
	return (
		<motion.div
			className={className}
			variants={{
				hidden: { opacity: 0, y: 20 },
				visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
			}}
		>
			{children}
		</motion.div>
	)
}
