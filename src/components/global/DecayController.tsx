"use client"

import { useEffect } from "react"
import { useDecay } from "@/store/useDecay"

type Segment = { id: string; to: number }

const clamp01 = (n: number) => Math.max(0, Math.min(1, n))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

export default function DecayController() {
  const setDecay = useDecay((s) => s.setDecay)

  useEffect(() => {
    const segments: Segment[] = [
      { id: "homeostasis", to: 0 },
      { id: "exposure", to: 0.05 },
      { id: "prodrome", to: 0.25 },
      { id: "recovery", to: 0.0 },
      { id: "latent", to: 0.0 },
      { id: "relapse", to: 0.35 },
      { id: "manifest", to: 1.0 },
      { id: "death", to: 1.0 },    
    ]

    const sectionEls = segments
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[]

    if (sectionEls.length === 0) return

    const fromTo: Record<string, { from: number; to: number }> = {}
    for (let i = 0; i < segments.length; i++) {
      const prevTo = i === 0 ? segments[0].to : segments[i - 1].to
      fromTo[segments[i].id] = { from: prevTo, to: segments[i].to }
    }

    let raf = 0

    const update = () => {
      const probeY = window.scrollY + window.innerHeight * 0.5

      let active: HTMLElement | null = null
      for (const el of sectionEls) {
        const top = el.offsetTop
        const bottom = top + el.offsetHeight
        if (probeY >= top && probeY < bottom) {
          active = el
          break
        }
      }

      if (!active) {
        setDecay(segments[segments.length - 1].to)
        return
      }

      const id = active.id
      const pair = fromTo[id]
      if (!pair) return

      const top = active.offsetTop
      const height = Math.max(1, active.offsetHeight)
      const t = clamp01((probeY - top) / height)

      let value = lerp(pair.from, pair.to, t)

      if (id === "death") {
        const rampPortion = 0.2 
        if (t < rampPortion) {
          const tt = t / rampPortion
          value = lerp(pair.from, pair.to, tt)
        } else {
          value = pair.to 
        }
      }

      setDecay(value)
    }

    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }

    const onResize = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize)

    update()

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
      cancelAnimationFrame(raf)
    }
  }, [setDecay])

  return null
}
