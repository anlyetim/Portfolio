"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSettings } from "@/lib/settings-context"
import { Sun, Moon } from "lucide-react"

// Easter egg messages per stage
const easterEggMessages = {
  TR: [
    "Ciddi misin ?!",
    "Aman bee!",
    "Kesinlikle böylesi daha iyi !",
  ],
  EN: [
    "Are you serious ?!",
    "Oh, fine!",
    "Definitely better this way !",
  ],
}

export function SettingsToggles() {
  const { theme, lang, toggleTheme, toggleLang } = useSettings()
  const isDark = theme === "dark"

  // Easter egg state
  const easterEggStage = useRef(0)
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState("")
  const [isDesktop, setIsDesktop] = useState(false)

  // Detect desktop vs mobile
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  const showToast = useCallback((message: string, duration: number = 1800) => {
    setNotificationMessage(message)
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), duration)
  }, [])

  const handleThemeToggle = useCallback(() => {
    const stage = easterEggStage.current

    // Easter egg only on desktop
    if (!isDesktop || stage >= 3) {
      toggleTheme()
      return
    }

    if (stage === 0 && isDark) {
      // Stage 0: Block switch, show notification
      easterEggStage.current = 1
      const msgs = easterEggMessages[lang]
      showToast(msgs[0], 1800)
    } else if (stage === 1 && isDark) {
      // Stage 1: Allow switch
      easterEggStage.current = 2
      toggleTheme()
      const msgs = easterEggMessages[lang]
      showToast(msgs[1], 1500)
    } else if (stage === 2 && !isDark) {
      // Stage 2: Back to dark
      easterEggStage.current = 3
      toggleTheme()
      const msgs = easterEggMessages[lang]
      showToast(msgs[2], 2000)
    } else {
      toggleTheme()
    }
  }, [isDark, lang, toggleTheme, showToast, isDesktop])

  const glassBg = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.06)"
  const glassBorder = isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.10)"
  const glassShadow = isDark
    ? "0 0 20px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.1)"
    : "0 0 20px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.5)"
  const pillBg = isDark ? "rgba(255,255,255,0.95)" : "rgba(0,0,0,0.85)"
  const activeText = isDark ? "#000" : "#fff"
  const inactiveText = isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.40)"

  return (
    <>
      {/* Easter egg notification bubble - drops from top */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -80 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="fixed top-20 inset-x-0 z-[100] flex justify-center pointer-events-none"
          >
            <div
              className="rounded-2xl px-6 py-3 flex items-center gap-2"
              style={{
                background: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.06)",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.10)"}`,
                backdropFilter: "blur(32px)",
                WebkitBackdropFilter: "blur(32px)",
                boxShadow: isDark
                  ? "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)"
                  : "0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.5)",
              }}
            >
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.025 } },
                  exit: { transition: { staggerChildren: 0.01, staggerDirection: -1 } },
                }}
                className="text-base sm:text-lg font-semibold tracking-wide whitespace-nowrap"
                style={{
                  color: isDark ? "#fff" : "#000",
                  display: "inline-flex",
                }}
              >
                {notificationMessage.split("").map((char, i) => (
                  <motion.span
                    key={`${char}-${i}`}
                    variants={{
                      hidden: { opacity: 0, y: 8 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.18, ease: "easeOut" },
                      },
                      exit: {
                        opacity: 0,
                        y: -6,
                        transition: { duration: 0.1, ease: "easeIn" },
                      },
                    }}
                    style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="fixed top-6 right-6 z-40 flex items-center gap-2"
      >
        {/* Theme toggle */}
        <button
          onClick={handleThemeToggle}
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
    </>
  )
}
