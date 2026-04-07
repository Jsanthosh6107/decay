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
      <SectionHeroSplit
        pill={<>Exposure Phase</>}
        title={<>You&apos;re <Highlight>Irradiated</Highlight></>}
        subtitle={
          <>
            Delayed death
          </>
        }
        paragraphs={[
          <>
            Less than a second. That&apos;s how long it took to receive a
            biologically <Highlight>lethal dose</Highlight>.
          </>,
          <>
            A reactor core failed. You were caught in radiation fallout. You
            were exposed to the vacuum of space.
          </>,
          <>
            It&apos;s already <Highlight>too late</Highlight>.
          </>,
        ]}
        icon={Radiation}
        glowClassName={`${glowTopSoftClassName} h-24`}
      />

      <SectionFeatureSplit
        eyebrow={<>silent death</>}
        title={
          <>
            How It <Highlight>Feels</Highlight>
          </>
        }
        paragraphs={[
          <>
            At the moment of exposure, you may feel{" "}
            <Highlight>nothing</Highlight> at all.
          </>,
          <>
            No pain, no heat, no visible injury. You may see the source of
            radiation, the flash, maybe an alarm.
          </>,
          <>
            Physically though, you feel <Highlight>fine</Highlight>.
          </>,
        ]}
        icon={BellOff}
        glowClassName={`${glowTopHighlightClassName} h-20`}
      />

      <SectionFeatureSplit
        eyebrow={<>Cellular Damage</>}
        title={
          <>
            What actually <Highlight>happened</Highlight>
          </>
        }
        paragraphs={[
          <>
            The damage is already done. In that brief exposure, radiation flew
            through your body and hit your <Highlight>DNA</Highlight>.
          </>,
          <>
            Like deleting source code, the body loses its own{" "}
            <Highlight>blueprints</Highlight>.
          </>,
          <>
            And this is far worse than a burn or injury.
          </>,
        ]}
        icon={Dna}
        invert
        glowClassName={`${glowTopSoftClassName} h-20`}
      />
    </section>
  );
}