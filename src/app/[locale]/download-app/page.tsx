import { defaultLocale } from "@/i18n/config"
import { redirect } from "next/navigation"

export default async function DownloadAppPage({
	params,
}: {
	params: Promise<{ locale: string }>
}) {
	const { locale } = await params
	redirect(locale === defaultLocale ? "/waitlist" : `/${locale}/waitlist`)
}
