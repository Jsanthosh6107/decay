import * as React from "react";
import { cn } from "@/lib/utils";
import { H2, H3, P } from "./Typography";
import { SectionEyebrow, SectionPanel, SectionScreen } from "./SectionPrimitives";

type SectionCenteredNarrativeProps = {
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  paragraphs: React.ReactNode[];
  glowClassName?: string;
  align?: "center" | "left";
};

export function SectionCenteredNarrative({
  eyebrow,
  title,
  subtitle,
  paragraphs,
  glowClassName,
  align = "center",
}: SectionCenteredNarrativeProps) {
  return (
    <SectionScreen className="px-4 py-16 sm:px-8 lg:px-16">
      <div className="mx-auto w-full max-w-4xl">
        <SectionPanel
          className={cn("p-8 sm:p-10", align === "center" ? "text-center" : "text-left")}
          glowClassName={glowClassName}
        >
          <SectionEyebrow>{eyebrow}</SectionEyebrow>

          <H2 className="mt-4">{title}</H2>

          {subtitle ? <H3 className="mt-0 text-white">{subtitle}</H3> : null}

          {paragraphs.map((paragraph, index) => (
            <P key={`narrative-paragraph-${index}`} className={index === 0 ? "mt-4 text-white" : "mt-3 text-white"}>
              {paragraph}
            </P>
          ))}
        </SectionPanel>
      </div>
    </SectionScreen>
  );
}
