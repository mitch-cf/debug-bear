"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useReducedMotionGsap } from "@/hooks/use-reduced-motion-gsap";
import { HERO_CHARACTER_BLUR } from "@/lib/image-blur";

type HeroCharacterProps = {
  src: string;
  alt?: string;
};

export function HeroCharacter({ src, alt }: HeroCharacterProps) {
  const glowRef = useRef<HTMLDivElement>(null);

  useReducedMotionGsap(
    () => {
      if (!glowRef.current) return;
      gsap.to(glowRef.current, {
        opacity: 0.9,
        scale: 1.03,
        duration: 3.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: "50% 50%",
      });
    },
    { scope: glowRef },
  );

  return (
    <div
      className="pointer-events-none absolute bottom-full right-0 z-30 hidden w-[min(44%,17rem)] translate-y-10 sm:block lg:w-[22rem] lg:translate-y-12 xl:w-[24rem] xl:translate-y-14"
      aria-hidden={!alt}
    >
      <div
        ref={glowRef}
        className="absolute bottom-[20%] left-[6%] size-[50%] rounded-full bg-zap-400/35 blur-2xl will-change-transform"
        aria-hidden
      />
      <Image
        src={src}
        alt={alt ?? ""}
        width={512}
        height={512}
        priority
        placeholder="blur"
        blurDataURL={HERO_CHARACTER_BLUR}
        className="relative z-[1] h-auto w-full drop-shadow-[0_12px_32px_rgba(2,22,69,0.5)]"
        sizes="(max-width: 1280px) 22rem, 24rem"
      />
    </div>
  );
}
