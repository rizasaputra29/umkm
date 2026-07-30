"use client";

import { useTheme } from "@/lib/theme/theme-provider";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []); // eslint-disable-line react-hooks/set-state-in-effect

  if (!mounted) {
    return <div className="size-8" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex size-8 items-center justify-center hover:bg-muted transition-colors duration-150"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun size={14} className="text-foreground" />
      ) : (
        <Moon size={14} className="text-foreground" />
      )}
    </button>
  );
}
