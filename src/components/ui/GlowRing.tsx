import { ReactNode } from "react";

interface GlowRingProps {
  children: ReactNode;
  className?: string;
}

export const GlowRing = ({ children, className = "" }: GlowRingProps) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <div className="absolute h-[140%] w-[140%] rounded-full pulse-ring" />
      <div className="absolute h-[120%] w-[120%] rounded-full bg-green-400/20 blur-2xl" />
      <div className="relative z-10 h-full w-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};