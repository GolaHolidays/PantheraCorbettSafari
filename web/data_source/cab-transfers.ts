import type { CabTransferRoute } from "@/core/schemas";

/**
 * Cab / Taxi transfer prices for Ramnagar (Jim Corbett) pickups & drops.
 * Applicable for both directions: Pick up from origin to Ramnagar, and Ramnagar to destination.
 * Prices vary across seasons (regular season vs peak season / weekend rush), hence defined as ranges.
 * Use these structured rates when creating or pricing tour packages.
 */
export const cabTransfers: CabTransferRoute[] = [
  // ============================================================================
  // 1. DELHI TO RAMNAGAR (and Ramnagar to Delhi)
  // ============================================================================
  {
    id: "delhi-ramnagar",
    slug: "delhi-to-ramnagar",
    title: "Delhi to Ramnagar / Ramnagar to Delhi",
    shortTitle: "Delhi ⇄ Ramnagar",
    fromLocation: "Delhi NCR (Airport T1/T2/T3, Gurgaon, Noida, Ghaziabad, Delhi)",
    toLocation: "Ramnagar (Jim Corbett)",
    isBidirectional: true,
    distanceKm: 250,
    distanceDisplay: "240–260 km",
    travelTimeDisplay: "5–6 hrs",
    seasonalityNote:
      "Rates vary based on seasonality (off-season / weekday vs peak winter wildlife season and holiday weekends).",
    pickupPoints: [
      "Delhi Airport (IGI T1, T2, T3)",
      "Gurgaon / Cyber Hub / Golf Course Rd",
      "Noida & Greater Noida",
      "Ghaziabad (Indirapuram / Vaishali)",
      "New Delhi Railway Station / Central Delhi",
    ],
    vehicles: [
      {
        vehicleId: "swift-dzire",
        name: "Swift Dzire",
        category: "Sedan",
        seatingCapacity: 4,
        capacityDisplay: "4 Passengers + Driver",
        luggageCapacity: "2 Large or 3 Medium Bags",
        priceRange: {
          minPriceINR: 4500,
          maxPriceINR: 5500,
          priceDisplay: "₹4,500 – ₹5,500",
          priceNote: "One-way transfer (including toll, state tax & driver allowance; seasonal variation)",
        },
        roundTripPriceRange: {
          minPriceINR: 9000,
          maxPriceINR: 11000,
          priceDisplay: "₹9,000 – ₹11,000",
          priceNote: "Round-trip transfer for multi-day Corbett packages",
        },
        features: [
          "AC Sedan",
          "Toll tax & state permit included",
          "Doorstep pickup & direct resort drop",
          "Experienced highway driver",
        ],
      },
      {
        vehicleId: "new-ertiga",
        name: "New Ertiga",
        category: "MUV",
        seatingCapacity: 6,
        capacityDisplay: "6 Passengers + Driver",
        luggageCapacity: "3–4 Medium Bags (Roof carrier on request)",
        priceRange: {
          minPriceINR: 6000,
          maxPriceINR: 6500,
          priceDisplay: "₹6,000 – ₹6,500",
          priceNote: "One-way transfer (including toll, state tax & driver allowance; seasonal variation)",
        },
        roundTripPriceRange: {
          minPriceINR: 12000,
          maxPriceINR: 13000,
          priceDisplay: "₹12,000 – ₹13,000",
          priceNote: "Round-trip transfer for multi-day Corbett packages",
        },
        features: [
          "Spacious 6-Seater MUV",
          "Dual AC with rear blower",
          "Ideal for families & small groups",
          "All highway tolls & driver fees included",
        ],
      },
      {
        vehicleId: "innova-crysta",
        name: "Innova Crysta",
        category: "SUV",
        seatingCapacity: 6,
        capacityDisplay: "6 Passengers + Driver (Captain / Bench Seats)",
        luggageCapacity: "4–5 Suitcases / Large boot space",
        priceRange: {
          minPriceINR: 8500,
          maxPriceINR: 9500,
          priceDisplay: "₹8,500 – ₹9,500",
          priceNote: "One-way transfer (including toll, state tax & driver allowance; seasonal variation)",
        },
        roundTripPriceRange: {
          minPriceINR: 17000,
          maxPriceINR: 19000,
          priceDisplay: "₹17,000 – ₹19,000",
          priceNote: "Round-trip transfer for multi-day Corbett packages",
        },
        features: [
          "Premium luxury SUV comfort",
          "Superior legroom & highway stability",
          "Generous luggage capacity",
          "All highway tolls & driver fees included",
        ],
      },
    ],
  },

  // ============================================================================
  // 2. KATHGODAM TO RAMNAGAR (and Ramnagar to Kathgodam)
  // ============================================================================
  {
    id: "kathgodam-ramnagar",
    slug: "kathgodam-to-ramnagar",
    title: "Kathgodam to Ramnagar / Ramnagar to Kathgodam",
    shortTitle: "Kathgodam ⇄ Ramnagar",
    fromLocation: "Kathgodam Railway Station (KGM) / Haldwani",
    toLocation: "Ramnagar (Jim Corbett)",
    isBidirectional: true,
    distanceKm: 60,
    distanceDisplay: "55–60 km",
    travelTimeDisplay: "1.5–2 hrs",
    seasonalityNote:
      "Rates vary based on seasonality (regular days vs peak tourist season / Shatabdi Express train rush).",
    pickupPoints: [
      "Kathgodam Railway Station (Platform Exit)",
      "Haldwani Railway Station / Bus Terminal",
      "Ramnagar City / Resort Zones (Dhikuli, Sitabani, Marchula)",
    ],
    vehicles: [
      {
        vehicleId: "swift-dzire",
        name: "Swift Dzire",
        category: "Sedan",
        seatingCapacity: 4,
        capacityDisplay: "4 Passengers + Driver",
        luggageCapacity: "2–3 Bags",
        priceRange: {
          minPriceINR: 2000,
          maxPriceINR: 3000,
          priceDisplay: "₹2,000 – ₹3,000",
          priceNote: "One-way station pickup / drop (seasonal variation)",
        },
        roundTripPriceRange: {
          minPriceINR: 4000,
          maxPriceINR: 6000,
          priceDisplay: "₹4,000 – ₹6,000",
          priceNote: "Both-way station pickup & return drop for Corbett packages",
        },
        features: [
          "AC Sedan",
          "Station platform greeting & pickup",
          "Direct transfer to your Corbett hotel / resort",
        ],
      },
      {
        vehicleId: "new-ertiga",
        name: "New Ertiga",
        category: "MUV",
        seatingCapacity: 6,
        capacityDisplay: "6 Passengers + Driver",
        luggageCapacity: "3–4 Bags",
        priceRange: {
          minPriceINR: 3500,
          maxPriceINR: 4000,
          priceDisplay: "₹3,500 – ₹4,000",
          priceNote: "One-way station pickup / drop (seasonal variation)",
        },
        roundTripPriceRange: {
          minPriceINR: 7000,
          maxPriceINR: 8000,
          priceDisplay: "₹7,000 – ₹8,000",
          priceNote: "Both-way station pickup & return drop for Corbett packages",
        },
        features: [
          "6-Seater MUV",
          "Full AC comfort",
          "Ideal for families arriving with luggage",
        ],
      },
      {
        vehicleId: "innova-crysta",
        name: "Innova Crysta",
        category: "SUV",
        seatingCapacity: 6,
        capacityDisplay: "6 Passengers + Driver",
        luggageCapacity: "4–5 Bags",
        priceRange: {
          minPriceINR: 5000,
          maxPriceINR: 6000,
          priceDisplay: "₹5,000 – ₹6,000",
          priceNote: "One-way station pickup / drop (seasonal variation)",
        },
        roundTripPriceRange: {
          minPriceINR: 10000,
          maxPriceINR: 12000,
          priceDisplay: "₹10,000 – ₹12,000",
          priceNote: "Both-way station pickup & return drop for Corbett packages",
        },
        features: [
          "Luxury SUV comfort",
          "Captain seat configuration",
          "Smooth ride through foothill highways",
        ],
      },
    ],
  },

  // ============================================================================
  // 3. LALKUAN TO RAMNAGAR (and Ramnagar to Lalkuan)
  // ============================================================================
  {
    id: "lalkuan-ramnagar",
    slug: "lalkuan-to-ramnagar",
    title: "Lalkuan to Ramnagar / Ramnagar to Lalkuan",
    shortTitle: "Lalkuan ⇄ Ramnagar",
    fromLocation: "Lalkuan Railway Junction (LKU)",
    toLocation: "Ramnagar (Jim Corbett)",
    isBidirectional: true,
    distanceKm: 75,
    distanceDisplay: "75–80 km",
    travelTimeDisplay: "2–2.5 hrs",
    seasonalityNote:
      "Rates vary based on seasonality (regular days vs peak season train schedules / holiday rush).",
    pickupPoints: [
      "Lalkuan Railway Junction (Platform Exit)",
      "Ramnagar City / Resort Zones (Dhikuli, Mohan, Marchula)",
    ],
    vehicles: [
      {
        vehicleId: "swift-dzire",
        name: "Swift Dzire",
        category: "Sedan",
        seatingCapacity: 4,
        capacityDisplay: "4 Passengers + Driver",
        luggageCapacity: "2–3 Bags",
        priceRange: {
          minPriceINR: 2500,
          maxPriceINR: 3500,
          priceDisplay: "₹2,500 – ₹3,500",
          priceNote: "One-way station pickup / drop (seasonal variation)",
        },
        roundTripPriceRange: {
          minPriceINR: 5000,
          maxPriceINR: 7000,
          priceDisplay: "₹5,000 – ₹7,000",
          priceNote: "Both-way station pickup & return drop for Corbett packages",
        },
        features: [
          "AC Sedan",
          "Timely train pickup at Lalkuan Junction",
          "Direct delivery to your Corbett resort",
        ],
      },
      {
        vehicleId: "new-ertiga",
        name: "New Ertiga",
        category: "MUV",
        seatingCapacity: 6,
        capacityDisplay: "6 Passengers + Driver",
        luggageCapacity: "3–4 Bags",
        priceRange: {
          minPriceINR: 4000,
          maxPriceINR: 4500,
          priceDisplay: "₹4,000 – ₹4,500",
          priceNote: "One-way station pickup / drop (seasonal variation)",
        },
        roundTripPriceRange: {
          minPriceINR: 8000,
          maxPriceINR: 9000,
          priceDisplay: "₹8,000 – ₹9,000",
          priceNote: "Both-way station pickup & return drop for Corbett packages",
        },
        features: [
          "6-Seater MUV",
          "Comfortable AC cabin",
          "Reliable luggage capacity for family groups",
        ],
      },
      {
        vehicleId: "innova-crysta",
        name: "Innova Crysta",
        category: "SUV",
        seatingCapacity: 6,
        capacityDisplay: "6 Passengers + Driver",
        luggageCapacity: "4–5 Bags",
        priceRange: {
          minPriceINR: 5500,
          maxPriceINR: 6500,
          priceDisplay: "₹5,500 – ₹6,500",
          priceNote: "One-way station pickup / drop (seasonal variation)",
        },
        roundTripPriceRange: {
          minPriceINR: 11000,
          maxPriceINR: 13000,
          priceDisplay: "₹11,000 – ₹13,000",
          priceNote: "Both-way station pickup & return drop for Corbett packages",
        },
        features: [
          "Luxury SUV comfort",
          "Spacious seating and luggage space",
          "Stress-free point-to-point transfer",
        ],
      },
    ],
  },
];

