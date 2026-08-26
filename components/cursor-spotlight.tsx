"use client";

import * as React from "react";
import {EFFECT_HINT_STORAGE_KEY} from "@/lib/effect-hint";

const GRID_SIZE = 24;
const EASE = 0.06;
const SPOTLIGHT_RADIUS = 220;
const SPOTLIGHT_FALLOFF = 0.5;
const RIPPLE_SPEED = 500; // px/s
const RIPPLE_MAX_RADIUS = SPOTLIGHT_RADIUS * 2 + 150; // a bit past the spotlight's diameter
const RIPPLE_LIFETIME = RIPPLE_MAX_RADIUS / RIPPLE_SPEED;
const RIPPLE_SIGMA = 40; // width of the traveling wavefront
const RIPPLE_PRESS = 0.7; // how much a dot shrinks at the peak of the wave
const RIPPLE_PUSH = 20; // px a dot is displaced outward at the peak of the wave
const HOLD_TOGGLE_MS = 500;

type Ripple = {x: number; y: number; start: number};

export default function CursorSpotlight() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // iOS/Android fire synthetic mousemove/mousedown/mouseup after a tap for
    // web compatibility, so checking the event type alone isn't enough to
    // keep this off touch devices — gate on the actual input capability.
    const isTouchPrimary = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const skipInteractive = reduceMotion || isTouchPrimary;

    const target = {x: -9999, y: -9999};
    const current = {x: -9999, y: -9999};
    let hasMoved = false;
    let disabled = false;
    let holdTimeout: number | null = null;
    let ripples: Ripple[] = [];
    let frame: number | null = null;
    let width = 0;
    let height = 0;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Changing canvas.width/height clears the bitmap, and when the
      // animation loop isn't running (skipInteractive) nothing would ever
      // repaint it otherwise, so force an immediate redraw here.
      draw();
    }

    function readColor(name: string) {
      return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    }

    function handleMove(event: MouseEvent) {
      target.x = event.clientX;
      target.y = event.clientY;
      // Snap on the very first move so the spotlight doesn't crawl in from
      // its off-screen park position.
      if (!hasMoved) {
        hasMoved = true;
        current.x = event.clientX;
        current.y = event.clientY;
      }
    }

    function handleDown(event: MouseEvent) {
      if (!disabled) {
        ripples.push({x: event.clientX, y: event.clientY, start: performance.now()});
      }
      holdTimeout = window.setTimeout(() => {
        disabled = !disabled;
        holdTimeout = null;
        if (disabled) {
          localStorage.setItem(EFFECT_HINT_STORAGE_KEY, "1");
        }
      }, HOLD_TOGGLE_MS);
    }

    function handleUp() {
      // A quick tap should only spawn a ripple; only a hold past the
      // threshold toggles the spotlight, and releasing never changes it.
      if (holdTimeout !== null) {
        clearTimeout(holdTimeout);
        holdTimeout = null;
      }
    }

    function draw() {
      const now = performance.now();
      current.x += (target.x - current.x) * EASE;
      current.y += (target.y - current.y) * EASE;
      ripples = ripples.filter((ripple) => (now - ripple.start) / 1000 < RIPPLE_LIFETIME);

      const dotColor = readColor("--dot-grid");
      const spotlightColor = readColor("--foreground");
      const spotlightVisible = !disabled;

      ctx!.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / GRID_SIZE) + 1;
      const rows = Math.ceil(height / GRID_SIZE) + 1;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * GRID_SIZE;
          const y = row * GRID_SIZE;

          let radiusScale = 1;
          let offsetX = 0;
          let offsetY = 0;

          for (const ripple of ripples) {
            const elapsed = (now - ripple.start) / 1000;
            const waveRadius = elapsed * RIPPLE_SPEED;
            const dx = x - ripple.x;
            const dy = y - ripple.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 0.0001;
            const wavefront = Math.exp(-((dist - waveRadius) ** 2) / (2 * RIPPLE_SIGMA ** 2));
            const decay = 1 - elapsed / RIPPLE_LIFETIME;
            const strength = wavefront * decay;
            radiusScale -= strength * RIPPLE_PRESS;
            offsetX += (dx / dist) * strength * RIPPLE_PUSH;
            offsetY += (dy / dist) * strength * RIPPLE_PUSH;
          }

          const drawX = x + offsetX;
          const drawY = y + offsetY;
          const baseRadius = Math.max(radiusScale, 0.15);

          ctx!.beginPath();
          ctx!.fillStyle = dotColor;
          ctx!.arc(drawX, drawY, baseRadius, 0, Math.PI * 2);
          ctx!.fill();

          if (spotlightVisible) {
            const sdx = x - current.x;
            const sdy = y - current.y;
            const sdist = Math.sqrt(sdx * sdx + sdy * sdy);
            if (sdist < SPOTLIGHT_RADIUS) {
              const alpha = Math.max(0, 1 - sdist / (SPOTLIGHT_RADIUS * SPOTLIGHT_FALLOFF));
              if (alpha > 0) {
                ctx!.globalAlpha = alpha;
                ctx!.beginPath();
                ctx!.fillStyle = spotlightColor;
                ctx!.arc(drawX, drawY, baseRadius * 1.5, 0, Math.PI * 2);
                ctx!.fill();
                ctx!.globalAlpha = 1;
              }
            }
          }
        }
      }
    }

    function drawFrame() {
      draw();
      frame = requestAnimationFrame(drawFrame);
    }

    resize();
    window.addEventListener("resize", resize);

    // When the loop isn't running (skipInteractive), nothing else would
    // notice next-themes flipping the "dark" class and repaint with the
    // new --dot-grid/--foreground colors, so watch for it explicitly.
    const themeObserver = new MutationObserver(() => draw());
    themeObserver.observe(document.documentElement, {attributes: true, attributeFilter: ["class"]});

    if (skipInteractive) {
      return () => {
        window.removeEventListener("resize", resize);
        themeObserver.disconnect();
      };
    }

    window.addEventListener("mousemove", handleMove, {passive: true});
    window.addEventListener("mousedown", handleDown, {passive: true});
    window.addEventListener("mouseup", handleUp, {passive: true});
    frame = requestAnimationFrame(drawFrame);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      if (frame !== null) cancelAnimationFrame(frame);
      if (holdTimeout !== null) clearTimeout(holdTimeout);
      themeObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none fixed inset-0 -z-10" />;
}
