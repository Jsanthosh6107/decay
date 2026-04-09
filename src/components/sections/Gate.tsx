'use client'

import HeroRadiation from "@/components/ui/HeroRadiation";
import { useEffect, useRef } from "react"
import { Radiation } from 'lucide-react';
import { useRouter } from "next/navigation";


export default function Page() {
  const router = useRouter()
  const arenaRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.body.classList.add("bg-ars-accent-deeper")
    document.documentElement.classList.add("bg-ars-accent-deeper")

    return () => {
      document.body.classList.remove("bg-ars-accent-deeper")
      document.documentElement.classList.remove("bg-ars-accent-deeper")
    }
  }, [])

  const handleStart = () => {
    sessionStorage.setItem("ars-started", "true")
    router.push("/MainSite")
  }

  return (
    <section id="gate" className="min-h-screen flex items-center justify-center bg-ars-accent-deeper">
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
          <button
            type="button"
            onClick={handleStart}
            className={`
              radioactive-btn
              group
              px-8 py-4
              text-ars-accent-soft
              flex items-center gap-4
              text-2xl font-semibold
              bg-[#120020]
              rounded-lg
              transition-transform duration-300
              hover:scale-105 
              hover:cursor-pointer
            `}
          >
            <Radiation className="w-[1.2em] h-[1.2em] transition-transform duration-500 group-hover:animate-spin group-hover:stroke-ars-highlight" />
            <span className="group-hover:text-ars-highlight">Start ARS</span>
          </button>
        </div>
      </div>
    </section>
  )
}