// ============================================================================
// PACKAGE BUILDER HELPER FUNCTIONS
// ============================================================================

export type RouteId = "delhi-ramnagar" | "kathgodam-ramnagar" | "lalkuan-ramnagar";
export type VehicleId = "swift-dzire" | "new-ertiga" | "innova-crysta";
export type TransferTripType = "one-way" | "round-trip";

/**
 * Lookup cab fare range for a specific route and vehicle.
 * Helper for constructing package cost calculations (e.g. Resort + Safari + Cab add-on).
 */
export function getCabTransferFare(
  routeId: RouteId | string,
  vehicleId: VehicleId | string,
  tripType: TransferTripType = "one-way"
) {
  const route = cabTransfers.find((r) => r.id === routeId);
  if (!route) return null;

  const vehicle = route.vehicles.find((v) => v.vehicleId === vehicleId);
  if (!vehicle) return null;

  if (tripType === "round-trip" && vehicle.roundTripPriceRange) {
    return {
      routeId: route.id,
      routeTitle: route.title,
      vehicleId: vehicle.vehicleId,
      vehicleName: vehicle.name,
      category: vehicle.category,
      tripType,
      ...vehicle.roundTripPriceRange,
    };
  }

  return {
    routeId: route.id,
    routeTitle: route.title,
    vehicleId: vehicle.vehicleId,
    vehicleName: vehicle.name,
    category: vehicle.category,
    tripType: "one-way" as const,
    ...vehicle.priceRange,
  };
}

