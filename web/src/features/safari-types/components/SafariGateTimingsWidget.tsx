"use client";

import React, { useState, useMemo } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import ArrowDown01Icon from "@hugeicons/core-free-icons/ArrowDown01Icon";

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
  defaultScheduleId?: "oct01-nov14" | "nov15-feb15" | "feb16-apr15" | "apr16-onwards";
}

export const SafariGateTimingsWidget: React.FC<SafariGateTimingsWidgetProps> = ({
  className = "",
  showCanterSection = true,
  defaultScheduleId,
}) => {
  const allSchedules = useMemo(() => getAllSafariSchedules(), []);
  const activeCurrentSchedule = useMemo(() => getActiveSafariSchedule(), []);
  const canterData = useMemo(() => getDhikalaCanterSchedule(), []);

  const [selectedScheduleId, setSelectedScheduleId] = useState<string>(
    defaultScheduleId || activeCurrentSchedule.id
  );
  const [activeTab, setActiveTab] = useState<"cards" | "matrix">("cards");

  const selectedSchedule: SafariGateSchedule = useMemo(() => {
    return allSchedules.find((s) => s.id === selectedScheduleId) || activeCurrentSchedule;
  }, [allSchedules, selectedScheduleId, activeCurrentSchedule]);

  const isCurrentActive = selectedSchedule.id === activeCurrentSchedule.id;

  return (
    <div id="safari-timings-widget" className={`w-full ${className}`}>
      {/* ── Top Header Row: Clean, Open Layout ──────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 bg-emerald-600 shrink-0" />
            <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#8A9468] font-semibold">
              Uttarakhand Forest Department Schedule
            </span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#17211A] tracking-tight">
            Safari Gate &amp; Shift Timings
          </h3>
          <p className="text-xs sm:text-sm text-[#8A9468] mt-1.5 max-w-xl leading-relaxed">
            Standard gate hours across all Jim Corbett core &amp; buffer zones. Gates lock strictly at last entry.
          </p>
        </div>

        {/* Clean Season Switcher & Tab Nav */}
        <div className="flex flex-wrap items-center gap-4 shrink-0">
          {/* Season Selector */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <select
                id="seasonal-window-select"
                value={selectedScheduleId}
                onChange={(e) => setSelectedScheduleId(e.target.value)}
                aria-label="Select Safari Seasonal Window"
                className="appearance-none bg-transparent border-b border-[#17211A] text-[#17211A] text-xs font-bold py-1.5 pl-0 pr-6 focus:outline-none focus:border-[#B84C1E] cursor-pointer"
              >
                {allSchedules.map((schedule) => (
                  <option key={schedule.id} value={schedule.id} className="bg-white text-[#17211A]">
                    {schedule.label}
                  </option>
                ))}
              </select>
              <HugeiconsIcon
                icon={ArrowDown01Icon}
                size={14}
                className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-[#17211A]"
              />
            </div>

            {isCurrentActive && (
              <span
                className="w-2 h-2 bg-emerald-600 shrink-0"
                title="Current seasonal window"
                aria-label="Current seasonal window"
              />
            )}
          </div>

          {/* Simple Text Tabs */}
          <div className="flex items-center gap-3 text-xs pl-2 border-l border-[#E8E0CC]">
            <button
              type="button"
              onClick={() => setActiveTab("cards")}
              className={`py-1 text-xs font-semibold tracking-wide transition-colors cursor-pointer ${
                activeTab === "cards"
                  ? "text-[#17211A] border-b-2 border-[#17211A] font-bold"
                  : "text-[#8A9468] hover:text-[#17211A]"
              }`}
            >
              Shifts
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("matrix")}
              className={`py-1 text-xs font-semibold tracking-wide transition-colors cursor-pointer ${
                activeTab === "matrix"
                  ? "text-[#17211A] border-b-2 border-[#17211A] font-bold"
                  : "text-[#8A9468] hover:text-[#17211A]"
              }`}
            >
              All 4 Seasons
            </button>
          </div>
        </div>
      </div>

      {/* ── Tab 1: Clean Open Shifts View ───────────────────────────────────── */}
      {activeTab === "cards" && (
        <div className="space-y-10 pt-4">
          {/* Main 2 Shifts: Side by side with generous whitespace, no outer box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14">
            {/* Morning Shift */}
            <div className="space-y-5">
              <div className="flex items-baseline justify-between border-b border-[#17211A]/20 pb-3">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#8A9468] block">
                    Dawn Shift • All Zones
                  </span>
                  <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#17211A] mt-0.5">
                    Morning Safari
                  </h4>
                </div>
                <span className="font-mono text-base font-bold text-[#17211A]">
                  {selectedSchedule.morning.shiftSummary}
                </span>
              </div>

              {/* 3 Step Sequence with clean whitespace */}
              <div className="grid grid-cols-3 gap-4 pt-1">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#8A9468] block">
                    Gate Opens
                  </span>
                  <span className="font-mono text-base sm:text-lg font-bold text-[#17211A] block mt-1">
                    {selectedSchedule.morning.gateOpens}
                  </span>
                  <span className="text-[11px] text-[#8A9468] block mt-0.5">Check-in start</span>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#B84C1E] font-semibold block">
                    Last Entry
                  </span>
                  <span className="font-mono text-base sm:text-lg font-bold text-[#B84C1E] block mt-1">
                    {selectedSchedule.morning.lastEntry}
                  </span>
                  <span className="text-[11px] text-[#B84C1E]/80 block mt-0.5">Gate locks</span>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#8A9468] block">
                    Mandatory Exit
                  </span>
                  <span className="font-mono text-base sm:text-lg font-bold text-[#17211A] block mt-1">
                    {selectedSchedule.morning.mandatoryExit}
                  </span>
                  <span className="text-[11px] text-[#8A9468] block mt-0.5">Check-out</span>
                </div>
              </div>

              <p className="text-xs text-[#8A9468] leading-relaxed pt-2">
                Prime tiger tracking shift. Forest gate automated barrier locks promptly at {selectedSchedule.morning.lastEntry}.
              </p>
            </div>

            {/* Afternoon Shift */}
            <div className="space-y-5">
              <div className="flex items-baseline justify-between border-b border-[#17211A]/20 pb-3">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#8A9468] block">
                    Dusk Shift • All Zones
                  </span>
                  <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#17211A] mt-0.5">
                    Afternoon Safari
                  </h4>
                </div>
                <span className="font-mono text-base font-bold text-[#17211A]">
                  {selectedSchedule.afternoon.shiftSummary}
                </span>
              </div>

              {/* 3 Step Sequence with clean whitespace */}
              <div className="grid grid-cols-3 gap-4 pt-1">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#8A9468] block">
                    Gate Opens
                  </span>
                  <span className="font-mono text-base sm:text-lg font-bold text-[#17211A] block mt-1">
                    {selectedSchedule.afternoon.gateOpens}
                  </span>
                  <span className="text-[11px] text-[#8A9468] block mt-0.5">Check-in start</span>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#B84C1E] font-semibold block">
                    Last Entry
                  </span>
                  <span className="font-mono text-base sm:text-lg font-bold text-[#B84C1E] block mt-1">
                    {selectedSchedule.afternoon.lastEntry}
                  </span>
                  <span className="text-[11px] text-[#B84C1E]/80 block mt-0.5">Gate locks</span>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#8A9468] block">
                    Mandatory Exit
                  </span>
                  <span className="font-mono text-base sm:text-lg font-bold text-[#17211A] block mt-1">
                    {selectedSchedule.afternoon.mandatoryExit}
                  </span>
                  <span className="text-[11px] text-[#8A9468] block mt-0.5">Check-out</span>
                </div>
              </div>

              <p className="text-xs text-[#8A9468] leading-relaxed pt-2">
                Ideal for elephant herds at Ramganga riverbanks. Exit strictly observed before sunset ({selectedSchedule.afternoon.mandatoryExit}).
              </p>
            </div>
          </div>

          {/* ── Dhikala Canter Section: Open & Clean ──────────────────────────── */}
          {showCanterSection && (
            <div className="pt-8 border-t border-[#E8E0CC]">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-6">
                <div className="flex items-center gap-2.5">
                  <h4 className="font-serif text-lg font-bold text-[#17211A]">
                    Dhikala Core Zone — Canter Shifts
                  </h4>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#8A9468]">
                    (16-Seater Bus Only)
                  </span>
                </div>
                <div className="text-[11px] font-mono text-[#8A9468]">
                  Open: {canterData.openSeason} • Closed: 16 Jun – 14 Nov (Monsoon)
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14">
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline border-b border-[#E8E0CC] pb-1.5">
                    <span className="text-xs font-bold text-[#17211A]">
                      Winter Loop (15 Nov – 31 Mar)
                    </span>
                    <span className="text-[10px] font-mono text-[#8A9468]">5.5h Deep Loop</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono pt-1">
                    <span className="text-[#8A9468]">Morning Expedition</span>
                    <span className="font-bold text-[#17211A]">{canterData.winter.morning}</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#8A9468]">Afternoon Expedition</span>
                    <span className="font-bold text-[#17211A]">{canterData.winter.afternoon}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-baseline border-b border-[#E8E0CC] pb-1.5">
                    <span className="text-xs font-bold text-[#17211A]">
                      Summer Loop (01 Apr – 15 Jun)
                    </span>
                    <span className="text-[10px] font-mono text-[#8A9468]">Early Dawn Departure</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono pt-1">
                    <span className="text-[#8A9468]">Morning Expedition</span>
                    <span className="font-bold text-[#17211A]">{canterData.summer.morning}</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#8A9468]">Afternoon Expedition</span>
                    <span className="font-bold text-[#17211A]">{canterData.summer.afternoon}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Protocol Note & Mandatory Checklist: Minimal Footnote ─────────── */}
          <div className="pt-6 border-t border-[#E8E0CC] flex flex-col md:flex-row md:items-baseline justify-between gap-4 text-xs text-[#8A9468]">
            <p className="max-w-xl leading-relaxed">
              <strong className="text-[#17211A] font-semibold">Strict Cutoff Protocol: </strong>
              {gateDeadlineProtocol.description}
            </p>

            <div className="flex items-center gap-4 text-[11px] font-mono text-[#17211A] shrink-0">
              <span>• Original Govt ID</span>
              <span>• Hardcopy Permit</span>
              <span>• Certified Guide</span>
            </div>
          </div>
        </div>
      )}

      {/* ── Tab 2: Clean Matrix Table ───────────────────────────────────────── */}
      {activeTab === "matrix" && (
        <div className="pt-4 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b-2 border-[#17211A] text-[#17211A] font-mono uppercase text-[10px] tracking-wider">
                <th className="py-3 pr-4">Seasonal Period</th>
                <th className="py-3 px-3">Morning Gate Opens</th>
                <th className="py-3 px-3 text-[#B84C1E]">Morning Last Entry</th>
                <th className="py-3 px-3">Morning Exit</th>
                <th className="py-3 px-3">Afternoon Gate Opens</th>
                <th className="py-3 px-3 text-[#B84C1E]">Afternoon Last Entry</th>
                <th className="py-3 pl-3">Afternoon Exit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E0CC] font-mono">
              {allSchedules.map((schedule) => {
                const isActive = schedule.id === activeCurrentSchedule.id;
                return (
                  <tr
                    key={schedule.id}
                    className={`transition-colors ${
                      isActive ? "bg-[#37482E]/5 font-bold text-[#17211A]" : "hover:bg-[#FBF8F0] text-[#17211A]/90"
                    }`}
                  >
                    <td className="py-4 pr-4 font-sans font-bold whitespace-nowrap">
                      <span className="inline-flex items-center gap-2">
                        <span>{schedule.label}</span>
                        {isActive && (
                          <span
                            className="w-2 h-2 bg-emerald-600 shrink-0"
                            title="Current seasonal window"
                            aria-label="Current seasonal window"
                          />
                        )}
                      </span>
                    </td>
                    <td className="py-4 px-3">{schedule.morning.gateOpens}</td>
                    <td className="py-4 px-3 text-[#B84C1E]">{schedule.morning.lastEntry}</td>
                    <td className="py-4 px-3">{schedule.morning.mandatoryExit}</td>
                    <td className="py-4 px-3">{schedule.afternoon.gateOpens}</td>
                    <td className="py-4 px-3 text-[#B84C1E]">{schedule.afternoon.lastEntry}</td>
                    <td className="py-4 pl-3">{schedule.afternoon.mandatoryExit}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="mt-6 pt-3 border-t border-[#E8E0CC] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-[#8A9468] font-mono">
            <span>* Automated barrier gate cutoff applies to all vehicles without exception.</span>
            <span>Jim Corbett Tiger Reserve / Uttarakhand Forest Department</span>
          </div>
        </div>
      )}
    </div>
  );
};
