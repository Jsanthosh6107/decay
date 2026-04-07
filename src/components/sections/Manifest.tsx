import { Bone, Dumbbell, Pill, Shield, Skull, Wind } from "lucide-react";
import { Highlight, SectionFeatureSplit, SectionHeroSplit } from "@/components/ui";

const sectionClassName = "relative w-screen overflow-x-clip";
const glowTopSoftClassName =
  "pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-ars-accent-soft/25 to-transparent";
const glowTopHighlightClassName =
  "pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-ars-highlight/20 to-transparent";

export default function Manifest() {
  return (
    <section id="manifest" className={sectionClassName}>
      <SectionHeroSplit
        pill={<>Manifest phase</>}
        title={
          <>
            Systemic <Highlight>Collapse</Highlight>
          </>
        }
        subtitle={<>The start of the end</>}
        paragraphs={[
          <>
            Everything fails together. This isn&apos;t a single failure, but
            multiple systems breaking at once.
          </>,
          <>
            Like a city starved of resources, the body starts shutting down as
            critical functions can no longer replenish.
          </>,
          <>
            By this phase, the margin is gone and decline accelerates.
          </>,
        ]}
        icon={Skull}
        glowClassName={`${glowTopSoftClassName} h-24`}
      />

      <SectionFeatureSplit
        eyebrow={<>Hematopoietic</>}
        title={
          <>
            Stem Cell <Highlight>Failure</Highlight>
          </>
        }
        paragraphs={[
          <>
            White blood cells fall toward zero. Immune defense is effectively
            gone, and platelet support collapses.
          </>,
          <>
            This isn&apos;t low blood counts. This is loss of manufacturing
            capability.
          </>,
          <>
            The body cannot replace what it is losing.
          </>,
        ]}
        icon={Bone}
        glowClassName={`${glowTopHighlightClassName} h-20`}
      />

      <SectionFeatureSplit
        eyebrow={<>Gastrointestinal</>}
        title={
          <>
            Barrier <Highlight>Loss</Highlight>
          </>
        }
        paragraphs={[
          <>
            The intestinal lining normally renews every few days. In this
            phase, it sheds and does not return.
          </>,
          <>
            Severe diarrhea and fluid loss follow, while barrier failure allows
            gut bacteria to move freely.
          </>,
          <>
            Self-sustaining GI bleeding can begin, driving the system toward
            collapse.
          </>,
        ]}
        icon={Pill}
        invert
        glowClassName={`${glowTopSoftClassName} h-20`}
      />

      <SectionFeatureSplit
        eyebrow={<>Cutaneous</>}
        title={
          <>
            Skin <Highlight>Loss</Highlight>
          </>
        }
        paragraphs={[
          <>
            With basal stem cells destroyed, skin sloughs off like leaves from
            a dying tree.
          </>,
          <>
            Fluids and heat leak out continuously, draining reserves from an
            already imploding body.
          </>,
          <>
            The body&apos;s strongest outer defense breaks down.
          </>,
        ]}
        icon={Shield}
        glowClassName={`${glowTopHighlightClassName} h-20`}
      />

      <SectionFeatureSplit
        eyebrow={<>Respiratory</>}
        title={
          <>
            Oxygen <Highlight>Depletion</Highlight>
          </>
        }
        paragraphs={[
          <>
            Lung damage reduces oxygen exchange while demand keeps rising.
          </>,
          <>
            Mechanical ventilation may become necessary, but intervention is
            complicated by bleeding risk.
          </>,
          <>
            Support can delay collapse, not reverse it.
          </>,
        ]}
        icon={Wind}
        invert
        glowClassName={`${glowTopSoftClassName} h-20`}
      />

      <SectionFeatureSplit
        eyebrow={<>Musculoskeletal</>}
        title={
          <>
            Fall to <Highlight>Collapse</Highlight>
          </>
        }
        paragraphs={[
          <>
            Necrotic muscle releases myoglobin into circulation, overloading the
            kidneys.
          </>,
          <>
            Renal failure follows as filtration can no longer keep pace with
            tissue breakdown.
          </>,
          <>
            Amputation may be considered, but bleeding risk and failed healing
            often make intervention nonviable.
          </>,
        ]}
        icon={Dumbbell}
        glowClassName={`${glowTopHighlightClassName} h-20`}
      />
    </section>
  );
}
