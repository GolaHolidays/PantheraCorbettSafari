"use client";

import React, { useState, useMemo } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import Clock01Icon from "@hugeicons/core-free-icons/Clock01Icon";
import Alert02Icon from "@hugeicons/core-free-icons/Alert02Icon";
import Sun02Icon from "@hugeicons/core-free-icons/Sun02Icon";
import Moon02Icon from "@hugeicons/core-free-icons/Moon02Icon";
import Bus01Icon from "@hugeicons/core-free-icons/Bus01Icon";
import ShieldCheckIcon from "@hugeicons/core-free-icons/ShieldCheckIcon";
import ArrowDown01Icon from "@hugeicons/core-free-icons/ArrowDown01Icon";
import ArrowUp01Icon from "@hugeicons/core-free-icons/ArrowUp01Icon";

import {
  getAllSafariSchedules,
  getActiveSafariSchedule,
  getDhikalaCanterSchedule,
  gateDeadlineProtocol,
} from "@data/safari-timings";
import type { SafariGateSchedule } from "../../../core/models";

interface SafariGateTimingsWidgetProps {
  className?: string;
  showCanterSection?: boolean;
  compact?: boolean;
  defaultScheduleId?: "oct01-nov14" | "nov15-feb15" | "feb16-apr15" | "apr16-onwards";
}

