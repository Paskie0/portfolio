"use client";

import * as React from "react";
import {flushSync} from "react-dom";
import {useTheme} from "next-themes";
import {Moon, Sun} from "lucide-react";
import {Button} from "@/components/ui/button";

export default function ThemeSwitcher() {
  const {resolvedTheme, setTheme} = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  function toggleTheme() {
    const next = resolvedTheme === "dark" ? "light" : "dark";

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
    <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={toggleTheme} className="hover:text-accent-fun focus-visible:ring-accent-fun duration-200 cursor-pointer hover:bg-transparent!">
      <span
        style={{viewTransitionName: "theme-icon"}}
        className="relative inline-flex"
      >
        <Sun className="scale-100 rotate-0 transition-transform dark:scale-0 dark:-rotate-90" />
        <Moon className="absolute scale-0 rotate-90 transition-transform dark:scale-100 dark:rotate-0" />
      </span>
    </Button>
  );
}
