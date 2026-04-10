import { create } from "zustand";

export const useScrollStore = create<{
  progress: number;
  glowDecayOverride: number | null;
  setProgress: (n: number) => void;
  setGlowDecayOverride: (value: number | null) => void;
}>((set) => ({
  progress: 0,
  glowDecayOverride: null,
  setProgress: (n) => set({ progress: n }),
  setGlowDecayOverride: (value) => set({ glowDecayOverride: value }),
}));
