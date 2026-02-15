"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { profilePhotos, homeBadges } from "@/lib/site-data"
import { useSettings } from "@/lib/settings-context"
import { AnimatedText } from "@/components/animated-text"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

export function HomeSection() {
  const [photoIndex, setPhotoIndex] = useState(0)
  const [showMoksha, setShowMoksha] = useState(false)
  const [showWave, setShowWave] = useState(false)
  const hasWaved = useRef(false)
  const { theme, t, lang } = useSettings()
  const isDark = theme === "dark"

  const cyclePhoto = () => {
    setPhotoIndex((prev) => (prev + 1) % profilePhotos.length)
  }

  const toggleName = () => {
    const next = !showMoksha
    setShowMoksha(next)
    if (next && !hasWaved.current) {
      hasWaved.current = true
      setShowWave(true)
      setTimeout(() => setShowWave(false), 1800)
    }
  }

  const displayName = showMoksha ? "Moksha" : t.greetingName

  const textPrimary = isDark ? "rgb(255,255,255)" : "rgb(15,15,15)"
  const textSecondary = isDark ? "rgba(255,255,255,0.50)" : "rgba(0,0,0,0.45)"
  const textTertiary = isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.40)"
  const glassBg = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.05)"
  const glassBorder = isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.08)"
  const glassShadow = isDark
    ? "0 0 20px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.1)"
    : "0 0 20px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.5)"
  const badgeBg = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.04)"
  const badgeBorder = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)"
  const ambientBg = isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)"

  return (
    <section
      id="home"
      className="scroll-snap-section flex items-center justify-center px-5 sm:px-6 md:px-12 lg:px-24 py-12 relative overflow-hidden"
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none"
        style={{ backgroundColor: ambientBg }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-col md:flex-row items-center gap-8 md:gap-16 max-w-5xl w-full mx-auto relative z-10"
      >
        {/* Profile image */}
        <motion.div variants={itemVariants} className="flex-shrink-0">
          <motion.div
            onClick={cyclePhoto}
            whileHover={{ scale: 1.03, rotateY: 5 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="relative w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden cursor-pointer"
            style={{
              background: glassBg,
              border: `1px solid ${glassBorder}`,
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              boxShadow: glassShadow,
              perspective: "800px",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={photoIndex}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={profilePhotos[photoIndex]}
                  alt="Profile photo of Anil"
                  fill
                  sizes="(max-width: 768px) 192px, 256px"
                  className="object-cover"
                  priority
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {profilePhotos.map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: i === photoIndex ? "white" : "rgba(255,255,255,0.4)",
                    transform: i === photoIndex ? "scale(1.25)" : "scale(1)",
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Text content */}
        <div className="flex flex-col gap-6 text-center md:text-left">
          <motion.p
            variants={itemVariants}
            className="font-mono text-sm tracking-widest uppercase"
            style={{ color: textSecondary }}
          >
            <AnimatedText text={t.interactiveDev} />
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance"
            style={{ color: textPrimary }}
          >
            <AnimatedText text={t.greetingPrefix} />
            <span
              onClick={toggleName}
              style={{ cursor: "inherit" }}
              role="presentation"
            >
              <AnimatedText text={displayName} key={`name-${showMoksha}-${lang}`} />
            </span>
            <AnimatePresence>
              {showWave && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.4 } }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="inline-block ml-2 origin-[70%_70%]"
                  style={{ animation: "wave-hand 1s ease-in-out" }}
                >
                  👋
                </motion.span>
              )}
            </AnimatePresence>
            <br />
            <span
              className="text-2xl md:text-3xl lg:text-4xl font-light"
              style={{ color: textSecondary }}
            >
              <AnimatedText text={t.subtitle} />
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="leading-relaxed max-w-lg text-sm md:text-base"
            style={{ color: textTertiary }}
          >
            <AnimatedText text={t.bio} />
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-3 justify-center md:justify-start"
          >
            {homeBadges.map((badge) => (
              <motion.span
                key={badge}
                whileHover={{ scale: 1.08, y: -2 }}
                className="rounded-full px-4 py-1.5 text-xs font-mono tracking-wider"
                style={{
                  color: textSecondary,
                  backgroundColor: badgeBg,
                  border: `1px solid ${badgeBorder}`,
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  boxShadow: isDark
                    ? "0 0 12px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.06)"
                    : "0 0 12px rgba(0,0,0,0.02), inset 0 1px 0 rgba(255,255,255,0.4)",
                }}
              >
                {badge}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
