"use client"

import { useDecay } from "@/store/useDecay"

export default function DecayHUD() {
  const decay = useDecay((s) => s.decay)

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <div className="px-3 py-2 rounded-lg bg-black text-white text-sm font-mono shadow-lg">
        Decay: {decay.toFixed(3)}
      </div>
    </div>
  )
}
