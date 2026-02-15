"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useSettings } from "@/lib/settings-context"

interface ProgressIndicatorProps {
  currentSection: number
}

export function ProgressIndicator({ currentSection }: ProgressIndicatorProps) {
  const { theme, t } = useSettings()
  const isDark = theme === "dark"

  const sections = [t.home, t.skillsLabel, t.portfolioLabel, t.contact]

  const glassBg = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.06)"
  const glassBorder = isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.10)"
  const glassShadow = isDark
    ? "0 0 20px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.1)"
    : "0 0 20px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.5)"

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-40 rounded-full px-2 py-2 flex items-center gap-1"
      style={{
        background: glassBg,
        border: `1px solid ${glassBorder}`,
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        boxShadow: glassShadow,
      }}
    >
      {sections.map((section, index) => (
        <div key={section} className="flex items-center gap-1">
          <div className="relative flex items-center justify-center">
            <motion.div
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-500",
                index === currentSection
                  ? isDark ? "bg-white" : "bg-black"
                  : isDark ? "bg-white/30" : "bg-black/20"
              )}
              animate={
                index === currentSection
                  ? { scale: [1, 1.3, 1] }
                  : { scale: 1 }
              }
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>
          {index < sections.length - 1 && (
            <div
              className={cn(
                "w-6 h-px transition-all duration-500",
                index < currentSection
                  ? isDark ? "bg-white/40" : "bg-black/30"
                  : isDark ? "bg-white/15" : "bg-black/10"
              )}
            />
          )}
        </div>
      ))}
    </motion.div>
  )
}
