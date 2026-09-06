"use client";

import * as React from "react";
import {MousePointerClick} from "lucide-react";
import {EFFECT_HINT_STORAGE_KEY, EFFECT_HINT_DISMISSED_EVENT, dismissEffectHint} from "@/lib/effect-hint";

export default function EffectHint() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    // Only devices that can actually use the mouse-driven effect (matches
    // the same check cursor-spotlight.tsx gates itself on) should see the
    // hint — screen width alone isn't a reliable signal, since large
    // touchscreens (e.g. a tablet in landscape) can exceed the lg breakpoint.
    // The `lg:` class below handles the separate case of a narrow/zoomed-in
    // desktop viewport, where main's mx-auto centering no longer applies.
    const canInteract = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (canInteract && !localStorage.getItem(EFFECT_HINT_STORAGE_KEY)) {
      setVisible(true);
    }

    function handleDismissed() {
      setVisible(false);
    }

    window.addEventListener(EFFECT_HINT_DISMISSED_EVENT, handleDismissed);
    return () => window.removeEventListener(EFFECT_HINT_DISMISSED_EVENT, handleDismissed);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={dismissEffectHint}
      className="hidden lg:flex cursor-pointer items-center gap-1 pb-2 text-xs text-muted-foreground hover:text-accent-fun"
    >
      <MousePointerClick className="size-3" />
      hold left click to toggle the background effect
    </button>
  );
}
