'use client';

import { useEffect, useRef } from "react";
import * as Tone from "tone";
import { useScrollStore } from "@/components/store/useScrollStore";

const EXPOSURE_BURST_KEY = "ars-exposure-burst-triggered";
const BURST_AUDIO_PATH = "/audio/radiationBurst.mp3";
const PRE_GLOW_DELAY_MS = 3000;
const GLOW_HOLD_MS = 4000;
const GLOW_RELEASE_MS = 450;
const AUDIO_FADE_IN_SECONDS = 0.6;

export default function ExposureBurstTrigger() {
  const setGlowDecayOverride = useScrollStore((state) => state.setGlowDecayOverride);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    const shouldRespectSessionLock = process.env.NODE_ENV === "production";

    if (
      shouldRespectSessionLock &&
      sessionStorage.getItem(EXPOSURE_BURST_KEY) === "true"
    ) {
      return;
    }

    let observer: IntersectionObserver | null = null;
    let resolveSectionRaf: number | null = null;
    let startGlowTimeout: number | null = null;
    let releaseGlowTimeout: number | null = null;
    let releaseRaf: number | null = null;

    const player = new Tone.Player({
      url: BURST_AUDIO_PATH,
      loop: false,
      autostart: false,
    });

    const gain = new Tone.Gain(0).toDestination();
    player.connect(gain);

    const triggerSequence = async () => {
      if (hasTriggeredRef.current) return;

      hasTriggeredRef.current = true;
      sessionStorage.setItem(EXPOSURE_BURST_KEY, "true");

      try {
        await Tone.start();
        await player.load(BURST_AUDIO_PATH);

        const now = Tone.now();
        gain.gain.cancelScheduledValues(now);
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(1, now + AUDIO_FADE_IN_SECONDS);

        player.start(now);
      } catch {}

      startGlowTimeout = window.setTimeout(() => {
        setGlowDecayOverride(1);

        releaseGlowTimeout = window.setTimeout(() => {
          const releaseStart = performance.now();
          const fromDecay = 1;

          const step = () => {
            const elapsed = performance.now() - releaseStart;
            const t = Math.min(1, elapsed / GLOW_RELEASE_MS);
            const easeOut = 1 - Math.pow(1 - t, 3);
            const liveDecay = useScrollStore.getState().progress;
            const blendedDecay = fromDecay + (liveDecay - fromDecay) * easeOut;

            setGlowDecayOverride(blendedDecay);

            if (t < 1) {
              releaseRaf = window.requestAnimationFrame(step);
            } else {
              setGlowDecayOverride(null);
              releaseRaf = null;
            }
          };

          releaseRaf = window.requestAnimationFrame(step);
        }, GLOW_HOLD_MS);
      }, PRE_GLOW_DELAY_MS);
    };

    const attachObserver = () => {
      const sectionEl = document.getElementById("exposure");
      if (!sectionEl) {
        resolveSectionRaf = window.requestAnimationFrame(attachObserver);
        return;
      }

      const scrollRoot = document.getElementById("scroll-root");
      const root = scrollRoot instanceof Element ? scrollRoot : null;

      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;

          observer?.disconnect();
          void triggerSequence();
        },
        {
          root,
          threshold: 0.25,
        }
      );

      observer.observe(sectionEl);
    };

    attachObserver();

    return () => {
      observer?.disconnect();

      if (resolveSectionRaf !== null) {
        window.cancelAnimationFrame(resolveSectionRaf);
      }

      if (startGlowTimeout !== null) {
        window.clearTimeout(startGlowTimeout);
      }

      if (releaseGlowTimeout !== null) {
        window.clearTimeout(releaseGlowTimeout);
      }

      if (releaseRaf !== null) {
        window.cancelAnimationFrame(releaseRaf);
      }

      player.stop();
      player.dispose();
      gain.dispose();

      setGlowDecayOverride(null);
    };
  }, [setGlowDecayOverride]);

  return null;
}