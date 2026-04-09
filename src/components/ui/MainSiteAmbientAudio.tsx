'use client'

import { useEffect, useRef } from "react"
import * as Tone from "tone"
import { useScrollStore } from "@/components/store/useScrollStore"

const ARS_STARTED_KEY = "ars-started"

export default function MainSiteAmbientAudio() {
  const decay = useScrollStore((s) => s.progress)
  const playerRef = useRef<Tone.Player | null>(null)
  const pitchShiftRef = useRef<Tone.PitchShift | null>(null)
  const detuneRef = useRef<Tone.PitchShift | null>(null)
  const detuneGainRef = useRef<Tone.Gain | null>(null)

  useEffect(() => {
    if (sessionStorage.getItem(ARS_STARTED_KEY) !== "true") return

    const player = new Tone.Player({
      url: "/audio/backgroundAudio.mp3",
      loop: true,
      autostart: false,
    })

    const pitchShift = new Tone.PitchShift(0).toDestination()
    const detune = new Tone.PitchShift(0)
    const detuneGain = new Tone.Gain(0).toDestination()

    player.connect(pitchShift)
    player.connect(detune)
    detune.connect(detuneGain)

    player.volume.value = Tone.gainToDb(0.35)

    playerRef.current = player
    pitchShiftRef.current = pitchShift
    detuneRef.current = detune
    detuneGainRef.current = detuneGain

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

      playerRef.current = null
      pitchShiftRef.current = null
      detuneRef.current = null
      detuneGainRef.current = null
    }
  }, [])

  useEffect(() => {
    const pitchShift = pitchShiftRef.current
    const detune = detuneRef.current
    const detuneGain = detuneGainRef.current
    if (!pitchShift || !detune || !detuneGain) return

    const normalizedDecay = Math.min(1, Math.max(0, decay))
    const start = 0.2

    let t = 0
    if (normalizedDecay > start) {
      t = (normalizedDecay - start) / (1 - start)
    }

    t = Math.pow(t, 1.4)

    pitchShift.pitch = -6 * t
    detune.pitch = -0.18 - 0.42 * t
    detuneGain.gain.value = 0.06 + 0.08 * t
  }, [decay])

  return null
}