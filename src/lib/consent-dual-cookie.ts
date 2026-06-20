// Best practice: Dual cookie system for consent management
// Based on industry standards from fintech companies

export interface ConsentPreferences {
	essential: boolean
	preferences: boolean
	analytics: boolean
	advertising: boolean
}

export interface ConsentAuditRecord {
	preferences: ConsentPreferences
	timestamp: string
	version: string
	region: string
	userAgent: string
}

/**
 * Cookie 1: Client-side accessible (for blocking trackers)
 * NOT HTTP-only - needs to be readable by JavaScript
 */
export function setClientConsentCookie(preferences: ConsentPreferences) {
	const value = JSON.stringify(preferences)
	const encoded = encodeURIComponent(value)
	const maxAge = 365 * 24 * 60 * 60 // 1 year
	
	// NOT httponly - JavaScript needs to read this
	document.cookie = `sinku_consent_prefs=${encoded}; max-age=${maxAge}; path=/; secure; samesite=strict`
}

/**
 * Cookie 2: HTTP-only (for audit/compliance - backend only)
 * This is set by the server after API call
 */
export async function setServerConsentCookie(record: ConsentAuditRecord) {
	// This is called as an API, server sets HTTP-only cookie
	await fetch('/api/consent/record', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(record),
	})
	// Server response sets: Set-Cookie: sinku_consent_record=xxx; HttpOnly; Secure; SameSite=Strict
}

/**
 * Get client-side preferences (to block trackers)
 */
export function getClientConsent(): ConsentPreferences | null {
	const cookies = document.cookie.split(';')
	const consentCookie = cookies.find(c => c.trim().startsWith('sinku_consent_prefs='))
	
	if (!consentCookie) return null
	
	try {
		const value = consentCookie.split('=')[1]
		return JSON.parse(decodeURIComponent(value))
	} catch {
		return null
	}
}

/**
 * Check if specific tracker should be loaded
 */
export function shouldLoadTracker(type: keyof ConsentPreferences): boolean {
	const consent = getClientConsent()
	if (!consent) return false // No consent = don't load
	return consent[type] === true
}

/**
 * Usage example:
 */
export function initializeTracking() {
	// Google Analytics
	if (shouldLoadTracker('analytics')) {
		loadGoogleAnalytics()
	}
	
	// Facebook Pixel
	if (shouldLoadTracker('advertising')) {
		loadFacebookPixel()
	}
	
	// Preferences (e.g., language, theme)
	if (shouldLoadTracker('preferences')) {
		enablePreferenceCookies()
	}
}

function loadFacebookPixel() {
	// TODO: Add Facebook Pixel implementation
}

function enablePreferenceCookies() {
	// TODO: Add preference cookies implementation
}

function loadGoogleAnalytics() {
	const script = document.createElement('script')
	script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID'
	script.async = true
	document.head.appendChild(script)
	
	window.dataLayer = window.dataLayer || []
	function gtag(...args: any[]) {
		window.dataLayer.push(args)
	}
	gtag('js', new Date())
	gtag('config', 'GA_MEASUREMENT_ID')
}

// TypeScript declarations
declare global {
	interface Window {
		dataLayer: any[]
	}
}
