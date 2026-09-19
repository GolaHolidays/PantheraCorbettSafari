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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#17211A",
};

export const metadata: Metadata = {
  title: `${config.name} | Jim Corbett Safari Permits & Forest Rest House Bookings`,
  description: config.description,
  keywords: [
    "Jim Corbett Safari",
    "Dhikala Safari Booking",
    "Bijrani Jeep Safari",
    "Corbett Tiger Reserve Permit",
    "Dhikala Forest Rest House",
    "Jim Corbett Canter Safari",
    "Ramnagar Safari Booking",
    "Forest Rest House Corbett",
  ],
  authors: [{ name: config.name }],
  icons: {
    icon: "/icon.jpg",
    apple: "/icon.jpg",
  },
  generator: undefined,
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
