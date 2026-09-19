import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: "https://pantheracorbettsafari.com/sitemap.xml",
    host: "https://pantheracorbettsafari.com",
  };
}
