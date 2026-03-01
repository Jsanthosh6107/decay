import AtomLogo from "../icons/AtomLogo";
import { H1, H2, H3, P, TypographyLead, Highlight } from "@/components/ui"
import { TextImage } from "@/components/ui";
import { Scale } from "lucide-react";

export default function Homeostasis() {
  return (
    <section
      id="homeostasis"
      className="relative w-screen flex flex-col items-center justify-center overflow-x-clip"
    >

      <div className="relative min-h-screen flex flex-col items-center justify-center gap-4 p-20 rounded-lg">
        <div className="flex gap-2 text-9xl text-shadow-md">
          <div className="bobbing">
            <AtomLogo className="h-[1em] w-[1em]" />
          </div>
          <H1>ARS</H1>
        </div>

        <div className="text-xl font-semibold text-shadow-md">
          <TypographyLead className="text-white">
            The <span className="text-ars-highlight">development</span> of{" "}
            <span className="text-ars-accent-soft">Acute Radiation Syndrome</span>
          </TypographyLead>
        </div>
      </div>

      {/* Text and image side by side */}
      <TextImage>
        <div className="w-[75%]">
          <div className="w-[80%]">
            <H2>Homeostasis</H2>
            <H3>A <Highlight>stable</Highlight> condition</H3>
            <P>Every healthy human exists in a narrow range. Small infections are dealt with swiftly. Old cells die. New cells replace them. Your internal environment is not stable because nothing goes wrong. It&apos;s because damaged or worn out parts are constantly replaced</P>
          </div>
        </div>
        <div className="w-[25%]">
          <Scale className="h-full w-full" />
        </div>
      </TextImage>

      {/* Sliding visual or carousel of the organs and their functions */}
      <div className="min-h-screen flex flex-row items-center justify-center gap-8 p-20">
        <div>
          <H2>Organ systems</H2>
          <H3>stable factories</H3>
          <P>Organs are like infrastructure in a city. they silently manufacture blood cells, hormones, immune defenses, and structural tissue constantly. as you shed cells, they replace them, maintaining a narrow but stable balance.</P>
        </div>
        <div>{/* image */}</div>
      </div>

      {/* centered text only*/}
      <div className="min-h-screen flex flex-row items-center justify-center gap-8 p-20">
        <div>
          <H2>What&apos;s about to happen</H2>
          <P>ARS doesn&apos;t immediately destroy your organs. it destroys the cells responsible for replacing them. Your body can repair damage, but what repairs the repairers?</P>
        </div>
      </div>
    
    </section>
  );
}
