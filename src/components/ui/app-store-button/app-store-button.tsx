"use client"

import { useTranslations } from "next-intl"
import Link from "next/link"

import { AppleIcon, GooglePlayIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type AppStoreButtonProps = {
	store: "apple" | "google"
	href: string
	className?: string
}

// Until the app is live on the stores, every store button routes to the
// /download-app page instead of its real `href`. Once live, revert to using
// the `href` prop and add back target="_blank" rel="noopener noreferrer".
export function AppStoreButton({ store, href, className }: AppStoreButtonProps) {
	const t = useTranslations("hero.appStore")

	const label = store === "apple" ? t("downloadOn") : t("getItOn")
	const storeName = store === "apple" ? t("appStore") : t("googlePlay")

	const Icon = store === "apple" ? AppleIcon : GooglePlayIcon

	return (
		<Button variant="outline" size="lg" className={cn(" border-black", className)}>
			<Link href="/download-app" className="flex items-center gap-2">
				<Icon className="w-6 h-6 shrink-0" />
				<div className="flex flex-col items-start gap-0.5">
					<span className="text-[10px] font-medium uppercase tracking-wide leading-none">{label}</span>
					<span className="text-base font-semibold leading-none">{storeName}</span>
				</div>
			</Link>
		</Button>
	)
}
