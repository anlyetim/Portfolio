"use client"

import { motion } from "framer-motion"
import { useSettings } from "@/lib/settings-context"
import { Sun, Moon } from "lucide-react"

export function SettingsToggles() {
  const { theme, lang, toggleTheme, toggleLang } = useSettings()
  const isDark = theme === "dark"

  const glassBg = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.06)"
  const glassBorder = isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.10)"
  const glassShadow = isDark
    ? "0 0 20px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.1)"
    : "0 0 20px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.5)"
  const pillBg = isDark ? "rgba(255,255,255,0.95)" : "rgba(0,0,0,0.85)"
  const activeText = isDark ? "#000" : "#fff"
  const inactiveText = isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.40)"

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="fixed top-6 right-6 z-40 flex items-center gap-2"
    >
      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        className="relative flex items-center rounded-full p-1 transition-all duration-300"
        style={{
          background: glassBg,
          border: `1px solid ${glassBorder}`,
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          boxShadow: glassShadow,
        }}
        aria-label="Toggle theme"
      >
        <div className="relative flex items-center">
          {/* Active pill */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 32,
              height: 28,
              background: pillBg,
            }}
            animate={{ x: isDark ? 0 : 32 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
          <div
            className="relative z-10 w-8 h-7 flex items-center justify-center transition-colors duration-300"
            style={{ color: isDark ? activeText : inactiveText }}
          >
            <Moon className="w-3.5 h-3.5" />
          </div>
          <div
            className="relative z-10 w-8 h-7 flex items-center justify-center transition-colors duration-300"
            style={{ color: !isDark ? activeText : inactiveText }}
          >
            <Sun className="w-3.5 h-3.5" />
          </div>
        </div>
      </button>

      {/* Language toggle */}
      <button
        onClick={toggleLang}
        className="relative flex items-center rounded-full p-1 transition-all duration-300"
        style={{
          background: glassBg,
          border: `1px solid ${glassBorder}`,
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          boxShadow: glassShadow,
        }}
        aria-label="Toggle language"
      >
        <div className="relative flex items-center">
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 32,
              height: 28,
              background: pillBg,
            }}
            animate={{ x: lang === "TR" ? 0 : 32 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
          <div
            className="relative z-10 w-8 h-7 flex items-center justify-center text-[11px] font-bold font-mono transition-colors duration-300"
            style={{ color: lang === "TR" ? activeText : inactiveText }}
          >
            TR
          </div>
          <div
            className="relative z-10 w-8 h-7 flex items-center justify-center text-[11px] font-bold font-mono transition-colors duration-300"
            style={{ color: lang === "EN" ? activeText : inactiveText }}
          >
            EN
          </div>
        </div>
      </button>
    </motion.div>
  )
}
