import { BellOff, Dna, Radiation } from "lucide-react";
import {
  SectionFeatureSplit,
  SectionHeroSplit,
  Highlight,
} from "@/components/ui";

const sectionClassName = "relative w-screen overflow-x-clip";
const glowTopSoftClassName =
  "pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-ars-accent-soft/25 to-transparent";
const glowTopHighlightClassName =
  "pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-ars-highlight/20 to-transparent";

export default function Exposure() {
  return (
    <section id="exposure" className={sectionClassName}>
      {/* Exposure section */}
      <SectionHeroSplit
        pill="Irradiated"
        title="Exposure"
        subtitle={
          <>
            <Highlight>Delayed</Highlight> death
          </>
        }
        paragraphs={[
          <>
            Less than a second. That&apos;s how long it took to receive a biologically{" "}
            <Highlight>lethal dose</Highlight>.
          </>,
          "A reactor core failed. You were caught in radiation fallout. You were exposed to the vacuum of space.",
          <>
            It&apos;s already <Highlight>too late</Highlight>.
          </>,
        ]}
        icon={Radiation}
        glowClassName={`${glowTopSoftClassName} h-24`}
      />

      {/* How it feels */}
      <SectionFeatureSplit
        eyebrow="How it feels"
        title={
          <>
            How it <Highlight>feels</Highlight>
          </>
        }
        paragraphs={[
          "At the moment of exposure, you may feel nothing at all.",
          "No pain, no heat, no visible injury. You may see the source of radiation, the flash, maybe an alarm.",
          "Physically though, you feel fine.",
        ]}
        icon={BellOff}
        glowClassName={`${glowTopHighlightClassName} h-20`}
      />

      {/* What actually happened */}
      <SectionFeatureSplit
        eyebrow="What actually happened"
        title={
          <>
            What actually <Highlight>happened</Highlight>
          </>
        }
        paragraphs={[
          "The damage is already done. In that brief exposure, radiation flew through your body and hit your DNA.",
          "Like deleting source code, the body loses its own blueprints.",
          "And this is far worse than a burn or injury.",
        ]}
        icon={Dna}
        invert
        glowClassName={`${glowTopSoftClassName} h-20`}
      />
    </section>
  );
}
