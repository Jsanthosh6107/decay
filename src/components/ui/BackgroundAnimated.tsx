'use client';

import { useEffect, useRef } from 'react';

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

const DEFAULT_OPTIONS: Options = {
  num: 28,
  particle: {
    color: 'rgba(110,255,160,0.22)',
    szMin: 0.6,
    szMax: 1.4,
    spMin: 0.03,
    spMax: 0.12,
  },
  link: {
    color: 'rgba(120,255,170,0.10)',
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
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

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

    const drawBase = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = options.background?.baseColor || '#061b14';
      ctx.fillRect(0, 0, width, height);

      const glow = ctx.createRadialGradient(
        width * 0.75,
        height * 0.2,
        0,
        width * 0.75,
        height * 0.2,
        Math.max(width, height) * 0.65
      );
      glow.addColorStop(0, 'rgba(80,255,140,0.08)');
      glow.addColorStop(0.35, 'rgba(40,180,110,0.05)');
      glow.addColorStop(1, 'rgba(0,0,0,0)');

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

    const drawParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        updateParticle(a);

        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fillStyle = options.particle.color;
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
            ctx.strokeStyle = options.link.color;
            ctx.lineWidth = 0.8;
            ctx.stroke();
            ctx.restore();
          }
        }
      }
    };

    const draw = () => {
      drawBase();
      drawParticles();
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