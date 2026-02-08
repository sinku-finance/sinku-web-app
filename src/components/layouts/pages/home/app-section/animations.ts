/**
 * App Section Animation Configurations
 */

export const appAnimations = {
	section: {
		initial: "hidden",
		whileInView: "visible",
		viewport: { once: true, margin: "-50px", amount: 0.1 }
	},

	content: {
		variants: {
			hidden: { opacity: 0 },
			visible: {
				opacity: 1,
				transition: {
					staggerChildren: 0.15,
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

	qrCode: {
		variants: {
			hidden: { 
				opacity: 0, 
				scale: 0.95,
			},
			visible: {
				opacity: 1,
				scale: 1,
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

	image: {
		variants: {
			hidden: { 
				opacity: 0, 
				x: 30,
				scale: 0.98,
			},
			visible: {
				opacity: 1,
				x: 0,
				scale: 1,
				transition: {
					duration: 0.6,
					ease: [0.25, 0.46, 0.45, 0.94] as const,
				},
			},
		},
	},

	iphone: {
		variants: {
			hidden: { 
				opacity: 0, 
				y: 50,
			},
			visible: {
				opacity: 1,
				y: 0,
				transition: {
					duration: 0.7,
					delay: 0.3,
					ease: [0.25, 0.46, 0.45, 0.94] as const,
				},
			},
		},
	},
}
