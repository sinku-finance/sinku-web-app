"use client"

import { Slot } from "@radix-ui/react-slot"
import { type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"
import * as React from "react"

import { cn } from "@/lib/utils"
import { buttonAnimations } from "./animations"
import { buttonVariants } from "./variants"

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, id, children, onClick, disabled, type = "button", ...props }, ref) => {
		if (asChild) {
			return (
				<Slot
					className={cn(buttonVariants({ variant, size, className }))}
					ref={ref}
					id={id}
					{...props}
				>
					{children}
				</Slot>
			)
		}

		return (
			<motion.button
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				id={id}
				onClick={onClick}
				disabled={disabled}
				type={type}
				whileHover={{ scale: 0.97 }}
				whileTap={{ scale: 0.95 }}
				transition={buttonAnimations.press.transition}
			>
				{children}
			</motion.button>
		)
	},
)
Button.displayName = "Button"

export { Button, buttonVariants }
