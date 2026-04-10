'use client'

import * as React from "react";
import { useScrollStore } from "@/components/store/useScrollStore";
import { cn } from "@/lib/utils";
import { TextImage } from "./TextImage";

type WithClassName<T> = T & { className?: string };

type SectionPanelProps = WithClassName<React.HTMLAttributes<HTMLElement>> & {
  glowClassName?: string;
};

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

const getDecayBand = (progress: number) => {
  const p = clamp01(progress);

  if (p < 0.2) return 0;
  if (p < 0.4) return 1;
  if (p < 0.6) return 2;
  if (p < 0.8) return 3;
  return 4;
};

const getBandProgress = (progress: number, start: number, end: number) => {
  return clamp01((progress - start) / (end - start));
};

const getPanelDecayStyles = (progress: number): React.CSSProperties => {
  const p = clamp01(progress);
  const band = getDecayBand(p);

  let borderAlpha = 0.2;
  let background = "linear-gradient(145deg,rgba(4,48,30,0.95),rgba(1,20,12,0.9))";
  let boxShadow = "0 0 0 rgba(0,0,0,0)";
  let transform = "translate3d(0,0,0) scale(1)";
  let filter = "none";

  if (band === 0) {
    const t = getBandProgress(p, 0, 0.2);
    borderAlpha = 0.2 - t * 0.02;
    background = "linear-gradient(145deg,rgba(4,48,30,0.95),rgba(1,20,12,0.9))";
    boxShadow = `0 0 ${18 + t * 10}px rgba(255,180,80,0.04)`;
    transform = `translate3d(0,0,0) scale(${1 - t * 0.002})`;
    filter = `saturate(${1 - t * 0.03})`;
  }

  if (band === 1) {
    const t = getBandProgress(p, 0.2, 0.4);
    borderAlpha = 0.18 - t * 0.03;
    background = `linear-gradient(145deg,
      rgba(${4 + t * 18},${48 - t * 8},${30 - t * 10},0.95),
      rgba(${1 + t * 10},${20 - t * 5},${12 - t * 7},0.9)
    )`;
    boxShadow = `
      0 0 ${22 + t * 16}px rgba(255,140,60,${0.06 + t * 0.05}),
      0 0 ${40 + t * 30}px rgba(255,70,40,${0.02 + t * 0.04})
    `;
    transform = `translate3d(0,${t * 2}px,0) scale(${1 - t * 0.004})`;
    filter = `saturate(${1 - t * 0.08}) contrast(${1 + t * 0.03})`;
  }

  if (band === 2) {
    const t = getBandProgress(p, 0.4, 0.6);
    borderAlpha = 0.15 - t * 0.04;
    background = `linear-gradient(145deg,
      rgba(${22 + t * 34},${40 - t * 14},${20 - t * 8},0.94),
      rgba(${10 + t * 24},${15 - t * 8},${8 - t * 3},0.9)
    )`;
    boxShadow = `
      0 0 ${34 + t * 22}px rgba(255,100,50,${0.1 + t * 0.08}),
      0 0 ${80 + t * 50}px rgba(180,30,20,${0.05 + t * 0.06})
    `;
    transform = `translate3d(0,${2 + t * 3}px,0) scale(${1 - 0.004 - t * 0.006}) skewX(${t * 0.25}deg)`;
    filter = `saturate(${0.92 - t * 0.12}) contrast(${1.03 + t * 0.05}) brightness(${1 - t * 0.03})`;
  }

  if (band === 3) {
    const t = getBandProgress(p, 0.6, 0.8);
    borderAlpha = 0.11 - t * 0.05;
    background = `linear-gradient(145deg,
      rgba(${56 + t * 44},${26 - t * 12},${12 - t * 4},0.93),
      rgba(${34 + t * 26},${10 - t * 4},${6},0.88)
    )`;
    boxShadow = `
      0 0 ${48 + t * 28}px rgba(255,90,40,${0.16 + t * 0.1}),
      0 0 ${120 + t * 70}px rgba(120,10,10,${0.08 + t * 0.08})
    `;
    transform = `translate3d(0,${5 + t * 5}px,0) scale(${0.99 - t * 0.01}) skewX(${0.25 + t * 0.35}deg)`;
    filter = `saturate(${0.8 - t * 0.12}) contrast(${1.08 + t * 0.06}) brightness(${0.97 - t * 0.05})`;
  }

  if (band === 4) {
    const t = getBandProgress(p, 0.8, 1);
    borderAlpha = 0.06 - t * 0.02;
    background = `linear-gradient(145deg,
      rgba(${100 + t * 20},${14 - t * 4},${8 - t * 2},0.92),
      rgba(${60 + t * 20},${6},${4},0.86)
    )`;
    boxShadow = `
      0 0 ${76 + t * 36}px rgba(255,70,30,${0.22 + t * 0.08}),
      0 0 ${180 + t * 80}px rgba(90,0,0,${0.12 + t * 0.08})
    `;
    transform = `translate3d(0,${10 + t * 6}px,0) scale(${0.98 - t * 0.012}) skewX(${0.6 + t * 0.4}deg)`;
    filter = `saturate(${0.68 - t * 0.08}) contrast(${1.14 + t * 0.05}) brightness(${0.92 - t * 0.06})`;
  }

  return {
    borderColor: `rgba(255,255,255,${borderAlpha})`,
    background,
    boxShadow,
    transform,
    filter,
    transition:
      "border-color 220ms linear, background 220ms linear, box-shadow 220ms linear, transform 220ms linear, filter 220ms linear",
  };
};

