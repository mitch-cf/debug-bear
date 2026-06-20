"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { RxCross2, RxLightningBolt } from "react-icons/rx";
import { useMediaQuery } from "@/hooks/use-media-query";

type Testimonial = {
  name: string;
  position: string;
  company: string;
  avatar: string;
  quote: string;
};

type HeroSocialProofProps = {
  testimonials?: Testimonial[];
  rating?: string;
  caption?: string;
};

function TestimonialTooltipContent({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  return (
    <>
      <p className="text-sm leading-relaxed text-night-800">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <div className="mt-3 flex items-center gap-3 border-t border-night-100 pt-3">
        <Image
          src={testimonial.avatar}
          alt=""
          width={36}
          height={36}
          className="size-9 shrink-0 rounded-full border border-night-200 object-cover"
          loading="lazy"
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-night-900">
            {testimonial.name}
          </p>
          <p className="truncate text-xs text-night-500">
            {testimonial.position}, {testimonial.company}
          </p>
        </div>
      </div>
    </>
  );
}

function TestimonialModal({
  testimonial,
  onClose,
}: {
  testimonial: Testimonial;
  onClose: () => void;
}) {
  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="testimonial-dialog-title"
      className="fixed inset-0 z-[1000] flex h-dvh w-full flex-col overflow-hidden bg-night-900 text-fur-50 sm:hidden"
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-24 size-[26rem] rounded-full bg-zap-400/[0.07] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-20 size-80 rounded-full bg-night-700/40 blur-3xl"
      />

      <div className="relative z-10 flex h-16 shrink-0 items-center justify-between border-b border-night-800 bg-night-950 px-4">
        <div className="flex items-center gap-2">
          <RxLightningBolt className="size-4 text-zap-400" />
          <p
            id="testimonial-dialog-title"
            className="text-[11px] font-bold uppercase tracking-[0.18em] text-night-100"
          >
            Testimonial
          </p>
        </div>
        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-xl border border-night-700 bg-night-800/70 text-fur-50 transition-colors hover:bg-night-700"
          aria-label="Close testimonial"
          onClick={onClose}
        >
          <RxCross2 className="size-5" />
        </button>
      </div>

      <div className="relative flex flex-1 flex-col justify-center px-6 py-8">
        <div className="relative">
          <span
            aria-hidden
            className="pointer-events-none absolute -left-3 -top-20 font-heading text-[7rem] font-bold leading-none text-zap-400/25"
          >
            &ldquo;
          </span>
          <p className="relative font-heading text-[1.75rem] font-bold leading-[1.15] tracking-[-0.5px] text-fur-50 [text-shadow:0_1px_12px_rgba(2,22,69,0.35)]">
            {testimonial.quote}
          </p>
        </div>

        <div className="mt-10 flex items-center gap-3">
          <Image
            src={testimonial.avatar}
            alt=""
            width={56}
            height={56}
            className="size-14 shrink-0 rounded-full border-2 border-night-950 object-cover"
          />
          <div className="min-w-0">
            <p className="truncate text-base font-bold text-fur-50">
              {testimonial.name}
            </p>
            <p className="truncate text-sm text-night-200">
              {testimonial.position}
              <span className="mx-1.5 text-night-500">·</span>
              <span className="font-semibold text-zap-400">
                {testimonial.company}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex h-16 shrink-0 items-center justify-center border-t border-night-800 bg-night-950 px-6">
        <p className="text-center text-[11px] font-medium text-night-200">
          Trusted by{" "}
          <span className="font-bold text-fur-50">2,000+</span> engineering
          teams
        </p>
      </div>
    </motion.div>
  );
}

