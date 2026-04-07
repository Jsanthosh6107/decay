import * as React from "react";
import { cn } from "@/lib/utils";
import { H2, P } from "./Typography";
import { SectionEyebrow, SectionPanel, SectionScreen } from "./SectionPrimitives";

export type SectionStatusTone =
  | "neutral"
  | "stable"
  | "caution"
  | "critical"
  | "failure";

export type SectionStatusItem = {
  key?: string;
  label: React.ReactNode;
  value: React.ReactNode;
  tone?: SectionStatusTone;
};

type SectionStatusProps = {
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  statuses: SectionStatusItem[];
  glowClassName?: string;
  sectionClassName?: string;
  panelClassName?: string;
};

const toneClassMap: Record<
  SectionStatusTone,
  {
    dot: string;
    value: string;
    badge: string;
    badgeLabel: string;
    row?: string;
    label?: string;
  }
> = {
  neutral: {
    dot: "text-white/50 bg-white/50",
    value: "text-white/85",
    badge: "border-white/20 bg-white/5 text-white/70",
    badgeLabel: "Neutral",
  },
  stable: {
    dot: "text-ars-accent-soft bg-ars-accent-soft",
    value: "text-ars-accent-soft",
    badge: "border-ars-accent-soft/40 bg-ars-accent-soft/10 text-ars-accent-soft",
    badgeLabel: "Stable",
  },
  caution: {
    dot: "text-ars-highlight bg-ars-highlight",
    value: "text-ars-highlight",
    badge: "border-ars-highlight/40 bg-ars-highlight/10 text-ars-highlight",
    badgeLabel: "Watch",
  },
  critical: {
    dot: "text-ars-failure bg-ars-failure",
    value: "text-ars-failure",
    badge: "border-ars-failure/45 bg-ars-failure/10 text-ars-failure",
    row: "bg-ars-failure/5",
    badgeLabel: "Critical",
  },
  failure: {
    dot: "text-ars-failure bg-ars-failure shadow-[0_0_12px_2px_color-mix(in_srgb,var(--color-ars-failure)_62%,transparent)]",
    value: "text-ars-failure font-semibold",
    badge:
      "border-ars-failure/70 bg-[color-mix(in_srgb,var(--color-ars-failure)_18%,transparent)] text-ars-failure shadow-[0_0_18px_0px_color-mix(in_srgb,var(--color-ars-failure)_30%,transparent)]",
    badgeLabel: "Critical Failure",
    row: "bg-ars-failure/5",
    label: "text-white/96",
  },
};

const summaryOrder: SectionStatusTone[] = ["stable", "caution", "critical"];

export function SectionStatus({
  eyebrow,
  title,
  description,
  statuses,
  glowClassName,
  sectionClassName,
  panelClassName,
}: SectionStatusProps) {
  const summary = statuses.reduce<Record<SectionStatusTone, number>>(
    (counts, status) => {
      const tone = status.tone ?? "neutral";
      const summaryTone = tone === "failure" ? "critical" : tone;
      counts[summaryTone] += 1;
      return counts;
    },
    {
      neutral: 0,
      stable: 0,
      caution: 0,
      critical: 0,
      failure: 0,
    }
  );

  return (
    <SectionScreen className={cn("px-4 py-16 sm:px-8 lg:px-16", sectionClassName)}>
      <div className="mx-auto w-full max-w-7xl">
        <SectionPanel
          className={cn("overflow-hidden rounded-3xl p-8 sm:p-10", panelClassName)}
          glowClassName={glowClassName}
        >
          <div className="relative mx-auto max-w-5xl text-left">
            <SectionEyebrow>{eyebrow}</SectionEyebrow>
            <H2 className="mt-4 text-5xl sm:text-6xl">{title}</H2>
            <P className="mt-5 max-w-4xl text-white/88">{description}</P>

            <div className="mt-8 overflow-hidden rounded-2xl border border-white/20 bg-[linear-gradient(160deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]">
              <div className="grid gap-3 border-b border-white/15 px-5 py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white/55">
                  Body Condition
                </p>
                <div className="flex flex-wrap gap-2">
                  {summaryOrder
                    .filter((tone) => summary[tone] > 0)
                    .map((tone) => (
                      <span
                        key={tone}
                        className={cn(
                          "inline-flex items-center rounded-full border px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.15em]",
                          toneClassMap[tone].badge
                        )}
                      >
                        {summary[tone]} {toneClassMap[tone].badgeLabel}
                      </span>
                    ))}
                </div>
              </div>

              <div className="grid grid-cols-[minmax(0,1fr)_auto] border-b border-white/15 px-5 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/50">
                <span>Signal</span>
                <span>Observed State</span>
              </div>

              <div className="divide-y divide-white/10">
                {statuses.map((status, index) => {
                  const tone = status.tone ?? "neutral";
                  const toneClasses = toneClassMap[tone];

                  return (
                    <article
                      key={status.key ?? `status-item-${index}`}
                      className={cn(
                        "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4",
                        toneClasses.row
                      )}
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <span
                          className={cn(
                            "h-2 w-2 shrink-0 rounded-full shadow-[0_0_12px_currentColor]",
                            toneClasses.dot
                          )}
                        />
                        <p
                          className={cn(
                            "text-sm font-semibold tracking-[0.08em] text-white/82",
                            toneClasses.label
                          )}
                        >
                          {status.label}
                        </p>
                      </div>

                      <p
                        className={cn(
                          "text-right text-base font-semibold tracking-tight",
                          toneClasses.value
                        )}
                      >
                        {status.value}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </SectionPanel>
      </div>
    </SectionScreen>
  );
}
