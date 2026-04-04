import { type LucideIcon } from "lucide-react";
import { H4 } from "./Typography";
import { SectionPanel } from "./SectionPrimitives";

export type OrganSystem = {
  name: string;
  role: string;
  maintenance: string;
  failure: string;
  Icon: LucideIcon;
};

export type OrganSystemCardProps = {
  system: OrganSystem;
};

export function OrganSystemCard({ system }: OrganSystemCardProps) {
  const { Icon, name, role, maintenance, failure } = system;

  return (
    <SectionPanel className="h-full p-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-ars-accent-soft/25 via-ars-highlight/10 to-transparent" />

      <div className="relative flex h-full flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="rounded-xl border border-ars-accent-soft/60 bg-ars-accent-soft/10 p-3 shadow-[0_0_18px_rgba(104,255,126,0.2)]">
            <Icon className="h-6 w-6 text-ars-accent-soft" />
          </div>

          <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/70">
            Functional
          </span>
        </div>

        <div>
          <H4 className="text-3xl font-extrabold tracking-tight text-white">{name}</H4>
          <p className="mt-1 text-sm uppercase tracking-[0.14em] text-ars-highlight/90">{role}</p>
        </div>

        <p className="text-base leading-relaxed text-white/85">{maintenance}</p>

        <div className="mt-auto rounded-xl border border-ars-highlight/45 bg-ars-highlight/10 p-4">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-ars-highlight">
            Importance
          </p>
          <p className="mt-2 text-sm leading-relaxed text-white/90">{failure}</p>
        </div>
      </div>
    </SectionPanel>
  );
}
