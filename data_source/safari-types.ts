export const safariTypes = [
  {
    id: "jeep-safari",
    name: "Jeep Safari",
    slug: "jeep-safari",
    vehicle: "Maruti Gypsy (4WD, open top)",
    capacity: "Up to 6 adults + 2 children",
    duration: "3.5 to 4 hours",
    permittedZones: [
      "Bijrani",
      "Jhirna",
      "Dhela",
      "Garjiya",
      "Durga Devi",
      "Phato",
      "Hathidangar",
      "Sitabani",
    ],
    startingPriceINR: 5999,
    priceBasis: "Per jeep (all inclusions covered)",
    description:
      "You get the whole jeep to yourselves. The open-top Gypsy lets you stand, turn around, and shoot in any direction without disturbing the people next to you. Your guide reads the jungle — alarm calls from deer, pugmarks in the mud, birds flushing suddenly — and positions the vehicle accordingly. The permit restricts how many jeeps can enter each zone per shift, which keeps the experience from feeling like a traffic jam.",
    shifts: [
      {
        name: "Morning Shift",
        timing: "06:00 AM – 09:30 AM (winter) / 05:45 AM – 09:15 AM (summer)",
      },
      {
        name: "Afternoon Shift",
        timing: "02:00 PM – 05:30 PM (winter) / 03:00 PM – 06:30 PM (summer)",
      },
    ],
    inclusions: [
      "Forest Department entry permit and gate fees",
      "Exclusive 4x4 Gypsy with driver and fuel",
      "Registered forest guide / naturalist",
      "Complimentary pickup/drop from property or up to 10 km radius from Ramnagar (pre-booking & buffer zones)",
      "All taxes and park charges",
    ],
    permitNotice:
      "Core Zones (Dhela, Jhirna, Bijrani, Garjiya, Durga Devi): ₹7,999/jeep pre-booking (>5 days) | ₹8,499/jeep current booking (within 5 days). Buffer Zones: Phato, Hathidangar & Sitabani Pawalgarh at ₹6,499/jeep; Sitabani Teda/Bhandarpani at ₹5,999/jeep.",
    ctaText: "Check Availability",
    isPopular: true,
  },
  {
    id: "canter-safari",
    name: "Canter Safari",
    slug: "canter-safari",
    vehicle: "Open-roof 16-seat safari bus",
    capacity: "16 person sharing (individual seat booking)",
    duration: "4.5 to 5 hours",
    permittedZones: ["Dhikala Core Zone only"],
    startingPriceINR: 2299,
    priceBasis: "Per person / seat (16-person sharing)",
    description:
      "The Canter is the authorized way day visitors can enter the Dhikala core zone — the deepest and most celebrated part of Corbett (open 15 November to 15 June). You travel on an open 16-person sharing safari bus with pickup and drop at Ramnagar or Dhangarhi Gate. Only 4 canters are permitted per shift, so seats fill quickly. Book at least 15 to 20 days in advance for confirmed seat availability.",
    shifts: [
      { name: "Morning Shift", timing: "05:45 AM – 10:30 AM" },
      { name: "Afternoon Shift", timing: "11:30 AM – 04:30 PM" },
    ],
    inclusions: [
      "Dhikala core zone entry permit",
      "Confirmed seat on 16-person sharing open Canter bus",
      "Government-appointed guide and driver",
      "Pickup & drop at Ramnagar / Dhangarhi Gate",
      "Dhangarhi Gate entry pass and park fees",
    ],
    permitNotice:
      "Dhikala Day Canter operates from 15 November to 15 June. Quota is strictly capped at 4 canters per shift. Please book at least 15 to 20 days ahead for better availability.",
    ctaText: "Check Dhikala Seats",
    isPopular: true,
  },
];
