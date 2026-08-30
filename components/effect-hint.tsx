"use client";

import * as React from "react";
import {MousePointerClick} from "lucide-react";
import {EFFECT_HINT_STORAGE_KEY, EFFECT_HINT_DISMISSED_EVENT, dismissEffectHint} from "@/lib/effect-hint";

export default function EffectHint() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (!localStorage.getItem(EFFECT_HINT_STORAGE_KEY)) {
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
      hold click to toggle the background effect
    </button>
  );
}
