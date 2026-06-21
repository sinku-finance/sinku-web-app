"use client";

import { useEffect, useState } from "react";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";

// three.js (via the shadergradient dependency) spams a "THREE.Clock has been
// deprecated" warning every frame. It's harmless and unfixable from our side,
// so filter just that one message to keep the console readable.
if (typeof window !== "undefined") {
	const g = window as unknown as { __clockWarnFiltered?: boolean };
	if (!g.__clockWarnFiltered) {
		g.__clockWarnFiltered = true;
		for (const method of ["warn", "error"] as const) {
			const original = console[method].bind(console);
			console[method] = (...args: unknown[]) => {
				if (typeof args[0] === "string" && args[0].includes("THREE.Clock")) return;
				original(...args);
			};
		}
	}
}

type CardGradientProps = {
	/** [color1, color2, color3] — the card's brand colour family */
	colors: readonly [string, string, string];
	/** animation phase offset, so cards don't move in sync */
	uTime?: number;
	/** per-card speed, so cards drift apart over time */
	uSpeed?: number;
};

// Shape + motion from shadergradient.co's "Mandarin" preset; colours, time and
// speed are overridden per-card. brightness/reflection tuned for a soft look.
const MANDARIN = {
	type: "waterPlane",
	shader: "defaults",
	animate: "on",
	uAmplitude: 0,
	uDensity: 1.8,
	uStrength: 3,
	uFrequency: 5.5,
	// continuous animation — no rangeStart/rangeEnd loop, so it never visibly restarts
	range: "disabled",
	frameRate: 10,
	brightness: 1.2,
	cAzimuthAngle: 180,
	cDistance: 2.4,
	cPolarAngle: 95,
	cameraZoom: 1,
	grain: "off",
	lightType: "3d",
	reflection: 0,
	positionX: 0,
	positionY: -2.1,
	positionZ: 0,
	rotationX: 0,
	rotationY: 0,
	rotationZ: 225,
	envPreset: "city",
	wireframe: false,
} as const;

export function CardGradient({ colors, uTime = 0, uSpeed = 0.2 }: CardGradientProps) {
	const [color1, color2, color3] = colors;
	const [ready, setReady] = useState(false);

	// Hold the canvas hidden until the shader has had a couple of frames to
	// compile and paint, then fade it in over the (matching) CSS fallback —
	// avoids the black first-frame flash on load.
	useEffect(() => {
		const id = setTimeout(() => setReady(true), 140);
		return () => clearTimeout(id);
	}, []);

	return (
		<div
			className="absolute inset-0"
			style={{
				opacity: ready ? 1 : 0,
				transition: "opacity 800ms ease-out",
				pointerEvents: "none",
			}}
		>
			<ShaderGradientCanvas
				style={{
					position: "absolute",
					inset: 0,
					width: "100%",
					height: "100%",
					backgroundColor: "transparent",
					pointerEvents: "none",
				}}
				pointerEvents="none"
				pixelDensity={1}
				fov={45}
				// keep the canvas mounted when scrolled out of view — otherwise it
				// unmounts/remounts and re-initialises (glitches) on every re-entry
				lazyLoad={false}
			>
				<ShaderGradient
					control="props"
					{...MANDARIN}
					enableTransition={false}
					uTime={uTime}
					uSpeed={uSpeed}
					color1={color1}
					color2={color2}
					color3={color3}
				/>
			</ShaderGradientCanvas>
		</div>
	);
}
