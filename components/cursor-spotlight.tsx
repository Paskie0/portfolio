"use client";

import * as React from "react";

export default function CursorSpotlight() {
  const overlayRef = React.useRef<HTMLDivElement>(null);
  const frame = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    function handleMove(event: PointerEvent) {
      if (frame.current !== null) return;
      frame.current = requestAnimationFrame(() => {
        overlayRef.current?.style.setProperty("--spotlight-x", `${event.clientX}px`);
        overlayRef.current?.style.setProperty("--spotlight-y", `${event.clientY}px`);
        frame.current = null;
      });
    }

    window.addEventListener("pointermove", handleMove, {passive: true});
    return () => {
      window.removeEventListener("pointermove", handleMove);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <div ref={overlayRef} aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div className="dot-grid absolute inset-0" />
      <div className="dot-grid-spotlight absolute inset-0" />
    </div>
  );
}
