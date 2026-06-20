"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

type UseGSAPConfig = Parameters<typeof useGSAP>[1];

/**
 * Runs a GSAP setup function only when motion is allowed (and, optionally, only
 * while `active`), reverting everything on cleanup. Centralizes the
 * matchMedia + prefers-reduced-motion + revert boilerplate that every animated
 * component in the hero would otherwise repeat by hand.
 */
export function useReducedMotionGsap(
  setup: () => void,
  options?: UseGSAPConfig & { active?: boolean },
) {
  const { active = true, ...gsapConfig } = options ?? {};

  useGSAP(() => {
    if (!active) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", setup);
    return () => mm.revert();
  }, gsapConfig);
}
