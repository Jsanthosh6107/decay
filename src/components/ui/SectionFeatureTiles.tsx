import * as React from "react";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { H2, P } from "./Typography";
import { SectionPanel, SectionPill, SectionScreen } from "./SectionPrimitives";

export type SectionFeatureTile = {
  key?: string;
  title: React.ReactNode;
  copy: React.ReactNode;
  icon: LucideIcon;
  iconClassName?: string;
};

type SectionFeatureTilesProps = {
  pill: React.ReactNode;
  title: React.ReactNode;
  paragraphs: React.ReactNode[];
  tiles: SectionFeatureTile[];
  glowClassName?: string;
  sectionClassName?: string;
  panelClassName?: string;
  gridClassName?: string;
};

export function SectionFeatureTiles({
  pill,
  title,
  paragraphs,
  tiles,
  glowClassName,
  sectionClassName,
  panelClassName,
  gridClassName,
}: SectionFeatureTilesProps) {
  return (
    <SectionScreen className={cn("px-4 py-16 sm:px-8 lg:px-16", sectionClassName)}>
      <div className="mx-auto w-full max-w-7xl">
        <SectionPanel
          className={cn("overflow-hidden rounded-3xl p-8 sm:p-10", panelClassName)}
          glowClassName={glowClassName}
        >
          <div className="mx-auto max-w-4xl text-center">
            <SectionPill>{pill}</SectionPill>
            <H2 className="mt-5 text-5xl sm:text-6xl">{title}</H2>

            {paragraphs.map((paragraph, index) => (
              <P key={`feature-tiles-paragraph-${index}`} className={index === 0 ? "mt-5 text-white/90" : "mt-3 text-white/85"}>
                {paragraph}
              </P>
            ))}
          </div>

          <div className={cn("mt-8 grid gap-4 md:grid-cols-3", gridClassName)}>
            {tiles.map((tile, index) => {
              const Icon = tile.icon;

              return (
                <article
                  key={tile.key ?? `feature-tile-${index}`}
                  className="relative flex h-full flex-col rounded-2xl border border-white/20 bg-white/5 p-6 overflow-hidden"
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-linear-to-b from-ars-highlight/15 via-ars-accent-soft/8 to-transparent" />

                  <div className="relative">
                    <div className="w-fit rounded-xl border border-ars-accent-soft/60 bg-ars-accent-soft/10 p-3 shadow-[0_0_18px_rgba(104,255,126,0.2)]">
                      <Icon className={cn("h-6 w-6 text-ars-accent-soft", tile.iconClassName)} />
                    </div>

                    <h3 className="mt-4 text-2xl font-bold tracking-tight text-white">{tile.title}</h3>
                    <p className="mt-3 text-base leading-relaxed text-white/85">{tile.copy}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </SectionPanel>
      </div>
    </SectionScreen>
  );
}
