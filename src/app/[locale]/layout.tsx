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
import { layoutSeo } from "@/config/seo";
import "../globals.css";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://plexos.app";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const seo = layoutSeo[locale] || layoutSeo.en;

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: seo.defaultTitle,
      template: seo.template,
    },
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: "Plexos" }],
    creator: "Plexos Group Ltd",
    publisher: "Plexos Group Ltd",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      title: seo.ogTitle,
      description: seo.ogDescription,
      type: "website",
      siteName: "Plexos",
      locale,
      images: [
        {
          url: "/cards/card-in-hands.png",
          width: 1200,
          height: 630,
          alt: seo.ogTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.twitterTitle,
      description: seo.twitterDescription,
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
}

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
