import type { Metadata } from "next"
import { Header } from "@/components/layouts/header/header"
import { ReferralClaimSection } from "./referral-claim-section"

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string; code: string }>
}): Promise<Metadata> {
	const { code } = await params

	return {
		title: "You were invited to Plexos",
		description: `Join Plexos — your friend ${code.replace(/_/g, " ")} invited you. Travel globally and send money abroad at great exchange rates.`,
		robots: {
			index: false,
			follow: false,
		},
	}
}

export default async function ReferralPage({
	params,
}: {
	params: Promise<{ code: string }>
}) {
	const { code } = await params

	return (
		<>
			<Header />
			<main id="main-content" className="relative bg-white overflow-hidden min-h-screen">
				<ReferralClaimSection referralCode={code} />
			</main>
		</>
	)
}
