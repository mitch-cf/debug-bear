"use client";

import { createContext, use } from "react";
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
  footer: React.ReactNode;
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
      className="flex items-center justify-between gap-2 border-b border-night-200 bg-fur-50 px-3 py-1.5"
      aria-hidden
    >
      <div className="flex min-w-0 items-center gap-1.5 text-[11px] text-night-600 sm:text-xs">
        {crumbs.map((crumb, i) => {
          const Icon = crumb.icon;
          return (
            <span key={i} className="flex shrink-0 items-center gap-1.5">
              {i > 0 ? (
                <RxChevronRight className="size-3 text-night-300" />
              ) : null}
              <span
                className={`flex items-center gap-1 ${
                  crumb.dropdown
                    ? "rounded border border-night-200 px-1.5 py-0.5 font-medium"
                    : ""
                }`}
              >
                {Icon ? <Icon className="size-3 text-night-400" /> : null}
                {crumb.label}
                {crumb.dropdown ? (
                  <RxChevronDown className="size-3 text-night-400" />
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
  toolbar: React.ReactNode;
  sidebar: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col bg-fur-100">
      {toolbar}
      <div className="flex min-h-0 flex-1">
        {sidebar}
        <div className="flex min-w-0 flex-1 flex-col gap-2 overflow-hidden p-2 sm:gap-2.5 sm:p-3">
          {children}
        </div>
      </div>
    </div>
  );
}
