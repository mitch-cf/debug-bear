"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import type { IconType } from "react-icons";
import { RxBarChart } from "react-icons/rx";
import { RxDashboard } from "react-icons/rx";
import { RxPerson } from "react-icons/rx";
import { ScreenActiveContext, ShouldAnimateEntranceContext } from "./chrome";
import { LabDashboardScreen } from "./screens/lab-dashboard";
import { PageSpeedScreen } from "./screens/page-speed";
import { RumScreen } from "./screens/rum";

const INTERVAL = 5000;

const SCREENS: {
  id: string;
  label: string;
  icon: IconType;
  Component: ComponentType;
}[] = [
  { id: "page", label: "Page Speed", icon: RxBarChart, Component: PageSpeedScreen },
  { id: "rum", label: "Real User Monitoring", icon: RxPerson, Component: RumScreen },
  { id: "lab", label: "Lab Tests", icon: RxDashboard, Component: LabDashboardScreen },
];

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
}

export function HeroDashboardPreview() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [mountedScreens, setMountedScreens] = useState(() => new Set([0]));
  const hasLeftInitialScreen = useRef(false);

  useEffect(() => {
    if (active !== 0) hasLeftInitialScreen.current = true;
    setMountedScreens((prev) => {
      if (prev.has(active)) return prev;
      const next = new Set(prev);
      next.add(active);
      return next;
    });
  }, [active]);

  // `active` is a dependency so a manual tab click restarts the dwell timer,
  // giving the chosen screen a full interval before auto-advancing.
  useEffect(() => {
    if (paused || prefersReducedMotion()) return;
    const id = setInterval(
      () => setActive((a) => (a + 1) % SCREENS.length),
      INTERVAL,
    );
    return () => clearInterval(id);
  }, [paused, active]);

  return (
    <div
      className="absolute inset-0 flex flex-col overflow-hidden rounded-xl border-2 border-night-950 bg-night-900"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="relative flex shrink-0 items-end gap-0.5 px-1 pt-1 sm:gap-1 sm:px-2 sm:pt-1.5"
        role="tablist"
        aria-label="Switch DebugBear dashboard preview"
      >
        {SCREENS.map((screen, i) => {
          const Icon = screen.icon;
          const isActive = i === active;
          return (
            <button
              key={screen.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={screen.label}
              onClick={() => setActive(i)}
              className={`relative flex flex-1 items-center justify-center gap-1 overflow-hidden rounded-t-md px-2 py-1.5 text-[10px] font-medium transition-colors sm:flex-none sm:justify-start sm:px-2.5 sm:py-1 sm:text-[11px] ${
                isActive
                  ? "bg-fur-100 text-night-900"
                  : "text-night-300 hover:text-fur-50"
              }`}
            >
              <Icon className="size-3.5 shrink-0 sm:size-3" />
              <span className="sr-only sm:not-sr-only sm:inline">
                {screen.label}
              </span>
              {isActive && !paused ? (
                <span
                  key={active}
                  className="pointer-events-none absolute bottom-0 left-0 h-0.5 bg-zap-500"
                  style={{ animation: `dashboard-progress ${INTERVAL}ms linear` }}
                  aria-hidden
                />
              ) : null}
            </button>
          );
        })}
      </div>

      <div
        className="relative flex-1"
        role="img"
        aria-label="DebugBear product dashboards: lab tests, page speed report, and real user monitoring"
      >
        {SCREENS.map((screen, i) => {
          if (!mountedScreens.has(i)) return null;
          const Component = screen.Component;
          const isActive = i === active;
          const shouldAnimate =
            isActive && (active !== 0 || hasLeftInitialScreen.current);
          return (
            <div
              key={screen.id}
              className={`absolute inset-0 transition-opacity duration-700 ${
                isActive ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
              aria-hidden={!isActive}
            >
              <ScreenActiveContext.Provider value={isActive}>
                <ShouldAnimateEntranceContext.Provider value={shouldAnimate}>
                  <Component />
                </ShouldAnimateEntranceContext.Provider>
              </ScreenActiveContext.Provider>
            </div>
          );
        })}
      </div>
    </div>
  );
}
