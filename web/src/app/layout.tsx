import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import {
  SiteConfigRepository,
  ZoneRepository,
} from "../core/database/repositories";
import { Header, Footer, StickyCallBar } from "../shared";
import Script from "next/script";
import {
  SITE_URL,
  SITE_KEYWORDS,
  GOOGLE_SITE_VERIFICATION,
  GOOGLE_TAG_MANAGER_ID,
  buildLocalBusinessSchema,
  buildParkAttractionSchema,
  buildWebSiteSchema,
  buildServiceListSchema,
} from "../core/utils/seo";

// ─── Fonts ────────────────────────────────────────────────────────────────────

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
  preload: false,
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  preload: false,
});

// ─── Static data (evaluated at build time) ────────────────────────────────────

const config = SiteConfigRepository.getConfig();

// ─── Viewport ─────────────────────────────────────────────────────────────────

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#17211A",
};

// ─── Root Metadata ────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Jim Corbett Safari Booking | Jeep & Canter Safari | Dhikala Zone | Panthera Corbett Safari",
    template: `%s | ${config.shortName}`,
  },
  description:
    "Book Jim Corbett safari online — Dhikala canter safari ₹2,299/person, jeep safari from ₹5,999/jeep. Delhi to Jim Corbett packages available. All zones: Bijrani, Jhirna, Dhikala, Garjiya. Licensed Uttarakhand operator. Call +91 99974 88004.",
  keywords: SITE_KEYWORDS,
  authors: [{ name: config.name, url: SITE_URL }],
  creator: config.name,
  publisher: config.name,
  generator: undefined,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/icon.jpg", type: "image/jpeg" }],
    apple: "/icon.jpg",
  },
  verification: {
    google: GOOGLE_SITE_VERIFICATION,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: config.name,
    title: "Jim Corbett Safari Booking | Jeep & Canter Safari | Panthera Corbett Safari",
    description:
      "Book Jim Corbett safari online. Dhikala canter safari, jeep safari, Delhi packages. All zones covered. Local Ramnagar safari specialists.",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Jim Corbett Safari — Panthera Corbett Safari, Ramnagar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jim Corbett Safari Booking | Jeep & Canter Safari | Panthera Corbett",
    description:
      "Book safari permits and Dhikala FRH stays. All Corbett zones. Licensed Uttarakhand Forest Dept operator.",
    images: [`${SITE_URL}/og-image.jpg`],
  },
  alternates: { canonical: SITE_URL },
  category: "travel",
};

// ─── Root JSON-LD (@graph) ────────────────────────────────────────────────────
// Built entirely via seo.ts pure functions. Adding a new schema = one builder call.

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    buildLocalBusinessSchema({
      name: config.name,
      description: config.description,
      telephone: config.contact.phoneDisplay,
      email: config.contact.email,
      streetAddress: config.contact.officeAddress.line1,
      city: config.contact.officeAddress.city,
      state: config.contact.officeAddress.state,
      pincode: config.contact.officeAddress.pincode,
      instagram: config.social.instagram,
      facebook: config.social.facebook,
      googleBusinessProfile: config.social.googleBusinessProfile,
    }),
    buildParkAttractionSchema(),
    buildWebSiteSchema(config.name),
    buildServiceListSchema(),
  ],
};

// ─── Root Layout ──────────────────────────────────────────────────────────────

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const contact = SiteConfigRepository.getContact();
  const whatsAppLink = SiteConfigRepository.getWhatsAppLink();
  const zones = ZoneRepository.getAllZones();

  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        {/* Google Tag Manager */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GOOGLE_TAG_MANAGER_ID}');`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#FBF8F0] text-[#17211A] font-sans">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GOOGLE_TAG_MANAGER_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Header
          phoneDisplay={contact.phoneDisplay}
          phoneRaw={contact.phoneRaw}
          whatsAppLink={whatsAppLink}
        />
        <main className="flex-grow">{children}</main>
        <Footer config={config} zones={zones} />
        <StickyCallBar
          phoneRaw={contact.phoneRaw}
          phoneDisplay={contact.phoneDisplay}
          whatsAppLink={whatsAppLink}
        />
      </body>
    </html>
  );
}
