import { Biohazard, Droplets, HeartCrack, Stethoscope } from "lucide-react";
import {
  Highlight,
  SectionCenteredNarrative,
  SectionFeatureSplit,
} from "@/components/ui";

const sectionClassName = "relative w-screen overflow-x-clip";
const glowTopSoftClassName =
  "pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-ars-accent-soft/25 to-transparent";
const glowTopHighlightClassName =
  "pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-ars-highlight/20 to-transparent";

export default function Death() {
  return (
    <section id="death" className={sectionClassName}>
      <SectionCenteredNarrative
        eyebrow={<>Terminal phase</>}
        title={
          <>
            Support Replaces <Highlight>Function</Highlight>
          </>
        }
        subtitle={<>Autonomous systems fail in sequence</>}
        paragraphs={[
          <>
            At high doses, the manifest phase does not stabilize.
          </>,
          <>
            Machines begin replacing circulation, respiration, and renal
            support while autonomous function continues to decline.
          </>,
          <>
            The body is being sustained, but no longer recovering.
          </>,
        ]}
        glowClassName={`${glowTopSoftClassName} h-24`}
      />

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
            Blood pressure becomes harder to sustain, often requiring continuous
            transfusion support.
          </>,
          <>
            Sepsis compounds the collapse and further stresses already failing
            systems.
          </>,
        ]}
        icon={Droplets}
        glowClassName={`${glowTopHighlightClassName} h-20`}
      />

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
            Each resuscitation interval often leaves deeper neurologic injury.
          </>,
        ]}
        icon={HeartCrack}
        invert
        glowClassName={`${glowTopSoftClassName} h-20`}
      />

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
            Filtration and detoxification fail together as waste and acid
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
            the body with minimal resistance.
          </>,
          <>
            Bacterial, fungal, and viral infections spread while immune capacity
            is nearly absent.
          </>,
          <>
            Infection is no longer a complication. It becomes part of terminal
            physiology.
          </>,
        ]}
        icon={Biohazard}
        invert
        glowClassName={`${glowTopSoftClassName} h-20`}
      />

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
            At that point, another cardiac arrest is often allowed to end life.
          </>,
        ]}
        glowClassName={`${glowTopHighlightClassName} h-20`}
      />
    </section>
  );
}
