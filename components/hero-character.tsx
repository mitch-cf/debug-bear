"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useReducedMotionGsap } from "@/hooks/use-reduced-motion-gsap";

type HeroCharacterProps = {
  src: string;
  alt?: string;
  className?: string;
};

export function HeroCharacter({ src, alt, className }: HeroCharacterProps) {
  const lanternRef = useRef<HTMLDivElement>(null);
  const outerGlowRef = useRef<HTMLDivElement>(null);
  const midGlowRef = useRef<HTMLDivElement>(null);
  const coreGlowRef = useRef<HTMLDivElement>(null);
  const sparkRef = useRef<HTMLDivElement>(null);
  const raysRef = useRef<HTMLDivElement>(null);
  const faceWashRef = useRef<HTMLDivElement>(null);

  useReducedMotionGsap(
    () => {
      const pulse = (
        el: HTMLElement | null,
        from: gsap.TweenVars,
        to: gsap.TweenVars,
      ) => {
        if (!el) return;
        gsap.fromTo(el, from, { ...to, repeat: -1, yoyo: true });
      };

      pulse(
        outerGlowRef.current,
        { opacity: 0.2, scale: 0.92 },
        {
          opacity: 0.65,
          scale: 1.22,
          duration: 2.6,
          ease: "sine.inOut",
          transformOrigin: "50% 55%",
        },
      );

      pulse(
        midGlowRef.current,
        { opacity: 0.45, scale: 0.96 },
        {
          opacity: 0.95,
          scale: 1.14,
          duration: 1.45,
          delay: 0.25,
          ease: "sine.inOut",
          transformOrigin: "50% 55%",
        },
      );

      pulse(
        coreGlowRef.current,
        { opacity: 0.65, scale: 0.94 },
        {
          opacity: 1,
          scale: 1.18,
          duration: 0.9,
          delay: 0.1,
          ease: "power1.inOut",
          transformOrigin: "50% 55%",
        },
      );

      pulse(
        faceWashRef.current,
        { opacity: 0.18, scale: 0.98 },
        {
          opacity: 0.55,
          scale: 1.08,
          duration: 1.75,
          delay: 0.35,
          ease: "sine.inOut",
          transformOrigin: "20% 50%",
        },
      );

      if (sparkRef.current) {
        gsap.fromTo(
          sparkRef.current,
          { opacity: 0.55, scale: 0.85 },
          {
            opacity: 1,
            scale: 1.4,
            duration: 0.32,
            repeat: -1,
            yoyo: true,
            ease: "steps(4, end)",
            transformOrigin: "50% 50%",
          },
        );
      }

      if (raysRef.current) {
        gsap.fromTo(
          raysRef.current,
          { rotation: -4, opacity: 0.35 },
          {
            rotation: 8,
            opacity: 0.75,
            duration: 2.1,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            transformOrigin: "50% 55%",
          },
        );
      }
    },
    { scope: lanternRef },
  );

  return (
    <div
      className="pointer-events-none absolute bottom-full right-0 z-30 hidden w-[min(44%,17rem)] translate-y-10 sm:block lg:w-[22rem] lg:translate-y-12 xl:w-[24rem] xl:translate-y-14"
      aria-hidden={!alt}
    >
      <div className={`relative ${className ?? ""}`.trim()}>
        <Image
          src={src}
          alt={alt ?? ""}
          width={512}
          height={512}
          priority
          className="relative z-[1] h-auto w-full drop-shadow-[0_12px_32px_rgba(2,22,69,0.5)]"
          sizes="(max-width: 1280px) 22rem, 24rem"
        />

        <div
          ref={lanternRef}
          className="absolute bottom-[28%] left-[2%] z-[2] h-[48%] w-[44%]"
          aria-hidden
        >
          {/* Soft spill onto the bear's face */}
          <div
            ref={faceWashRef}
            className="absolute -right-[20%] top-[8%] h-[55%] w-[70%] opacity-30 mix-blend-screen"
            style={{
              background:
                "radial-gradient(ellipse 70% 80% at 20% 50%, rgba(252,253,232,0.55) 0%, rgba(215,232,90,0.2) 45%, transparent 72%)",
            }}
          />

          {/* Rotating light rays */}
          <div
            ref={raysRef}
            className="absolute inset-[-15%] opacity-45 mix-blend-screen"
          >
            <div
              className="absolute left-1/2 top-1/2 h-[130%] w-[22%] -translate-x-1/2 -translate-y-1/2 rotate-[18deg] blur-2xl"
              style={{
                background:
                  "linear-gradient(180deg, transparent 0%, rgba(215,232,90,0.45) 45%, transparent 100%)",
              }}
            />
            <div
              className="absolute left-1/2 top-1/2 h-[115%] w-[16%] -translate-x-1/2 -translate-y-1/2 -rotate-[10deg] blur-3xl"
              style={{
                background:
                  "linear-gradient(180deg, transparent 0%, rgba(230,242,111,0.35) 50%, transparent 100%)",
              }}
            />
            <div
              className="absolute left-1/2 top-1/2 size-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
              style={{
                background:
                  "conic-gradient(from 200deg, transparent 0deg, rgba(215,232,90,0.25) 40deg, transparent 80deg, rgba(252,253,232,0.2) 140deg, transparent 200deg)",
              }}
            />
          </div>

          {/* Outer ambient halo */}
          <div
            ref={outerGlowRef}
            className="absolute inset-0 opacity-35 mix-blend-screen blur-3xl will-change-[transform,opacity]"
            style={{
              background:
                "radial-gradient(circle, rgba(215,232,90,0.5) 0%, rgba(190,219,57,0.25) 35%, rgba(215,232,90,0.08) 55%, transparent 72%)",
            }}
          />

          {/* Mid bloom */}
          <div
            ref={midGlowRef}
            className="absolute inset-[12%] opacity-60 mix-blend-screen blur-2xl will-change-[transform,opacity]"
            style={{
              background:
                "radial-gradient(circle, rgba(241,247,167,0.75) 0%, rgba(215,232,90,0.45) 40%, transparent 68%)",
            }}
          />

          {/* Core lantern light */}
          <div
            ref={coreGlowRef}
            className="absolute inset-[28%] opacity-80 mix-blend-screen blur-xl will-change-[transform,opacity]"
            style={{
              background:
                "radial-gradient(circle, rgba(252,253,232,0.95) 0%, rgba(230,242,111,0.7) 35%, rgba(215,232,90,0.35) 60%, transparent 78%)",
            }}
          />

          {/* Hot spark center */}
          <div
            ref={sparkRef}
            className="absolute inset-[38%] opacity-90 mix-blend-screen blur-md will-change-[transform,opacity]"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(252,253,232,0.8) 30%, rgba(215,232,90,0.4) 55%, transparent 75%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
