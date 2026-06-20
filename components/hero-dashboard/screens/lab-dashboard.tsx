"use client";

import { useRef } from "react";
import gsap from "gsap";
import {
  RxChevronDown,
  RxClock,
  RxCode,
  RxColumns,
  RxComponent1,
  RxComponentInstance,
  RxDashboard,
  RxFileText,
  RxGear,
  RxHome,
  RxMagnifyingGlass,
  RxMixerHorizontal,
  RxPencil2,
  RxPerson,
  RxTimer,
} from "react-icons/rx";
import { useReducedMotionGsap } from "@/hooks/use-reduced-motion-gsap";
import {
  Screen,
  Sidebar,
  Toolbar,
  useScreenActive,
  useShouldAnimateEntrance,
  type Rating,
} from "../chrome";

const BAR_HEIGHTS = [55, 70, 60, 82, 68, 78, 62, 88, 66, 74, 64, 84];

function barColor(rating: Rating, i: number) {
  // Cosmetic per-bar color jitter so the bars read as varied real data.
  if (rating === "good") return i % 7 === 3 ? "bg-bear-300" : "bg-zap-400";
  if (rating === "ni") return i % 2 === 0 ? "bg-zap-400" : "bg-bear-300";
  return i % 3 === 0 ? "bg-bear-600" : "bg-bear-400";
}

