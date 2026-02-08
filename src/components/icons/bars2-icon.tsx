import type { SVGProps } from "react"

type IconProps = SVGProps<SVGSVGElement>

export function Bars2Icon(props: IconProps) {
	return (
		<svg
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
			{...props}
		>
			<path d="M3 7h14M3 13h14" />
		</svg>
	)
}