/**
 * Calculates the combined package price with a cab transfer add-on.
 *
 * @param basePackageMinINR - Package starting price without cab (e.g., resort + safari)
 * @param basePackageMaxINR - Package max price without cab
 * @param routeId - "delhi-ramnagar" | "kathgodam-ramnagar" | "lalkuan-ramnagar"
 * @param vehicleId - "swift-dzire" | "new-ertiga" | "innova-crysta"
 * @param tripType - "one-way" | "round-trip" (default: "round-trip" for complete tour packages)
 */
export function calculatePackageWithCab(
  basePackageMinINR: number,
  basePackageMaxINR: number,
  routeId: RouteId | string,
  vehicleId: VehicleId | string,
  tripType: TransferTripType = "round-trip"
) {
  const fare = getCabTransferFare(routeId, vehicleId, tripType);
  if (!fare) {
    return {
      minPriceINR: basePackageMinINR,
      maxPriceINR: basePackageMaxINR,
      priceDisplay: `₹${basePackageMinINR.toLocaleString("en-IN")} – ₹${basePackageMaxINR.toLocaleString("en-IN")}`,
      cabFare: null,
    };
  }

  const minTotal = basePackageMinINR + fare.minPriceINR;
  const maxTotal = basePackageMaxINR + fare.maxPriceINR;

  return {
    minPriceINR: minTotal,
    maxPriceINR: maxTotal,
    priceDisplay: `₹${minTotal.toLocaleString("en-IN")} – ₹${maxTotal.toLocaleString("en-IN")}`,
    cabFare: fare,
  };
}
