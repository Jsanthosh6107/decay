'use client';

import { useEffect, useRef } from 'react';
import { useScrollStore } from '@/components/store/useScrollStore';
import { clamp01 } from '@/lib/decayGlow';

type Options = {
  num: number;
  particle: {
    color: string;
    szMin: number;
    szMax: number;
    spMin: number;
    spMax: number;
  };
  link: {
    color: string;
    maxDist: number;
  };
  overlay?: {
    color: string;
  };
  background?: {
    baseColor?: string;
    vignette?: boolean;
  };
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

type RGBA = {
  r: number;
  g: number;
  b: number;
  a: number;
};

const FALLBACK_BASE: RGBA = { r: 6, g: 27, b: 20, a: 1 };
const FALLBACK_DOT: RGBA = { r: 110, g: 255, b: 160, a: 0.52 };
const FALLBACK_LINK: RGBA = { r: 120, g: 255, b: 170, a: 0.3 };

const DECAY_BASE: RGBA = { r: 0, g: 0, b: 0, a: 1 };
const DECAY_DOT: RGBA = { r: 208, g: 38, b: 63, a: 0.52 };
const DECAY_LINK: RGBA = { r: 84, g: 12, b: 22, a: 0.12 };
const DECAY_GLOW_CORE: RGBA = { r: 130, g: 20, b: 35, a: 0.05 };
const DECAY_GLOW_MID: RGBA = { r: 90, g: 12, b: 24, a: 0.03 };
const DECAY_GLOW_OUTER: RGBA = { r: 0, g: 0, b: 0, a: 0 };

const GLOW_CORE: RGBA = { r: 80, g: 255, b: 140, a: 0.08 };
const GLOW_MID: RGBA = { r: 40, g: 180, b: 110, a: 0.05 };
const GLOW_OUTER: RGBA = { r: 0, g: 0, b: 0, a: 0 };

const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

const lerpColor = (from: RGBA, to: RGBA, t: number): RGBA => ({
  r: lerp(from.r, to.r, t),
  g: lerp(from.g, to.g, t),
  b: lerp(from.b, to.b, t),
  a: lerp(from.a, to.a, t),
});

const toRgba = (color: RGBA) =>
  `rgba(${Math.round(color.r)},${Math.round(color.g)},${Math.round(color.b)},${clamp01(color.a)})`;

const parseColor = (input: string | undefined, fallback: RGBA): RGBA => {
  if (!input) return fallback;

  const value = input.trim();

  const hexMatch = value.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (hexMatch) {
    const hex = hexMatch[1];
    if (hex.length === 3) {
      const r = parseInt(hex[0] + hex[0], 16);
      const g = parseInt(hex[1] + hex[1], 16);
      const b = parseInt(hex[2] + hex[2], 16);
      return { r, g, b, a: 1 };
    }

    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return { r, g, b, a: 1 };
  }

  const rgbMatch = value.match(/^rgba?\(([^)]+)\)$/i);
  if (rgbMatch) {
    const parts = rgbMatch[1].split(",").map((part) => Number(part.trim()));
    if (parts.length === 3 || parts.length === 4) {
      const [r, g, b, a = 1] = parts;
      if ([r, g, b, a].every((part) => Number.isFinite(part))) {
        return { r, g, b, a };
      }
    }
  }

  return fallback;
};

const DEFAULT_OPTIONS: Options = {
  num: 28,
  particle: {
    color: 'rgba(110,255,160,0.52)',
    szMin: 0.6,
    szMax: 1.4,
    spMin: 0.03,
    spMax: 0.12,
  },
  link: {
    color: 'rgba(120,255,170,0.30)',
    maxDist: 120,
  },
  overlay: {
    color: 'rgba(0,0,0,0)',
  },
  background: {
    baseColor: '#061b14',
    vignette: true,
  },
};

