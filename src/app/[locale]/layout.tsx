import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/config";
import { Footer } from "@/components/layouts/footer";
import { CookieConsent } from "@/components/layouts/modals/cookies/cookie-consent";
import { CookieSettingsLink } from "@/components/layouts/modals/cookies/cookie-settings-link";
import "../globals.css";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://plexos.app";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Plexos — Introducing You to the Global Economy",
    template: "%s | Plexos",
  },
  description:
    "Send money abroad, pay online worldwide, and hold multiple currencies — all from one app. International debit cards, real exchange rates, and zero monthly fees.",
  keywords: [
    "international debit card",
    "send money abroad",
    "international payments",
    "multi-currency account",
    "money transfer",
    "currency exchange",
    "digital wallet",
    "fintech",
    "Plexos",
    "Mastercard international",
    "cross-border payments",
    "remittance",
  ],
  authors: [{ name: "Plexos" }],
  creator: "Plexos Group Ltd",
  publisher: "Plexos Group Ltd",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Plexos — Introducing You to the Global Economy",
    description:
      "Send money abroad, pay online worldwide, and hold multiple currencies — all from one app. Real exchange rates and zero monthly fees.",
    type: "website",
    siteName: "Plexos",
    locale: "en",
    images: [
      {
        url: "/cards/card-in-hands.png",
        width: 1200,
        height: 630,
        alt: "Plexos — Introducing You to the Global Economy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Plexos — Introducing You to the Global Economy",
    description:
      "Send money abroad, pay online worldwide, and hold multiple currencies — all from one app. Real exchange rates and zero monthly fees.",
    images: ["/cards/card-in-hands.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      pt: "/pt",
    },
  },
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Providing all messages to the client side
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} className="overflow-x-hidden">
      <body className={`${outfit.variable} font-sans antialiased overflow-x-hidden`}>
        <NextIntlClientProvider messages={messages}>
          {children}
          <Footer />
          <CookieConsent />
          <CookieSettingsLink />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
