"use client";

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

export function HeroSocialProof({
  testimonials = defaultTestimonials,
  rating = "4.9/5",
  caption = "Trusted by 2,000+ engineering teams",
}: HeroSocialProofProps) {
  return (
    <div className="mt-6 flex flex-col items-center gap-3 md:mt-7 lg:flex-row lg:items-center lg:gap-4">
      <ul className="flex -space-x-3">
        {testimonials.map((t) => (
          <li key={t.name} className="group relative">
            <button
              type="button"
              className="block size-11 overflow-hidden rounded-full border-2 border-night-900 bg-night-700 ring-1 ring-night-600 transition-transform duration-150 hover:z-10 hover:-translate-y-0.5 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zap-400"
              aria-label={`Read testimonial from ${t.name}, ${t.position} at ${t.company}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={t.avatar}
                alt=""
                width={44}
                height={44}
                className="size-full object-cover"
                loading="lazy"
              />
            </button>

            <div
              role="tooltip"
              className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-3 w-72 -translate-x-1/2 scale-95 opacity-0 transition-all duration-150 group-hover:scale-100 group-hover:opacity-100 group-focus-within:scale-100 group-focus-within:opacity-100"
            >
              <div className="rounded-xl border-2 border-night-950 bg-fur-50 p-4 text-left text-night-900 shadow-chunky-sm">
                <p className="text-sm leading-relaxed text-night-800">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-3 flex items-center gap-3 border-t border-night-100 pt-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.avatar}
                    alt=""
                    width={36}
                    height={36}
                    className="size-9 shrink-0 rounded-full border border-night-200 object-cover"
                    loading="lazy"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-night-900">
                      {t.name}
                    </p>
                    <p className="truncate text-xs text-night-500">
                      {t.position}, {t.company}
                    </p>
                  </div>
                </div>
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
        <p className="text-sm text-night-100 [text-shadow:0_1px_12px_rgba(2,22,69,0.35)]">
          {caption}
        </p>
      </div>
    </div>
  );
}

const defaultTestimonials: Testimonial[] = [
  {
    name: "Priya Nair",
    position: "Staff Frontend Engineer",
    company: "Linear",
    avatar: "https://i.pravatar.cc/96?img=5",
    quote:
      "DebugBear caught an LCP regression in our checkout flow before it hit production. The synthetic alerts paid for themselves in the first week.",
  },
  {
    name: "Marcus Chen",
    position: "Head of Performance",
    company: "Vercel",
    avatar: "https://i.pravatar.cc/96?img=12",
    quote:
      "Having lab tests and real-user metrics side by side means we stop arguing about anecdotes and start shipping measurable wins.",
  },
  {
    name: "Sofia Almeida",
    position: "Engineering Manager",
    company: "Shopify",
    avatar: "https://i.pravatar.cc/96?img=32",
    quote:
      "The CrUX trends view is the first thing I open every morning. It's how my team keeps Core Web Vitals green across 40+ pages.",
  },
  {
    name: "Daniel Okafor",
    position: "Senior SRE",
    company: "Datadog",
    avatar: "https://i.pravatar.cc/96?img=15",
    quote:
      "Setup took ten minutes and the regression alerts are genuinely actionable. It's become part of our release checklist.",
  },
  {
    name: "Hannah Weiss",
    position: "Web Performance Lead",
    company: "Atlassian",
    avatar: "https://i.pravatar.cc/96?img=45",
    quote:
      "DebugBear gives us a shared source of truth for performance. Designers, devs, and PMs all look at the same dashboards now.",
  },
];
