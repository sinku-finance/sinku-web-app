/**
 * Button Animation Configurations
 */

export const buttonAnimations = {
	// Press animation - scale down on hover/tap
	press: {
		whileHover: { scale: 0.97 },
		whileTap: { scale: 0.95 },
		transition: { duration: 0.2, ease: [0.33, 1, 0.68, 1] as const },
	},
}
