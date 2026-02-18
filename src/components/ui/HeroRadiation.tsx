'use client'

import React, { useEffect, useRef } from "react"

type TrailPoint = { x: number; y: number; t: number }

type Particle = {
  id: number
  x: number
  y: number
  trajectory: { x: number; y: number }
  speed: number
  excited: boolean
  trail: TrailPoint[]
  radius: number
}

type Burst = {
  x: number
  y: number
  start: number
  life: number
  radius: number
  excited: boolean
}

export default function HeroRadiation({
  arenaRef,
  cardRef,
}: {
  arenaRef: React.RefObject<HTMLDivElement | null>
  cardRef: React.RefObject<HTMLDivElement | null>
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particleRef = useRef<Particle[]>([])
  const burstRef = useRef<Burst[]>([])
  const particleIdRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext("2d")
    if (!context) return

    let animationId: number | null = null
    let resizeObserver: ResizeObserver | null = null

    function setup() {
      if (animationId !== null) cancelAnimationFrame(animationId)

      const rect = arenaRef.current?.getBoundingClientRect()
      if (!rect) return

      const canvasWidth = rect.width
      const canvasHeight = rect.height

      if (!canvas) return
      canvas.width = canvasWidth
      canvas.height = canvasHeight

      const innerRect = cardRef.current?.getBoundingClientRect()
      if (!innerRect) return

      const innerWidth = innerRect.width
      const innerHeight = innerRect.height
      const offsetLeft = innerRect.left - rect.left
      const offsetTop = innerRect.top - rect.top

      let lastFrameTimeMs = performance.now()
      let spawnAccumulator = 0
      const spawnRatePerSecond = 10

      lastFrameTimeMs = performance.now()
      spawnAccumulator = 0

      function randomEdgePoint(): { x: number; y: number; sideEdge: number } {
        const side = Math.floor(Math.random() * 3)

        switch (side) {
          case 0:
            return { x: offsetLeft + Math.random() * innerWidth, y: offsetTop, sideEdge: 0 }
          case 1:
            return { x: offsetLeft + innerWidth, y: offsetTop + Math.random() * innerHeight, sideEdge: 1 }
          default:
            return { x: offsetLeft, y: offsetTop + Math.random() * innerHeight, sideEdge: 3 }
        }
      }
      
    function clamp(v: number, lo: number, hi: number) {
      return Math.max(lo, Math.min(hi, v))
    }

    function calculateTrajectory(sideEdge: number): { x: number; y: number } {
      const baseAngles = [-Math.PI / 2, 0, Math.PI]
      const baseAngle = sideEdge === 3 ? baseAngles[2] : baseAngles[sideEdge]

      const spread = (60 * Math.PI) / 180
      const maxDown = (15 * Math.PI) / 180

      let offset = (Math.random() * 2 - 1) * spread

      if (sideEdge === 1 || sideEdge === 3) {
        offset = clamp(offset, -spread, maxDown)
      }

      const angle = baseAngle + offset
      return { x: Math.cos(angle), y: Math.sin(angle) }
    }

      function timeBookkeeping(now: number) {
        let deltaTime = (now - lastFrameTimeMs) / 1000
        deltaTime = Math.min(deltaTime, 0.05)
        lastFrameTimeMs = now
        spawnAccumulator += spawnRatePerSecond * deltaTime
        return deltaTime
      }

      particleRef.current = []
      burstRef.current = []

      function spawnBurstAtEdge(p: Particle, now: number) {
        const r = Math.max(2, p.radius * 2)
        const glowR = r * 2

        let bx = p.x
        let by = p.y

        if (p.x < 0) bx = 0
        else if (p.x > canvasWidth) bx = canvasWidth

        if (p.y < 0) by = 0
        else if (p.y > canvasHeight) by = canvasHeight

        burstRef.current.push({
          x: bx,
          y: by,
          start: now,
          life: 140,
          radius: glowR * 7,
          excited: p.excited,
        })
      }

      function drawBurst(b: Burst, now: number) {
        const age = now - b.start
        const t = Math.min(1, age / b.life)
        const alpha = 1 - t
        const R = b.radius * (0.6 + 0.6 * t)

        if (!context) return

        const g = context.createRadialGradient(b.x, b.y, 0, b.x, b.y, R)

        if (b.excited) {
          g.addColorStop(0, `rgba(255,215,0,${0.9 * alpha})`)
          g.addColorStop(0.25, `rgba(255,215,0,${0.35 * alpha})`)
        } else {
          g.addColorStop(0, `rgba(210,255,220,${0.9 * alpha})`)
        }

        g.addColorStop(0.22, `rgba(104,255,126,${0.65 * alpha})`)
        g.addColorStop(0.55, `rgba(0,161,102,${0.28 * alpha})`)
        g.addColorStop(1, `rgba(0,161,102,0)`)

        context.fillStyle = g
        context.beginPath()
        context.arc(b.x, b.y, R, 0, Math.PI * 2)
        context.fill()
      }

      function loop(now: number) {
        if (!context) return
        const deltaTime = timeBookkeeping(now)

        context.globalCompositeOperation = "source-over"
        context.clearRect(0, 0, canvasWidth, canvasHeight)

        while (spawnAccumulator >= 1) {
          const spawn = randomEdgePoint()
          const trajectory = calculateTrajectory(spawn.sideEdge)
          const radius = 1 + Math.random() * 3.5

          particleRef.current.push({
            id: particleIdRef.current++,
            x: spawn.x,
            y: spawn.y,
            trajectory,
            speed: Math.random() * 160 + 5000,
            excited: Math.random() < 0.04,
            trail: [{ x: spawn.x, y: spawn.y, t: now }],
            radius,
          })

          spawnAccumulator -= 1
        }

        const trailLife = 0.08
        const maxTrailPoints = 12
        const step = 14

        for (let i = particleRef.current.length - 1; i >= 0; i--) {
          const p = particleRef.current[i]

          p.x += p.trajectory.x * p.speed * deltaTime
          p.y += p.trajectory.y * p.speed * deltaTime

          const scatterStrength = 1.2
          const ang = (Math.random() * 2 - 1) * scatterStrength * deltaTime
          const cos = Math.cos(ang)
          const sin = Math.sin(ang)
          const tx = p.trajectory.x * cos - p.trajectory.y * sin
          const ty = p.trajectory.x * sin + p.trajectory.y * cos
          p.trajectory.x = tx
          p.trajectory.y = ty

          const last = p.trail[p.trail.length - 1] ?? { x: p.x, y: p.y, t: now }
          const dx = p.x - last.x
          const dy = p.y - last.y
          const dist = Math.hypot(dx, dy)

          if (dist > 0) {
            const n = Math.min(10, Math.ceil(dist / step))
            for (let k = 1; k <= n; k++) {
              p.trail.push({
                x: last.x + (dx * k) / n,
                y: last.y + (dy * k) / n,
                t: now,
              })
            }
          }

          const cutoff = now - trailLife * 1000
          while (p.trail.length && p.trail[0].t < cutoff) p.trail.shift()
          while (p.trail.length > maxTrailPoints) p.trail.shift()

          const radius = p.radius
          const glowRadius = radius * 2

          if (
            p.x <= -glowRadius ||
            p.x >= canvasWidth + glowRadius ||
            p.y <= -glowRadius ||
            p.y >= canvasHeight + glowRadius
          ) {
            spawnBurstAtEdge(p, now)
            particleRef.current.splice(i, 1)
            continue
          }

          if (p.trail.length >= 2) {
            context.lineCap = "round"
            context.lineJoin = "round"

            const total = p.trail.length
            for (let j = 1; j < total; j++) {
              const a = p.trail[j - 1]
              const b = p.trail[j]
              const tt = j / total

              const age01 = (now - a.t) / (trailLife * 1000)
              const alpha = Math.max(0, 1 - age01)

              const width = 0.6 + Math.pow(tt, 2.2) * 4
              context.strokeStyle = `rgba(104,255,126,${0.45 * alpha})`
              context.lineWidth = width * alpha

              context.beginPath()
              context.moveTo(a.x, a.y)
              context.lineTo(b.x, b.y)
              context.stroke()
            }
          }

          const g = context.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowRadius)

          if (p.excited) {
            g.addColorStop(0, "rgba(255,215,0,0.95)")
            g.addColorStop(0.35, "rgba(255,215,0,0.45)")
          } else {
            g.addColorStop(0, "rgba(210,255,220,0.95)")
          }

          g.addColorStop(0.25, "rgba(104,255,126,0.70)")
          g.addColorStop(0.6, "rgba(0,161,102,0.35)")
          g.addColorStop(1, "rgba(0,161,102,0)")

          context.fillStyle = g
          context.beginPath()
          context.arc(p.x, p.y, glowRadius, 0, Math.PI * 2)
          context.fill()
        }

        for (let i = burstRef.current.length - 1; i >= 0; i--) {
          const b = burstRef.current[i]
          if (now - b.start >= b.life) {
            burstRef.current.splice(i, 1)
            continue
          }
          drawBurst(b, now)
        }

        animationId = requestAnimationFrame(loop)
      }

      if (context) {
        context.shadowBlur = 0
        context.shadowColor = "transparent"
      }

      loop(performance.now())
    }

    setup()

    resizeObserver = new ResizeObserver(setup)
    if (arenaRef.current) resizeObserver.observe(arenaRef.current)

    return () => {
      if (animationId !== null) cancelAnimationFrame(animationId)
      resizeObserver?.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
      }}
    />
  )
}
