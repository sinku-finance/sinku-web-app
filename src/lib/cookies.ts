// Cookie management utilities

export function getCookieConsent() {
	if (typeof window === "undefined") return null
	const consent = localStorage.getItem("cookieConsent")
	
	if (!consent) return null
	
	// If it's a simple string (all or essential)
	if (consent === "all" || consent === "essential") {
		return consent
	}
	
	// If it's JSON with detailed preferences
	try {
		return JSON.parse(consent)
	} catch {
		return null
	}
}

export function clearCookieConsent() {
	if (typeof window === "undefined") return
	localStorage.removeItem("cookieConsent")
}

export function hasCookieConsent() {
	if (typeof window === "undefined") return false
	return localStorage.getItem("cookieConsent") !== null
}
