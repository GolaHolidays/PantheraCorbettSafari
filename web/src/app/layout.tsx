import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import {
  SiteConfigRepository,
  ZoneRepository,
} from "../core/database/repositories";
import { Header, Footer, StickyCallBar } from "../shared";
import {
  SITE_URL,
  SITE_KEYWORDS,
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
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
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
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: config.name,
    title: "Jim Corbett Safari Booking | Jeep & Canter Safari | Panthera Corbett Safari",
    description:
      "Book Jim Corbett safari online. Dhikala canter safari, jeep safari, Delhi packages. All zones covered. Licensed Uttarakhand Forest Dept operator since 2009.",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#FBF8F0] text-[#17211A] font-sans">
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
