"use client";

import { useRef } from "react";
import gsap from "gsap";
import type { IconType } from "react-icons";
import {
  RxActivityLog,
  RxBarChart,
  RxClock,
  RxCode,
  RxComponent1,
  RxDashboard,
  RxDesktop,
  RxExternalLink,
  RxGear,
  RxGlobe,
  RxHome,
  RxLaptop,
  RxLightningBolt,
  RxPerson,
  RxRocket,
  RxRows,
  RxStopwatch,
  RxTimer,
} from "react-icons/rx";
import { useReducedMotionGsap } from "@/hooks/use-reduced-motion-gsap";
import { animateCountUp } from "../metrics";
import { Screen, Sidebar, Toggle, Toolbar, useScreenActive } from "../chrome";
import type { SideEntry } from "../chrome";

const pageDetailItems: SideEntry[] = [
  { label: "Overview", icon: RxDashboard, active: true },
  { label: "Web Vitals", icon: RxActivityLog },
  { label: "Requests", icon: RxRows },
  { label: "Metrics", icon: RxBarChart },
  { label: "Lighthouse", icon: RxRocket },
  { label: "Console", icon: RxCode },
  { label: "RUM", icon: RxPerson },
  { label: "Experiments", icon: RxComponent1 },
  { label: "Page Settings", icon: RxGear },
];

const metaItems: { icon: IconType; label: string }[] = [
  { icon: RxClock, label: "12 Jun 2026, 07:40" },
  { icon: RxGlobe, label: "UK" },
  { icon: RxLightningBolt, label: "8 Mbps" },
  { icon: RxStopwatch, label: "40 ms RTT" },
  { icon: RxLaptop, label: "Fast Device" },
  { icon: RxDesktop, label: "Chrome 117" },
  { icon: RxRocket, label: "Lighthouse 12.6.0" },
];

type SpeedMetric = {
  label: string;
  value: string;
  delta?: string;
  deltaTone: "good" | "bad";
  line: string;
  endY: number;
};

const speedMetrics: SpeedMetric[] = [
  {
    label: "Full TTFB",
    value: "356 ms",
    delta: "+43 ms",
    deltaTone: "bad",
    line: "M0 24 L14 20 L28 26 L42 18 L56 22 L70 16 L84 20 L100 14",
    endY: 14,
  },
  {
    label: "First Contentful Paint",
    value: "798 ms",
    delta: "+167 ms",
    deltaTone: "bad",
    line: "M0 20 L14 24 L28 18 L42 22 L56 16 L70 20 L84 14 L100 18",
    endY: 18,
  },
  {
    label: "Largest Contentful Paint",
    value: "1.48 s",
    delta: "+196 ms",
    deltaTone: "bad",
    line: "M0 16 L14 18 L28 22 L42 20 L56 24 L70 22 L84 26 L100 22",
    endY: 22,
  },
  {
    label: "Total Blocking Time",
    value: "127 ms",
    delta: "+58 ms",
    deltaTone: "bad",
    line: "M0 26 L14 24 L28 20 L42 22 L56 16 L70 18 L84 12 L100 14",
    endY: 14,
  },
  {
    label: "Cumulative Layout Shift",
    value: "0",
    deltaTone: "good",
    line: "M0 30 L100 30",
    endY: 30,
  },
  {
    label: "Page Weight",
    value: "1.00 MB",
    delta: "+60.9 kB",
    deltaTone: "bad",
    line: "M0 22 L14 20 L28 24 L42 18 L56 20 L70 16 L84 18 L100 12",
    endY: 12,
  },
];

const filmstripFrames = [
  { time: "0.0s", stage: 0 },
  { time: "0.2s", stage: 0 },
  { time: "0.4s", stage: 1 },
  { time: "0.6s", stage: 1 },
  { time: "0.9s", stage: 2 },
  { time: "1.2s", stage: 3 },
  { time: "1.5s", stage: 3 },
  { time: "1.8s", stage: 3 },
];

