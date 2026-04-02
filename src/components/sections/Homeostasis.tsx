import AtomLogo from "../icons/AtomLogo";
import {
  H1,
  H2,
  H4,
  P,
  TypographyLead,
  Highlight,
  SectionFeatureSplit,
  SectionStatCard,
  SectionPanel,
  SectionScreen,
  SectionPill,
  SectionEyebrow,
} from "@/components/ui";
import {
  Scale,
  Cable,
  CirclePlus,
  CalendarPlus2,
  Bone,
  Pill,
  BrainCircuit,
  Shield,
  type LucideIcon,
} from "lucide-react";
import Carousel, { CarouselItem } from "@/components/ui/EmblaCarousel";

type OrganSystem = {
  name: string;
  role: string;
  maintenance: string;
  failure: string;
  Icon: LucideIcon;
};

const organSystems: OrganSystem[] = [
  {
    name: "Bone marrow",
    role: "hematopoietic core",
    maintenance:
      "Produces red cells, white cells, and platelets continuously to sustain oxygen delivery, immunity, and clotting.",
    failure:
      "This system has to keep up constant production to support immunity, oxygen flow, and repair.",
    Icon: Bone,
  },
  {
    name: "Gastrointestinal",
    role: "barrier renewal",
    maintenance:
      "The gut lining replaces itself every few days to absorb nutrients while keeping pathogens out.",
    failure:
      "Its rapid renewal keeps nutrients flowing and helps maintain a stable internal barrier.",
    Icon: Pill,
  },
  {
    name: "Neurovascular",
    role: "signal + flow control",
    maintenance:
      "Endothelial support and neural signaling networks require constant repair to keep perfusion stable.",
    failure:
      "Ongoing maintenance keeps circulation steady and supports consistent neural function.",
    Icon: BrainCircuit,
  },
  {
    name: "Skin",
    role: "protective shell",
    maintenance:
      "Surface cells regenerate in layers, preserving hydration, temperature control, and first-line immune defense.",
    failure:
      "Continuous renewal helps preserve protection, hydration, and environmental stability.",
    Icon: Shield,
  },
];

type HomeostasisStat = {
  icon: LucideIcon;
  iconClassName: string;
  label: string;
  value: number;
  suffix: string;
  unit: string;
  className: string;
};

const stats: HomeostasisStat[] = [
  {
    icon: CirclePlus,
    iconClassName: "text-ars-highlight",
    label: "Daily turnover",
    value: 330,
    suffix: "B",
    unit: "cells/day",
    className: "shadow-[0_0_20px_rgba(104,255,126,0.16)]",
  },
  {
    icon: CalendarPlus2,
    iconClassName: "text-ars-highlight",
    label: "Body refreshed",
    value: 1,
    suffix: "%",
    unit: "per day",
    className: "shadow-[0_0_20px_rgba(255,215,0,0.14)]",
  },
];

const sectionClassName = "relative w-screen overflow-x-clip";
const glowTopSoftClassName =
  "pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-ars-accent-soft/25 to-transparent";
const glowTopHighlightClassName =
  "pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-ars-highlight/20 to-transparent";

type OrganSystemCardProps = {
  system: OrganSystem;
};

function OrganSystemCard({ system }: OrganSystemCardProps) {
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

export default function Homeostasis() {
  return (
    <section id="homeostasis" className={sectionClassName}>

      <div className="relative min-h-screen w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-linear-to-b from-ars-accent-soft/20 to-transparent" />

        <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center gap-8 px-4 py-20 text-center sm:px-8 lg:px-16">
          <SectionPill>Homeostasis</SectionPill>

          <SectionPanel
            className="w-full rounded-3xl p-8 sm:p-10"
            glowClassName="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ars-accent-soft/30 via-ars-highlight/10 to-transparent"
          >
            <div className="flex flex-col items-center gap-5">
              <div className="flex items-center gap-2 text-7xl sm:text-8xl md:text-9xl">
                <div className="bobbing">
                  <AtomLogo className="h-[1em] w-[1em]" />
                </div>
                <H1>ARS</H1>
              </div>

              <TypographyLead className="max-w-3xl text-lg text-white sm:text-xl">
                The <span className="text-ars-highlight">development</span> of{" "}
                <span className="text-ars-accent-soft">Acute Radiation Syndrome</span>
              </TypographyLead>
            </div>
          </SectionPanel>
        </div>
      </div>

      <SectionFeatureSplit
        eyebrow="Homeostasis"
        title={
          <>
            A <Highlight>stable</Highlight> condition
          </>
        }
        paragraphs={[
          "Your current body is like a city under constant maintenance. Some parts are replaced weekly, some take decades.",
        ]}
        icon={Scale}
        glowClassName={`${glowTopSoftClassName} h-20`}
      >
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {stats.map((stat) => (
            <SectionStatCard
              key={stat.label}
              icon={stat.icon}
              iconClassName={stat.iconClassName}
              label={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              unit={stat.unit}
              className={stat.className}
            />
          ))}
        </div>
      </SectionFeatureSplit>

      <SectionFeatureSplit
        eyebrow="Organ systems"
        title={
          <>
            Functioning <Highlight>Maintenance</Highlight>
          </>
        }
        paragraphs={[
          "Organs are like infrastructure in a city.",
          "They silently manufacture blood cells, hormones, immune defenses, and structural tissue constantly.",
          "Their cohesion allows the body to remain robust and functional.",
        ]}
        icon={Cable}
        invert
        glowClassName={`${glowTopHighlightClassName} h-20`}
      />

      <SectionScreen className="py-16">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 sm:px-8 lg:px-16">
          <Carousel
            loop={false}
            align="start"
            className="relative left-1/2 w-screen -translate-x-1/2"
            trackClassName="gap-5 px-0 pb-6"
          >
            {organSystems.map((system) => (
              <CarouselItem
                key={system.name}
                contentClassName="border-0 bg-transparent p-0 shadow-none"
              >
                <OrganSystemCard system={system} />
              </CarouselItem>
            ))}
          </Carousel>
        </div>
      </SectionScreen>

      <SectionScreen className="px-4 py-16 sm:px-8 lg:px-16">
        <div className="mx-auto w-full max-w-4xl">
          <SectionPanel
            className="p-8 text-center sm:p-10"
            glowClassName={`${glowTopHighlightClassName} h-20`}
          >
            <SectionEyebrow>Threshold</SectionEyebrow>

            <H2 className="mt-4">What&apos;s about to happen</H2>

            <P className="mt-4 text-white/90">
              ARS is unique because it doesn&apos;t hit expected targets.
            </P>
            <P className="mt-3 text-white/85">
              It targets your ability to <Highlight>renew</Highlight>.
            </P>
            <P className="mt-3 text-white/85">
              And the human body doesn&apos;t have a failsafe for that.
            </P>
          </SectionPanel>
        </div>
      </SectionScreen>
    </section>
  );
}
