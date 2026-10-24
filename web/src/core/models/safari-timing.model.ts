export interface GateShiftDetails {
  gateOpens: string;      // e.g. "06:30 AM"
  lastEntry: string;      // e.g. "08:00 AM" (Final check-in / gate closes)
  mandatoryExit: string;  // e.g. "10:30 AM" (Final check-out)
  shiftDuration: string;  // e.g. "4.0 hrs"
  shiftSummary: string;   // e.g. "06:30 AM – 10:30 AM"
}

export interface SafariGateSchedule {
  id: "oct01-nov14" | "nov15-feb15" | "feb16-apr15" | "apr16-onwards";
  label: string;          // e.g. "Oct 01 – Nov 14"
  seasonName: string;     // e.g. "Autumn Post-Monsoon Opening"
  seasonCode: "autumn" | "winter" | "spring" | "summer";
  dateRange: {
    startMonth: number;   // 1-12
    startDay: number;     // 1-31
    endMonth: number;     // 1-12
    endDay: number;       // 1-31
  };
  morning: GateShiftDetails;
  afternoon: GateShiftDetails;
  description?: string;
}

export interface CanterShiftDetails {
  morningExpedition: string;   // e.g. "06:00 AM – 11:30 AM"
  afternoonExpedition: string; // e.g. "12:00 PM – 06:00 PM"
  duration: string;           // e.g. "5.5h Deep Loop"
}

export interface DhikalaCanterSchedule {
  openSeason: string;         // "15 Nov – 15 Jun"
  closedSeason: string;       // "16 Jun – 14 Nov (Monsoon)"
  winter: {
    label: string;            // "WINTER (NOV 15 – MAR 31)"
    tag: string;              // "5.5h Deep Loop"
    morning: string;          // "06:00 AM – 11:30 AM"
    afternoon: string;        // "12:00 PM – 06:00 PM"
  };
  summer: {
    label: string;            // "SUMMER (APR 01 – JUN 15)"
    tag: string;              // "Early Dawn Departure"
    morning: string;          // "05:30 AM – 11:00 AM"
    afternoon: string;        // "12:30 PM – 06:30 PM"
  };
}

export interface GateDeadlineProtocol {
  title: string;
  description: string;
  badges: string[];
}
