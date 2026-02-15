"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import type { Lang } from "./site-data"
import { strings } from "./site-data"

type Theme = "dark" | "light"

interface SettingsContextValue {
  theme: Theme
  lang: Lang
  toggleTheme: () => void
  toggleLang: () => void
  t: (typeof strings)["TR"]
}

const SettingsContext = createContext<SettingsContextValue | null>(null)

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark")
  const [lang, setLang] = useState<Lang>("TR")

  const toggleTheme = useCallback(() => setTheme((t) => (t === "dark" ? "light" : "dark")), [])
  const toggleLang = useCallback(() => setLang((l) => (l === "TR" ? "EN" : "TR")), [])

  const t = strings[lang]

  return (
    <SettingsContext.Provider value={{ theme, lang, toggleTheme, toggleLang, t }}>
      <div
        className="transition-colors duration-500"
        style={{
          backgroundColor: theme === "dark" ? "#000" : "#f5f5f0",
          color: theme === "dark" ? "hsl(0 0% 96%)" : "hsl(0 0% 10%)",
          minHeight: "100vh",
          transition: "background-color 500ms ease-in-out, color 500ms ease-in-out",
        }}
      >
        {children}
      </div>
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider")
  return ctx
}
