"use client"

import { useEffect } from "react"
import { clearCookieConsent } from "@/lib/cookies"

export function CookieSettingsLink() {
	useEffect(() => {
		const handleCookieSettings = (e: MouseEvent) => {
			const target = e.target as HTMLElement
			const link = target.closest('a[href="#cookie-settings"]')
			
			if (link) {
				e.preventDefault()
				// Clear the consent to show the modal again
				clearCookieConsent()
				// Reload the page to show the cookie modal
				window.location.reload()
			}
		}

		document.addEventListener("click", handleCookieSettings)
		return () => document.removeEventListener("click", handleCookieSettings)
	}, [])

	return null
}
