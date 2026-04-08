'use client';

import { useEffect, useRef, type RefObject } from "react";
import type { CarouselApi } from "@/components/ui/EmblaCarousel";

type UseEmblaScrollGateOptions = {
  sectionRef: RefObject<HTMLElement | null>;
  emblaApi?: CarouselApi;
  visibilityThreshold?: number;
  cooldownMs?: number;
  entryLockMs?: number;
  edgeLockMs?: number;
};

export function useEmblaScrollGate({
  sectionRef,
  emblaApi,
  visibilityThreshold = 0.6,
  cooldownMs = 1000,
  entryLockMs = 1000,
  edgeLockMs = 1000,
}: UseEmblaScrollGateOptions) {
  const isSectionActiveRef = useRef(false);
  const touchStartYRef = useRef<number | null>(null);

  const lockUntilRef = useRef(0);
  const wasActiveRef = useRef(false);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const scrollRoot = document.getElementById("scroll-root");

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isActive =
          entry.isIntersecting && entry.intersectionRatio >= visibilityThreshold;

        if (isActive && !wasActiveRef.current) {
          lockUntilRef.current = Date.now() + entryLockMs;
        }

        isSectionActiveRef.current = isActive;
        wasActiveRef.current = isActive;
      },
      {
        root: scrollRoot instanceof Element ? scrollRoot : null,
        threshold: [0, 0.25, 0.5, visibilityThreshold, 0.85, 1],
      }
    );

    observer.observe(sectionEl);

    return () => {
      observer.disconnect();
    };
  }, [sectionRef, visibilityThreshold, entryLockMs]);

  useEffect(() => {
    if (!emblaApi) return;

    const isCoolingDown = () => Date.now() < lockUntilRef.current;

    const canConsumeScroll = (deltaY: number) => {
      if (deltaY > 0) return emblaApi.canScrollNext();
      if (deltaY < 0) return emblaApi.canScrollPrev();
      return false;
    };

    const atReleaseEdge = (deltaY: number) => {
      if (deltaY > 0) return !emblaApi.canScrollNext();
      if (deltaY < 0) return !emblaApi.canScrollPrev();
      return true;
    };

    const justReachedEdgeAfterMove = (deltaY: number) => {
      if (deltaY > 0) return !emblaApi.canScrollNext();
      if (deltaY < 0) return !emblaApi.canScrollPrev();
      return false;
    };

    const advanceCarousel = (deltaY: number) => {
      if (deltaY > 0) {
        emblaApi.scrollNext();
      } else if (deltaY < 0) {
        emblaApi.scrollPrev();
      }

      const reachedEdge = justReachedEdgeAfterMove(deltaY);
      lockUntilRef.current =
        Date.now() + (reachedEdge ? edgeLockMs : cooldownMs);
    };

    const onWheel = (event: WheelEvent) => {
      if (!isSectionActiveRef.current) return;
      if (event.deltaY === 0) return;

      const deltaY = event.deltaY;

      if (canConsumeScroll(deltaY)) {
        event.preventDefault();

        if (isCoolingDown()) return;

        advanceCarousel(deltaY);
        return;
      }

      if (!atReleaseEdge(deltaY)) {
        event.preventDefault();
        return;
      }

      if (isCoolingDown()) {
        event.preventDefault();
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (!isSectionActiveRef.current) return;
      if (touchStartYRef.current === null) return;

      const currentY = event.touches[0]?.clientY;
      if (currentY === undefined) return;

      const deltaY = touchStartYRef.current - currentY;
      if (Math.abs(deltaY) < 10) return;

      if (canConsumeScroll(deltaY)) {
        event.preventDefault();

        if (isCoolingDown()) {
          touchStartYRef.current = currentY;
          return;
        }

        advanceCarousel(deltaY);
        touchStartYRef.current = currentY;
        return;
      }

      if (!atReleaseEdge(deltaY) || isCoolingDown()) {
        event.preventDefault();
        touchStartYRef.current = currentY;
      }
    };

    const onTouchEnd = () => {
      touchStartYRef.current = null;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("touchcancel", onTouchEnd);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [emblaApi, cooldownMs, edgeLockMs]);
}