import { Clock3, Layers3 } from "lucide-react";
import { Highlight, SectionFeatureSplit } from "@/components/ui";

const sectionClassName = "relative w-screen overflow-x-clip";
const glowTopSoftClassName =
  "pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-ars-accent-soft/25 to-transparent";
const glowTopHighlightClassName =
  "pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-ars-highlight/20 to-transparent";

export default function Latent() {
  return (
    <section id="latent" className={sectionClassName}>
      <SectionFeatureSplit
        eyebrow={<>Latent phase</>}
        title={
          <>
            The calm before the <Highlight>storm</Highlight>
          </>
        }
        paragraphs={[
          <>
            Your body seems to recover. Even if no new cells are being
            produced, mature cells are still alive and functioning.
          </>,
          <>
            Nausea fades, pressure eases, and from your brain&apos;s perspective it
            can feel like nothing happened.
          </>,
          <>
            This is a temporary <Highlight>illusion</Highlight> of stability.
          </>,
        ]}
        icon={Clock3}
        glowClassName={`${glowTopSoftClassName} h-20`}
      />

      <SectionFeatureSplit
        eyebrow={<>Silent entropy</>}
        title={
          <>
            Depleting supplies without <Highlight>renewal</Highlight>
          </>
        }
        paragraphs={[
          <>
            Platelets can survive for days. The intestinal lining may still
            appear intact.
          </>,
          <>
            Nothing has failed yet, because nothing has fully{" "}
            <Highlight>run out</Highlight>.
          </>,
          <>
            The body continues operating on the last functional cells it made
            before exposure.
          </>,
        ]}
        icon={Layers3}
        invert
        glowClassName={`${glowTopHighlightClassName} h-20`}
      />
    </section>
  );
}
