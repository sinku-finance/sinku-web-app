import Image from "next/image"
import { cn } from "@/lib/utils"

type AnimatedLogoProps = {
	className?: string
}

export function AnimatedLogo({ className }: AnimatedLogoProps) {
	return (
		<div className={cn("inline-flex items-center justify-center", className)}>
			<Image
				src="/logo.png"
				alt="Sinku"
				width={151}
				height={36}
				priority
			/>
		</div>
	)
}
