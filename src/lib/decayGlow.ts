export type DecayGlowVisuals = {
  decay: number;
  glowOpacity: number;
  edgeSizeVmin: number;
  constrictionPx: number;
  red: number;
  green: number;
  blue: number;
  saturation: number;
  innerShadowBlurPx: number;
  innerShadowSpreadPx: number;
  innerShadowAlpha: number;
  pulseStrength: number;
};

export const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

export const mapRangeClamped = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) => {
  if (inMax - inMin === 0) return outMin;
  const t = clamp01((value - inMin) / (inMax - inMin));
  return outMin + (outMax - outMin) * t;
};

const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

export function getDecayGlowVisuals(rawDecay: number): DecayGlowVisuals {
  const decay = clamp01(rawDecay);

  let glowOpacity = 0;
  if (decay <= 0.2) glowOpacity = 0;
  else if (decay <= 0.3) glowOpacity = mapRangeClamped(decay, 0.2, 0.3, 0, 0.21);
  else if (decay <= 0.6) glowOpacity = mapRangeClamped(decay, 0.3, 0.6, 0.21, 0.42);
  else glowOpacity = 0.42;

  let edgeSizeVmin = 10;
  if (decay <= 0.2) edgeSizeVmin = 10;
  else if (decay <= 0.3) edgeSizeVmin = mapRangeClamped(decay, 0.2, 0.3, 10, 16);
  else if (decay <= 0.6) edgeSizeVmin = mapRangeClamped(decay, 0.3, 0.6, 16, 26);
  else edgeSizeVmin = 26;

  const constrictionPx = 0;

  let redIntensity = 0.12;
  if (decay <= 0.2) redIntensity = 0.12;
  else if (decay <= 0.3) redIntensity = mapRangeClamped(decay, 0.2, 0.3, 0.12, 0.45);
  else if (decay <= 0.6) redIntensity = mapRangeClamped(decay, 0.3, 0.6, 0.45, 0.78);
  else redIntensity = 0.78;

  // Throbbing starts at 0.60 and intensifies through 1.00
  const pulseBase = mapRangeClamped(decay, 0.6, 1, 0, 1);
  const pulseStrength = Math.pow(pulseBase, 1.2);

  let innerShadowBlurPx = 28;
  if (decay <= 0.2) innerShadowBlurPx = 28;
  else if (decay <= 0.3) innerShadowBlurPx = mapRangeClamped(decay, 0.2, 0.3, 28, 72);
  else if (decay <= 0.6) innerShadowBlurPx = mapRangeClamped(decay, 0.3, 0.6, 72, 150);
  else innerShadowBlurPx = 150;

  let innerShadowSpreadPx = 0;
  if (decay <= 0.2) innerShadowSpreadPx = 0;
  else if (decay <= 0.3) innerShadowSpreadPx = mapRangeClamped(decay, 0.2, 0.3, 0, 8);
  else if (decay <= 0.6) innerShadowSpreadPx = mapRangeClamped(decay, 0.3, 0.6, 8, 18);
  else innerShadowSpreadPx = 18;

  let innerShadowAlpha = 0;
  if (decay <= 0.2) innerShadowAlpha = 0;
  else if (decay <= 0.3) innerShadowAlpha = mapRangeClamped(decay, 0.2, 0.3, 0, 0.225);
  else if (decay <= 0.6) innerShadowAlpha = mapRangeClamped(decay, 0.3, 0.6, 0.225, 0.45);
  else innerShadowAlpha = 0.45;

  const red = Math.round(lerp(92, 178, redIntensity));
  const green = Math.round(lerp(8, 28, redIntensity));
  const blue = Math.round(lerp(10, 24, redIntensity));

  return {
    decay,
    glowOpacity,
    edgeSizeVmin,
    constrictionPx,
    red,
    green,
    blue,
    saturation: lerp(1.02, 1.16, redIntensity),
    innerShadowBlurPx,
    innerShadowSpreadPx,
    innerShadowAlpha,
    pulseStrength,
  };
}