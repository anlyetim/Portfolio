"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Github, Linkedin, Instagram, Send } from "lucide-react"
import { socialLinks } from "@/lib/site-data"
import { useSettings } from "@/lib/settings-context"
import { AnimatedText } from "@/components/animated-text"

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
} as const

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [sent, setSent] = useState(false)
  const { theme, t } = useSettings()
  const isDark = theme === "dark"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3000)
    setFormData({ name: "", email: "", message: "" })
  }

  const glassBg = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.04)"
  const glassBorder = isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.08)"
  const glassShadow = isDark
    ? "0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.1)"
    : "0 8px 32px rgba(0,0,0,0.06), 0 0 20px rgba(0,0,0,0.03), inset 0 1px 0 rgba(255,255,255,0.5)"
  const inputBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.03)"
  const inputBorder = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.10)"
  const labelColor = isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.45)"
  const placeholderColor = isDark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)"
  const socialBg = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.04)"
  const socialBorder = isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.08)"

  return (
    <section
      id="contact"
      className="scroll-snap-section flex items-center justify-center px-5 sm:px-6 md:px-12 lg:px-24 py-10 relative overflow-hidden"
    >
      <motion.div
        animate={{ x: [0, 80, -40, 0], y: [0, -60, 40, 0], scale: [1, 1.1, 0.9, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none"
        style={{ backgroundColor: isDark ? "rgba(96,165,250,0.05)" : "rgba(96,165,250,0.03)" }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-2xl w-full flex flex-col items-center gap-8 relative z-10"
      >
        <motion.div variants={itemVariants} className="text-center flex flex-col gap-3">
          <p className="font-mono text-sm tracking-widest uppercase" style={{ color: labelColor }}>
            <AnimatedText text={t.getInTouch} />
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-balance">
            <AnimatedText text={t.letsWork} />
          </h2>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="rounded-2xl p-6 md:p-8 w-full"
          style={{
            background: glassBg,
            border: `1px solid ${glassBorder}`,
            backdropFilter: "blur(32px)",
            WebkitBackdropFilter: "blur(32px)",
            boxShadow: glassShadow,
          }}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="name"
                className="text-xs font-mono tracking-wider uppercase"
                style={{ color: labelColor }}
              >
                <AnimatedText text={t.name} />
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))}
                className="rounded-lg px-4 py-3 min-h-[44px] text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
                style={{
                  backgroundColor: inputBg,
                  border: `1px solid ${inputBorder}`,
                  color: "inherit",
                }}
                placeholder={isDark ? "Your name" : "Your name"}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-xs font-mono tracking-wider uppercase"
                style={{ color: labelColor }}
              >
                <AnimatedText text={t.email} />
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))}
                className="rounded-lg px-4 py-3 min-h-[44px] text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
                style={{
                  backgroundColor: inputBg,
                  border: `1px solid ${inputBorder}`,
                  color: "inherit",
                }}
                placeholder="you@example.com"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="message"
                className="text-xs font-mono tracking-wider uppercase"
                style={{ color: labelColor }}
              >
                <AnimatedText text={t.message} />
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData((d) => ({ ...d, message: e.target.value }))}
                className="rounded-lg px-4 py-3 min-h-[44px] text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all resize-none"
                style={{
                  backgroundColor: inputBg,
                  border: `1px solid ${inputBorder}`,
                  color: "inherit",
                }}
                placeholder="..."
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="self-end rounded-lg px-6 py-3 text-sm font-medium tracking-wide flex items-center gap-2 transition-all duration-300"
              style={{
                background: isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.06)",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.10)"}`,
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                boxShadow: isDark
                  ? "0 0 20px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.1)"
                  : "0 0 20px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.5)",
              }}
            >
              <AnimatedText text={sent ? t.sent : t.sendMessage} />
              <Send className="w-4 h-4" />
            </motion.button>
          </form>
        </motion.div>

        {/* Social links */}
        <motion.div variants={itemVariants} className="flex gap-4">
          {socialLinks.map((social) => {
            const Icon = iconMap[social.iconName]
            return (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-xl p-3 transition-colors"
                style={{
                  background: socialBg,
                  border: `1px solid ${socialBorder}`,
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  boxShadow: isDark
                    ? "0 0 20px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.08)"
                    : "0 0 20px rgba(0,0,0,0.03), inset 0 1px 0 rgba(255,255,255,0.4)",
                  color: isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.45)",
                }}
                aria-label={social.name}
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            )
          })}
        </motion.div>
      </motion.div>
    </section>
  )
}
