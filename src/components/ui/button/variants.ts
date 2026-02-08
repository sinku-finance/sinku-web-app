import { cva } from "class-variance-authority"

export const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default: "bg-black text-white shadow hover:bg-black/95 focus-visible:ring-primary-500",
				primary: "text-black shadow focus-visible:ring-primary-500 bg-primary-500 hover:bg-primary-600",
				outline:
					"bg-transparent text-black border-2 border-black hover:border-black hover:bg-black/5 focus-visible:ring-primary-500",
				secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 focus-visible:ring-primary-500",
				ghost: "hover:bg-accent hover:text-accent-foreground focus-visible:ring-primary-500",
				link: "text-primary-500 underline-offset-4 hover:underline focus-visible:ring-primary-500",
			},
			size: {
				default: "h-auto py-3 px-6",
				sm: "h-auto py-2.5 px-4 text-sm",
				lg: "h-auto py-4 px-8 text-base",
				icon: "h-9 w-9",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
)
