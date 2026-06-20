"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useReducedMotionGsap } from "@/hooks/use-reduced-motion-gsap";

const STAR_POSITIONS: {
  x: number;
  y: number;
  size: number;
  tone: "zap" | "fur";
}[] = [
  { x: 4, y: 8, size: 2, tone: "zap" },
  { x: 11, y: 18, size: 1.5, tone: "fur" },
  { x: 16, y: 35, size: 2.5, tone: "zap" },
  { x: 22, y: 12, size: 1.5, tone: "fur" },
  { x: 28, y: 28, size: 2, tone: "zap" },
  { x: 34, y: 6, size: 2.5, tone: "fur" },
  { x: 38, y: 22, size: 1.5, tone: "zap" },
  { x: 43, y: 15, size: 2, tone: "fur" },
  { x: 49, y: 4, size: 1.5, tone: "zap" },
  { x: 54, y: 31, size: 2.5, tone: "fur" },
  { x: 59, y: 9, size: 2, tone: "zap" },
  { x: 64, y: 18, size: 1.5, tone: "fur" },
  { x: 68, y: 26, size: 2.5, tone: "zap" },
  { x: 72, y: 7, size: 1.5, tone: "fur" },
  { x: 76, y: 35, size: 2, tone: "zap" },
  { x: 80, y: 14, size: 2.5, tone: "fur" },
  { x: 85, y: 22, size: 1.5, tone: "zap" },
  { x: 88, y: 5, size: 2, tone: "fur" },
  { x: 92, y: 30, size: 1.5, tone: "zap" },
  { x: 95, y: 16, size: 2.5, tone: "fur" },
  { x: 6, y: 42, size: 1, tone: "fur" },
  { x: 19, y: 47, size: 1.5, tone: "zap" },
  { x: 32, y: 40, size: 1, tone: "fur" },
  { x: 47, y: 44, size: 1.5, tone: "zap" },
  { x: 61, y: 41, size: 1, tone: "fur" },
  { x: 74, y: 48, size: 1.5, tone: "zap" },
  { x: 87, y: 43, size: 1, tone: "fur" },
];

export function HeroHeadingStars() {
  const starsRef = useRef<HTMLDivElement>(null);

  useReducedMotionGsap(
    () => {
      const stars =
        starsRef.current?.querySelectorAll<HTMLElement>("[data-star]");
      stars?.forEach((star) => {
        gsap.to(star, {
          opacity: gsap.utils.random(0.45, 0.95),
          scale: gsap.utils.random(1, 1.7),
          duration: gsap.utils.random(1.6, 3.4),
          delay: gsap.utils.random(0, 3),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          transformOrigin: "50% 50%",
        });
      });
    },
    { scope: starsRef },
  );

  return (
    <div
      ref={starsRef}
      className="pointer-events-none absolute inset-0 z-[1]"
      aria-hidden
    >
      {STAR_POSITIONS.map((s, i) => (
        <span
          key={i}
          data-star
          className={`absolute rounded-full opacity-0 ${
            s.tone === "zap"
              ? "bg-zap-300 shadow-[0_0_6px_rgba(215,232,90,0.6)]"
              : "bg-fur-50 shadow-[0_0_6px_rgba(255,255,255,0.5)]"
          }`}
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
          }}
        />
      ))}
    </div>
  );
}
