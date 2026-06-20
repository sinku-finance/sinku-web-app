// Production-ready cookie consent implementation
// Based on industry standards and GDPR requirements

export interface CookieConsentData {
	consent: {
		essential: boolean
		preferences: boolean
		analytics: boolean
		advertising: boolean
	}
	timestamp: string
	version: string
	region: string
	ip?: string // Optional, for audit
}

// Set cookie with proper security attributes
export function setConsentCookie(data: CookieConsentData) {
	const cookieData = JSON.stringify(data)
	const encoded = encodeURIComponent(cookieData)
	
	// 1 year expiration
	const maxAge = 365 * 24 * 60 * 60
	
	// Set with security attributes
	document.cookie = `sinku_consent=${encoded}; max-age=${maxAge}; path=/; secure; samesite=strict`
}

// Get consent from cookie
export function getConsentCookie(): CookieConsentData | null {
	const cookies = document.cookie.split(';')
	const consentCookie = cookies.find(c => c.trim().startsWith('sinku_consent='))
	
	if (!consentCookie) return null
	
	try {
		const value = consentCookie.split('=')[1]
		return JSON.parse(decodeURIComponent(value))
	} catch {
		return null
	}
}

// Update Google Consent Mode (GA4)
export function updateGoogleConsent(consent: CookieConsentData['consent']) {
	if (typeof window === 'undefined' || !window.gtag) return
	
	window.gtag('consent', 'update', {
		'analytics_storage': consent.analytics ? 'granted' : 'denied',
		'ad_storage': consent.advertising ? 'granted' : 'denied',
		'ad_user_data': consent.advertising ? 'granted' : 'denied',
		'ad_personalization': consent.advertising ? 'granted' : 'denied',
		'functionality_storage': consent.preferences ? 'granted' : 'denied',
	})
}

// Log consent to backend for audit trail (GDPR requirement)
export async function logConsent(data: CookieConsentData) {
	try {
		await fetch('/api/consent/log', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		})
	} catch (error) {
		console.error('Failed to log consent:', error)
	}
}

// Industry standard: Check if consent is needed based on region
export function needsConsent(region: string): boolean {
	// GDPR countries (EU + EEA + UK)
	const gdprRegions = [
		'portugal', 'spain', 'france', 'germany', 'italy',
		'netherlands', 'belgium', 'austria', 'sweden', 'denmark',
		'finland', 'ireland', 'greece', 'poland', 'czech',
		'hungary', 'romania', 'bulgaria', 'croatia', 'slovakia',
		'slovenia', 'lithuania', 'latvia', 'estonia', 'cyprus',
		'malta', 'luxembourg', 'uk', 'norway', 'iceland', 'liechtenstein'
	]
	
	// CCPA/CPRA (California)
	const ccpaRegions = ['california', 'us-ca']
	
	return gdprRegions.includes(region.toLowerCase()) || 
	       ccpaRegions.includes(region.toLowerCase())
}

// Declare gtag for TypeScript
declare global {
	interface Window {
		gtag?: (...args: any[]) => void
	}
}
