'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type CarouselProps = {
  children: ReactNode;
  className?: string;
  viewportClassName?: string;
  trackClassName?: string;
  loop?: boolean;
  align?: 'start' | 'center' | 'end';
};

export default function Carousel({
  children,
  className,
  viewportClassName,
  trackClassName,
  loop = false,
  align = 'start',
}: CarouselProps) {
  const [emblaRef] = useEmblaCarousel({
    loop,
    align,
    containScroll: loop ? false : 'trimSnaps',
  });

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn("overflow-hidden", viewportClassName)}
        ref={emblaRef}
      >
        <div className={cn("flex gap-6 pb-4", trackClassName)}>
          {children}
        </div>
      </div>
    </div>
  );
}

type CarouselItemProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

export function CarouselItem({
  children,
  className,
  contentClassName,
}: CarouselItemProps) {
  return (
    <div className={cn("min-w-[82%] sm:min-w-[66%] md:min-w-[45%] lg:min-w-[36%]", className)}>
      <div
        className={cn(
          "h-full rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-lg shadow-[0_12px_30px_rgba(0,0,0,0.25)]",
          contentClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}