export default function BackgroundAnimated({
  options = DEFAULT_OPTIONS,
}: {
  options?: Options;
}) {
  const decay = useScrollStore((state) => state.progress);
  const decayRef = useRef(clamp01(decay));
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    decayRef.current = clamp01(decay);
  }, [decay]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    let resizeTimeout: number | null = null;
    const sourceBaseColor = parseColor(options.background?.baseColor, FALLBACK_BASE);
    const sourceDotColor = parseColor(options.particle.color, FALLBACK_DOT);
    const sourceLinkColor = parseColor(options.link.color, FALLBACK_LINK);

    const clampDpr = () => Math.min(window.devicePixelRatio || 1, 2);

    const randomBetween = (min: number, max: number) =>
      min + Math.random() * (max - min);

    const createParticle = (): Particle => {
      const speed = randomBetween(options.particle.spMin, options.particle.spMax);
      const angle = Math.random() * Math.PI * 2;

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: randomBetween(options.particle.szMin, options.particle.szMax),
      };
    };

    const getParticleCount = () => {
      const area = width * height;
      const baseArea = 1440 * 900;
      const scaled = Math.round((area / baseArea) * options.num);
      return Math.max(16, Math.min(scaled, options.num));
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = clampDpr();

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      particles = Array.from({ length: getParticleCount() }, createParticle);
    };

    const updateParticle = (p: Particle) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < -20) p.x = width + 20;
      if (p.x > width + 20) p.x = -20;
      if (p.y < -20) p.y = height + 20;
      if (p.y > height + 20) p.y = -20;
    };

    const drawBase = (decayLevel: number) => {
      ctx.clearRect(0, 0, width, height);

      const baseColor = toRgba(lerpColor(sourceBaseColor, DECAY_BASE, decayLevel));
      const glowCore = toRgba(lerpColor(GLOW_CORE, DECAY_GLOW_CORE, decayLevel));
      const glowMid = toRgba(lerpColor(GLOW_MID, DECAY_GLOW_MID, decayLevel));
      const glowOuter = toRgba(lerpColor(GLOW_OUTER, DECAY_GLOW_OUTER, decayLevel));

      ctx.fillStyle = baseColor;
      ctx.fillRect(0, 0, width, height);

      const glow = ctx.createRadialGradient(
        width * 0.75,
        height * 0.2,
        0,
        width * 0.75,
        height * 0.2,
        Math.max(width, height) * 0.65
      );
      glow.addColorStop(0, glowCore);
      glow.addColorStop(0.35, glowMid);
      glow.addColorStop(1, glowOuter);

      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      if (options.background?.vignette) {
        const vignette = ctx.createRadialGradient(
          width / 2,
          height / 2,
          Math.min(width, height) * 0.2,
          width / 2,
          height / 2,
          Math.max(width, height) * 0.75
        );
        vignette.addColorStop(0, 'rgba(0,0,0,0)');
        vignette.addColorStop(1, 'rgba(0,0,0,0.28)');

        ctx.fillStyle = vignette;
        ctx.fillRect(0, 0, width, height);
      }

      if (options.overlay?.color) {
        ctx.fillStyle = options.overlay.color;
        ctx.fillRect(0, 0, width, height);
      }
    };

    const drawParticles = (decayLevel: number) => {
      const dotColor = toRgba(lerpColor(sourceDotColor, DECAY_DOT, decayLevel));
      const linkColor = toRgba(lerpColor(sourceLinkColor, DECAY_LINK, decayLevel));

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        updateParticle(a);

        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fillStyle = dotColor;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const distSq = dx * dx + dy * dy;
          const maxDist = options.link.maxDist;
          const maxDistSq = maxDist * maxDist;

          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / maxDist) * 0.55;

            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = linkColor;
            ctx.lineWidth = 0.8;
            ctx.stroke();
            ctx.restore();
          }
        }
      }
    };

    const draw = () => {
      const decayLevel = clamp01(decayRef.current);
      drawBase(decayLevel);
      drawParticles(decayLevel);
      rafRef.current = window.requestAnimationFrame(draw);
    };

    const handleResize = () => {
      if (resizeTimeout) window.clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(resize, 120);
    };

    resize();
    window.addEventListener('resize', handleResize);
    rafRef.current = window.requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeout) window.clearTimeout(resizeTimeout);
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
    };
  }, [options]);

  return (
  <canvas
    ref={canvasRef}
    aria-hidden
    className="fixed inset-0 -z-10 pointer-events-none h-screen w-screen"
  />
  );
}
