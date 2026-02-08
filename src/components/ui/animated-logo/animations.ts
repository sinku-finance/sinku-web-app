/**
 * Logo 3D Flip Animation Configurations
 */

export const logoAnimations = {
	container: {
		initial: "initial",
		whileHover: "hover",
	},

	flipContainer: {
		variants: {
			initial: {
				rotateX: 0,
			},
			hover: {
				rotateX: 90,
			},
		},
		transition: {
			duration: 0.75,
			ease: [0.76, 0, 0.24, 1] as const,
		},
	},

	frontText: {
		variants: {
			initial: {
				y: 0,
				opacity: 1,
			},
			hover: {
				y: "-100%",
				opacity: 0,
			},
		},
		transition: {
			duration: 0.75,
			ease: [0.76, 0, 0.24, 1] as const,
		},
	},

	backText: {
		variants: {
			initial: {
				opacity: 0,
			},
			hover: {
				opacity: 1,
			},
		},
		transition: {
			duration: 0.75,
			ease: [0.76, 0, 0.24, 1] as const,
		},
		style: {
			transformOrigin: "bottom center",
			transform: "rotateX(-90deg) translateY(50%)",
		},
	},
}