function CruxCell({ value, rating }: { value: string; rating: Rating }) {
  return (
    <div className="flex flex-col items-start">
      <div
        data-bars
        className="flex h-5 origin-bottom items-end gap-px will-change-transform"
      >
        {BAR_HEIGHTS.map((h, i) => (
          <span
            key={i}
            className={`w-0.5 rounded-sm ${barColor(rating, i)}`}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <span className="mt-0.5 text-[9px] font-medium text-night-600">
        {value}
      </span>
    </div>
  );
}

type PageRow = {
  name: string;
  url: string;
  cells: { value: string; rating: Rating }[];
};

const PAGES: PageRow[] = [
  {
    name: "Discord Homepage",
    url: "discord.com",
    cells: [
      { value: "0.3 s", rating: "good" },
      { value: "1.2 s", rating: "good" },
      { value: "1.7 s", rating: "good" },
      { value: "0.00", rating: "good" },
      { value: "84 ms", rating: "good" },
    ],
  },
  {
    name: "Quickbooks Homepage",
    url: "quickbooks.intuit.com/uk",
    cells: [
      { value: "0.5 s", rating: "good" },
      { value: "1.0 s", rating: "good" },
      { value: "1.4 s", rating: "good" },
      { value: "0.00", rating: "good" },
      { value: "0.2 s", rating: "good" },
    ],
  },
  {
    name: "web.dev — Desktop",
    url: "web.dev",
    cells: [
      { value: "1.3 s", rating: "ni" },
      { value: "1.9 s", rating: "ni" },
      { value: "2.5 s", rating: "ni" },
      { value: "0.10", rating: "ni" },
      { value: "77 ms", rating: "good" },
    ],
  },
  {
    name: "Search Engine Land",
    url: "searchengineland.com",
    cells: [
      { value: "0.7 s", rating: "good" },
      { value: "1.1 s", rating: "good" },
      { value: "1.3 s", rating: "good" },
      { value: "0.02", rating: "good" },
      { value: "48 ms", rating: "good" },
    ],
  },
  {
    name: "H&M Homepage",
    url: "hm.com/en_us/index.html",
    cells: [
      { value: "0.6 s", rating: "good" },
      { value: "1.3 s", rating: "good" },
      { value: "1.9 s", rating: "ni" },
      { value: "0.11", rating: "ni" },
      { value: "78 ms", rating: "good" },
    ],
  },
  {
    name: "Uniqlo Homepage",
    url: "uniqlo.com/us/en",
    cells: [
      { value: "0.6 s", rating: "good" },
      { value: "1.3 s", rating: "good" },
      { value: "2.0 s", rating: "ni" },
      { value: "0.37", rating: "poor" },
      { value: "0.5 s", rating: "ni" },
    ],
  },
  {
    name: "SquareSpace Homepage",
    url: "squarespace.com",
    cells: [
      { value: "0.7 s", rating: "good" },
      { value: "1.1 s", rating: "good" },
      { value: "1.2 s", rating: "good" },
      { value: "0.00", rating: "good" },
      { value: "58 ms", rating: "good" },
    ],
  },
  {
    name: "London Homepage",
    url: "london.gov.uk",
    cells: [
      { value: "0.6 s", rating: "good" },
      { value: "0.9 s", rating: "good" },
      { value: "1.4 s", rating: "good" },
      { value: "0.00", rating: "good" },
      { value: "80 ms", rating: "good" },
    ],
  },
];

const CRUX_COLUMNS = [
  "TTFB (CrUX)",
  "FCP (CrUX)",
  "LCP (CrUX)",
  "CLS (CrUX)",
  "INP (CrUX)",
];

const GRID_COLS = "grid-cols-[1.7fr_repeat(5,1fr)]";

export function LabDashboardScreen() {
  const isActive = useScreenActive();
  const shouldAnimate = useShouldAnimateEntrance();
  const rootRef = useRef<HTMLDivElement>(null);

  useReducedMotionGsap(
    () => {
      const bars = rootRef.current!.querySelectorAll<HTMLElement>("[data-bars]");
      gsap.from(bars, {
        scaleY: 0,
        duration: 0.45,
        ease: "power2.out",
        stagger: { amount: 0.55, from: "start", grid: [8, 5] },
        force3D: true,
      });
    },
    {
      active: isActive && shouldAnimate,
      dependencies: [isActive, shouldAnimate],
      scope: rootRef,
      revertOnUpdate: true,
    },
  );

  return (
    <div ref={rootRef} className="contents">
      <Screen
        toolbar={
          <Toolbar
            crumbs={[
              { icon: RxHome, label: "" },
              { icon: RxFileText, label: "Lab Tests", dropdown: true },
            ]}
            period="Monthly"
          />
        }
        sidebar={
          <Sidebar
            groups={[
              [
                { label: "Dashboard", icon: RxDashboard, active: true },
                { label: "Compare", icon: RxColumns },
                { label: "Bulk Edit", icon: RxPencil2 },
                { label: "Test History", icon: RxClock },
                { label: "Experiments", icon: RxComponent1 },
                { label: "API Builds", icon: RxCode },
              ],
              [
                { label: "CrUX Trends", icon: RxTimer },
                { label: "Real User Monitoring", icon: RxPerson },
              ],
              [
                { label: "Project Settings", icon: RxGear },
                { label: "Account", icon: RxPerson },
                { label: "Team", icon: RxComponentInstance },
              ],
            ]}
            footer={
              <div className="rounded-md border border-night-700 bg-night-800 px-2 py-1.5 text-center text-[11px] font-semibold text-signal-200">
                Test 23 Pages Now
              </div>
            }
          />
        }
      >
        <div className="flex min-w-0 items-center justify-between gap-1">
          <div className="flex min-w-0 items-center gap-1 text-[9px] text-night-600 sm:gap-1.5 sm:text-[10px]">
            <span className="shrink-0 text-[10px] font-semibold text-night-800 sm:text-xs">
              Pages
            </span>
            <span className="flex shrink-0 items-center gap-0.5 rounded border border-night-200 px-1 py-0.5 sm:gap-1 sm:px-1.5">
              <RxMagnifyingGlass className="size-2.5" />
              <span className="hidden sm:inline">Search</span>
            </span>
            <span className="hidden items-center gap-1 rounded border border-night-200 px-1.5 py-0.5 md:flex">
              No Saved Filter
              <RxChevronDown className="size-2.5" />
            </span>
            <span className="hidden items-center gap-1 rounded border border-night-200 px-1.5 py-0.5 md:flex">
              <RxMixerHorizontal className="size-2.5" />
              Filters
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-1 text-[9px] text-night-500 sm:text-[10px]">
            <span className="rounded bg-night-100 px-1 py-0.5 font-medium text-night-700 sm:px-1.5">
              Overview
            </span>
            <span className="hidden px-1.5 py-0.5 sm:inline">Charts</span>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-hidden rounded-lg border border-night-200 bg-fur-50">
          <div className="h-full overflow-x-auto overflow-y-hidden">
            <div className="flex h-full min-w-[34rem] flex-col px-2 py-1 sm:min-w-0">
              <div
                className={`grid ${GRID_COLS} items-center gap-1 border-b border-night-200 pb-1 text-[8px] font-semibold uppercase tracking-wide text-night-400`}
              >
                <span>Page</span>
                {CRUX_COLUMNS.map((c) => (
                  <span key={c} className="truncate">
                    {c}
                  </span>
                ))}
              </div>
              <div className="flex flex-1 flex-col justify-between">
                {PAGES.map((page) => (
                  <div
                    key={page.name}
                    className={`grid ${GRID_COLS} items-center gap-1 border-b border-night-100 py-1 last:border-b-0`}
                  >
                    <div className="flex min-w-0 items-center gap-1.5">
                      <div className="size-5 shrink-0 overflow-hidden rounded border border-night-200 bg-signal-100 sm:size-6">
                        <div className="h-1.5 bg-night-700" />
                      </div>
                      <div className="min-w-0">
                        <div className="truncate text-[9px] font-semibold text-night-800 sm:text-[10px]">
                          {page.name}
                        </div>
                        <div className="truncate text-[8px] text-night-500 sm:text-[9px]">
                          {page.url}
                        </div>
                      </div>
                    </div>
                    {page.cells.map((cell, i) => (
                      <CruxCell key={i} {...cell} />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Screen>
    </div>
  );
}
