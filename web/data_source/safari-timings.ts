import {
  SafariGateSchedulesSchema,
  DhikalaCanterScheduleSchema,
  GateDeadlineProtocolSchema,
  type SafariGateSchedule,
  type DhikalaCanterSchedule,
  type GateDeadlineProtocol,
} from "../src/core/schemas/safari-timing.schema";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * Panthera Corbett Safari — Master Safari Timings Single Source of Truth (DRY)
 * Official Uttarakhand Forest Department Schedule applicable to all Corbett zones.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const safariGateSchedules: SafariGateSchedule[] = [
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

export const dhikalaCanterSchedule: DhikalaCanterSchedule = {
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

export const gateDeadlineProtocol: GateDeadlineProtocol = {
  title: "Gate Deadline Protocol",
  description:
    "Last Entry (Final Check-in) is a strict automated cutoff under Uttarakhand Forest Department rules. Park gates close promptly and late vehicles cannot enter under any circumstances.",
  badges: ["Govt ID Required", "Permit Hardcopy", "Certified Escort Only"],
};

// Validate static integrity via Zod
SafariGateSchedulesSchema.parse(safariGateSchedules);
DhikalaCanterScheduleSchema.parse(dhikalaCanterSchedule);
GateDeadlineProtocolSchema.parse(gateDeadlineProtocol);

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * Dynamic Timing Engine & Helper Utilities
 * ─────────────────────────────────────────────────────────────────────────────
 */

/**
 * Automatically resolves the active safari gate schedule for any given date or today.
 */
export function getActiveSafariSchedule(date: Date = new Date()): SafariGateSchedule {
  // Use Indian Standard Time (IST / UTC+5:30) date parts
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    month: "numeric",
    day: "numeric",
  });
  const parts = formatter.formatToParts(date);
  const month = Number(parts.find((p) => p.type === "month")?.value || date.getMonth() + 1);
  const day = Number(parts.find((p) => p.type === "day")?.value || date.getDate());

  // Match Oct 01 – Nov 14
  if (month === 10 || (month === 11 && day <= 14)) {
    return safariGateSchedules[0];
  }

  // Match Nov 15 – Feb 15 (crosses calendar year)
  if ((month === 11 && day >= 15) || month === 12 || month === 1 || (month === 2 && day <= 15)) {
    return safariGateSchedules[1];
  }

  // Match Feb 16 – Apr 15
  if ((month === 2 && day >= 16) || month === 3 || (month === 4 && day <= 15)) {
    return safariGateSchedules[2];
  }

  // Apr 16 onwards (covers summer season and buffer zone year-round operational slots)
  return safariGateSchedules[3];
}

/**
 * Returns a schedule by its ID ("oct01-nov14", "nov15-feb15", "feb16-apr15", "apr16-onwards").
 */
export function getSafariScheduleById(id: string): SafariGateSchedule {
  const match = safariGateSchedules.find((s) => s.id === id);
  return match || safariGateSchedules[0];
}

/**
 * Returns all 4 official gate schedules for tabular or dropdown rendering.
 */
export function getAllSafariSchedules(): SafariGateSchedule[] {
  return safariGateSchedules;
}

/**
 * Returns the Canter schedule details.
 */
export function getDhikalaCanterSchedule(): DhikalaCanterSchedule {
  return dhikalaCanterSchedule;
}

/**
 * Returns whether Dhikala Canter is currently operational or closed for monsoon,
 * and the active expedition shift timings.
 */
export function getActiveCanterStatus(date: Date = new Date()): {
  isOpen: boolean;
  statusLabel: string;
  seasonKey: "winter" | "summer" | "closed";
  morning: string;
  afternoon: string;
} {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    month: "numeric",
    day: "numeric",
  });
  const parts = formatter.formatToParts(date);
  const month = Number(parts.find((p) => p.type === "month")?.value || date.getMonth() + 1);
  const day = Number(parts.find((p) => p.type === "day")?.value || date.getDate());

  // Dhikala Season: 15 Nov – 15 Jun
  const isMonsoonClosed =
    (month === 6 && day >= 16) ||
    month === 7 ||
    month === 8 ||
    month === 9 ||
    month === 10 ||
    (month === 11 && day <= 14);

  if (isMonsoonClosed) {
    return {
      isOpen: false,
      statusLabel: "Closed: 16 Jun – 14 Nov (Monsoon)",
      seasonKey: "closed",
      morning: dhikalaCanterSchedule.winter.morning,
      afternoon: dhikalaCanterSchedule.winter.afternoon,
    };
  }

  // Winter: Nov 15 – Mar 31
  const isWinter =
    (month === 11 && day >= 15) || month === 12 || month === 1 || month === 2 || month === 3;

  if (isWinter) {
    return {
      isOpen: true,
      statusLabel: "Winter Season Active",
      seasonKey: "winter",
      morning: dhikalaCanterSchedule.winter.morning,
      afternoon: dhikalaCanterSchedule.winter.afternoon,
    };
  }

  // Summer: Apr 01 – Jun 15
  return {
    isOpen: true,
    statusLabel: "Summer Season Active",
    seasonKey: "summer",
    morning: dhikalaCanterSchedule.summer.morning,
    afternoon: dhikalaCanterSchedule.summer.afternoon,
  };
}

/**
 * Returns the active shift summary formatted for general UI badges and cards.
 * Example:
 * {
 *   morning: "06:30 AM – 10:30 AM",
 *   afternoon: "02:00 PM – 06:00 PM",
 *   activeScheduleLabel: "Oct 01 – Nov 14"
 * }
 */
export function getFormattedLiveShifts(date: Date = new Date()): {
  morning: string;
  afternoon: string;
  activeScheduleLabel: string;
  activeScheduleId: string;
} {
  const active = getActiveSafariSchedule(date);
  return {
    morning: active.morning.shiftSummary,
    afternoon: active.afternoon.shiftSummary,
    activeScheduleLabel: active.label,
    activeScheduleId: active.id,
  };
}
