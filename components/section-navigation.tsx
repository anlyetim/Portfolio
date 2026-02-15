"use client"

import { motion } from "framer-motion"
import { ChevronRight, Home } from "lucide-react"
import { useSettings } from "@/lib/settings-context"
import { AnimatedText } from "@/components/animated-text"

const sectionIds = ["home", "skills", "portfolio", "contact"]

interface SectionNavigationProps {
  currentSection: number
  onNavigate: (index: number) => void
}

export function SectionNavigation({
  currentSection,
  onNavigate,
}: SectionNavigationProps) {
  const { theme, t } = useSettings()
  const isLast = currentSection === sectionIds.length - 1
  const isDark = theme === "dark"

  const handleContinue = () => {
    if (isLast) {
      onNavigate(0)
    } else {
      onNavigate(currentSection + 1)
    }
  }

  const glassBg = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.06)"
  const glassBorder = isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.10)"
  const glassShadow = isDark
    ? "0 0 20px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.1)"
    : "0 0 20px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.5)"
  const hoverBg = isDark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.10)"

  return (
    <div className="fixed bottom-8 left-0 right-0 z-40 flex justify-end px-6 md:px-12 pointer-events-none" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
      {/* Continue-only button */}
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={handleContinue}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.97 }}
        className="rounded-lg px-5 py-3 min-h-[44px] flex items-center gap-2 text-sm font-medium pointer-events-auto transition-all duration-300"
        style={{
          background: glassBg,
          border: `1px solid ${glassBorder}`,
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          boxShadow: glassShadow,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = hoverBg
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = glassBg
        }}
      >
        {isLast ? (
          <>
            <Home className="w-4 h-4" />
            <span className="hidden md:inline"><AnimatedText text={t.backToHome} /></span>
          </>
        ) : (
          <>
            <span className="hidden md:inline"><AnimatedText text={t.continue} /></span>
            <ChevronRight className="w-4 h-4" />
          </>
        )}
      </motion.button>
    </div>
  )
}
