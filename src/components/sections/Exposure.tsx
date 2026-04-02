import { H2, H3, P } from "@/components/ui"

export default function Exposure() {
  return (
    <section
      id="exposure"
      className="min-h-screen flex flex-col items-center justify-center"
    >

      {/* image text likely */}
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div>
          <H2>Exposure</H2>
          <H3>Delayed death</H3>
          <P>Less than a second. That&apos;s how long it took to receive a biologically lethal dose.</P>
          <P>A Reactor Core failed. You were caught in radiation fallout. You were exposed to the vacuum of space.</P>
          <P>It&apos;s already too late.</P>
        </div>
      </div>

      {/* image text likely */}
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div>
          <H2>How it feels</H2>
          <H3>No alarms go off</H3>
          <P>At the moment of exposure, you may feel nothing at all.</P>
          <P>No pain, no heat, no visible injury. You may see the source of radiation, the flash, maybe an alarm.</P>
          <P>Physically though? you feel fine.</P>
        </div>
      </div>

      {/* another... image text likely */}
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div>
          <H2>What actually happened</H2>
          <H3>Loss of replacement</H3>
          <P>The damage is already done. In that brief exposure. Radiation flew through your body and hit your DNA. </P>
          <P>Like deleting the source code, the body loses it&apos;s own blueprints.</P>
          <P>And this is far worse than a burn or injury</P>
        </div>
      </div>
      
    </section>
  )
}
