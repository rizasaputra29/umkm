"use client";

import { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "system",
  setTheme: () => {},
  resolvedTheme: "light",
});

export function useTheme() {
  return useContext(ThemeContext);
}

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyThemeToDOM(newTheme: Theme) {
  const isDark = newTheme === "dark" || (newTheme === "system" && getSystemTheme() === "dark");
  if (isDark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  return isDark ? "dark" as const : "light" as const;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");
  const systemChangeRef = useRef<(() => void) | null>(null);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem("theme", newTheme);
      document.cookie = `theme=${newTheme};path=/;max-age=31536000;SameSite=Lax`;
    } catch {}
    setResolvedTheme(applyThemeToDOM(newTheme));
  }, []);

  useEffect(() => {
    let stored: Theme = "system";
    try { stored = (localStorage.getItem("theme") as Theme) || "system"; } catch {}
    setThemeState(stored); // eslint-disable-line react-hooks/set-state-in-effect
    setResolvedTheme(applyThemeToDOM(stored));

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      setThemeState((prev) => {
        if (prev === "system") {
          setResolvedTheme(applyThemeToDOM("system"));
        }
        return prev;
      });
    };
    mq.addEventListener("change", handler);
    systemChangeRef.current = () => mq.removeEventListener("change", handler);
    return () => systemChangeRef.current?.();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
