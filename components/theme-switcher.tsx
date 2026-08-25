"use client";

import * as React from "react";
import {flushSync} from "react-dom";
import {useTheme} from "next-themes";
import {Moon, Sun} from "lucide-react";
import {Button} from "@/components/ui/button";
import {getRotationDegrees} from "@/lib/utils";

export default function ThemeSwitcher() {
  const {resolvedTheme, setTheme} = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [spinning, setSpinning] = React.useState(false);
  const iconRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => setMounted(true), []);

  function toggleTheme() {
    const next = resolvedTheme === "dark" ? "light" : "dark";

    if (iconRef.current) {
      iconRef.current.style.setProperty("--theme-icon-start", `${getRotationDegrees(iconRef.current)}deg`);
      setSpinning(true);
    }

    if (!document.startViewTransition) {
      setTheme(next);
      return;
    }
    document.startViewTransition(() => flushSync(() => setTheme(next)));
  }

  if (!mounted) {
    return <Button variant="ghost" size="icon" className="opacity-0" aria-hidden />;
  }

  return (
    <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={toggleTheme} className="hover:text-accent-fun duration-200 cursor-pointer hover:bg-transparent!">
      <span
        ref={iconRef}
        onAnimationEnd={() => setSpinning(false)}
        className={`relative inline-flex ${spinning ? "animate-theme-spin" : ""}`}
      >
        <Sun className="scale-100 rotate-0 transition-transform dark:scale-0 dark:-rotate-90" />
        <Moon className="absolute scale-0 rotate-90 transition-transform dark:scale-100 dark:rotate-0" />
      </span>
    </Button>
  );
}
