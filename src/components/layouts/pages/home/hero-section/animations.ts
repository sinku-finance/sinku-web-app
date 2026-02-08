/**
 * Hero Section Animation Configurations
 */

export const heroAnimations = {
	container: {
		initial: "hidden",
		animate: "visible",
	},

	contentWrapper: {
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
					duration: 0.6,
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
					duration: 0.6,
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
}
