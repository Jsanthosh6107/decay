import { create } from "zustand"

interface DecayStore {
  decay: number
  setDecay: (value: number) => void
}

export const useDecay = create<DecayStore>((set) => ({
  decay: 0,
  setDecay: (value) =>
    set({
      decay: Math.max(0, Math.min(1, value)),
    }),
}))
