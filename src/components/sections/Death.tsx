'use client';

import {
  Biohazard,
  Bone,
  BrainCircuit,
  Droplets,
  HeartCrack,
  Pill,
  Shield,
  Stethoscope,
} from "lucide-react";
import {
  Highlight,
  OrganSystemCard,
  type OrganSystem,
  SectionCenteredNarrative,
  SectionFeatureSplit,
  SectionScreen,
} from "@/components/ui";
import Carousel, {
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/EmblaCarousel";
import { useRef, useState } from "react";
import { useEmblaScrollGate } from "@/lib/useEmblaScrollGate";

const sectionClassName = "relative w-screen overflow-x-clip";
const snapSectionClassName = `${sectionClassName} min-h-screen snap-start`;
const glowTopSoftClassName =
  "pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-ars-accent-soft/25 to-transparent";
const glowTopHighlightClassName =
  "pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-ars-highlight/20 to-transparent";

const terminalOrganSystems: OrganSystem[] = [
  {
    id: "bone-marrow-terminal",
    name: <>Bone marrow</>,
    role: <>hematopoiesis collapse</>,
    maintenance: (
      <>
        Stem-cell reserves are exhausted. Blood-cell factories are silent, and
        circulating counts only fall.
      </>
    ),
    failure: (
      <>
        Immunity and clotting fail together. Infection and uncontrolled
        bleeding become parallel threats.
      </>
    ),
    Icon: Bone,
  },
  {
    id: "gastrointestinal-terminal",
    name: <>Gastrointestinal</>,
    role: <>barrier dissolution</>,
    maintenance: (
      <>
        The intestinal lining no longer regenerates. Mucosa sheds, nutrient
        uptake crashes, and fluid loss accelerates.
      </>
    ),
    failure: (
      <>
        Barrier loss allows bacterial translocation and sepsis while
        electrolyte collapse drives shock physiology.
      </>
    ),
    Icon: Pill,
  },
  {
    id: "neurovascular-terminal",
    name: <>Neurovascular</>,
    role: <>signal + perfusion failure</>,
    maintenance: (
      <>
        Blood flow breaks rhythm. Oxygen reaches the brain unevenly, leaving
        critical areas under-supplied.
      </>
    ),
    failure: (
      <>
        The brain begins to shut down as circulation falters, raising the risk
        of repeated collapse.
      </>
    ),
    Icon: BrainCircuit,
  },
  {
    id: "skin-terminal",
    name: <>Skin</>,
    role: <>protective shell loss</>,
    maintenance: (
      <>
        Basal layers stop renewing. Surface tissue sloughs away, stripping
        temperature control and hydration retention.
      </>
    ),
    failure: (
      <>
        The outer barrier is gone. Heat, fluid, and pathogens move freely
        across a failing boundary.
      </>
    ),
    Icon: Shield,
  },
];

export default function Death() {
  const carouselSectionRef = useRef<HTMLElement | null>(null);
  const [emblaApi, setEmblaApi] = useState<CarouselApi>();

  useEmblaScrollGate({ sectionRef: carouselSectionRef, emblaApi });

  return (
    <>
      <section id="death" ref={carouselSectionRef} className={snapSectionClassName}>
        <SectionScreen className="py-16">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 sm:px-8 lg:px-16">
            <Carousel
              loop={false}
              align="start"
              onApiReady={setEmblaApi}
              className="relative left-1/2 w-screen -translate-x-1/2"
              trackClassName="gap-5 px-0 pb-6"
            >
              {terminalOrganSystems.map((system, index) => (
                <CarouselItem
                  key={system.id ?? `terminal-organ-system-${index}`}
                  contentClassName="border-0 bg-transparent p-0 shadow-none"
                >
                  <OrganSystemCard
                    system={system}
                    statusLabel="Functionally Dead"
                    failureLabel="Failure"
                  />
                </CarouselItem>
              ))}
            </Carousel>
          </div>
        </SectionScreen>
      </section>

      <section className={snapSectionClassName}>
        <SectionFeatureSplit
          eyebrow={<>Shock physiology</>}
          title={
            <>
              Circulatory <Highlight>Instability</Highlight>
            </>
          }
          paragraphs={[
            <>
              Vascular tone collapses and fluid shifts out of the bloodstream into
              tissues, the GI tract, and compromised skin.
            </>,
            <>
              Blood pressure becomes <Highlight>harder</Highlight> to sustain, often requiring continuous
              transfusion support.
            </>,
            <>
              Sepsis compounds the collapse and further stresses already <Highlight>failing
              systems</Highlight>.
            </>,
          ]}
          icon={Droplets}
          glowClassName={`${glowTopHighlightClassName} h-20`}
        />
      </section>

      <section className={snapSectionClassName}>
        <SectionFeatureSplit
          eyebrow={<>Cardiac arrest</>}
          title={
            <>
              Neurological <Highlight>Decline</Highlight>
            </>
          }
          paragraphs={[
            <>
              Repeated arrest can follow once reserves are exhausted.
            </>,
            <>
              Return of circulation does not mean restoration of organ function.
            </>,
            <>
              Each resuscitation interval often leaves <Highlight>deeper</Highlight> neurologic injury.
            </>,
          ]}
          icon={HeartCrack}
          invert
          glowClassName={`${glowTopSoftClassName} h-20`}
        />
      </section>

      <section className={snapSectionClassName}>
        <SectionFeatureSplit
          eyebrow={<>Renal and hepatic failure</>}
          title={
            <>
              Metabolic <Highlight>Collapse</Highlight>
            </>
          }
          paragraphs={[
            <>
              Kidney and liver failure follow prolonged hypotension, circulating
              toxins, myoglobin load, and systemic inflammation.
            </>,
            <>
              Filtration and detoxification <Highlight>fail together</Highlight> as waste and acid
              burden rise.
            </>,
            <>
              Dialysis becomes necessary to temporarily support what organs can no
              longer do.
            </>,
          ]}
          icon={Stethoscope}
          glowClassName={`${glowTopHighlightClassName} h-20`}
        />
      </section>

      <section className={snapSectionClassName}>
        <SectionFeatureSplit
          eyebrow={<>Secondary infections</>}
          title={
            <>
              No Walls <Highlight>Left</Highlight>
            </>
          }
          paragraphs={[
            <>
              With external and internal barriers failing, pathogens move through
              the body with <Highlight>minimal</Highlight> resistance.
            </>,
            <>
              Bacterial, fungal, and viral infections spread while immune capacity
              is nearly absent.
            </>,
            <>
              Infection is no longer a complication. It becomes part of <Highlight>terminal</Highlight>
              physiology.
            </>,
          ]}
          icon={Biohazard}
          invert
          glowClassName={`${glowTopSoftClassName} h-20`}
        />
      </section>

      <section className={snapSectionClassName} id="death-end">
        <SectionCenteredNarrative
          eyebrow={<>The end</>}
          title={
            <>
              No Path <Highlight>Back</Highlight>
            </>
          }
          paragraphs={[
            <>
              With life sustained by machines and physiologic decline continuing,
              reserves eventually reach zero.
            </>,
            <>
              At that point, another cardiac arrest is often allowed to <Highlight>end life</Highlight>.
            </>,
          ]}
          glowClassName={`${glowTopHighlightClassName} h-20`}
        />
      </section>
    </>
  );
}
