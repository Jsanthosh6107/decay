import { CounterButtonIncrease, Highlight } from "./Typography";
import Counter from "./CountUp";
import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

type SectionStatCardProps = {
  icon: LucideIcon;
  iconClassName?: string;
  label: string;
  value: number;
  suffix: string;
  unit: string;
  className?: string;
};

export function SectionStatCard({
  icon: Icon,
  iconClassName,
  label,
  value,
  suffix,
  unit,
  className,
}: SectionStatCardProps) {
  return (
    <CounterButtonIncrease
      className={cn(
        "w-full justify-start gap-3 rounded-2xl border-white/25 bg-white/10 px-4 py-4 text-left",
        className
      )}
    >
      <Icon className={cn("h-5 w-5", iconClassName)} />
      <div className="leading-tight">
        <p className="text-[0.65rem] uppercase tracking-[0.15em] text-white/75">{label}</p>
        <p className="mt-1 flex items-baseline gap-2">
          <Highlight className="text-3xl leading-none">
            <Counter value={value} suffix={suffix} />
          </Highlight>
          <span className="text-sm text-white/80">{unit}</span>
        </p>
      </div>
    </CounterButtonIncrease>
  );
}