function ScoreRing({ label, score }: { label: string; score: number }) {
  const isActive = useScreenActive();
  const rootRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);
  const circumference = 2 * Math.PI * 15.5;
  const offset = circumference * (1 - score / 100);

  useReducedMotionGsap(
    () => {
      gsap.fromTo(
        ringRef.current,
        { strokeDashoffset: circumference },
        { strokeDashoffset: offset, duration: 1.2, ease: "power2.out" },
      );
      animateCountUp(valueRef.current, `${score}%`, { duration: 1.2 });
    },
    {
      active: isActive,
      dependencies: [isActive, score, circumference, offset],
      scope: rootRef,
      revertOnUpdate: true,
    },
  );

  return (
    <div ref={rootRef} className="flex items-center gap-1.5 sm:gap-2">
      <div className="relative size-9 shrink-0 sm:size-12">
        <svg viewBox="0 0 36 36" className="size-full -rotate-90">
          <circle
            cx="18"
            cy="18"
            r="15.5"
            fill="none"
            className="stroke-night-100"
            strokeWidth="3"
          />
          <circle
            ref={ringRef}
            cx="18"
            cy="18"
            r="15.5"
            fill="none"
            className="stroke-zap-500"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-zap-700 sm:text-xs">
          <span ref={valueRef}>{score}%</span>
        </span>
      </div>
      <div className="hidden text-[10px] font-medium uppercase leading-tight tracking-wide text-night-500 sm:block">
        {label}
        <br />
        Score
      </div>
    </div>
  );
}

function SpeedMetricCard({
  label,
  value,
  delta,
  deltaTone,
  line,
  endY,
}: SpeedMetric) {
  const areaPath = `${line} L100 36 L0 36 Z`;
  const isActive = useScreenActive();
  const rootRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<SVGSVGElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);

  useReducedMotionGsap(
    () => {
      animateCountUp(valueRef.current, value);

      gsap
        .timeline()
        .fromTo(
          chartRef.current,
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", duration: 0.95, ease: "power2.out" },
          0,
        )
        .fromTo(
          dotRef.current,
          { attr: { r: 0 }, opacity: 0 },
          { attr: { r: 2 }, opacity: 1, duration: 0.45, ease: "back.out(2.2)" },
          0.85,
        );
    },
    {
      active: isActive,
      dependencies: [isActive, value],
      scope: rootRef,
      revertOnUpdate: true,
    },
  );

  return (
    <div
      ref={rootRef}
      className="rounded-lg border border-night-200 bg-fur-50 p-2 sm:p-3"
    >
      <div className="flex items-baseline justify-between gap-1">
        <span className="text-[10px] font-medium leading-tight text-night-600 sm:text-xs">
          {label}
        </span>
        {delta ? (
          <span
            className={`shrink-0 text-[10px] font-semibold sm:text-xs ${
              deltaTone === "good" ? "text-zap-700" : "text-bear-600"
            }`}
          >
            {delta}
          </span>
        ) : null}
      </div>
      <div
        ref={valueRef}
        className="mt-0.5 text-base font-bold tabular-nums text-night-900 sm:text-xl"
      >
        {value}
      </div>
      <svg
        ref={chartRef}
        viewBox="0 0 100 36"
        className="mt-1 h-6 w-full sm:h-8"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path d={areaPath} className="fill-signal-100" />
        <path
          d={line}
          fill="none"
          className="stroke-signal-400"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        <circle
          ref={dotRef}
          cx="100"
          cy={endY}
          r="2"
          className="fill-signal-500"
        />
      </svg>
    </div>
  );
}

function FilmstripFrame({ time, stage }: { time: string; stage: number }) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col overflow-hidden rounded border border-night-200 bg-fur-50">
        {stage === 0 ? (
          <div className="flex-1 bg-fur-50" />
        ) : (
          <div className="flex flex-1 flex-col">
            <div className="h-2 bg-night-700" />
            {stage >= 2 ? (
              <div className="flex flex-1 flex-col gap-0.5 p-1">
                <div className="h-1 w-3/4 rounded-sm bg-night-200" />
                <div className="h-1 w-1/2 rounded-sm bg-night-100" />
                {stage >= 3 ? (
                  <div className="mt-auto grid grid-cols-2 gap-0.5">
                    <div className="h-2 rounded-sm bg-signal-100" />
                    <div className="h-2 rounded-sm bg-signal-100" />
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="flex-1 bg-fur-50" />
            )}
          </div>
        )}
      </div>
      <div className="py-0.5 text-center text-[8px] text-night-400">{time}</div>
    </div>
  );
}

