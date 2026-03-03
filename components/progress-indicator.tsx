"use client"

import { motion } from "framer-motion"
import { useSettings } from "@/lib/settings-context"

interface ProgressIndicatorProps {
  currentSection: number
  onNavigate: (index: number) => void
}

// SVG Icons for each section
function HomeIcon({ active, isDark }: { active: boolean; isDark: boolean }) {
  const color = active
    ? (isDark ? "#fff" : "#000")
    : (isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.25)")
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

function SkillsIcon({ active, isDark }: { active: boolean; isDark: boolean }) {
  const color = active
    ? (isDark ? "#fff" : "#000")
    : (isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.25)")
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="18" x2="20" y2="18" />
      <line x1="4" y1="6" x2="4" y2="6" />
      <line x1="4" y1="12" x2="4" y2="12" />
      <line x1="4" y1="18" x2="4" y2="18" />
    </svg>
  )
}

function PortfolioIcon({ active, isDark }: { active: boolean; isDark: boolean }) {
  const color = active
    ? (isDark ? "#fff" : "#000")
    : (isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.25)")
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  )
}

function ContactIcon({ active, isDark }: { active: boolean; isDark: boolean }) {
  const color = active
    ? (isDark ? "#fff" : "#000")
    : (isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.25)")
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

const ICONS = [HomeIcon, SkillsIcon, PortfolioIcon, ContactIcon]

export function ProgressIndicator({ currentSection, onNavigate }: ProgressIndicatorProps) {
  const { theme } = useSettings()
  const isDark = theme === "dark"

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
      className="fixed top-6 left-6 z-40 rounded-full p-1 flex items-center gap-0.5"
      style={{
        background: glassBg,
        border: `1px solid ${glassBorder}`,
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        boxShadow: glassShadow,
      }}
    >
      {ICONS.map((Icon, index) => {
        const isActive = index === currentSection
        return (
          <div key={index} className="flex items-center gap-0.5">
            <motion.button
              onClick={() => onNavigate(index)}
              className="w-7 h-7 rounded-full flex items-center justify-center cursor-pointer"
              animate={isActive ? { scale: [1, 1.15, 1] } : { scale: 1 }}
              transition={isActive ? { repeat: Infinity, duration: 2 } : {}}
              whileTap={{ scale: 0.85 }}
              style={{
                background: isActive
                  ? (isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)")
                  : "transparent",
              }}
            >
              <Icon active={isActive} isDark={isDark} />
            </motion.button>
            {index < ICONS.length - 1 && (
              <div
                className="w-3 h-px transition-all duration-500"
                style={{
                  background: index < currentSection
                    ? (isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.3)")
                    : (isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)"),
                }}
              />
            )}
          </div>
        )
      })}
    </motion.div>
  )
}
