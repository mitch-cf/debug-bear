"use client";

import {
  Button as RelumeButton,
  type ButtonProps as RelumeButtonProps,
} from "@relume_io/relume-ui";
import Image from "next/image";
import { RxLightningBolt } from "react-icons/rx";

type ButtonImage = {
  src: string;
  alt?: string;
};

export type ButtonProps = RelumeButtonProps & {
  title?: string;
  image?: ButtonImage;
};

export type ButtonConfig = Pick<
  ButtonProps,
  "title" | "variant" | "size" | "image" | "iconLeft" | "iconRight"
> &
  Partial<ButtonProps>;

// Image treatment for `link-alt` lives in the `[&_img]` selectors so the icon
// JSX stays variant-agnostic and there's a single source of truth per variant.
const variantClasses: Record<string, string> = {
  primary:
    "btn-depth rounded-xl border border-night-950 bg-zap-400 text-night-950 shadow-[0_1px_3px_rgba(10,17,27,0.2),0_0_10px_rgba(215,232,90,0.2)] hover:bg-zap-300 hover:shadow-[0_2px_5px_rgba(10,17,27,0.25),0_0_14px_rgba(215,232,90,0.3)] active:shadow-[0_1px_2px_rgba(10,17,27,0.2)]",
  "secondary-alt":
    "btn-depth rounded-xl border border-night-950 bg-night-700 text-fur-50 hover:bg-night-600",
  "link-alt":
    "group transition-colors hover:text-zap-400 [&_img]:brightness-0 [&_img]:invert [&_img]:opacity-70 [&_img]:transition-opacity hover:[&_img]:opacity-100",
};

export function Button({
  title,
  image,
  iconLeft,
  children,
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  const resolvedIconLeft =
    iconLeft ??
    (image ? (
      <Image
        src={image.src}
        alt={image.alt ?? ""}
        width={24}
        height={24}
        className="size-6 shrink-0"
      />
    ) : variant === "primary" ? (
      <RxLightningBolt className="size-4 shrink-0" aria-hidden />
    ) : undefined);

  const resolvedClassName = [variantClasses[variant ?? "primary"] ?? "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <RelumeButton
      variant={variant}
      iconLeft={resolvedIconLeft}
      className={resolvedClassName || undefined}
      {...props}
    >
      {children ?? title}
    </RelumeButton>
  );
}
