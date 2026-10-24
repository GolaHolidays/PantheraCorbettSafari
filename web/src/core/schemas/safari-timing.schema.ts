import { z } from "zod";

export const GateShiftDetailsSchema = z.object({
  gateOpens: z.string().min(1),
  lastEntry: z.string().min(1),
  mandatoryExit: z.string().min(1),
  shiftDuration: z.string().min(1),
  shiftSummary: z.string().min(1),
});

export const SafariGateScheduleSchema = z.object({
  id: z.enum(["oct01-nov14", "nov15-feb15", "feb16-apr15", "apr16-onwards"]),
  label: z.string().min(1),
  seasonName: z.string().min(1),
  seasonCode: z.enum(["autumn", "winter", "spring", "summer"]),
  dateRange: z.object({
    startMonth: z.number().int().min(1).max(12),
    startDay: z.number().int().min(1).max(31),
    endMonth: z.number().int().min(1).max(12),
    endDay: z.number().int().min(1).max(31),
  }),
  morning: GateShiftDetailsSchema,
  afternoon: GateShiftDetailsSchema,
  description: z.string().optional(),
});

export const SafariGateSchedulesSchema = z.array(SafariGateScheduleSchema).min(1);

export const DhikalaCanterScheduleSchema = z.object({
  openSeason: z.string().min(1),
  closedSeason: z.string().min(1),
  winter: z.object({
    label: z.string().min(1),
    tag: z.string().min(1),
    morning: z.string().min(1),
    afternoon: z.string().min(1),
  }),
  summer: z.object({
    label: z.string().min(1),
    tag: z.string().min(1),
    morning: z.string().min(1),
    afternoon: z.string().min(1),
  }),
});

export const GateDeadlineProtocolSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  badges: z.array(z.string().min(1)).min(1),
});

export type GateShiftDetails = z.infer<typeof GateShiftDetailsSchema>;
export type SafariGateSchedule = z.infer<typeof SafariGateScheduleSchema>;
export type DhikalaCanterSchedule = z.infer<typeof DhikalaCanterScheduleSchema>;
export type GateDeadlineProtocol = z.infer<typeof GateDeadlineProtocolSchema>;
