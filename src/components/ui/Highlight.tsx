'use client'

import * as React from "react"
import { useScrollStore } from "@/components/store/useScrollStore"
import { clamp01, mapRangeClamped } from "@/lib/decayGlow"
import { cn } from "@/lib/utils"

type HighlightProps = React.HTMLAttributes<HTMLSpanElement> & {
  className?: string
  decay?: number
}

type RGB = {
  r: number
  g: number
  b: number
}

const YELLOW: RGB = { r: 255, g: 215, b: 0 }
const ORANGE: RGB = { r: 255, g: 140, b: 0 }
const RED: RGB = { r: 208, g: 38, b: 63 }

const lerp = (from: number, to: number, t: number) => from + (to - from) * t

const lerpColor = (from: RGB, to: RGB, t: number): RGB => ({
  r: lerp(from.r, to.r, t),
  g: lerp(from.g, to.g, t),
  b: lerp(from.b, to.b, t),
})

export function Highlight({
  className,
  decay,
  style,
  ...props
}: HighlightProps) {
  const globalDecay = useScrollStore((state) => state.progress)
  const d = clamp01(decay ?? globalDecay)

  const subtleGlow = mapRangeClamped(d, 0.2, 0.4, 0, 1)
  const heavyGlow = mapRangeClamped(d, 0.4, 0.7, 0, 1)
  const catastrophicGlow = mapRangeClamped(d, 0.7, 1, 0, 1)

  const saturation =
    1 +
    subtleGlow * 0.04 +
    heavyGlow * 0.08 +
    catastrophicGlow * 0.12

  const brightness =
    1 +
    subtleGlow * 0.02 +
    heavyGlow * 0.05 +
    catastrophicGlow * 0.08

  const lateBlurPx =
    catastrophicGlow * 0.22

  const yellowToOrange = mapRangeClamped(d, 0.3, 0.6, 0, 1)
  const orangeToRed = mapRangeClamped(d, 0.6, 1, 0, 1)

  const orangeStage = lerpColor(YELLOW, ORANGE, yellowToOrange)
  const finalColor = lerpColor(orangeStage, RED, orangeToRed)

  const glowColor = lerpColor(
    finalColor,
    { r: 255, g: 255, b: 255 },
    catastrophicGlow * 0.2
  )

  const color = `rgb(${Math.round(finalColor.r)}, ${Math.round(finalColor.g)}, ${Math.round(finalColor.b)})`

  const glow = `rgba(${Math.round(glowColor.r)}, ${Math.round(glowColor.g)}, ${Math.round(glowColor.b)},`

  const textShadow =
    d < 0.2
      ? "none"
      : [
          `0 0 ${1.5 + subtleGlow * 1.5 + heavyGlow}px ${glow}${0.08 + subtleGlow * 0.08})`,
          `0 0 ${4 + heavyGlow * 3 + catastrophicGlow * 4}px ${glow}${0.12 + heavyGlow * 0.08 + catastrophicGlow * 0.12})`,
        ].join(", ")

  return (
    <span
      className={cn("text-ars-highlight inline-block", className)}
      style={{
        ...style,
        color,
        textShadow,
        filter: `saturate(${saturation}) brightness(${brightness}) blur(${lateBlurPx}px)`,
      }}
      {...props}
    />
  )
}