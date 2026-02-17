'use client'

import AtomLogo from "@/components/icons/AtomLogo";
import HeroRadiation from "@/components/ui/HeroRadiation";
import { useRef } from "react"

export default function Homeostasis() {
  const arenaRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  return (
    <section id="homeostasis" className="min-h-screen flex items-center justify-center">
      <div
        ref={arenaRef}
        className="relative h-screen w-screen flex items-center justify-center overflow-x-clip"
      >
        <HeroRadiation arenaRef={arenaRef} cardRef={cardRef} />

        <div className="pointer-events-none absolute inset-0 -z-20">
          <div className="aurora" />
        </div>

        {/* Card with true neon border (only border ring animates) */}
        <div
          ref={cardRef}
          className={`
            neon-card relative flex flex-col items-center justify-center gap-4 p-20 rounded-lg
            bg-[linear-gradient(rgba(104,255,126,0.08),rgba(0,77,49,0.06))]
            backdrop-blur-xl
          `}
        >
          <div className="flex gap-2 text-9xl font-bold text-shadow-md">
            <div className="bobbing">
              <AtomLogo className="h-[1em] w-[1em]" />
            </div>
            <h1>ARS</h1>
          </div>

          <div className="text-xl font-semibold text-shadow-md">
            <p>
              The <span className="text-highlight">development</span> of{" "}
              <span className="text-accent-soft">Acute Radiation Syndrome</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
