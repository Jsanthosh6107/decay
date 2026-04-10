'use client';

import {
  Biohazard,
  Bone,
  BrainCircuit,
  Droplets,
  HeartCrack,
  Pill,
  Shield,
  Stethoscope,
} from "lucide-react";
import {
  Highlight,
  OrganSystemCard,
  type OrganSystem,
  SectionCenteredNarrative,
  SectionFeatureSplit,
  SectionScreen,
} from "@/components/ui";
import Carousel, {
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/EmblaCarousel";
import { useEffect, useRef, useState } from "react";
import { useEmblaScrollGate } from "@/lib/useEmblaScrollGate";
import { useScrollStore } from "@/components/store/useScrollStore";

const sectionClassName = "relative w-screen overflow-x-clip";
const snapSectionClassName = `${sectionClassName} min-h-screen snap-start`;
const glowTopSoftClassName =
  "pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-ars-accent-soft/25 to-transparent";
const glowTopHighlightClassName =
  "pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-ars-highlight/20 to-transparent";
const heartbeatFailAudioPath = "/audio/heartbeatFail.mp3";
const heartbeatFadeDurationMs = 1800;
const heartbeatTargetVolume = 0.2;
const heartbeatPulseStopDelayMs = 12000;
const scrollLockKeys = new Set([
  "ArrowUp",
  "ArrowDown",
  "PageUp",
  "PageDown",
  "Home",
  "End",
  " ",
]);

const terminalOrganSystems: OrganSystem[] = [
  {
    id: "bone-marrow-terminal",
    name: <>Bone marrow</>,
    role: <>hematopoiesis collapse</>,
    maintenance: (
      <>
        Stem-cell reserves are exhausted. Blood-cell factories are silent, and
        circulating counts only fall.
      </>
    ),
    failure: (
      <>
        Immunity and clotting fail together. Infection and uncontrolled
        bleeding become parallel threats.
      </>
    ),
    Icon: Bone,
  },
  {
    id: "gastrointestinal-terminal",
    name: <>Gastrointestinal</>,
    role: <>barrier dissolution</>,
    maintenance: (
      <>
        The intestinal lining no longer regenerates. Mucosa sheds, nutrient
        uptake crashes, and fluid loss accelerates.
      </>
    ),
    failure: (
      <>
        Barrier loss allows bacterial translocation and sepsis while
        electrolyte collapse drives shock physiology.
      </>
    ),
    Icon: Pill,
  },
  {
    id: "neurovascular-terminal",
    name: <>Neurovascular</>,
    role: <>signal + perfusion failure</>,
    maintenance: (
      <>
        Blood flow breaks rhythm. Oxygen reaches the brain unevenly, leaving
        critical areas under-supplied.
      </>
    ),
    failure: (
      <>
        The brain begins to shut down as circulation falters, raising the risk
        of repeated collapse.
      </>
    ),
    Icon: BrainCircuit,
  },
  {
    id: "skin-terminal",
    name: <>Skin</>,
    role: <>protective shell loss</>,
    maintenance: (
      <>
        Basal layers stop renewing. Surface tissue sloughs away, stripping
        temperature control and hydration retention.
      </>
    ),
    failure: (
      <>
        The outer barrier is gone. Heat, fluid, and pathogens move freely
        across a failing boundary.
      </>
    ),
    Icon: Shield,
  },
];

export default function Death() {
  const carouselSectionRef = useRef<HTMLElement | null>(null);
  const finalSectionRef = useRef<HTMLElement | null>(null);
  const [emblaApi, setEmblaApi] = useState<CarouselApi>();
  const hasTerminalTriggeredRef = useRef(false);
  const isScrollLockedRef = useRef(false);
  const lockedScrollTopRef = useRef(0);
  const heartbeatAudioRef = useRef<HTMLAudioElement | null>(null);
  const pendingHeartbeatRetryRef = useRef(false);
  const heartbeatFadeRafRef = useRef<number | null>(null);
  const heartbeatFadeStartedRef = useRef(false);
  const heartbeatEndedListenerRef = useRef<EventListener | null>(null);
  const heartbeatPulseStopTimeoutRef = useRef<number | null>(null);
  const heartbeatPulseStopStartedRef = useRef(false);
  const hasGlobalPulseStopTriggeredRef = useRef(false);
  const setGlobalGlowPulseStopped = useScrollStore(
    (state) => state.setGlobalGlowPulseStopped
  );

  useEmblaScrollGate({ sectionRef: carouselSectionRef, emblaApi });

  useEffect(() => {
    const audio = new Audio(heartbeatFailAudioPath);
    audio.loop = false;
    audio.preload = "auto";
    audio.volume = 0;
    heartbeatAudioRef.current = audio;

    return () => {
      if (heartbeatFadeRafRef.current !== null) {
        window.cancelAnimationFrame(heartbeatFadeRafRef.current);
        heartbeatFadeRafRef.current = null;
      }
      if (heartbeatPulseStopTimeoutRef.current !== null) {
        window.clearTimeout(heartbeatPulseStopTimeoutRef.current);
        heartbeatPulseStopTimeoutRef.current = null;
      }
      const endedListener = heartbeatEndedListenerRef.current;
      if (endedListener) {
        audio.removeEventListener("ended", endedListener);
        heartbeatEndedListenerRef.current = null;
      }
      audio.pause();
      heartbeatAudioRef.current = null;
      pendingHeartbeatRetryRef.current = false;
      heartbeatFadeStartedRef.current = false;
      heartbeatPulseStopStartedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const scrollRoot = document.getElementById("scroll-root");
    const finalSection = finalSectionRef.current;
    if (!scrollRoot || !finalSection) return;

    let cleanupScrollLock: (() => void) | null = null;
    let isDisposed = false;

    const removeHeartbeatEndListener = () => {
      const audio = heartbeatAudioRef.current;
      const endedListener = heartbeatEndedListenerRef.current;
      if (audio && endedListener) {
        audio.removeEventListener("ended", endedListener);
      }
      heartbeatEndedListenerRef.current = null;
    };

    const releaseScrollLock = () => {
      if (!cleanupScrollLock) return;
      const teardown = cleanupScrollLock;
      cleanupScrollLock = null;
      teardown();
    };

    const keepScrollLocked = () => {
      if (!isScrollLockedRef.current) return;
      if (scrollRoot.scrollTop !== lockedScrollTopRef.current) {
        scrollRoot.scrollTop = lockedScrollTopRef.current;
      }
    };

    const startHeartbeatFade = () => {
      if (isDisposed) return;
      if (heartbeatFadeStartedRef.current) return;
      const audio = heartbeatAudioRef.current;
      if (!audio) return;

      heartbeatFadeStartedRef.current = true;

      if (heartbeatFadeRafRef.current !== null) {
        window.cancelAnimationFrame(heartbeatFadeRafRef.current);
        heartbeatFadeRafRef.current = null;
      }

      const fadeStart = performance.now();

      const step = (timestamp: number) => {
        const elapsed = timestamp - fadeStart;
        const t = Math.min(1, elapsed / heartbeatFadeDurationMs);
        const eased = 1 - Math.pow(1 - t, 2);
        audio.volume = heartbeatTargetVolume * eased;

        if (t < 1) {
          heartbeatFadeRafRef.current = window.requestAnimationFrame(step);
        } else {
          audio.volume = heartbeatTargetVolume;
          heartbeatFadeRafRef.current = null;
        }
      };

      heartbeatFadeRafRef.current = window.requestAnimationFrame(step);
    };

    const scheduleGlobalPulseStop = () => {
      if (isDisposed) return;
      if (heartbeatPulseStopStartedRef.current) return;
      heartbeatPulseStopStartedRef.current = true;

      if (heartbeatPulseStopTimeoutRef.current !== null) {
        window.clearTimeout(heartbeatPulseStopTimeoutRef.current);
      }

      heartbeatPulseStopTimeoutRef.current = window.setTimeout(() => {
        if (isDisposed) return;
        if (hasGlobalPulseStopTriggeredRef.current) return;
        hasGlobalPulseStopTriggeredRef.current = true;
        setGlobalGlowPulseStopped(true);
      }, heartbeatPulseStopDelayMs);
    };

    const armUnlockOnHeartbeatEnd = () => {
      const audio = heartbeatAudioRef.current;
      if (!audio) return;

      removeHeartbeatEndListener();

      const onEnded: EventListener = () => {
        removeHeartbeatEndListener();
        releaseScrollLock();
      };

      heartbeatEndedListenerRef.current = onEnded;
      audio.addEventListener("ended", onEnded, { once: true });
    };

    const onHeartbeatPlaybackStarted = () => {
      armUnlockOnHeartbeatEnd();
      startHeartbeatFade();
      scheduleGlobalPulseStop();
    };

    const retryHeartbeatPlayback = () => {
      if (!pendingHeartbeatRetryRef.current) return;
      pendingHeartbeatRetryRef.current = false;
      window.removeEventListener("pointerdown", retryHeartbeatPlayback);
      window.removeEventListener("keydown", retryHeartbeatPlayback);
      const audio = heartbeatAudioRef.current;
      if (!audio) return;
      audio.currentTime = 0;
      audio.volume = 0;
      const playAttempt = audio.play();
      if (playAttempt && typeof playAttempt.catch === "function") {
        playAttempt.then(() => {
          onHeartbeatPlaybackStarted();
        });
        playAttempt.catch(() => {
          pendingHeartbeatRetryRef.current = true;
          window.addEventListener("pointerdown", retryHeartbeatPlayback, { passive: true });
          window.addEventListener("keydown", retryHeartbeatPlayback);
        });
      } else {
        onHeartbeatPlaybackStarted();
      }
    };

    const playHeartbeat = () => {
      const audio = heartbeatAudioRef.current;
      if (!audio) return;

      audio.currentTime = 0;
      audio.volume = 0;
      const playAttempt = audio.play();

      if (playAttempt && typeof playAttempt.catch === "function") {
        playAttempt.then(() => {
          onHeartbeatPlaybackStarted();
        });
        playAttempt.catch(() => {
          pendingHeartbeatRetryRef.current = true;
          window.addEventListener("pointerdown", retryHeartbeatPlayback, { passive: true });
          window.addEventListener("keydown", retryHeartbeatPlayback);
        });
      } else {
        onHeartbeatPlaybackStarted();
      }
    };

    const lockScrollPermanently = () => {
      if (isScrollLockedRef.current) return;
      isScrollLockedRef.current = true;
      lockedScrollTopRef.current = scrollRoot.scrollTop;

      const previousRootOverflowY = scrollRoot.style.overflowY;
      const previousRootOverscrollBehavior = scrollRoot.style.overscrollBehavior;
      const previousRootTouchAction = scrollRoot.style.touchAction;
      const previousBodyOverflow = document.body.style.overflow;
      const previousBodyOverscrollBehavior = document.body.style.overscrollBehavior;
      const previousBodyTouchAction = document.body.style.touchAction;
      const previousHtmlOverflow = document.documentElement.style.overflow;
      const previousHtmlOverscrollBehavior = document.documentElement.style.overscrollBehavior;
      const previousHtmlTouchAction = document.documentElement.style.touchAction;

      scrollRoot.style.overflowY = "hidden";
      scrollRoot.style.overscrollBehavior = "none";
      scrollRoot.style.touchAction = "none";
      document.body.style.overflow = "hidden";
      document.body.style.overscrollBehavior = "none";
      document.body.style.touchAction = "none";
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.overscrollBehavior = "none";
      document.documentElement.style.touchAction = "none";

      const onWheel = (event: WheelEvent) => {
        if (!isScrollLockedRef.current) return;
        event.preventDefault();
        keepScrollLocked();
      };

      const onTouchMove = (event: TouchEvent) => {
        if (!isScrollLockedRef.current) return;
        event.preventDefault();
        keepScrollLocked();
      };

      const onKeyDown = (event: KeyboardEvent) => {
        if (!isScrollLockedRef.current) return;
        if (!scrollLockKeys.has(event.key)) return;
        event.preventDefault();
        keepScrollLocked();
      };

      const onScroll = () => {
        keepScrollLocked();
      };

      scrollRoot.addEventListener("wheel", onWheel, { passive: false });
      scrollRoot.addEventListener("touchmove", onTouchMove, { passive: false });
      scrollRoot.addEventListener("scroll", onScroll);
      window.addEventListener("wheel", onWheel, { passive: false });
      window.addEventListener("touchmove", onTouchMove, { passive: false });
      window.addEventListener("keydown", onKeyDown);
      window.addEventListener("scroll", onScroll);

      keepScrollLocked();
      playHeartbeat();

      cleanupScrollLock = () => {
        isScrollLockedRef.current = false;

        scrollRoot.removeEventListener("wheel", onWheel);
        scrollRoot.removeEventListener("touchmove", onTouchMove);
        scrollRoot.removeEventListener("scroll", onScroll);
        window.removeEventListener("wheel", onWheel);
        window.removeEventListener("touchmove", onTouchMove);
        window.removeEventListener("keydown", onKeyDown);
        window.removeEventListener("scroll", onScroll);

        window.removeEventListener("pointerdown", retryHeartbeatPlayback);
        window.removeEventListener("keydown", retryHeartbeatPlayback);
        pendingHeartbeatRetryRef.current = false;
        removeHeartbeatEndListener();

        if (heartbeatFadeRafRef.current !== null) {
          window.cancelAnimationFrame(heartbeatFadeRafRef.current);
          heartbeatFadeRafRef.current = null;
        }
        heartbeatFadeStartedRef.current = false;

        scrollRoot.style.overflowY = previousRootOverflowY;
        scrollRoot.style.overscrollBehavior = previousRootOverscrollBehavior;
        scrollRoot.style.touchAction = previousRootTouchAction;
        document.body.style.overflow = previousBodyOverflow;
        document.body.style.overscrollBehavior = previousBodyOverscrollBehavior;
        document.body.style.touchAction = previousBodyTouchAction;
        document.documentElement.style.overflow = previousHtmlOverflow;
        document.documentElement.style.overscrollBehavior = previousHtmlOverscrollBehavior;
        document.documentElement.style.touchAction = previousHtmlTouchAction;
      };
    };

    const hasFullyLandedOnFinalSection = () => {
      const rootRect = scrollRoot.getBoundingClientRect();
      const finalRect = finalSection.getBoundingClientRect();
      const tolerance = 2;

      return (
        finalRect.top <= rootRect.top + tolerance &&
        finalRect.bottom >= rootRect.bottom - tolerance
      );
    };

    const stopWatchingFinalSection = () => {
      scrollRoot.removeEventListener("scroll", onScrollWatch);
      window.removeEventListener("resize", onScrollWatch);
    };

    const onScrollWatch = () => {
      if (hasTerminalTriggeredRef.current) return;
      if (!hasFullyLandedOnFinalSection()) return;
      hasTerminalTriggeredRef.current = true;
      stopWatchingFinalSection();
      lockScrollPermanently();
    };

    scrollRoot.addEventListener("scroll", onScrollWatch, { passive: true });
    window.addEventListener("resize", onScrollWatch);
    onScrollWatch();

    return () => {
      isDisposed = true;
      stopWatchingFinalSection();
      releaseScrollLock();
    };
  }, [setGlobalGlowPulseStopped]);

  return (
    <>
      <section id="death" ref={carouselSectionRef} className={snapSectionClassName}>
        <SectionScreen className="py-16">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 sm:px-8 lg:px-16">
            <Carousel
              loop={false}
              align="start"
              onApiReady={setEmblaApi}
              className="relative left-1/2 w-screen -translate-x-1/2"
              trackClassName="gap-5 px-0 pb-6"
            >
              {terminalOrganSystems.map((system, index) => (
                <CarouselItem
                  key={system.id ?? `terminal-organ-system-${index}`}
                  contentClassName="border-0 bg-transparent p-0 shadow-none"
                >
                  <OrganSystemCard
                    system={system}
                    statusLabel="Functionally Dead"
                    failureLabel="Failure"
                  />
                </CarouselItem>
              ))}
            </Carousel>
          </div>
        </SectionScreen>
      </section>

      <section className={snapSectionClassName}>
        <SectionFeatureSplit
          eyebrow={<>Shock physiology</>}
          title={
            <>
              Circulatory <Highlight>Instability</Highlight>
            </>
          }
          paragraphs={[
            <>
              Vascular tone collapses and fluid shifts out of the bloodstream into
              tissues, the GI tract, and compromised skin.
            </>,
            <>
              Blood pressure becomes <Highlight>harder</Highlight> to sustain, often requiring continuous
              transfusion support.
            </>,
            <>
              Sepsis compounds the collapse and further stresses already <Highlight>failing
              systems</Highlight>.
            </>,
          ]}
          icon={Droplets}
          glowClassName={`${glowTopHighlightClassName} h-20`}
        />
      </section>

      <section className={snapSectionClassName}>
        <SectionFeatureSplit
          eyebrow={<>Cardiac arrest</>}
          title={
            <>
              Neurological <Highlight>Decline</Highlight>
            </>
          }
          paragraphs={[
            <>
              Repeated arrest can follow once reserves are exhausted.
            </>,
            <>
              Return of circulation does not mean restoration of organ function.
            </>,
            <>
              Each resuscitation interval often leaves <Highlight>deeper</Highlight> neurologic injury.
            </>,
          ]}
          icon={HeartCrack}
          invert
          glowClassName={`${glowTopSoftClassName} h-20`}
        />
      </section>

      <section className={snapSectionClassName}>
        <SectionFeatureSplit
          eyebrow={<>Renal and hepatic failure</>}
          title={
            <>
              Metabolic <Highlight>Collapse</Highlight>
            </>
          }
          paragraphs={[
            <>
              Kidney and liver failure follow prolonged hypotension, circulating
              toxins, myoglobin load, and systemic inflammation.
            </>,
            <>
              Filtration and detoxification <Highlight>fail together</Highlight> as waste and acid
              burden rise.
            </>,
            <>
              Dialysis becomes necessary to temporarily support what organs can no
              longer do.
            </>,
          ]}
          icon={Stethoscope}
          glowClassName={`${glowTopHighlightClassName} h-20`}
        />
      </section>

      <section className={snapSectionClassName}>
        <SectionFeatureSplit
          eyebrow={<>Secondary infections</>}
          title={
            <>
              No Walls <Highlight>Left</Highlight>
            </>
          }
          paragraphs={[
            <>
              With external and internal barriers failing, pathogens move through
              the body with <Highlight>minimal</Highlight> resistance.
            </>,
            <>
              Bacterial, fungal, and viral infections spread while immune capacity
              is nearly absent.
            </>,
            <>
              Infection is no longer a complication. It becomes part of <Highlight>terminal</Highlight>
              physiology.
            </>,
          ]}
          icon={Biohazard}
          invert
          glowClassName={`${glowTopSoftClassName} h-20`}
        />
      </section>

      <section ref={finalSectionRef} className={snapSectionClassName} id="death-end">
        <SectionCenteredNarrative
          eyebrow={<>The end</>}
          title={
            <>
              No Path <Highlight>Back</Highlight>
            </>
          }
          paragraphs={[
            <>
              The body runs out of reserve. There is nothing left to sustain recovery,
              even with support.
            </>,
            <>
              When the heart stops again, no attempt is made to{" "}
              <Highlight>restart it</Highlight>.
            </>,
          ]}
          glowClassName={`${glowTopHighlightClassName} h-20`}
        />
      </section>
    </>
  );
}
