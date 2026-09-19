import React from "react";
import { ForestRestHouse } from "../../../core/models";
import { SectionHeader } from "../../../shared/components/ui/section-header/SectionHeader";
import { RestHouseCard } from "./RestHouseCard";

interface RestHouseSectionProps {
  restHouses: ForestRestHouse[];
  whatsAppLink: string;
}

export const RestHouseSection: React.FC<RestHouseSectionProps> = ({
  restHouses,
  whatsAppLink,
}) => {
  return (
    <section
      id="night-stays"
      className="py-16 sm:py-24 bg-[#17211A] text-[#FBF8F0] border-b border-[#37482E]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Forest Night Stays Inside Corbett Core"
          subtitle="Wake up to alarm calls and river mist inside India's premier tiger reserve. Forest Rest Houses (FRH) are run under strict Forest Department rules with solar fencing and pure wilderness isolation."
          badgeText="Exclusive Wilderness Lodging"
          theme="dark"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {restHouses.map((lodge) => (
            <RestHouseCard
              key={lodge.id}
              lodge={lodge}
              whatsAppLink={whatsAppLink}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
