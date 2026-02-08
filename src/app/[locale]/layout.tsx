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

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Plexos — The International Card & Money App for Africa",
  description:
    "Send money abroad, pay online worldwide, and hold multiple currencies — all from one app. Built for Cape Verde, Angola, Mozambique, and the diaspora. Zero monthly fees.",
  keywords: [
    "international debit card Africa",
    "send money Cape Verde",
    "send money Angola",
    "send money Mozambique",
    "remittance Africa",
    "fintech Africa",
    "digital wallet Africa",
    "currency exchange",
    "international payments",
    "diaspora money transfer",
  ],
  authors: [{ name: "Plexos" }],
  openGraph: {
    title: "Plexos — The International Card & Money App for Africa",
    description: "Send money abroad, pay online worldwide, and hold multiple currencies. Built for Portuguese-speaking Africa and the diaspora.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Plexos — The International Card & Money App for Africa",
    description: "Send money abroad, pay online worldwide, and hold multiple currencies. Built for Portuguese-speaking Africa and the diaspora.",
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
