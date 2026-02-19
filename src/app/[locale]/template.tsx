"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"

export default function Template({ children }: { children: React.ReactNode }) {
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	return (
		<motion.div
			initial={{ opacity: 0, y: "100vh", scale: 0.92 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			transition={{
				duration: 0.7,
				ease: [0.22, 1, 0.36, 1],
			}}
			style={{ transformOrigin: "center top" }}
		>
			{children}
		</motion.div>
	)
}
