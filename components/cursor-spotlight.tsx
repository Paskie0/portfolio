"use client";

import * as React from "react";

const EASE = 0.05;

export default function CursorSpotlight() {
  const overlayRef = React.useRef<HTMLDivElement>(null);
  const target = React.useRef({x: -9999, y: -9999});
  const current = React.useRef({x: -9999, y: -9999});
  const frame = React.useRef<number | null>(null);
  const hasMoved = React.useRef(false);

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    function handleMove(event: PointerEvent) {
      target.current.x = event.clientX;
      target.current.y = event.clientY;
      // Snap on the very first move so the spotlight doesn't spend seconds
      // crawling in from its off-screen park position at low EASE values.
      if (!hasMoved.current) {
        hasMoved.current = true;
        current.current.x = event.clientX;
        current.current.y = event.clientY;
      }
    }

    function tick() {
      current.current.x += (target.current.x - current.current.x) * EASE;
      current.current.y += (target.current.y - current.current.y) * EASE;
      overlayRef.current?.style.setProperty("--spotlight-x", `${current.current.x}px`);
      overlayRef.current?.style.setProperty("--spotlight-y", `${current.current.y}px`);
      frame.current = requestAnimationFrame(tick);
    }

    window.addEventListener("pointermove", handleMove, {passive: true});
    frame.current = requestAnimationFrame(tick);

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
