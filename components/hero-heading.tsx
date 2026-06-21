import Image from "next/image";
import type { ComponentPropsWithoutRef } from "react";
import {
  Button,
  buttonMobileFullWidthClass,
  type ButtonConfig,
} from "@/components/ui/button";
import { HeroCharacter } from "@/components/hero-character";
import { HeroDashboardPreview } from "@/components/hero-dashboard";
import { HeroSocialProof } from "@/components/hero-social-proof";
import { HERO_BACKGROUND_BLUR } from "@/lib/image-blur";

type ImageProps = {
  src: string;
  alt?: string;
};

type Props = {
  heading: string;
  description: string;
  buttons: ButtonConfig[];
  backgroundImage: ImageProps;
  characterImage: ImageProps;
};

export type HeroHeadingProps = ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const HeroHeading = (props: HeroHeadingProps) => {
  const { heading, description, buttons, backgroundImage, characterImage } = {
    ...heroHeadingDefaults,
    ...props,
  };

  return (
    <section className="relative isolate overflow-hidden bg-night-900 px-4 pb-14 pt-12 text-fur-50 sm:px-[5%] sm:pb-16 sm:pt-14 md:pb-20 md:pt-20 lg:pt-24">
      <div
        className="absolute inset-0 h-full min-h-full bg-night-900"
        aria-hidden
      />
      <div className="absolute inset-0 h-full min-h-full">
        <Image
          src={backgroundImage.src}
          alt={backgroundImage.alt ?? ""}
          fill
          priority
          fetchPriority="high"
          placeholder="blur"
          blurDataURL={HERO_BACKGROUND_BLUR}
          sizes="100vw"
          quality={75}
          className="size-full min-h-full object-cover object-[center_35%]"
          aria-hidden={!backgroundImage.alt}
        />
      </div>
      <div
        className="absolute inset-0 h-full min-h-full bg-night-900/40"
        aria-hidden
      />
      <div
        className="absolute inset-0 h-full min-h-full bg-gradient-to-b from-night-900/5 via-night-900/15 to-night-900/75"
        aria-hidden
      />
      <div
        className="absolute inset-0 h-full min-h-full bg-[radial-gradient(ellipse_80%_50%_at_50%_20%,#02164566,transparent_65%)] lg:bg-[radial-gradient(ellipse_60%_45%_at_30%_25%,#02164580,transparent_65%)]"
        aria-hidden
      />
      <div className="container relative z-10">
        <div className="relative mx-auto w-full max-w-xl md:px-6">
          <div className="text-center lg:text-left">
            <h1 className="enter-fade-up enter-delay-1 mx-auto max-w-[691px] text-balance text-[2.625rem] font-bold leading-[1.05] tracking-[-1.5px] [text-shadow:0_1px_0_#02164580,0_0_3px_#021645,0_2px_24px_#0216458c] sm:text-6xl sm:tracking-[-2px] md:text-8xl lg:mx-0">
              {heading}
            </h1>
            <p className="enter-fade-up enter-delay-2 mx-auto mt-4 max-w-[532px] text-sm leading-relaxed tracking-[-0.5px] text-fur-50 [text-shadow:0_1px_0_#02164580,0_0_2px_#021645,0_1px_12px_#02164580] sm:text-base md:mt-5 md:text-lg lg:mx-0">
              {description}
            </p>
            <div className="enter-fade-up enter-delay-3 mt-5 flex w-full flex-col gap-3 sm:mt-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4 lg:justify-start">
              {buttons.map((button, index) => (
                <Button
                  key={index}
                  className={buttonMobileFullWidthClass}
                  {...button}
                />
              ))}
            </div>
            <div className="enter-fade-up enter-delay-4">
              <HeroSocialProof />
            </div>
          </div>

          <div className="relative mt-10 sm:mt-14 md:mt-16">
            <div className="relative h-[24rem] sm:h-[30rem] lg:h-[35rem]">
              <div className="enter-fade-scale-up enter-delay-5 absolute inset-0">
                <HeroDashboardPreview />
              </div>
              <HeroCharacter
                src={characterImage.src}
                alt={characterImage.alt}
                className="enter-fade-in-right enter-delay-6"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const heroHeadingDefaults: Props = {
  heading: "Page speed monitoring that tells you exactly what to fix",
  description:
    "Track Core Web Vitals, real user experience, and synthetic test scores in one place. Get alerted before users notice.",
  buttons: [
    { title: "Start free trial", variant: "primary" },
    { title: "View pricing", variant: "secondary-alt" },
  ],
  backgroundImage: {
    src: "/hero-sparse-upscale.webp",
    alt: "",
  },
  characterImage: {
    src: "/bug-zapper-bear.png",
    alt: "Bug Zapper Bear mascot on night patrol with a glowing bug zapper lantern",
  },
};
