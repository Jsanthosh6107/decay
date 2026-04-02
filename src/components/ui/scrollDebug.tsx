"use client";

import { useEffect, useRef } from "react";
import { useScrollStore } from "../store/useScrollStore";

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

const remap = (x: number, inMin: number, inMax: number, outMin: number, outMax: number) => {
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

    const measure = () => {
      const next: Bounds = {};
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        const top = r.top + window.scrollY;
        next[id] = { top, bottom: top + r.height };
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

      const y = window.scrollY + window.innerHeight * 0.5;

      if (!exposure || !prodrome || !recovery || !relapse || !death) {
        setProgress(0);
        return;
      }

      const prodromeEnd = prodrome.bottom;
      const recoveryStart = recovery.top;
      const recoveryEnd = recovery.bottom;
      const relapseStart = relapse.top;
      const deathEnd = death.bottom;

      let value = 0;

      if (y < exposure.top) {
        value = 0;
      }
      else if (y >= exposure.top && y <= prodromeEnd) {
        value = remap(y, exposure.top, prodromeEnd, 0, 0.3);
      }
      else if (y > prodromeEnd && y < recoveryStart) {
        value = 0.3;
      }
      else if (y >= recoveryStart && y <= recoveryEnd) {
        value = remap(y, recoveryStart, recoveryEnd, 0.3, 0);
      }
      else if (y > recoveryEnd && y < relapseStart) {
        value = 0;
      }
      else if (y >= relapseStart && y <= deathEnd) {
        value = remap(y, relapseStart, deathEnd, 0, 1);
      }
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

    measure();
    computeProgress();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => {
      measure();
      computeProgress();
    });

    const ro = new ResizeObserver(() => {
      measure();
      computeProgress();
    });
    ro.observe(document.documentElement);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
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