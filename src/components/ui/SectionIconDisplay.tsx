import { GlowRing } from "./GlowRing";
import { SectionPanel } from "./SectionPrimitives";
import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

type SectionIconDisplayProps = {
  icon: LucideIcon;
  className?: string;
  glowClassName?: string;
  ringClassName?: string;
  iconClassName?: string;
};

export function SectionIconDisplay({
  icon: Icon,
  className,
  glowClassName,
  ringClassName,
  iconClassName,
}: SectionIconDisplayProps) {
  return (
    <SectionPanel className={cn("flex min-h-65 items-center justify-center p-8", className)}>
      <div
        className={cn(
          "pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ars-accent-soft/20 blur-3xl",
          glowClassName
        )}
      />
      <GlowRing className={cn("relative z-10 h-40 w-40 floater sm:h-48 sm:w-48", ringClassName)}>
        <Icon className={cn("h-full w-full text-white", iconClassName)} />
      </GlowRing>
    </SectionPanel>
  );
}
