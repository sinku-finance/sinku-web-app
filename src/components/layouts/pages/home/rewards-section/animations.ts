/**
 * Rewards Section Animation Configurations
 */

export const rewardsAnimations = {
	section: {
		initial: "hidden",
		whileInView: "visible",
		viewport: { once: true, margin: "-150px", amount: 0.3 }
	},

	textContent: {
		variants: {
			hidden: { opacity: 0 },
			visible: {
				opacity: 1,
				transition: {
					staggerChildren: 0.12,
					delayChildren: 0,
				},
			},
		},
	},

	title: {
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

	subtitle: {
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

	buttons: {
		variants: {
			hidden: { 
				opacity: 0, 
				y: 15,
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

	imagesGrid: {
		variants: {
			hidden: { opacity: 0 },
			visible: {
				opacity: 1,
				transition: {
					staggerChildren: 0.15,
					delayChildren: 0.2,
				},
			},
		},
	},

	image: {
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
					duration: 0.6,
					ease: [0.25, 0.46, 0.45, 0.94] as const,
				},
			},
		},
	},
}