export function HeroSocialProof({
  testimonials = defaultTestimonials,
  rating = "4.9/5",
  caption = "Trusted by 2,000+ engineering teams",
}: HeroSocialProofProps) {
  const [activeTestimonial, setActiveTestimonial] =
    useState<Testimonial | null>(null);
  const [mounted, setMounted] = useState(false);
  const isMobile = useMediaQuery("(max-width: 639px)");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!activeTestimonial || !isMobile) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveTestimonial(null);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [activeTestimonial, isMobile]);

  return (
    <>
      <div className="mt-6 flex w-full flex-col items-center gap-3 sm:mt-7 lg:flex-row lg:items-center lg:gap-4">
        <ul className="flex -space-x-3">
          {testimonials.map((t, index) => (
            <li key={t.name} className="group relative">
              <button
                type="button"
                className="block size-11 overflow-hidden rounded-full border-2 border-night-900 bg-night-700 ring-1 ring-night-600 transition-transform duration-150 hover:z-10 hover:-translate-y-0.5 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zap-400"
                aria-label={`Read testimonial from ${t.name}, ${t.position} at ${t.company}`}
                aria-haspopup={isMobile ? "dialog" : undefined}
                aria-expanded={
                  isMobile ? activeTestimonial?.name === t.name : undefined
                }
                onClick={() => {
                  if (isMobile) setActiveTestimonial(t);
                }}
              >
                <Image
                  src={t.avatar}
                  alt=""
                  width={44}
                  height={44}
                  className="size-full object-cover"
                  priority={index < 3}
                />
              </button>

              <div
                role="tooltip"
                className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-3 hidden w-72 -translate-x-1/2 scale-95 opacity-0 transition-all duration-150 group-hover:scale-100 group-hover:opacity-100 group-focus-within:scale-100 group-focus-within:opacity-100 sm:block"
              >
                <div className="rounded-xl border-2 border-night-950 bg-fur-50 p-4 text-left text-night-900 shadow-chunky-sm">
                  <TestimonialTooltipContent testimonial={t} />
                </div>
                <span
                  className="absolute left-1/2 top-full size-3 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b-2 border-r-2 border-night-950 bg-fur-50"
                  aria-hidden
                />
              </div>
            </li>
          ))}
        </ul>

        <div className="text-center lg:text-left">
          <div className="flex items-center justify-center gap-1 lg:justify-start">
            <span className="flex text-zap-400" aria-hidden>
              {"★★★★★"}
            </span>
            <span className="text-sm font-semibold text-fur-50">{rating}</span>
          </div>
          <p className="text-xs text-night-100 sm:text-sm [text-shadow:0_1px_12px_rgba(2,22,69,0.35)]">
            {caption}
          </p>
        </div>
      </div>

      {mounted && typeof document !== "undefined"
        ? createPortal(
            <AnimatePresence>
              {activeTestimonial && isMobile ? (
                <TestimonialModal
                  testimonial={activeTestimonial}
                  onClose={() => setActiveTestimonial(null)}
                />
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </>
  );
}

const defaultTestimonials: Testimonial[] = [
  {
    name: "Priya Nair",
    position: "Staff Frontend Engineer",
    company: "Linear",
    avatar: "/avatars/priya.jpg",
    quote:
      "DebugBear caught an LCP regression in our checkout flow before it hit production. The synthetic alerts paid for themselves in the first week.",
  },
  {
    name: "Marcus Chen",
    position: "Head of Performance",
    company: "Vercel",
    avatar: "/avatars/marcus.jpg",
    quote:
      "Having lab tests and real-user metrics side by side means we stop arguing about anecdotes and start shipping measurable wins.",
  },
  {
    name: "Sofia Almeida",
    position: "Engineering Manager",
    company: "Shopify",
    avatar: "/avatars/sofia.jpg",
    quote:
      "The CrUX trends view is the first thing I open every morning. It's how my team keeps Core Web Vitals green across 40+ pages.",
  },
  {
    name: "Daniel Okafor",
    position: "Senior SRE",
    company: "Datadog",
    avatar: "/avatars/daniel.jpg",
    quote:
      "Setup took ten minutes and the regression alerts are genuinely actionable. It's become part of our release checklist.",
  },
  {
    name: "Hannah Weiss",
    position: "Web Performance Lead",
    company: "Atlassian",
    avatar: "/avatars/hannah.jpg",
    quote:
      "DebugBear gives us a shared source of truth for performance. Designers, devs, and PMs all look at the same dashboards now.",
  },
];
