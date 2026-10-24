import {
  gateDeadlineProtocol,
  getActiveSafariSchedule,
  getSafariScheduleById,
  getAllSafariSchedules,
  getDhikalaCanterSchedule,
  getActiveCanterStatus,
  getFormattedLiveShifts,
} from "@data/safari-timings";
import type {
  SafariGateSchedule,
  DhikalaCanterSchedule,
  GateDeadlineProtocol,
} from "../../models";

export class SafariTimingRepository {
  public static getAllSchedules(): SafariGateSchedule[] {
    return getAllSafariSchedules();
  }

  public static getActiveSchedule(date?: Date): SafariGateSchedule {
    return getActiveSafariSchedule(date);
  }

  public static getScheduleById(id: string): SafariGateSchedule {
    return getSafariScheduleById(id);
  }

  public static getDhikalaSchedule(): DhikalaCanterSchedule {
    return getDhikalaCanterSchedule();
  }

  public static getActiveCanterStatus(date?: Date) {
    return getActiveCanterStatus(date);
  }

  public static getProtocol(): GateDeadlineProtocol {
    return gateDeadlineProtocol;
  }

  public static getCurrentLiveShifts(date?: Date) {
    return getFormattedLiveShifts(date);
  }
}
