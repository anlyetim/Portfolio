"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface GlassButtonProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
  type?: "button" | "submit"
}

export function GlassButton({
  children,
  onClick,
  disabled = false,
  className,
  type = "button",
}: GlassButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.05, y: -2 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
      className={cn(
        "rounded-lg px-6 py-3 text-sm font-medium tracking-wide",
        "bg-white/10 backdrop-blur-xl border border-white/15",
        "shadow-[0_0_20px_rgba(255,255,255,0.08),inset_0_1px_0_rgba(255,255,255,0.1)]",
        "transition-all duration-300",
        "hover:bg-white/[0.14] hover:border-white/20",
        disabled && "opacity-30 cursor-not-allowed",
        className
      )}
    >
      {children}
    </motion.button>
  )
}
