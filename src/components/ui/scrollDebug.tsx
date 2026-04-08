"use client";

import { useEffect, useRef } from "react";
import { useScrollStore } from "../store/useScrollStore";

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

const remap = (
  x: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) => {
  if (inMax - inMin === 0) return outMin;
  const t = (x - inMin) / (inMax - inMin);
  return outMin + clamp01(t) * (outMax - outMin);
};

type Bounds = Record<string, { top: number; bottom: number }>;

export default function ScrollDebug() {
  const progress = useScrollStore((s) => s.progress);
  const setProgress = useScrollStore((s) => s.setProgress);

  const boundsRef = useRef<Bounds>({});
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const ids = [
      "homeostasis",
      "exposure",
      "prodrome",
      "recovery",
      "latent",
      "relapse",
      "manifest",
      "death",
    ];

    const scrollRoot = document.getElementById("scroll-root");
    if (!scrollRoot) return;

    const measure = () => {
      const next: Bounds = {};
      const rootRect = scrollRoot.getBoundingClientRect();

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;

        const r = el.getBoundingClientRect();
        const top = r.top - rootRect.top + scrollRoot.scrollTop;

        next[id] = {
          top,
          bottom: top + r.height,
        };
      }

      boundsRef.current = next;
    };

    const computeProgress = () => {
      const b = boundsRef.current;

      const exposure = b["exposure"];
      const prodrome = b["prodrome"];
      const recovery = b["recovery"];
      const relapse = b["relapse"];
      const death = b["death"];

      const y = scrollRoot.scrollTop + scrollRoot.clientHeight * 0.5;

      if (!exposure || !prodrome || !recovery || !relapse || !death) {
        setProgress(0);
        return;
      }

      let value = 0;

      // 0 through Homeostasis
      if (y < exposure.top) {
        value = 0;
      }
      // Exposure -> end of Prodrome ramps to 0.30
      else if (y >= exposure.top && y <= prodrome.bottom) {
        value = remap(y, exposure.top, prodrome.bottom, 0, 0.3);
      }
      // Hold peak until Recovery actually starts
      else if (y > prodrome.bottom && y < recovery.top) {
        value = 0.3;
      }
      // Recovery alone drops from 0.30 back to 0
      else if (y >= recovery.top && y <= recovery.bottom) {
        value = remap(y, recovery.top, recovery.bottom, 0.3, 0);
      }
      // Latent stays at 0 until Relapse starts
      else if (y > recovery.bottom && y < relapse.top) {
        value = 0;
      }
      // Relapse -> Manifest -> full Death ramps to 1
      else if (y >= relapse.top && y <= death.bottom) {
        value = remap(y, relapse.top, death.bottom, 0, 1);
      }
      // After Death stays at 1
      else {
        value = 1;
      }

      setProgress(value);
    };

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        computeProgress();
      });
    };

    const onResize = () => {
      measure();
      computeProgress();
    };

    measure();
    computeProgress();

    scrollRoot.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    const ro = new ResizeObserver(() => {
      measure();
      computeProgress();
    });

    ro.observe(scrollRoot);
    ro.observe(document.documentElement);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      scrollRoot.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, [setProgress]);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 10,
        right: 10,
        background: "black",
        color: "white",
        padding: 8,
        fontSize: 12,
        borderRadius: 6,
      }}
    >
      {progress.toFixed(2)}
    </div>
  );
}