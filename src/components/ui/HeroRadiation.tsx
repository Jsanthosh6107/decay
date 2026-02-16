'use client'

import { useEffect, useRef } from "react"

export default function HeroRadiation({
    //props
    arenaRef,
    cardRef}
    : {
        arenaRef: React.RefObject<HTMLDivElement | null>;
        cardRef: React.RefObject<HTMLDivElement | null>;
    }
) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particleRef = useRef<{ id: number; x: number; y: number; }[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return
        const context = ctx

        // arena size here
        const rect = arenaRef.current?.getBoundingClientRect()
        if (!rect) return
        const canvasWidth = rect.width
        const canvasHeight = rect.height
        canvas.width = canvasWidth
        canvas.height = canvasHeight

        // start position for radiation here
        const innerRect = cardRef.current?.getBoundingClientRect()
        if (!innerRect) return

        const innerWidth = innerRect.width
        const innerHeight = innerRect.height
        const offsetLeft = innerRect.left - rect.left
        const offsetTop = innerRect.top - rect.top

        function randomEdgePoint(): { x: number; y: number } {
            const side = Math.floor(Math.random() * 4)

            switch (side) {
                case 0: // top
                    return {
                        x: offsetLeft + Math.random() * innerWidth,
                        y: offsetTop,
                    }

                case 1: // right
                    return {
                        x: offsetLeft + innerWidth,
                        y: offsetTop + Math.random() * innerHeight,
                    }

                case 2: // bottom
                    return {
                        x: offsetLeft + Math.random() * innerWidth,
                        y: offsetTop + innerHeight,
                    }

                default: // left
                    return {
                        x: offsetLeft,
                        y: offsetTop + Math.random() * innerHeight,
                    }
            }
        }

        let animationId: number | null = null
        let last = performance.now()
        let spawnProgress = 0;
        const rate = 5;
        particleRef.current = []

        function loop(now : number) {
            //get time
            const deltaTime = (now - last) / 1000
            last = now
            spawnProgress += rate * deltaTime

            context.clearRect(0, 0, canvasWidth, canvasHeight)

            while (spawnProgress >= 1) {
                const spawn = randomEdgePoint()

                context.beginPath()
                context.arc(spawn.x, spawn.y, 25, 0, Math.PI * 2)
                context.fill()

                spawnProgress--
            }

            // schedule next frame
            animationId = requestAnimationFrame(loop)
        }

        context.shadowBlur = 25
        context.shadowColor = "#68ff7e"
        context.fillStyle = "#68ff7e"

        loop(performance.now())

        return () => {
            if (animationId !== null) {
                cancelAnimationFrame(animationId)
            }
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none"
            }}
        />
    )
};
