"use client";

import { useRef } from "react";
import gsap from "gsap";
import {
  RxActivityLog,
  RxChevronDown,
  RxComponent1,
  RxCrosshair2,
  RxDesktop,
  RxDotsHorizontal,
  RxFileText,
  RxGear,
  RxGlobe,
  RxHome,
  RxLightningBolt,
  RxMagnifyingGlass,
  RxMobile,
  RxPerson,
  RxStopwatch,
  RxTimer,
} from "react-icons/rx";
import { useReducedMotionGsap } from "@/hooks/use-reduced-motion-gsap";
import { animateCountUp } from "../metrics";
import { Screen, Sidebar, Toolbar, useScreenActive, useShouldAnimateEntrance } from "../chrome";
import type { Rating, SideEntry } from "../chrome";

const rumSidebar: SideEntry[][] = [
  [
    { label: "Lab Tests", icon: RxFileText },
    { label: "CrUX Trends", icon: RxTimer },
    { label: "Real User Monitoring", icon: RxPerson, active: true },
  ],
  [
    { label: "Web Vitals", icon: RxActivityLog, active: true, indent: true },
    { label: "LCP", icon: RxCrosshair2, indent: true },
    { label: "CLS", icon: RxComponent1, indent: true },
    { label: "INP", icon: RxLightningBolt, indent: true },
    { label: "More Metrics", icon: RxDotsHorizontal, indent: true },
    { label: "TTFB", icon: RxTimer, indent: true },
    { label: "FCP", icon: RxStopwatch, indent: true },
    { label: "Engagement", icon: RxPerson, indent: true },
    { label: "Errors", icon: RxCrosshair2, indent: true },
    { label: "Page Views", icon: RxFileText, indent: true },
  ],
];

type WebVital = {
  label: string;
  value: string;
  rating: Rating;
};

const webVitals: WebVital[] = [
  { label: "Largest Contentful Paint", value: "1.70 s", rating: "good" },
  { label: "Cumulative Layout Shift", value: "0.11", rating: "ni" },
  { label: "Interaction to Next Paint", value: "184 ms", rating: "good" },
];

function WebVitalCard({ label, value, rating }: WebVital) {
  const markerLeft =
    rating === "good" ? "20%" : rating === "ni" ? "58%" : "85%";
  const isActive = useScreenActive();
  const shouldAnimate = useShouldAnimateEntrance();
  const rootRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLSpanElement>(null);

  useReducedMotionGsap(
    () => {
      animateCountUp(valueRef.current, value, { duration: 1.2 });
      gsap.fromTo(
        markerRef.current,
        { left: "0%", opacity: 0 },
        {
          left: markerLeft,
          opacity: 1,
          duration: 1.1,
          ease: "power2.out",
          delay: 0.1,
        },
      );
    },
    {
      active: isActive && shouldAnimate,
      dependencies: [isActive, shouldAnimate, value, markerLeft],
      scope: rootRef,
      revertOnUpdate: true,
    },
  );

  return (
    <div
      ref={rootRef}
      className="rounded-lg border border-night-200 bg-fur-50 p-2 sm:p-3"
    >
      <div className="flex items-center justify-between gap-1 text-[10px] text-night-600 sm:text-xs">
        <span className="truncate font-medium">{label}</span>
        <span className="shrink-0 text-night-400">P75</span>
      </div>
      <div
        ref={valueRef}
        className="mt-1 text-xl font-bold tabular-nums text-night-900 sm:text-3xl"
      >
        {value}
      </div>
      <div className="relative mt-2 flex h-1.5 overflow-hidden rounded-full">
        <span className="h-full flex-[2] bg-zap-400" />
        <span className="h-full flex-1 bg-bear-300" />
        <span className="h-full flex-1 bg-bear-600" />
        <span
          ref={markerRef}
          className="absolute top-1/2 size-2 -translate-y-1/2 rounded-full border border-fur-50 bg-night-900"
          style={{ left: markerLeft }}
        />
      </div>
    </div>
  );
}

