'use client';

import { useMemo, type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useScrollStore } from "@/components/store/useScrollStore";
import { getDecayGlowVisuals, type DecayGlowVisuals } from "@/lib/decayGlow";

const rgba = (r: number, g: number, b: number, a: number) =>
  `rgba(${r}, ${g}, ${b}, ${Math.max(0, Math.min(1, a))})`;

function getPerimeterBackground(visuals: DecayGlowVisuals, alphaScale = 1) {
  const base = visuals.glowOpacity * alphaScale;
  const core = rgba(visuals.red, visuals.green, visuals.blue, base * 0.9);
  const mid = rgba(visuals.red, visuals.green, visuals.blue, base * 0.45);
  const soft = rgba(visuals.red, visuals.green, visuals.blue, base * 0.18);
  const clear = rgba(visuals.red, visuals.green, visuals.blue, 0);
  const edge = `${visuals.edgeSizeVmin}vmin`;

  return {
    backgroundImage: [
      `linear-gradient(to bottom, ${core} 0%, ${mid} 36%, ${soft} 62%, ${clear} 100%)`,
      `linear-gradient(to top, ${core} 0%, ${mid} 36%, ${soft} 62%, ${clear} 100%)`,
      `linear-gradient(to right, ${core} 0%, ${mid} 36%, ${soft} 62%, ${clear} 100%)`,
      `linear-gradient(to left, ${core} 0%, ${mid} 36%, ${soft} 62%, ${clear} 100%)`,
    ].join(", "),
    backgroundSize: `100% ${edge}, 100% ${edge}, ${edge} 100%, ${edge} 100%`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top center, bottom center, center left, center right",
  } satisfies Pick<
    CSSProperties,
    "backgroundImage" | "backgroundSize" | "backgroundRepeat" | "backgroundPosition"
  >;
}

export default function GlobalDecayGlow() {
  const decay = useScrollStore((state) => state.progress);
  const prefersReducedMotion = useReducedMotion();

  const visuals = useMemo(() => getDecayGlowVisuals(decay), [decay]);

  const baseStyle = useMemo<CSSProperties>(() => {
    const perimeter = getPerimeterBackground(visuals);
    const shadow = rgba(
      visuals.red,
      visuals.green,
      visuals.blue,
      visuals.innerShadowAlpha
    );
    const shadowDeep = rgba(
      visuals.red,
      visuals.green,
      visuals.blue,
      visuals.innerShadowAlpha * 0.42
    );

    return {
      ...perimeter,
      inset: `${visuals.constrictionPx}px`,
      boxShadow: [
        `inset 0 0 ${visuals.innerShadowBlurPx}px ${visuals.innerShadowSpreadPx}px ${shadow}`,
        `inset 0 0 ${visuals.innerShadowBlurPx * 1.6}px ${visuals.innerShadowSpreadPx * 0.6}px ${shadowDeep}`,
      ].join(", "),
      filter: `saturate(${visuals.saturation})`,
      willChange: "opacity, transform, filter, box-shadow",
    };
  }, [visuals]);

  const pulseStyle = useMemo<CSSProperties>(() => {
    const perimeter = getPerimeterBackground(visuals, 0.85);
    const pulseShadow = rgba(
      visuals.red,
      visuals.green,
      visuals.blue,
      visuals.innerShadowAlpha * 0.7
    );

    return {
      ...perimeter,
      inset: `${visuals.constrictionPx}px`,
      boxShadow: `inset 0 0 ${visuals.innerShadowBlurPx * 1.15}px ${visuals.innerShadowSpreadPx * 0.9}px ${pulseShadow}`,
      willChange: "opacity, transform",
    };
  }, [visuals]);

  const pulseEnabled = !prefersReducedMotion && visuals.pulseStrength > 0.001;
  const pulseAmplitude = visuals.pulseStrength * 0.014;
  const pulseOpacityPeak = visuals.glowOpacity * (0.22 + visuals.pulseStrength * 0.62);
  const pulseOpacitySecondary = pulseOpacityPeak * 0.6;
  const pulseScaleSecondary = 1 + pulseAmplitude * 0.55;
  const pulseDuration = 2.2 - visuals.pulseStrength * 0.45;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: "var(--z-decay-glow, 90)" }}
    >
      <motion.div
        className="pointer-events-none absolute"
        style={baseStyle}
        animate={{ opacity: visuals.glowOpacity }}
        transition={{ duration: 0.26, ease: "easeOut" }}
      />

      <motion.div
        className="pointer-events-none absolute"
        style={pulseStyle}
        animate={
          pulseEnabled
            ? {
                opacity: [0, pulseOpacityPeak, pulseOpacityPeak * 0.45, pulseOpacitySecondary, 0],
                scale: [1, 1 + pulseAmplitude, 1, pulseScaleSecondary, 1],
              }
            : { opacity: 0, scale: 1 }
        }
        transition={
          pulseEnabled
            ? {
                duration: pulseDuration,
                times: [0, 0.12, 0.24, 0.36, 1],
                repeat: Infinity,
                ease: "easeInOut",
              }
            : { duration: 0.22, ease: "easeOut" }
        }
      />
    </div>
  );
}
