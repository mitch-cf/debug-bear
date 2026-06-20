"use client";

import { useState } from "react";
import Link from "next/link";
import { useMediaQuery } from "@/hooks/use-media-query";
import type { IconType } from "react-icons";
import {
  RxActivityLog,
  RxBarChart,
  RxChatBubble,
  RxChevronDown,
  RxFileText,
  RxLightningBolt,
  RxPerson,
  RxRocket,
  RxStopwatch,
} from "react-icons/rx";
import { AnimatePresence, motion } from "framer-motion";
import { Button, buttonMobileFullWidthClass, type ButtonConfig } from "@/components/ui/button";
import { Logo } from "@/components/logo";

type ImageProps = {
  url?: string;
  src: string;
  alt?: string;
  wordmark?: string;
};

type SubMenuLink = {
  url: string;
  icon: IconType;
  title: string;
  description: string;
};

type LinkGroup = {
  title?: string;
  subMenuLinks: SubMenuLink[];
};

type MegaMenuProps = {
  linkGroups: LinkGroup[];
};

type NavLink = {
  url: string;
  title: string;
  megaMenu?: MegaMenuProps;
};

type Props = {
  logo: ImageProps;
  navLinks: NavLink[];
  buttons: ButtonConfig[];
};

export type SiteNavbarProps = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

const navbarClasses =
  "sticky top-0 z-[999] flex min-h-16 w-full items-center border-b border-night-800 bg-night-900 px-[5%] text-fur-50 md:min-h-18";

const navLinkClassName =
  "relative block w-auto py-3 text-md transition-colors hover:text-zap-400 lg:inline-block lg:px-4 lg:py-6 lg:text-base";

const mobileNavLinkClassName =
  "block py-3 text-md transition-colors hover:text-zap-400";

const dropdownLinkClassName =
  "group grid w-full auto-cols-fr grid-cols-[max-content_1fr] items-start gap-x-3 rounded-lg px-2 py-2 transition-colors hover:bg-night-800";

const dropdownLinkTitleClassName =
  "font-semibold transition-colors group-hover:text-zap-300";

