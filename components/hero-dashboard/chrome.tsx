"use client";

import { createContext, use, type ReactNode } from "react";
import type { IconType } from "react-icons";
import {
  RxChevronDown,
  RxChevronRight,
  RxDotsHorizontal,
  RxDownload,
  RxShare2,
} from "react-icons/rx";

/** True while the screen this subtree belongs to is the visible one. */
export const ScreenActiveContext = createContext(false);
export const useScreenActive = () => use(ScreenActiveContext);

/** True when GSAP entrance animations should run (skipped on first paint). */
export const ShouldAnimateEntranceContext = createContext(false);
export const useShouldAnimateEntrance = () => use(ShouldAnimateEntranceContext);

/** Core Web Vitals pass/needs-improvement/fail rating, shared across screens. */
export type Rating = "good" | "ni" | "poor";

export type SideEntry = {
  label: string;
  icon: IconType;
  active?: boolean;
  indent?: boolean;
};

export type Crumb = { icon?: IconType; label: string; dropdown?: boolean };

export function Toggle({ on }: { on?: boolean }) {
  return (
    <span
      className={`relative inline-flex h-3.5 w-6 shrink-0 items-center rounded-full transition-colors ${
        on ? "bg-zap-400" : "bg-night-200"
      }`}
      aria-hidden
    >
      <span
        className={`absolute size-2.5 rounded-full bg-fur-50 shadow-sm transition-all ${
          on ? "left-3" : "left-0.5"
        }`}
      />
    </span>
  );
}

export function Sidebar({
  groups,
  footer,
}: {
  groups: SideEntry[][];
  footer: ReactNode;
}) {
  return (
    <aside
      className="hidden w-[22%] min-w-[9rem] flex-col overflow-hidden border-r border-night-800 bg-night-900 px-2 py-2.5 text-fur-50 sm:flex"
      aria-hidden
    >
      <div className="flex-1 space-y-2 overflow-hidden">
        {groups.map((group, gi) => (
          <ul
            key={gi}
            className={
              gi > 0
                ? "space-y-0.5 border-t border-night-800 pt-2"
                : "space-y-0.5"
            }
          >
            {group.map((entry) => {
              const Icon = entry.icon;
              return (
                <li
                  key={entry.label}
                  className={`flex items-center gap-1.5 rounded px-1.5 py-1 text-[11px] ${
                    entry.indent ? "ml-3" : ""
                  } ${
                    entry.active
                      ? "bg-night-700 font-semibold text-zap-300"
                      : "text-night-100"
                  }`}
                >
                  <Icon className="size-3 shrink-0" />
                  <span className="truncate">{entry.label}</span>
                </li>
              );
            })}
          </ul>
        ))}
      </div>
      <div className="pt-2">{footer}</div>
    </aside>
  );
}

export function Toolbar({
  crumbs,
  period,
}: {
  crumbs: Crumb[];
  period: string;
}) {
  return (
    <div
      className="flex items-center justify-between gap-1 border-b border-night-200 bg-fur-50 px-2 py-1 sm:gap-2 sm:px-3 sm:py-1.5"
      aria-hidden
    >
      <div className="flex min-w-0 flex-1 items-center gap-1 overflow-hidden text-[9px] text-night-600 sm:gap-1.5 sm:text-xs">
        {crumbs.map((crumb, i) => {
          const Icon = crumb.icon;
          return (
            <span key={i} className="flex min-w-0 shrink items-center gap-1 sm:gap-1.5">
              {i > 0 ? (
                <RxChevronRight className="size-2.5 shrink-0 text-night-300 sm:size-3" />
              ) : null}
              <span
                className={`flex min-w-0 items-center gap-0.5 sm:gap-1 ${
                  crumb.dropdown
                    ? "rounded border border-night-200 px-1 py-0.5 font-medium sm:px-1.5"
                    : ""
                }`}
              >
                {Icon ? <Icon className="size-2.5 shrink-0 text-night-400 sm:size-3" /> : null}
                {crumb.label ? (
                  <span className="truncate">{crumb.label}</span>
                ) : null}
                {crumb.dropdown ? (
                  <RxChevronDown className="size-2.5 shrink-0 text-night-400 sm:size-3" />
                ) : null}
              </span>
            </span>
          );
        })}
      </div>
      <div className="flex shrink-0 items-center gap-2 text-night-500">
        <span className="hidden items-center gap-1 text-[11px] sm:flex sm:text-xs">
          <Toggle />
          Compare
        </span>
        <span className="hidden items-center gap-1 rounded border border-night-200 px-1.5 py-0.5 text-[11px] sm:flex sm:text-xs">
          {period}
          <RxChevronDown className="size-3 text-night-400" />
        </span>
        <RxShare2 className="hidden size-3.5 sm:block" />
        <RxDownload className="hidden size-3.5 sm:block" />
        <RxDotsHorizontal className="size-3.5" />
      </div>
    </div>
  );
}

export function Screen({
  toolbar,
  sidebar,
  children,
}: {
  toolbar: ReactNode;
  sidebar: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex h-full flex-col bg-fur-100">
      {toolbar}
      <div className="flex min-h-0 flex-1">
        {sidebar}
        <div className="flex min-w-0 flex-1 flex-col gap-1.5 overflow-hidden p-1.5 sm:gap-2.5 sm:p-3">
          {children}
        </div>
      </div>
    </div>
  );
}
