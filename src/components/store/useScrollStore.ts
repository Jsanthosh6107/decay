import { create } from "zustand";

export const useScrollStore = create<{
  progress: number;
  setProgress: (n: number) => void;
}>((set) => ({
  progress: 0,
  setProgress: (n) => set({ progress: n }),
}));