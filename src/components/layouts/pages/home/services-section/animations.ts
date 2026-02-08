/**
 * Services Section Animation Configurations
 */

export const servicesAnimations = {
	section: {
		initial: "hidden",
		whileInView: "visible",
		viewport: { once: true, margin: "0px", amount: 0.1 }
	},

	header: {
		variants: {
			hidden: { opacity: 0 },
			visible: {
				opacity: 1,
				transition: {
					staggerChildren: 0.1,
					delayChildren: 0,
				},
			},
		},
	},

	tagline: {
		variants: {
			hidden: { 
				opacity: 0, 
				x: -20,
			},
			visible: {
				opacity: 1,
				x: 0,
				transition: {
					duration: 0.5,
					ease: [0.25, 0.46, 0.45, 0.94] as const,
				},
			},
		},
	},

	titleSection: {
		variants: {
			hidden: { 
				opacity: 0, 
				y: 20,
			},
			visible: {
				opacity: 1,
				y: 0,
				transition: {
					duration: 0.5,
					ease: [0.25, 0.46, 0.45, 0.94] as const,
				},
			},
		},
	},

	cardsContainer: {
		variants: {
			hidden: { opacity: 0 },
			visible: {
				opacity: 1,
				transition: {
					staggerChildren: 0.15,
					delayChildren: 0.1,
				},
			},
		},
	},

	card: {
		variants: {
			hidden: { 
				opacity: 0, 
				y: 30,
				scale: 0.98,
			},
			visible: {
				opacity: 1,
				y: 0,
				scale: 1,
				transition: {
					duration: 0.5,
					ease: [0.25, 0.46, 0.45, 0.94] as const,
				},
			},
		},
	},
}
