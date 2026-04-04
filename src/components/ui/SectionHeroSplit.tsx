import * as React from "react";
import { type LucideIcon } from "lucide-react";
import { H2, H3, P } from "./Typography";
import { SectionIconDisplay } from "./SectionIconDisplay";
import { SectionPanel, SectionPill, SectionScreen } from "./SectionPrimitives";

type SectionHeroSplitProps = {
  pill: React.ReactNode;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  paragraphs: Array<string | React.ReactNode>;
  icon: LucideIcon;
  glowClassName: string;
};

export function SectionHeroSplit({
  pill,
  title,
  subtitle,
  paragraphs,
  icon,
  glowClassName,
}: SectionHeroSplitProps) {
  return (
    <SectionScreen className="px-4 py-16 sm:px-8 lg:px-16">
      <div className="mx-auto w-full max-w-7xl">
        <SectionPanel className="overflow-hidden rounded-3xl p-8 sm:p-10" glowClassName={glowClassName}>
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-center">
            <div>
              <SectionPill>{pill}</SectionPill>
              <H2 className="mt-5 text-left text-5xl sm:text-6xl">{title}</H2>
              <H3 className="mt-0 text-left text-white/90">{subtitle}</H3>

              {paragraphs.map((paragraph, index) => (
                <P key={`hero-paragraph-${index}`} className={index === 0 ? "mt-5 text-white/90" : "mt-3 text-white/85"}>
                  {paragraph}
                </P>
              ))}
            </div>

            <SectionIconDisplay
              icon={icon}
              className="min-h-72 border-white/15 bg-transparent"
              ringClassName="h-36 w-36 sm:h-40 sm:w-40"
            />
          </div>
        </SectionPanel>
      </div>
    </SectionScreen>
  );
}
