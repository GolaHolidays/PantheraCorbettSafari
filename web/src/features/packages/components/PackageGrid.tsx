import React from "react";
import { SafariPackage } from "../../../core/models";
import { SectionHeader } from "../../../shared/components/ui/section-header/SectionHeader";
import { PackageCard } from "./PackageCard";

interface PackageGridProps {
  packages: SafariPackage[];
  whatsAppLink: string;
}

export const PackageGrid: React.FC<PackageGridProps> = ({ packages, whatsAppLink }) => {
  return (
    <section id="packages" className="py-16 sm:py-24 bg-[#FBF8F0] border-b border-[#E8E0CC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Curated Safari Tour Packages"
          subtitle="Fixed transparent pricing covering official Forest Department permits, private Gypsy vehicles, certified guides, and heritage forest lodges."
          badgeText="All-Inclusive Wildlife Packages"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              whatsAppLink={whatsAppLink}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
