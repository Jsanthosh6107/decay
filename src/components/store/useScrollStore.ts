import { create } from "zustand";

export const useScrollStore = create<{
  progress: number;
  glowDecayOverride: number | null;
  isGlobalGlowPulseStopped: boolean;
  setProgress: (n: number) => void;
  setGlowDecayOverride: (value: number | null) => void;
  setGlobalGlowPulseStopped: (value: boolean) => void;
}>((set) => ({
  progress: 0,
  glowDecayOverride: null,
  isGlobalGlowPulseStopped: false,
  setProgress: (n) => set({ progress: n }),
  setGlowDecayOverride: (value) => set({ glowDecayOverride: value }),
  setGlobalGlowPulseStopped: (value) => set({ isGlobalGlowPulseStopped: value }),
}));
