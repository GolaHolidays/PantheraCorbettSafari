export const safariTypes = [
  {
    id: "jeep-safari",
    name: "Jeep Safari",
    slug: "jeep-safari",
    vehicle: "Maruti Gypsy (4WD, open top)",
    capacity: "Up to 6 adults + 2 children",
    duration: "3.5 to 4 hours",
    permittedZones: ["Bijrani", "Jhirna", "Dhela", "Garjiya", "Durga Devi", "Phato", "Sitabani"],
    startingPriceINR: 6200,
    priceBasis: "Per jeep (permit + guide + vehicle all included)",
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
      "Exclusive 4x4 Gypsy with driver",
      "Registered forest guide / naturalist",
      "All taxes",
    ],
    permitNotice:
      "Only 30 jeeps are allowed per zone per shift. Indian nationals need a valid photo ID; foreign passport holders need passport + Indian visa. Book at least 30–45 days ahead for Bijrani and Dhikala.",
    ctaText: "Check Availability",
    isPopular: true,
  },
  {
    id: "canter-safari",
    name: "Canter Safari",
    slug: "canter-safari",
    vehicle: "Open-roof 16-seat safari bus",
    capacity: "16 passengers (individual seat booking)",
    duration: "4.5 to 5 hours",
    permittedZones: ["Dhikala Core Zone only"],
    startingPriceINR: 2400,
    priceBasis: "Per person / seat (Dhikala entry + guide included)",
    description:
      "The Canter is the only way day visitors can enter the Dhikala core zone — the deepest and most celebrated part of Corbett — without booking an overnight stay at the forest rest house. You travel with other guests on the bus, but the elevated seating gives you good views over the tall grass. The 32 km drive to Dhikala itself passes through beautiful forest. Only 4 canters are permitted per shift, so seats go fast.",
    shifts: [
      { name: "Morning Shift", timing: "05:45 AM – 10:30 AM" },
      { name: "Afternoon Shift", timing: "11:30 AM – 04:30 PM" },
    ],
    inclusions: [
      "Dhikala core zone entry permit",
      "Reserved seat on the open-roof Canter",
      "Government-appointed guide and driver",
      "Dhangarhi Gate entry pass",
    ],
    permitNotice:
      "Only 4 canters per shift are allowed into Dhikala. Weekend and peak-season seats fill up weeks in advance. Book early.",
    ctaText: "Check Dhikala Seats",
    isPopular: true,
  },
];