const MAP_ROWS = [
  "...gg...aa..",
  "..gggg.aaa.r",
  ".gg.g..aarrr",
  "..g....aa.rr",
  "...g....a...",
];

function mapCellColor(char: string) {
  if (char === "g") return "bg-zap-400";
  if (char === "a") return "bg-bear-300";
  if (char === "r") return "bg-bear-600";
  return "bg-night-100";
}

export function RumScreen() {
  return (
    <Screen
      toolbar={
        <Toolbar
          crumbs={[
            { icon: RxHome, label: "" },
            { icon: RxMagnifyingGlass, label: "RUM" },
            { icon: RxActivityLog, label: "Web Vitals", dropdown: true },
          ]}
          period="Last Month"
        />
      }
      sidebar={
        <Sidebar
          groups={rumSidebar}
          footer={
            <div className="space-y-0.5 border-t border-night-800 pt-2 text-[11px] text-night-100">
              <div className="flex items-center gap-1.5 px-1.5">
                <RxGear className="size-3 shrink-0" />
                Project Settings
              </div>
              <div className="flex items-center gap-1.5 px-1.5">
                <RxPerson className="size-3 shrink-0" />
                Account
              </div>
            </div>
          }
        />
      }
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 text-[10px] text-night-600">
          <span className="flex items-center gap-1 rounded bg-night-100 px-1.5 py-0.5 font-medium text-night-700">
            <RxMobile className="size-2.5" />
            Mobile
          </span>
          <span className="flex items-center gap-1 px-1.5 py-0.5 text-night-500">
            <RxDesktop className="size-2.5" />
            Desktop
          </span>
          <span className="px-1.5 py-0.5 text-night-500">All</span>
          <span className="hidden items-center gap-1 rounded border border-night-200 px-1.5 py-0.5 md:flex">
            No Saved Filter
            <RxChevronDown className="size-2.5" />
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-night-500">
          <span className="font-medium text-night-700">Overview</span>
          <span>Timeline</span>
          <span className="hidden md:inline">Page Views</span>
          <span className="hidden md:inline">Table</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {webVitals.map((vital) => (
          <WebVitalCard key={vital.label} {...vital} />
        ))}
      </div>

      <div className="grid flex-1 grid-cols-2 gap-2">
        <div className="flex flex-col rounded-lg border border-night-200 bg-fur-50 p-2 sm:p-3">
          <span className="text-[11px] font-semibold text-night-800 sm:text-xs">
            Core Web Vitals Trend
          </span>
          <svg
            viewBox="0 0 100 40"
            preserveAspectRatio="none"
            className="mt-1 w-full flex-1"
            aria-hidden
          >
            <path
              d="M0 30 L16 28 L33 31 L50 26 L66 29 L83 24 L100 27 L100 40 L0 40 Z"
              className="fill-bear-100"
            />
            <path
              d="M0 22 L16 18 L33 24 L50 16 L66 20 L83 14 L100 18 L100 40 L0 40 Z"
              className="fill-zap-100"
            />
            <path
              d="M0 22 L16 18 L33 24 L50 16 L66 20 L83 14 L100 18"
              fill="none"
              className="stroke-zap-500"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        <div className="flex flex-col rounded-lg border border-night-200 bg-fur-50 p-2 sm:p-3">
          <div className="flex items-center gap-1 text-[11px] font-semibold text-night-800 sm:text-xs">
            Core Web Vitals Map
            <RxGlobe className="size-2.5 text-night-400" />
          </div>
          <div className="mt-1 grid flex-1 grid-rows-5 gap-0.5" aria-hidden>
            {MAP_ROWS.map((row, ri) => (
              <div key={ri} className="grid grid-cols-12 gap-0.5">
                {row.split("").map((char, ci) => (
                  <span
                    key={ci}
                    className={`rounded-[1px] ${mapCellColor(char)}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Screen>
  );
}