const getGlowDecayClassName = (progress: number) => {
  const p = clamp01(progress);

  if (p < 0.2) return "opacity-30";
  if (p < 0.4) return "opacity-45";
  if (p < 0.6) return "opacity-60";
  if (p < 0.8) return "opacity-80";
  return "opacity-100";
};

const getScreenDecayStyle = (progress: number): React.CSSProperties => {
  const p = clamp01(progress);

  return {
    background: `
      radial-gradient(
        circle at center,
        rgba(255,80,40,${p * 0.035}) 0%,
        rgba(120,20,10,${p * 0.05}) 35%,
        rgba(0,0,0,0) 75%
      )
    `,
    transition: "background 220ms linear",
  };
};

export function SectionPanel({
  className,
  glowClassName,
  children,
  ...props
}: SectionPanelProps) {
  const progress = useScrollStore((s) => s.progress);
  const decayStyle = getPanelDecayStyles(progress);
  const glowDecayClassName = getGlowDecayClassName(progress);

  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-2xl border",
        className
      )}
      style={decayStyle}
      {...props}
    >
      {glowClassName ? (
        <div
          className={cn(
            "pointer-events-none absolute inset-0 transition-opacity duration-200",
            glowDecayClassName,
            glowClassName
          )}
        />
      ) : null}

      <div className="relative z-10">{children}</div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            linear-gradient(
              180deg,
              rgba(255,255,255,${Math.max(0, 0.035 - progress * 0.02)}) 0%,
              rgba(255,255,255,0) 24%,
              rgba(0,0,0,${progress * 0.08}) 100%
            )
          `,
        }}
      />
    </article>
  );
}

export function SectionScreen({
  className,
  ...props
}: WithClassName<React.HTMLAttributes<HTMLDivElement>>) {
  const progress = useScrollStore((s) => s.progress);

  return (
    <div
      className={cn("relative flex min-h-screen items-center", className)}
      style={getScreenDecayStyle(progress)}
      {...props}
    />
  );
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
  style,
  ...props
}: WithClassName<React.HTMLAttributes<HTMLParagraphElement>>) {
  const progress = useScrollStore((s) => s.progress);
  const p = clamp01(progress);

  const green = { r: 104, g: 255, b: 126 };
  const red = { r: 255, g: 90, b: 40 };

  const r = Math.round(green.r + (red.r - green.r) * p);
  const g = Math.round(green.g + (red.g - green.g) * p);
  const b = Math.round(green.b + (red.b - green.b) * p);

  return (
    <p
      className={cn("text-xs font-semibold uppercase tracking-[0.2em]", className)}
      style={{
        color: `rgba(${r}, ${g}, ${b}, ${0.9 - p * 0.05})`,
        textShadow: `0 0 ${4 + p * 10}px rgba(${r}, ${g}, ${b}, ${0.08 + p * 0.12})`,
        transition: "color 220ms linear, text-shadow 220ms linear",
        ...style,
      }}
      {...props}
    />
  );
}