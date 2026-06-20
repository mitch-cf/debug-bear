import gsap from "gsap";

type ParsedMetric = { number: number; suffix: string; decimals: number };

const METRIC_PATTERN = /^(-?\d*\.?\d+)(.*)$/;

/** Splits a display string like "1.48 s" or "95%" into number + suffix. */
export function parseMetricValue(raw: string): ParsedMetric {
  const trimmed = raw.trim();
  const match = trimmed.match(METRIC_PATTERN);
  if (!match) return { number: 0, suffix: trimmed, decimals: 0 };
  const numStr = match[1];
  const suffix = match[2] ?? "";
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  return { number: parseFloat(numStr), suffix, decimals };
}

function formatMetric(n: number, decimals: number, suffix: string) {
  return `${n.toFixed(decimals)}${suffix}`;
}

/**
 * Counts the given element's text up from zero to `value`, preserving the
 * value's decimal precision and suffix. Call this inside a GSAP context (e.g.
 * a `useReducedMotionGsap` setup) so it participates in cleanup.
 */
export function animateCountUp(
  el: HTMLElement | null,
  value: string,
  vars?: gsap.TweenVars,
) {
  if (!el) return;
  const { number, suffix, decimals } = parseMetricValue(value);
  const counter = { n: 0 };
  gsap.to(counter, {
    n: number,
    duration: 1.1,
    ease: "power2.out",
    ...vars,
    onUpdate: () => {
      el.textContent = formatMetric(counter.n, decimals, suffix);
    },
  });
}
