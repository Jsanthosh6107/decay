import * as React from "react";
import { cn } from "@/lib/utils";
import { TextImage } from "./TextImage";

type WithClassName<T> = T & { className?: string };

type SectionPanelProps = WithClassName<React.HTMLAttributes<HTMLElement>> & {
  glowClassName?: string;
};

export function SectionPanel({
  className,
  glowClassName,
  children,
  ...props
}: SectionPanelProps) {
  return (
    <article
      className={cn(
        "overflow-hidden relative rounded-2xl border border-white/20 bg-[linear-gradient(145deg,rgba(4,48,30,0.95),rgba(1,20,12,0.9))]",
        className
      )}
      {...props}
    >
      {glowClassName ? <div className={glowClassName} /> : null}
      <div>{children}</div>
    </article>
  );
}

export function SectionScreen({
  className,
  ...props
}: WithClassName<React.HTMLAttributes<HTMLDivElement>>) {
  return <div className={cn("relative flex min-h-screen items-center", className)} {...props} />;
}

export function SectionSplit({
  className,
  ...props
}: React.ComponentProps<typeof TextImage>) {
  return (
    <TextImage
      className={cn(
        "mx-auto w-full max-w-7xl flex-col gap-10 px-4 py-16 sm:px-8 lg:flex-row lg:px-16 lg:py-20",
        className
      )}
      {...props}
    />
  );
}

export function SectionPill({
  className,
  ...props
}: WithClassName<React.HTMLAttributes<HTMLSpanElement>>) {
  return (
    <span
      className={cn(
        "rounded-full border border-white/25 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/80",
        className
      )}
      {...props}
    />
  );
}

export function SectionEyebrow({
  className,
  ...props
}: WithClassName<React.HTMLAttributes<HTMLParagraphElement>>) {
  return (
    <p
      className={cn(
        "text-xs font-semibold uppercase tracking-[0.2em] text-ars-accent-soft/90",
        className
      )}
      {...props}
    />
  );
}