export const SiteNavbar = (props: SiteNavbarProps) => {
  const { logo, navLinks, buttons } = {
    ...siteNavbarDefaults,
    ...props,
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 991px)");

  return (
    <section className={navbarClasses}>
      <div className="mx-auto flex size-full max-w-full items-center justify-between">
        <Logo
          href={logo.url ?? "/"}
          markSrc={logo.src}
          wordmark={logo.wordmark ?? logo.alt ?? "DebugBear"}
          tone="light"
        />
        <div className="absolute hidden h-screen overflow-auto border-b border-night-800 bg-night-900 px-[5%] pb-24 pt-4 md:pb-0 lg:static lg:ml-6 lg:flex lg:h-auto lg:flex-1 lg:items-center lg:justify-between lg:overflow-visible lg:border-none lg:bg-transparent lg:px-0 lg:pt-0">
          <div className="flex flex-col items-center lg:flex-row">
            {navLinks.map((navLink, index) =>
              navLink.megaMenu ? (
                <SubMenu
                  key={index}
                  megaMenu={navLink.megaMenu}
                  title={navLink.title}
                  isMobile={isMobile}
                />
              ) : (
                <Link
                  key={index}
                  href={navLink.url}
                  className={navLinkClassName}
                >
                  {navLink.title}
                </Link>
              ),
            )}
          </div>
          <div className="flex items-center gap-4">
            {buttons.map((button, index) => (
              <Button key={index} {...button} />
            ))}
          </div>
        </div>
        <button
          type="button"
          className="-mr-2 flex size-12 cursor-pointer flex-col items-center justify-center lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <motion.span
            className="my-[3px] h-0.5 w-6 bg-fur-50"
            animate={isMobileMenuOpen ? ["open", "rotatePhase"] : "closed"}
            variants={topLineVariants}
          />
          <motion.span
            className="my-[3px] h-0.5 w-6 bg-fur-50"
            animate={isMobileMenuOpen ? "open" : "closed"}
            variants={middleLineVariants}
          />
          <motion.span
            className="my-[3px] h-0.5 w-6 bg-fur-50"
            animate={isMobileMenuOpen ? ["open", "rotatePhase"] : "closed"}
            variants={bottomLineVariants}
          />
        </button>
      </div>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={{
              open: { height: "100dvh" },
              close: { height: "auto" },
            }}
            animate={isMobileMenuOpen ? "open" : "close"}
            initial="close"
            exit="close"
            className="absolute left-0 right-0 top-full w-full overflow-hidden lg:hidden"
            transition={{ duration: 0.4 }}
          >
            <motion.div
              variants={{
                open: { y: 0 },
                close: { y: "-100%" },
              }}
              animate={isMobileMenuOpen ? "open" : "close"}
              initial="close"
              exit="close"
              transition={{ duration: 0.4 }}
              className="absolute left-0 right-0 top-0 block h-dvh overflow-auto border-b border-night-800 bg-night-900 px-[5%] pb-8 pt-4"
            >
              <div className="flex flex-col">
                {navLinks.map((navLink, index) =>
                  navLink.megaMenu ? (
                    <SubMenu
                      key={index}
                      megaMenu={navLink.megaMenu}
                      title={navLink.title}
                      isMobile={isMobile}
                    />
                  ) : (
                    <Link
                      key={index}
                      href={navLink.url}
                      className={mobileNavLinkClassName}
                    >
                      {navLink.title}
                    </Link>
                  ),
                )}
                <div className="mt-6 flex w-full flex-col gap-3">
                  {buttons.map((button, index) => (
                    <Button
                      key={index}
                      className={buttonMobileFullWidthClass}
                      {...button}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const SubMenu = ({
  title,
  megaMenu,
  isMobile,
}: {
  title: string;
  megaMenu: MegaMenuProps;
  isMobile: boolean;
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const totalLinks = megaMenu.linkGroups.reduce(
    (sum, group) => sum + group.subMenuLinks.length,
    0,
  );
  const isWide = megaMenu.linkGroups.length > 1 || totalLinks > 5;

  return (
    <div
      className="lg:relative"
      onMouseEnter={() => !isMobile && setIsDropdownOpen(true)}
      onMouseLeave={() => !isMobile && setIsDropdownOpen(false)}
    >
      <button
        type="button"
        className={`relative flex w-full items-center justify-between whitespace-nowrap py-3 text-md transition-colors hover:text-zap-400 lg:w-auto lg:justify-start lg:gap-2 lg:px-4 lg:py-6 lg:text-base ${isDropdownOpen ? "text-zap-400" : ""}`}
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        aria-expanded={isDropdownOpen}
      >
        <span>{title}</span>
        <motion.span
          animate={isDropdownOpen ? "rotated" : "initial"}
          variants={{
            rotated: { rotate: 180 },
            initial: { rotate: 0 },
          }}
          transition={{ duration: 0.3 }}
        >
          <RxChevronDown />
        </motion.span>
      </button>
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.nav
            variants={{
              open: {
                opacity: 1,
                height: "var(--height-open, auto)",
              },
              close: {
                opacity: 0,
                height: "var(--height-close, 0)",
              },
            }}
            animate={isDropdownOpen ? "open" : "close"}
            initial="close"
            exit="close"
            transition={{ duration: 0.2 }}
            className={`bottom-auto left-0 top-full w-full overflow-hidden bg-night-900 lg:absolute lg:rounded-xl lg:border lg:border-night-800 lg:shadow-[0_12px_32px_rgba(2,22,69,0.45)] lg:[--height-close:auto] ${
              isWide
                ? "lg:left-1/2 lg:w-[min(64rem,calc(100vw-2rem))] lg:-translate-x-1/2"
                : "lg:left-2 lg:w-[22rem]"
            }`}
          >
            <div className="mx-auto flex size-full max-w-full items-center justify-between lg:p-3">
              <div className="flex w-full flex-col lg:flex-row">
                <div
                  className={`grid flex-1 content-start items-start gap-x-6 gap-y-6 py-4 md:py-6 lg:auto-cols-fr lg:content-stretch lg:items-stretch lg:gap-y-0 lg:py-0 ${
                    isWide
                      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                      : "grid-cols-1"
                  }`}
                >
                  {megaMenu.linkGroups.map((linkGroup, index) => (
                    <div
                      key={index}
                      className="grid auto-cols-fr grid-cols-1 gap-y-1 md:gap-y-2"
                    >
                      {linkGroup.title ? (
                        <h4 className="px-2 pb-1 text-xs font-semibold uppercase tracking-wide text-night-200">
                          {linkGroup.title}
                        </h4>
                      ) : null}
                      {linkGroup.subMenuLinks.map((subMenuLink, index) => {
                        const Icon = subMenuLink.icon;
                        return (
                          <Link
                            key={index}
                            href={subMenuLink.url}
                            className={dropdownLinkClassName}
                          >
                            <div className="relative mt-0.5 flex size-8 flex-col items-center justify-center rounded-md bg-night-800 text-zap-400 transition-colors group-hover:bg-night-700 group-hover:text-zap-300">
                              <Icon className="size-4 shrink-0" aria-hidden />
                            </div>
                            <div className="flex flex-col items-start justify-center">
                              <h5 className={dropdownLinkTitleClassName}>
                                {subMenuLink.title}
                              </h5>
                              <p className="text-sm text-night-100 transition-colors group-hover:text-fur-50">
                                {subMenuLink.description}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
};

export const siteNavbarDefaults: Props = {
  logo: {
    url: "/",
    src: "/logo.svg",
    alt: "DebugBear",
    wordmark: "DebugBear",
  },
  navLinks: [
    {
      title: "Product",
      url: "#",
      megaMenu: {
        linkGroups: [
          {
            subMenuLinks: [
              {
                url: "#",
                icon: RxStopwatch,
                title: "Synthetic monitoring",
                description: "Scheduled lab tests from global locations",
              },
              {
                url: "#",
                icon: RxPerson,
                title: "Real user monitoring",
                description: "Track Core Web Vitals from real visitors",
              },
              {
                url: "#",
                icon: RxLightningBolt,
                title: "Core Web Vitals",
                description: "See what's hurting LCP, CLS, and INP",
              },
              {
                url: "#",
                icon: RxRocket,
                title: "CI integrations",
                description: "Catch regressions before they ship",
              },
            ],
          },
        ],
      },
    },
    { title: "Pricing", url: "#" },
    { title: "Docs", url: "#" },
    {
      title: "Resources",
      url: "#",
      megaMenu: {
        linkGroups: [
          {
            subMenuLinks: [
              {
                url: "#",
                icon: RxFileText,
                title: "Blog",
                description: "Guides on web performance and reliability",
              },
              {
                url: "#",
                icon: RxBarChart,
                title: "Case studies",
                description: "See how teams ship faster sites with DebugBear",
              },
              {
                url: "#",
                icon: RxActivityLog,
                title: "Changelog",
                description: "Latest product updates and fixes",
              },
              {
                url: "#",
                icon: RxChatBubble,
                title: "Support",
                description: "Help docs and contact options",
              },
            ],
          },
        ],
      },
    },
  ],
  buttons: [
    {
      title: "Sign in",
      variant: "secondary-alt",
      size: "sm",
    },
    {
      title: "Start free trial",
      size: "sm",
    },
  ],
};

const topLineVariants = {
  open: {
    translateY: 8,
    transition: { delay: 0.1 },
  },
  rotatePhase: {
    rotate: -45,
    transition: { delay: 0.2 },
  },
  closed: {
    translateY: 0,
    rotate: 0,
    transition: { duration: 0.2 },
  },
};

const middleLineVariants = {
  open: {
    width: 0,
    transition: { duration: 0.1 },
  },
  closed: {
    width: "1.5rem",
    transition: { delay: 0.3, duration: 0.2 },
  },
};

const bottomLineVariants = {
  open: {
    translateY: -8,
    transition: { delay: 0.1 },
  },
  rotatePhase: {
    rotate: 45,
    transition: { delay: 0.2 },
  },
  closed: {
    translateY: 0,
    rotate: 0,
    transition: { duration: 0.2 },
  },
};
