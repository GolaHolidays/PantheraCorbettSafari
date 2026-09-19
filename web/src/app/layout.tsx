import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import {
  SiteConfigRepository,
  ZoneRepository,
} from "../core/database/repositories";
import { Header, Footer, StickyCallBar } from "../shared";

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

const config = SiteConfigRepository.getConfig();

const SITE_URL = "https://pantheracorbettsafari.corbettcamp.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#17211A",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${config.name} — Jim Corbett Safari Permits & Forest Rest House Bookings`,
    template: `%s | ${config.name}`,
  },
  description:
    "Book Jim Corbett safari permits and Dhikala Forest Rest House stays directly. Bijrani, Jhirna, Garjiya, Dhikala — all zones. Licensed by Uttarakhand Forest Department. Call +91 99974 88004.",
  keywords: [
    "Jim Corbett safari booking",
    "Corbett Tiger Reserve permit",
    "Bijrani jeep safari",
    "Dhikala safari permit",
    "Dhikala Forest Rest House booking",
    "Jim Corbett canter safari",
    "Jhirna safari Ramnagar",
    "Garjiya zone safari",
    "forest rest house Corbett",
    "Jim Corbett package tour",
    "Ramnagar safari desk",
    "Corbett overnight stay",
    "tiger safari India",
    "Uttarakhand wildlife safari",
    "Corbett jeep safari booking",
  ],
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
    icon: [
      { url: "/icon.jpg", type: "image/jpeg" },
    ],
    apple: "/icon.jpg",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: config.name,
    title: `${config.name} — Jim Corbett Safari Permits & Forest Rest House Bookings`,
    description:
      "Book Jim Corbett safari permits and Dhikala Forest Rest House stays directly. Bijrani, Jhirna, Garjiya and all zones covered. Licensed operator since 2009.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Jim Corbett Safari — Panthera Corbett Safari, Ramnagar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${config.name} — Jim Corbett Safari Permits`,
    description:
      "Book safari permits and Dhikala FRH stays. All Corbett zones. Licensed Uttarakhand Forest Dept operator.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: "travel",
};

/** JSON-LD: LocalBusiness + TouristAttraction schema */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#business`,
      name: config.name,
      description: config.description,
      url: SITE_URL,
      telephone: config.contact.phoneDisplay,
      email: config.contact.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: config.contact.officeAddress.line1,
        addressLocality: config.contact.officeAddress.city,
        addressRegion: config.contact.officeAddress.state,
        postalCode: config.contact.officeAddress.pincode,
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 29.3931,
        longitude: 79.0506,
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday",
        ],
        opens: "06:00",
        closes: "21:30",
      },
      priceRange: "₹₹",
      image: `${SITE_URL}/og-image.jpg`,
      sameAs: [
        config.social.instagram,
        config.social.facebook,
        config.social.googleBusinessProfile,
      ],
    },
    {
      "@type": "TouristAttraction",
      "@id": `${SITE_URL}/#attraction`,
      name: "Jim Corbett Tiger Reserve Safari",
      description:
        "Jim Corbett Tiger Reserve is India's oldest national park, covering 1,288 sq km in Uttarakhand. Known for Bengal tigers, Asian elephants, gharials, and over 600 bird species.",
      url: SITE_URL,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ramnagar",
        addressRegion: "Uttarakhand",
        addressCountry: "IN",
      },
      touristType: ["Wildlife Photography", "Safari", "Birdwatching", "Nature Tourism"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: config.name,
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/zones/{search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
