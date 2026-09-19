import type { Metadata } from "next";
import { SiteConfigRepository } from "../database/repositories";

export function generatePageMetadata(props: {
  title?: string;
  description?: string;
  canonicalPath?: string;
}): Metadata {
  const config = SiteConfigRepository.getConfig();
  const title = props.title
    ? `${props.title} | ${config.shortName}`
    : `${config.name} | Official Jim Corbett Safari Bookings`;
  const description = props.description || config.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: config.name,
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: props.canonicalPath || "/",
    },
  };
}
