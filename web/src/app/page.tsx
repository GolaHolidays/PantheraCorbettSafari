import React from "react";
import {
  SiteConfigRepository,
  TrustMetricsRepository,
  ZoneRepository,
  PackageRepository,
  RestHouseRepository,
  SafariRepository,
  SecondaryServicesRepository,
  TestimonialRepository,
  FaqRepository,
} from "../core/database/repositories";
import { buildFaqSchema } from "../core/utils/seo";

import { HeroBanner, TrustRow } from "../features/hero";
import { ZoneGrid } from "../features/zones";
import { PackageGrid } from "../features/packages";
import { RestHouseSection } from "../features/rest-houses";
import { SafariComparison } from "../features/safari-types";
import { SecondaryServicesSection } from "../features/secondary-services";
import { TestimonialSection } from "../features/testimonials";
import { FaqAccordion } from "../features/faq";

// SSG Page - Data statically evaluated at build time from data_source
export default function HomePage() {
  const contact = SiteConfigRepository.getContact();
  const whatsAppLink = SiteConfigRepository.getWhatsAppLink();
  const trustMetrics = TrustMetricsRepository.getMetrics();
  const zones = ZoneRepository.getAllZones();
  const packages = PackageRepository.getAllPackages();
  const restHouses = RestHouseRepository.getAllRestHouses();
  const safariTypes = SafariRepository.getAllTypes();
  const secondaryServices = SecondaryServicesRepository.getData();
  const testimonials = TestimonialRepository.getAll();
  const faqs = FaqRepository.getAll();

  // Build FAQ schema once — inlined at render time into the page <head> equivalent
  const faqSchema = buildFaqSchema(faqs);

  return (
    <>
      {/* FAQPage JSON-LD — unlocks Google rich result accordion for Featured Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 1. Cinematic Hero with Scarcity & Conversion Buttons */}
      <HeroBanner
        phoneDisplay={contact.phoneDisplay}
        phoneRaw={contact.phoneRaw}
        whatsAppLink={whatsAppLink}
        scarcityWarning={trustMetrics.scarcityWarning}
      />

      {/* 2. Trust Row Above Fold as per Design Philosophy */}
      <TrustRow metrics={trustMetrics} />

      {/* 3. Safari Zones Explorer (Dhikala, Bijrani, Jhirna, etc.) */}
      <ZoneGrid zones={zones} whatsAppLink={whatsAppLink} />

      {/* 4. Curated Safari Tour Packages */}
      <PackageGrid packages={packages} whatsAppLink={whatsAppLink} />

      {/* 5. Core Forest Rest Houses & Night Stays (Dhikala FRH) */}
      <RestHouseSection restHouses={restHouses} whatsAppLink={whatsAppLink} />

      {/* 6. Jeep Safari vs Canter Safari Breakdown */}
      <SafariComparison safariTypes={safariTypes} whatsAppLink={whatsAppLink} />

      {/* 7. Secondary Services Cross-Sell (Delhi Cabs & Corbett Resorts) */}
      <SecondaryServicesSection
        data={secondaryServices}
        whatsAppLink={whatsAppLink}
      />

      {/* 8. Field Stories & Verified Reviews */}
      <TestimonialSection testimonials={testimonials} />

      {/* 9. Corbett Rules & Permit FAQ */}
      <FaqAccordion faqs={faqs} whatsAppLink={whatsAppLink} />
    </>
  );
}