export function PageSpeedScreen() {
  return (
    <Screen
      toolbar={
        <Toolbar
          crumbs={[
            { icon: RxHome, label: "" },
            { label: "Homepage UK (Desktop)", dropdown: true },
            { label: "12 Jun 2026, 07:40", dropdown: true },
          ]}
          period="Last month"
        />
      }
      sidebar={
        <Sidebar
          groups={[
            pageDetailItems,
            [
              { label: "CrUX Trends", icon: RxTimer },
              { label: "Real User Monitoring", icon: RxPerson },
            ],
          ]}
          footer={
            <div className="space-y-2">
              <div className="rounded-md border border-night-700 bg-night-800 px-2 py-1.5 text-center text-[11px] font-semibold text-signal-200">
                Test Page Now
              </div>
              <div className="flex items-center gap-1.5 px-1 text-[10px] text-night-200">
                <Toggle on />
                Show Annotations
              </div>
            </div>
          }
        />
      }
    >
      <div className="rounded-lg border border-night-200 bg-fur-50 p-2 sm:p-3">
        <div className="flex items-center gap-3">
          <div
            className="hidden size-10 shrink-0 overflow-hidden rounded-md border border-night-200 bg-gradient-to-br from-signal-100 to-signal-200 sm:block sm:size-12"
            aria-hidden
          >
            <div className="h-2 bg-night-700" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-night-900 sm:text-sm">
                Page Speed Report
              </span>
              <RxGear className="size-3 text-night-400" />
            </div>
            <div className="flex items-center gap-1 truncate text-[11px] text-signal-600 sm:text-xs">
              www.debugbear.com/
              <RxExternalLink className="size-2.5 shrink-0" />
            </div>
            <div className="mt-1 hidden flex-wrap gap-x-2 gap-y-0.5 text-[10px] text-night-500 lg:flex">
              {metaItems.map((meta) => {
                const Icon = meta.icon;
                return (
                  <span key={meta.label} className="flex items-center gap-0.5">
                    <Icon className="size-2.5 shrink-0 text-night-400" />
                    {meta.label}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="flex shrink-0 gap-2 sm:gap-3">
            <ScoreRing label="CrUX" score={95} />
            <ScoreRing label="Lab" score={92} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {speedMetrics.map((metric) => (
          <SpeedMetricCard key={metric.label} {...metric} />
        ))}
      </div>

      <div className="hidden flex-1 flex-col rounded-lg border border-night-200 bg-fur-50 p-2 sm:flex sm:p-3">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-semibold text-night-800 sm:text-sm">
            Rendering Filmstrip
          </span>
          <div className="flex items-center gap-1 text-[10px] sm:text-xs">
            <span className="rounded bg-night-100 px-1.5 py-0.5 font-medium text-night-600">
              FCP
            </span>
            <span className="rounded px-1.5 py-0.5 text-night-500">LCP</span>
            <span className="rounded px-1.5 py-0.5 text-night-500">All</span>
          </div>
        </div>
        <div className="flex flex-1 gap-1" aria-hidden>
          {filmstripFrames.map((frame) => (
            <FilmstripFrame key={frame.time} {...frame} />
          ))}
        </div>
        <div className="relative mt-1 h-3 border-t border-night-200" aria-hidden>
          <span
            className="absolute top-0 h-3 w-0.5 bg-zap-500"
            style={{ left: "18%" }}
          />
          <span
            className="absolute top-0 h-3 w-0.5 bg-signal-400"
            style={{ left: "42%" }}
          />
          <span
            className="absolute top-0 h-3 w-0.5 bg-bear-500"
            style={{ left: "72%" }}
          />
        </div>
        <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-[10px] font-medium sm:text-xs">
          <span className="flex items-center gap-1 text-zap-700">
            <span className="size-1.5 rounded-full bg-zap-500" />
            Full TTFB: 356 ms
          </span>
          <span className="flex items-center gap-1 text-signal-600">
            <span className="size-1.5 rounded-full bg-signal-400" />
            First Contentful Paint: 798 ms
          </span>
          <span className="flex items-center gap-1 text-bear-600">
            <span className="size-1.5 rounded-full bg-bear-500" />
            Largest Contentful Paint: 1.48 s
          </span>
        </div>
      </div>
    </Screen>
  );
}
