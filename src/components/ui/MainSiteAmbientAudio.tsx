'use client'

import { useEffect, useRef } from "react"
import * as Tone from "tone"
import { useScrollStore } from "@/components/store/useScrollStore"

const ARS_STARTED_KEY = "ars-started"

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))

export default function MainSiteAmbientAudio() {
  const decay = useScrollStore((s) => s.progress)

  const playerRef = useRef<Tone.Player | null>(null)
  const pitchShiftRef = useRef<Tone.PitchShift | null>(null)
  const detuneRef = useRef<Tone.PitchShift | null>(null)
  const detuneGainRef = useRef<Tone.Gain | null>(null)
  const filterRef = useRef<Tone.Filter | null>(null)

  useEffect(() => {
    if (sessionStorage.getItem(ARS_STARTED_KEY) !== "true") return

    const player = new Tone.Player({
      url: "/audio/backgroundAudio.mp3",
      loop: true,
      autostart: false,
    })

    const filter = new Tone.Filter({
      type: "lowpass",
      frequency: 18000,
      rolloff: -24,
      Q: 0.6,
    }).toDestination()

    const pitchShift = new Tone.PitchShift(0)
    const detune = new Tone.PitchShift(0)
    const detuneGain = new Tone.Gain(0)

    player.connect(pitchShift)
    player.connect(detune)

    pitchShift.connect(filter)
    detune.connect(detuneGain)
    detuneGain.connect(filter)

    player.volume.value = Tone.gainToDb(0.32)

    playerRef.current = player
    pitchShiftRef.current = pitchShift
    detuneRef.current = detune
    detuneGainRef.current = detuneGain
    filterRef.current = filter

    let isDisposed = false

    const startPlayback = async () => {
      try {
        await Tone.start()
        await Tone.loaded()
        if (isDisposed) return
        if (player.state !== "started") {
          player.start()
        }
      } catch {
      }
    }

    const handleInteraction = () => {
      void startPlayback()
      window.removeEventListener("pointerdown", handleInteraction)
      window.removeEventListener("keydown", handleInteraction)
    }

    void startPlayback()
    window.addEventListener("pointerdown", handleInteraction)
    window.addEventListener("keydown", handleInteraction)

    return () => {
      isDisposed = true
      window.removeEventListener("pointerdown", handleInteraction)
      window.removeEventListener("keydown", handleInteraction)

      if (player.state === "started") {
        player.stop()
      }

      player.dispose()
      pitchShift.dispose()
      detune.dispose()
      detuneGain.dispose()
      filter.dispose()

      playerRef.current = null
      pitchShiftRef.current = null
      detuneRef.current = null
      detuneGainRef.current = null
      filterRef.current = null
    }
  }, [])

  useEffect(() => {
    const player = playerRef.current
    const pitchShift = pitchShiftRef.current
    const detune = detuneRef.current
    const detuneGain = detuneGainRef.current
    const filter = filterRef.current

    if (!player || !pitchShift || !detune || !detuneGain || !filter) return

    const normalizedDecay = clamp01(decay)

    const threshold = 0.4
    const slowThreshold = 0.7

    let t = 0
    if (normalizedDecay > threshold) {
      t = (normalizedDecay - threshold) / (1 - threshold)
    }

    const heavy = Math.pow(t, 1.85)
    const collapse = Math.pow(t, 2.6)

    pitchShift.pitch = -(8 * heavy + 4 * collapse)
    detune.pitch = -(0.35 * heavy + 0.75 * collapse)
    detuneGain.gain.rampTo(0.14 * heavy + 0.1 * collapse, 0.12)

    filter.frequency.rampTo(18000 - 10500 * heavy - 4500 * collapse, 0.12)

    let rate = 1 - 0.08 * heavy

    if (normalizedDecay > slowThreshold) {
      const slowT =
        (normalizedDecay - slowThreshold) / (1 - slowThreshold)

      const slowCurve = Math.pow(slowT, 2.8)

      rate = rate - 0.65 * slowCurve
    }

    player.playbackRate = Math.max(0.18, rate)
  }, [decay])

  return null
}