import { H2, H3, P } from "@/components/ui"

export default function Exposure() {
  return (
    <section
      id="exposure"
      className="min-h-screen flex flex-col items-center justify-center"
    >

      {/* animated text image visual of radiation? */}
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div>
          <H2>Exposure</H2>
          <H3>Delayed death</H3>
          <P>Reactor Cores, fuel processing systems, industrial radiation sources. all of these are systems designed to be safe... until they're not. Infrastructure breaks, safety fails, systems misfire, Radiation follows. Exposure doesn't need to last long, a biologically lethal dose can be delivered in seconds. Sometimes less than a second.</P>
        </div>
      </div>

      {/* animated text image visual of the demon core? */}
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div>
          <H2>How it feels</H2>
          <H3>No alarms go off</H3>
          <P>At the moment of exposure, you may feel nothing at all. No pain, no heat, no visible injury. You may see the source of radiation, the flash, maybe an alarm. physically though? you feel fine.</P>
        </div>
      </div>

      {/*  */}
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div>
          <H2>What actually happened</H2>
          <H3>Loss of replacement</H3>
          <P>As radiation passes through your body, it breaks DNA strands, genetic material, and chromosomes. affected cells try to continue on, but when they try to divide, the blueprints are corrupted.</P>
        </div>
      </div>
      
    </section>
  )
}
