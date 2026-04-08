/* IMPORTS */
import AtomLogo from "../icons/AtomLogo";
import {
  H1,
  TypographyLead,
  Highlight,
  OrganSystemCard,
  type OrganSystem,
  SectionFeatureSplit,
  SectionCenteredNarrative,
  SectionStatCard,
  SectionPanel,
  SectionScreen,
  SectionPill,
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

/* ORGAN SYSTEM(carousel) */

const organSystems: OrganSystem[] = [
  {
    id: "bone-marrow",
    name: <>Bone marrow</>,
    role: <>hematopoiesis core</>,
    maintenance: (
      <>
        Produces red cells, white cells, and platelets continuously to sustain
        oxygen delivery, immunity, and clotting.
      </>
    ),
    failure: (
      <>
        This system has to keep up constant production to support immunity,
        oxygen flow, and repair.
      </>
    ),
    Icon: Bone,
  },
  {
    id: "gastrointestinal",
    name: <>Gastrointestinal</>,
    role: <>barrier renewal</>,
    maintenance: (
      <>
        The gut lining replaces itself every few days to absorb nutrients while
        keeping pathogens out.
      </>
    ),
    failure: (
      <>
        Its rapid renewal keeps nutrients flowing and helps maintain a stable
        internal barrier.
      </>
    ),
    Icon: Pill,
  },
  {
    id: "neurovascular",
    name: <>Neurovascular</>,
    role: <>signal + flow control</>,
    maintenance: (
      <>
        Endothelial support and neural signaling networks require constant repair
        to keep perfusion stable.
      </>
    ),
    failure: (
      <>
        Ongoing maintenance keeps circulation steady and supports consistent
        neural function.
      </>
    ),
    Icon: BrainCircuit,
  },
  {
    id: "skin",
    name: <>Skin</>,
    role: <>protective shell</>,
    maintenance: (
      <>
        Surface cells regenerate in layers, preserving hydration, temperature
        control, and first-line immune defense.
      </>
    ),
    failure: (
      <>
        Continuous renewal helps preserve protection, hydration, and
        environmental stability.
      </>
    ),
    Icon: Shield,
  },
];

/* Counter */

type HomeostasisStat = {
  id: string;
  icon: LucideIcon;
  iconClassName: string;
  label: React.ReactNode;
  value: number;
  suffix: React.ReactNode;
  unit: React.ReactNode;
  className: string;
};

const stats: HomeostasisStat[] = [
  {
    id: "daily-turnover",
    icon: CirclePlus,
    iconClassName: "text-ars-highlight",
    label: <>Daily turnover</>,
    value: 330,
    suffix: <>B</>,
    unit: <>cells/day</>,
    className: "shadow-[0_0_20px_rgba(104,255,126,0.16)]",
  },
  {
    id: "body-refreshed",
    icon: CalendarPlus2,
    iconClassName: "text-ars-highlight",
    label: <>Body refreshed</>,
    value: 1,
    suffix: <>%</>,
    unit: <>per day</>,
    className: "shadow-[0_0_20px_rgba(255,215,0,0.14)]",
  },
];

/* glow classes from some codepen */

const sectionClassName = "relative w-screen overflow-x-clip";
const snapSectionClassName = `${sectionClassName} min-h-screen snap-start`;
const glowTopSoftClassName =
  "pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-ars-accent-soft/25 to-transparent";
const glowTopHighlightClassName =
  "pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-ars-highlight/20 to-transparent";

/* welcome to the void */

export default function Homeostasis() {
  return (
    <>
      <section id="homeostasis" className={snapSectionClassName}>
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
                  <H1>
                    <>ARS</>
                  </H1>
                </div>

                <TypographyLead className="max-w-3xl text-lg text-white sm:text-xl">
                  <>
                    The{" "}
                    <span className="text-ars-highlight">development</span> of{" "}
                    <span className="text-ars-accent-soft">
                      Acute Radiation Syndrome
                    </span>
                  </>
                </TypographyLead>
              </div>
            </SectionPanel>
          </div>
        </div>
      </section>

      <section className={snapSectionClassName}>
        <SectionFeatureSplit
          eyebrow={<>Homeostasis</>}
          title={
            <>
              A <Highlight>stable</Highlight> condition
            </>
          }
          paragraphs={[
            <>
              Your body is a bustling city of cells, tissues, and organs, all working in harmony to keep you as a collective alive.
            </>,
          ]}
          icon={Scale}
          glowClassName={`${glowTopSoftClassName} h-20`}
        >
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {stats.map((stat) => (
              <SectionStatCard
                key={stat.id}
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
      </section>

      <section className={snapSectionClassName}>
        <SectionFeatureSplit
          eyebrow={<>Organ systems</>}
          title={
            <>
              Functioning <Highlight>Maintenance</Highlight>
            </>
          }
          paragraphs={[
            <>Organs are like infrastructure in a city.</>,
            <>
              They silently manufacture blood cells, hormones, enzymes, and
              tissue constantly.
            </>,
            <>
              This unison allows the body to remain robust and functional.
            </>,
          ]}
          icon={Cable}
          invert
          glowClassName={`${glowTopHighlightClassName} h-20`}
        />
      </section>

      <section className={snapSectionClassName}>
        <SectionScreen className="py-16">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 sm:px-8 lg:px-16">
            <Carousel
              loop={false}
              align="start"
              className="relative left-1/2 w-screen -translate-x-1/2"
              trackClassName="gap-5 px-0 pb-6"
            >
              {organSystems.map((system, index) => (
                <CarouselItem
                  key={system.id ?? `organ-system-${index}`}
                  contentClassName="border-0 bg-transparent p-0 shadow-none"
                >
                  <OrganSystemCard system={system} />
                </CarouselItem>
              ))}
            </Carousel>
          </div>
        </SectionScreen>
      </section>

      <section className={snapSectionClassName}>
        <SectionCenteredNarrative
          eyebrow={<>Threshold</>}
          title={<>What&apos;s about to <Highlight>happen</Highlight></>}
          paragraphs={[
            <>ARS is unique because it&apos;s not an infection, disease, or injury.</>,
            <>
              It cripples the <Highlight>very systems</Highlight> that keep you alive, often without a sound.
            </>,
            <>
              Your body never get&apos;s the chance to react, adapt, or even <Highlight>realize</Highlight> what hit it.
            </>,
          ]}
          glowClassName={`${glowTopHighlightClassName} h-20`}
        />
      </section>
    </>
  );
}
