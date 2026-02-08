/**
 * Language Selector Animation Configurations
 */

export const languageSelectorAnimations = {
	// Button press animation
	button: {
		whileHover: { scale: 0.97 },
		whileTap: { scale: 0.95 },
		transition: { duration: 0.2, ease: [0.33, 1, 0.68, 1] as const },
	},

	// Dropdown container animation
	dropdown: {
		initial: { opacity: 0, y: -8, scale: 0.96 },
		animate: { opacity: 1, y: 0, scale: 1 },
		exit: { opacity: 0, y: -8, scale: 0.95 },
		transition: {
			duration: 0.2,
			ease: [0.32, 0.72, 0, 1] as const,
			exit: {
				duration: 0.15,
				ease: [0.4, 0, 1, 1] as const,
			},
		},
	},

	// Item stagger animation
	item: (index: number) => ({
		initial: { opacity: 0, x: -10 },
		animate: { opacity: 1, x: 0 },
		exit: { opacity: 0, x: -10 },
		transition: {
			duration: 0.15,
			delay: index * 0.05,
			ease: [0.32, 0.72, 0, 1] as const,
		},
	}),
}
