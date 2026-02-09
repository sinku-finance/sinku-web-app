"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

interface SecurityReportSectionProps {
	title?: string
	description?: string
	buttonText?: string
	buttonHref?: string
}

export function SecurityReportSection({
	title = "Spotted something suspicious?",
	description = "If you've spotted some unusual activity on your account, don't panic — but stay vigilant. Report it immediately and we'll help keep your money safe from fraud.",
	buttonText = "Report activity",
	buttonHref = "/support"
}: SecurityReportSectionProps) {
	return (
		<section className="relative bg-gray-50 py-20 md:py-32 overflow-hidden">
			<div className="px-6 md:px-10 lg:px-12 relative z-10">
				<div className="w-full max-w-[1400px] mx-auto">
					<div className="max-w-2xl mx-auto text-center">
						<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6">
							{title}
						</h2>
						<p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed">
							{description}
						</p>
						<Button variant="primary" size="lg">
							<Link href={buttonHref}>
								{buttonText}
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	)
}
