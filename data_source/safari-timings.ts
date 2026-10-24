/**
 * ─────────────────────────────────────────────────────────────────────────────
 * Panthera Corbett Safari — Master Safari Timings Single Source of Truth (DRY)
 * Official Uttarakhand Forest Department Schedule applicable to all Corbett zones.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const safariGateSchedules = [
  {
    id: "oct01-nov14",
    label: "Oct 01 – Nov 14",
    seasonName: "Autumn Opening Schedule",
    seasonCode: "autumn",
    dateRange: {
      startMonth: 10,
      startDay: 1,
      endMonth: 11,
      endDay: 14,
    },
    morning: {
      gateOpens: "06:30 AM",
      lastEntry: "08:00 AM",
      mandatoryExit: "10:30 AM",
      shiftDuration: "4.0 hrs",
      shiftSummary: "06:30 AM – 10:30 AM",
    },
    afternoon: {
      gateOpens: "02:00 PM",
      lastEntry: "03:30 PM",
      mandatoryExit: "06:00 PM",
      shiftDuration: "4.0 hrs",
      shiftSummary: "02:00 PM – 06:00 PM",
    },
    description: "Post-monsoon crisp weather. Optimal early dawn tracking as wildlife frequents sunny clearings.",
  },
  {
    id: "nov15-feb15",
    label: "Nov 15 – Feb 15",
    seasonName: "Peak Winter Schedule",
    seasonCode: "winter",
    dateRange: {
      startMonth: 11,
      startDay: 15,
      endMonth: 2,
      endDay: 15,
    },
    morning: {
      gateOpens: "06:30 AM",
      lastEntry: "08:00 AM",
      mandatoryExit: "10:30 AM",
      shiftDuration: "4.0 hrs",
      shiftSummary: "06:30 AM – 10:30 AM",
    },
    afternoon: {
      gateOpens: "01:30 PM",
      lastEntry: "03:00 PM",
      mandatoryExit: "05:30 PM",
      shiftDuration: "4.0 hrs",
      shiftSummary: "01:30 PM – 05:30 PM",
    },
    description: "Winter shift with earlier sunset exit. Foggy dawns make midday basking sightings exceptional.",
  },
  {
    id: "feb16-apr15",
    label: "Feb 16 – Apr 15",
    seasonName: "Spring Transition Schedule",
    seasonCode: "spring",
    dateRange: {
      startMonth: 2,
      startDay: 16,
      endMonth: 4,
      endDay: 15,
    },
    morning: {
      gateOpens: "06:15 AM",
      lastEntry: "07:30 AM",
      mandatoryExit: "10:15 AM",
      shiftDuration: "4.0 hrs",
      shiftSummary: "06:15 AM – 10:15 AM",
    },
    afternoon: {
      gateOpens: "02:00 PM",
      lastEntry: "03:30 PM",
      mandatoryExit: "06:00 PM",
      shiftDuration: "4.0 hrs",
      shiftSummary: "02:00 PM – 06:00 PM",
    },
    description: "Moderate climate and longer daylight hours. Excellent visibility across flowering sal canopies.",
  },
  {
    id: "apr16-onwards",
    label: "Apr 16 onwards",
    seasonName: "Summer Early-Dawn Schedule",
    seasonCode: "summer",
    dateRange: {
      startMonth: 4,
      startDay: 16,
      endMonth: 6,
      endDay: 30,
    },
    morning: {
      gateOpens: "05:30 AM",
      lastEntry: "07:00 AM",
      mandatoryExit: "09:30 AM",
      shiftDuration: "4.0 hrs",
      shiftSummary: "05:30 AM – 09:30 AM",
    },
    afternoon: {
      gateOpens: "03:00 PM",
      lastEntry: "04:30 PM",
      mandatoryExit: "07:00 PM",
      shiftDuration: "4.0 hrs",
      shiftSummary: "03:00 PM – 07:00 PM",
    },
    description: "Early dawn start to beat the midday heat. Tigers and elephants congregate around waterholes and riverbanks.",
  },
];

export const dhikalaCanterSchedule = {
  openSeason: "15 Nov – 15 Jun",
  closedSeason: "16 Jun – 14 Nov (Monsoon)",
  winter: {
    label: "WINTER (NOV 15 – MAR 31)",
    tag: "5.5h Deep Loop",
    morning: "06:00 AM – 11:30 AM",
    afternoon: "12:00 PM – 06:00 PM",
  },
  summer: {
    label: "SUMMER (APR 01 – JUN 15)",
    tag: "Early Dawn Departure",
    morning: "05:30 AM – 11:00 AM",
    afternoon: "12:30 PM – 06:30 PM",
  },
};

export const gateDeadlineProtocol = {
  title: "Gate Deadline Protocol",
  description:
    "Last Entry (Final Check-in) is a strict automated cutoff under Uttarakhand Forest Department rules. Park gates close promptly and late vehicles cannot enter under any circumstances.",
  badges: ["Govt ID Required", "Permit Hardcopy", "Certified Escort Only"],
};