export const SafariGateTimingsWidget: React.FC<SafariGateTimingsWidgetProps> = ({
  className = "",
  showCanterSection = true,
  compact = false,
  defaultScheduleId,
}) => {
  const allSchedules = useMemo(() => getAllSafariSchedules(), []);
  const activeCurrentSchedule = useMemo(() => getActiveSafariSchedule(), []);
  const canterData = useMemo(() => getDhikalaCanterSchedule(), []);

  // Default to currently active seasonal schedule (or specified prop)
  const [selectedScheduleId, setSelectedScheduleId] = useState<string>(
    defaultScheduleId || activeCurrentSchedule.id
  );

  const [showMatrixTable, setShowMatrixTable] = useState<boolean>(false);

  const selectedSchedule: SafariGateSchedule = useMemo(() => {
    return allSchedules.find((s) => s.id === selectedScheduleId) || activeCurrentSchedule;
  }, [allSchedules, selectedScheduleId, activeCurrentSchedule]);

  const isSelectedActiveSeason = selectedSchedule.id === activeCurrentSchedule.id;

  return (
    <div
      className={`bg-[#FBF8F0] border border-[#E8E0CC] rounded-xl sm:rounded-2xl p-4 sm:p-7 shadow-sm transition-all duration-300 ${className}`}
      id="safari-timings-widget"
    >
      {/* ── Top Official Warning & Notice Header ───────────────────────────── */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#E8E0CC]/80">
        <HugeiconsIcon icon={Alert02Icon} size={18} className="text-[#B84C1E] shrink-0" />
        <span className="text-xs sm:text-sm font-bold tracking-wide uppercase text-[#17211A]">
          Official Safari Booking Guidelines, Policies &amp; Timings
        </span>
      </div>

      {/* ── Section Title & Interactive Schedule Selector ──────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2 text-[#17211A]">
            <HugeiconsIcon icon={Clock01Icon} size={20} className="text-[#C99A3D] shrink-0" />
            <h3 className="font-serif font-bold text-lg sm:text-xl text-[#17211A] tracking-tight">
              Official Safari Gate Timings
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#8A9468] mt-1 font-medium">
            Uttarakhand Forest Department schedule applicable to all Jim Corbett safari zones.
          </p>
        </div>

        {/* Schedule Dropdown Switcher */}
        <div className="flex items-center gap-2.5 self-start md:self-auto bg-white border border-[#E8E0CC] px-3.5 py-1.5 rounded-lg shadow-2xs">
          <label htmlFor="safari-schedule-select" className="text-xs font-semibold text-[#8A9468]">
            Schedule:
          </label>
          <div className="relative inline-flex items-center">
            <select
              id="safari-schedule-select"
              value={selectedScheduleId}
              onChange={(e) => setSelectedScheduleId(e.target.value)}
              className="appearance-none bg-transparent pr-6 text-xs sm:text-sm font-bold text-[#17211A] cursor-pointer focus:outline-none focus:ring-0"
              aria-label="Select Safari Seasonal Schedule"
            >
              {allSchedules.map((schedule) => (
                <option key={schedule.id} value={schedule.id}>
                  {schedule.label} {schedule.id === activeCurrentSchedule.id ? "• Active Now" : ""}
                </option>
              ))}
            </select>
            <HugeiconsIcon
              icon={ArrowDown01Icon}
              size={14}
              className="pointer-events-none absolute right-0 text-[#8A9468]"
            />
          </div>

          {isSelectedActiveSeason && (
            <span className="ml-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#37482E]/10 text-[#37482E] border border-[#37482E]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#37482E] animate-pulse" />
              Active
            </span>
          )}
        </div>
      </div>

      {/* ── Morning & Afternoon Safari Gate Cards ──────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
        {/* Morning Safari Card */}
        <div className="bg-white border border-[#E8E0CC] rounded-xl p-4 sm:p-5 shadow-2xs hover:border-[#37482E]/40 transition-colors">
          <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#E8E0CC]/70">
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={Sun02Icon} size={18} className="text-[#C99A3D]" />
              <span className="font-bold text-xs sm:text-sm uppercase tracking-wider text-[#17211A]">
                Morning Safari
              </span>
            </div>
            <span className="px-2.5 py-1 rounded-md text-xs font-bold font-tabular bg-[#E8E0CC]/40 text-[#37482E] border border-[#E8E0CC]">
              {selectedSchedule.morning.shiftSummary}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            {/* Gate Opens */}
            <div className="p-2 sm:p-2.5 rounded-lg bg-[#FBF8F0]/80">
              <span className="text-[10px] sm:text-[11px] font-semibold text-[#8A9468] uppercase tracking-wider block mb-1">
                Gate Opens
              </span>
              <span className="text-sm sm:text-base font-bold font-tabular text-[#17211A] block">
                {selectedSchedule.morning.gateOpens}
              </span>
              <span className="text-[10px] text-[#8A9468] block mt-0.5">Check-in</span>
            </div>

            {/* Last Entry */}
            <div className="p-2 sm:p-2.5 rounded-lg bg-[#B84C1E]/5 border border-[#B84C1E]/15">
              <span className="text-[10px] sm:text-[11px] font-bold text-[#B84C1E] uppercase tracking-wider block mb-1">
                Last Entry
              </span>
              <span className="text-sm sm:text-base font-bold font-tabular text-[#B84C1E] block">
                {selectedSchedule.morning.lastEntry}
              </span>
              <span className="text-[10px] text-[#B84C1E]/80 font-medium block mt-0.5">
                Gate closes
              </span>
            </div>

            {/* Mandatory Exit */}
            <div className="p-2 sm:p-2.5 rounded-lg bg-[#FBF8F0]/80">
              <span className="text-[10px] sm:text-[11px] font-semibold text-[#8A9468] uppercase tracking-wider block mb-1">
                Mandatory Exit
              </span>
              <span className="text-sm sm:text-base font-bold font-tabular text-[#17211A] block">
                {selectedSchedule.morning.mandatoryExit}
              </span>
              <span className="text-[10px] text-[#8A9468] block mt-0.5">Check-out</span>
            </div>
          </div>
        </div>

        {/* Afternoon Safari Card */}
        <div className="bg-white border border-[#E8E0CC] rounded-xl p-4 sm:p-5 shadow-2xs hover:border-[#37482E]/40 transition-colors">
          <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#E8E0CC]/70">
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={Moon02Icon} size={18} className="text-[#37482E]" />
              <span className="font-bold text-xs sm:text-sm uppercase tracking-wider text-[#17211A]">
                Afternoon Safari
              </span>
            </div>
            <span className="px-2.5 py-1 rounded-md text-xs font-bold font-tabular bg-[#E8E0CC]/40 text-[#37482E] border border-[#E8E0CC]">
              {selectedSchedule.afternoon.shiftSummary}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            {/* Gate Opens */}
            <div className="p-2 sm:p-2.5 rounded-lg bg-[#FBF8F0]/80">
              <span className="text-[10px] sm:text-[11px] font-semibold text-[#8A9468] uppercase tracking-wider block mb-1">
                Gate Opens
              </span>
              <span className="text-sm sm:text-base font-bold font-tabular text-[#17211A] block">
                {selectedSchedule.afternoon.gateOpens}
              </span>
              <span className="text-[10px] text-[#8A9468] block mt-0.5">Check-in</span>
            </div>

            {/* Last Entry */}
            <div className="p-2 sm:p-2.5 rounded-lg bg-[#B84C1E]/5 border border-[#B84C1E]/15">
              <span className="text-[10px] sm:text-[11px] font-bold text-[#B84C1E] uppercase tracking-wider block mb-1">
                Last Entry
              </span>
              <span className="text-sm sm:text-base font-bold font-tabular text-[#B84C1E] block">
                {selectedSchedule.afternoon.lastEntry}
              </span>
              <span className="text-[10px] text-[#B84C1E]/80 font-medium block mt-0.5">
                Gate closes
              </span>
            </div>

            {/* Mandatory Exit */}
            <div className="p-2 sm:p-2.5 rounded-lg bg-[#FBF8F0]/80">
              <span className="text-[10px] sm:text-[11px] font-semibold text-[#8A9468] uppercase tracking-wider block mb-1">
                Mandatory Exit
              </span>
              <span className="text-sm sm:text-base font-bold font-tabular text-[#17211A] block">
                {selectedSchedule.afternoon.mandatoryExit}
              </span>
              <span className="text-[10px] text-[#8A9468] block mt-0.5">Check-out</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Dhikala Zone Canter Safari Section ─────────────────────────────── */}
      {showCanterSection && (
        <div className="mt-7 pt-6 border-t border-[#E8E0CC]/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2.5 flex-wrap">
              <div className="w-7 h-7 rounded-lg bg-[#37482E]/10 flex items-center justify-center shrink-0">
                <HugeiconsIcon icon={Bus01Icon} size={16} className="text-[#37482E]" />
              </div>
              <h4 className="font-serif font-bold text-sm sm:text-base text-[#17211A]">
                DHIKALA ZONE · CANTER SAFARI SHIFTS
              </h4>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#E8E0CC]/80 text-[#37482E] uppercase">
                Canter Only
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Open Season: {canterData.openSeason}
              </span>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#E8E0CC]/40 text-[#8A9468] border border-[#E8E0CC]">
                {canterData.closedSeason}
              </span>
            </div>
          </div>

          <p className="text-xs text-[#17211A]/80 mb-4 font-medium">
            Ramnagar deep-core safari conducted exclusively via 16-seater 4×4 open safari canters.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {/* Winter Canter Box */}
            <div className="bg-white border border-[#E8E0CC] rounded-xl p-4">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#E8E0CC]/60">
                <span className="text-xs font-bold text-[#17211A]">{canterData.winter.label}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#E8E0CC]/50 text-[#37482E]">
                  {canterData.winter.tag}
                </span>
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-[#8A9468] font-medium">Morning Expedition:</span>
                  <span className="font-bold font-tabular text-[#17211A]">
                    {canterData.winter.morning}
                  </span>
                </div>
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-[#8A9468] font-medium">Afternoon Expedition:</span>
                  <span className="font-bold font-tabular text-[#17211A]">
                    {canterData.winter.afternoon}
                  </span>
                </div>
              </div>
            </div>

            {/* Summer Canter Box */}
            <div className="bg-white border border-[#E8E0CC] rounded-xl p-4">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#E8E0CC]/60">
                <span className="text-xs font-bold text-[#17211A]">{canterData.summer.label}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#C99A3D]/15 text-[#855B14]">
                  {canterData.summer.tag}
                </span>
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-[#8A9468] font-medium">Morning Expedition:</span>
                  <span className="font-bold font-tabular text-[#17211A]">
                    {canterData.summer.morning}
                  </span>
                </div>
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-[#8A9468] font-medium">Afternoon Expedition:</span>
                  <span className="font-bold font-tabular text-[#17211A]">
                    {canterData.summer.afternoon}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Gate Deadline Protocol Alert Banner ────────────────────────────── */}
      <div className="mt-6 bg-[#E8E0CC]/30 border border-[#E8E0CC] rounded-xl p-3.5 sm:p-4.5 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <HugeiconsIcon icon={Alert02Icon} size={18} className="text-[#B84C1E] shrink-0 mt-0.5" />
          <p className="text-xs text-[#17211A]/90 leading-relaxed">
            <span className="font-bold text-[#17211A]">{gateDeadlineProtocol.title}:</span>{" "}
            {gateDeadlineProtocol.description}
          </p>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap shrink-0">
          {gateDeadlineProtocol.badges.map((badge, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-white border border-[#E8E0CC] text-[#17211A] shadow-2xs"
            >
              <HugeiconsIcon icon={ShieldCheckIcon} size={12} className="text-[#37482E]" />
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* ── Expandable Complete Season Matrix (Chart from Image 2) ─────────── */}
      {!compact && (
        <div className="mt-5 text-center">
          <button
            type="button"
            onClick={() => setShowMatrixTable(!showMatrixTable)}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#37482E] hover:text-[#B84C1E] transition-colors py-2 px-3 rounded-lg hover:bg-[#E8E0CC]/30 cursor-pointer"
          >
            <span>{showMatrixTable ? "Hide Complete Seasonal Chart" : "View Complete Check-in / Check-out Matrix (All 4 Seasons)"}</span>
            <HugeiconsIcon
              icon={showMatrixTable ? ArrowUp01Icon : ArrowDown01Icon}
              size={14}
            />
          </button>

          {showMatrixTable && (
            <div className="mt-4 pt-4 border-t border-[#E8E0CC]/80 text-left overflow-x-auto">
              <h5 className="font-serif font-bold text-sm text-[#17211A] mb-3 text-center sm:text-left">
                Official Uttarakhand Forest Department Check-in / Check-out Chart
              </h5>

              {/* Morning Matrix Table */}
              <div className="mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#37482E] block mb-2">
                  Morning Shift
                </span>
                <table className="w-full text-xs text-left border-collapse border border-[#E8E0CC] bg-white rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-[#17211A] text-[#E8E0CC]">
                      <th className="p-2 sm:p-2.5 font-bold">Date Range</th>
                      <th className="p-2 sm:p-2.5 font-bold">Check-in (Gate Opens)</th>
                      <th className="p-2 sm:p-2.5 font-bold">Final Check-in (Last Entry)</th>
                      <th className="p-2 sm:p-2.5 font-bold">Final Check-out (Mandatory Exit)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allSchedules.map((item) => {
                      const isActive = item.id === activeCurrentSchedule.id;
                      return (
                        <tr
                          key={item.id}
                          className={`border-b border-[#E8E0CC] ${
                            isActive ? "bg-[#37482E]/5 font-bold" : "hover:bg-[#FBF8F0]"
                          }`}
                        >
                          <td className="p-2 sm:p-2.5">
                            {item.label} {isActive ? "(Current)" : ""}
                          </td>
                          <td className="p-2 sm:p-2.5 font-tabular">{item.morning.gateOpens}</td>
                          <td className="p-2 sm:p-2.5 font-tabular text-[#B84C1E]">{item.morning.lastEntry}</td>
                          <td className="p-2 sm:p-2.5 font-tabular">{item.morning.mandatoryExit}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Afternoon Matrix Table */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#37482E] block mb-2">
                  Afternoon Shift
                </span>
                <table className="w-full text-xs text-left border-collapse border border-[#E8E0CC] bg-white rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-[#17211A] text-[#E8E0CC]">
                      <th className="p-2 sm:p-2.5 font-bold">Date Range</th>
                      <th className="p-2 sm:p-2.5 font-bold">Check-in (Gate Opens)</th>
                      <th className="p-2 sm:p-2.5 font-bold">Final Check-in (Last Entry)</th>
                      <th className="p-2 sm:p-2.5 font-bold">Final Check-out (Mandatory Exit)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allSchedules.map((item) => {
                      const isActive = item.id === activeCurrentSchedule.id;
                      return (
                        <tr
                          key={item.id}
                          className={`border-b border-[#E8E0CC] ${
                            isActive ? "bg-[#37482E]/5 font-bold" : "hover:bg-[#FBF8F0]"
                          }`}
                        >
                          <td className="p-2 sm:p-2.5">
                            {item.label} {isActive ? "(Current)" : ""}
                          </td>
                          <td className="p-2 sm:p-2.5 font-tabular">{item.afternoon.gateOpens}</td>
                          <td className="p-2 sm:p-2.5 font-tabular text-[#B84C1E]">{item.afternoon.lastEntry}</td>
                          <td className="p-2 sm:p-2.5 font-tabular">{item.afternoon.mandatoryExit}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
