import * as React from "react";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { H3, P } from "./Typography";
import { SectionEyebrow, SectionPanel, SectionScreen, SectionSplit } from "./SectionPrimitives";
import { SectionIconDisplay } from "./SectionIconDisplay";

type SectionFeatureSplitProps = {
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  paragraphs: string[];
  icon: LucideIcon;
  glowClassName: string;
  invert?: boolean;
  splitClassName?: string;
  textColumnClassName?: string;
  iconColumnClassName?: string;
  panelClassName?: string;
  children?: React.ReactNode;
};

export function SectionFeatureSplit({
  eyebrow,
  title,
  paragraphs,
  icon,
  glowClassName,
  invert = false,
  splitClassName,
  textColumnClassName,
  iconColumnClassName,
  panelClassName,
  children,
}: SectionFeatureSplitProps) {
  return (
    <SectionScreen>
      <SectionSplit
        invert={invert}
        className={cn(invert && "text-left lg:flex-row-reverse lg:text-right", splitClassName)}
      >
        <div className={cn("w-full lg:w-[70%]", invert && "lg:flex lg:justify-end", textColumnClassName)}>
          <SectionPanel className={cn("w-full p-8", panelClassName)} glowClassName={glowClassName}>
            <SectionEyebrow>{eyebrow}</SectionEyebrow>

            <H3 className="mt-4">{title}</H3>

            {paragraphs.map((paragraph, index) => (
              <P key={`${paragraph}-${index}`} className={index === 0 ? "mt-4 text-white/90" : "mt-3 text-white/85"}>
                {paragraph}
              </P>
            ))}

            {children}
          </SectionPanel>
        </div>

        <div className={cn("w-full lg:w-[30%]", iconColumnClassName)}>
          <SectionIconDisplay icon={icon} />
        </div>
      </SectionSplit>
    </SectionScreen>
  );
}
