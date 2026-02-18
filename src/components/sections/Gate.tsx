'use client'

import HeroRadiation from "@/components/ui/HeroRadiation";
import { useRef } from "react"
import { Radiation } from 'lucide-react';
import Link from "next/link";


export default function Page() {
  const arenaRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  return (
    <section id="gate" className="min-h-screen flex items-center justify-center bg-accent-deeper">
      <div
        ref={arenaRef}
        className="relative h-screen w-screen flex items-center justify-center overflow-x-clip"
      >
        <HeroRadiation arenaRef={arenaRef} cardRef={cardRef} />

        <div
          ref={cardRef}
          className={`
            relative flex flex-col items-center justify-center rounded-lg
          `}
        >
          <Link href="/MainSite" 
            className={`
              radioactive-btn
              group
              px-8 py-4
              text-accent-soft
              flex items-center gap-4
              text-2xl font-semibold
              bg-[#120020]
              rounded-lg
              transition-transform duration-300
              hover:scale-105 
              hover:cursor-pointer
            `}
          >
            <Radiation className="w-[1.2em] h-[1.2em] transition-transform duration-500 group-hover:animate-spin group-hover:stroke-highlight" />
            <span className="group-hover:text-highlight">Begin ARS</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
