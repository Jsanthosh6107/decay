"use client";

import { useEffect } from "react";
import { useScrollStore } from "../store/useScrollStore";

export default function ScrollDebug() {
  const progress = useScrollStore((s) => s.progress);
  const setProgress = useScrollStore((s) => s.setProgress);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      const value = max > 0 ? window.scrollY / max : 0;
      setProgress(value);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [setProgress]);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 10,
        right: 10,
        background: "black",
        color: "white",
        padding: 8,
        fontSize: 12,
      }}
    >
      {progress.toFixed(2)}
    </div>
  );
}