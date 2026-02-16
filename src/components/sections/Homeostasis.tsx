'use client'

import AtomLogo from "@/components/icons/AtomLogo";
import HeroRadiation from "@/components/ui/HeroRadiation";
import { useRef } from "react"

export default function Homeostasis() {

  const arenaRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  return (
    <section
      id="homeostasis"
      className="min-h-screen flex items-center justify-center"
    >

      <div ref={arenaRef} className="relative h-screen w-screen flex items-center justify-center">

        <HeroRadiation arenaRef={arenaRef} cardRef={cardRef} />
        <div
          ref={cardRef}
          className={`
            relative flex flex-col items-center justify-center gap-4 p-20 rounded-lg
            border border-accent
            bg-[linear-gradient(rgba(104,255,126,0.08),rgba(0,77,49,0.06))]
            backdrop-blur-xl
            before:absolute before:inset-0 before:rounded-lg
            before:shadow-[0_0_25px_var(--color-accent-soft)]
            before:-z-10
          `}
        >
          <div className="flex gap-4 text-9xl font-bold text-shadow-2xl">
            <AtomLogo className="h-[1em] w-[1em]" />
            <h1>ARS</h1>
          </div>
          <div className="text-xl font-semibold">
            <p>The development of Acute Radiation Syndrome</p>
          </div>
        </div>

      </div>
      
    </section>
  )
}
