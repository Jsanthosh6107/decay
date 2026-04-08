import {
  BellOff,
  BrainCircuit,
  Clock3,
  Eye,
  TriangleAlert,
} from "lucide-react";
import {
  Highlight,
  SectionCenteredNarrative,
  SectionFeatureSplit,
  SectionFeatureTiles,
  type SectionFeatureTile,
} from "@/components/ui";

const sectionClassName = "relative w-screen overflow-x-clip";
const snapSectionClassName = `${sectionClassName} min-h-screen snap-start`;
const glowTopSoftClassName =
  "pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-ars-accent-soft/25 to-transparent";
const glowTopHighlightClassName =
  "pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-ars-highlight/20 to-transparent";

const prodromeTiles: SectionFeatureTile[] = [
  {
    title: <>Onset</>,
    copy: (
      <>
        Minutes after exposure, something changes. A wave of nausea, sudden
        fatigue, dizziness. It begins without <Highlight>warning</Highlight>.
      </>
    ),
    icon: Clock3,
  },
  {
    title: <>The Reaction</>,
    copy: (
      <>
        Your body responds immediately. Vomiting, weakness, disorientation.
        It reacts as if something is deeply wrong, because <Highlight>it is</Highlight>.
      </>
    ),
    icon: TriangleAlert,
  },
  {
    title: <>Severity Signal</>,
    copy: (
      <>
        How quickly this starts matters. The shorter the delay, the more <Highlight>severe</Highlight>
        the damage already is.
      </>
    ),
    icon: Eye,
  },
];

export default function Prodrome() {
  return (
    <>
      <section id="prodrome" className={snapSectionClassName}>
        <SectionFeatureTiles
          pill={<>Prodrome Phase</>}
          title={<>Delayed <Highlight>Reaction</Highlight></>}
          paragraphs={[
            <>
              Minutes to hours after exposure, the <Highlight>first phase</Highlight> begins: vomiting,
              dizziness, fatigue, flushing, and bloodshot eyes. Your entire future is decided in this moment.
            </>,
          ]}
          tiles={prodromeTiles}
          glowClassName={`${glowTopSoftClassName} h-24`}
        />
      </section>

      <section className={snapSectionClassName}>
        <SectionFeatureSplit
          eyebrow={<>The Vomiting</>}
          title={
            <>
              Chemical <Highlight>Alarms</Highlight>
            </>
          }
          paragraphs={[
            <>
              Radiation exposure causes widespread cellular injury within minutes.
            </>,
            <>
              Tissues release Inflammatory signals in response to this injury
            </>,
            <>
              Your brain, assumes you&apos;re being poisoned and reflexively tries to
              protect you. Your brain is <Highlight>wrong</Highlight>, You&apos;re not being poisoned.
            </>,
          ]}
          icon={BellOff}
          glowClassName={`${glowTopHighlightClassName} h-20`}
        />
      </section>

      <section className={snapSectionClassName}>
        <SectionFeatureSplit
          eyebrow={<>The Headaches</>}
          title={
            <>
              Inflammatory <Highlight>Response</Highlight>
            </>
          }
          paragraphs={[
            <>
              Radiation triggers cytokines, vascular changes, and fluid shifts that
              increase pressure in the brain.
            </>,
            <>
              It feels like you sustained impact or trauma.
            </>,
            <>
              You did not. Your body is <Highlight>wrong</Highlight>. 
            </>,
          ]}
          icon={BrainCircuit}
          invert
          glowClassName={`${glowTopSoftClassName} h-20`}
        />
      </section>

      <section className={snapSectionClassName}>
        <SectionCenteredNarrative
          eyebrow={<>Misfiring</>}
          title={<>No proper <Highlight>response</Highlight></>}
          paragraphs={[
            <>
              Radiation sickness isn&apos;t <Highlight>accounted for</Highlight> like viruses or bacteria.
            </>,
            <>
              Your brain feels widespread cellular damage. It responds correctly,
              but there&apos;s no poison to flush out and no physical injury to repair.
            </>,
            <>
              It responds to a signal, but its response <Highlight>won&apos;t solve anything</Highlight>.
            </>,
          ]}
          glowClassName={`${glowTopHighlightClassName} h-20`}
        />
      </section>
    </>
  );
}
