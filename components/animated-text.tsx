"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useSettings } from "@/lib/settings-context"

interface AnimatedTextProps {
    text: string
    className?: string
    style?: React.CSSProperties
    as?: "span" | "p" | "h1" | "h2" | "h3" | "div" | "label"
}

export function AnimatedText({ text, className, style, as: Tag = "span" }: AnimatedTextProps) {
    const { lang } = useSettings()

    return (
        <Tag className={className} style={{ ...style, display: Tag === "span" ? "inline-flex" : "flex", flexWrap: "wrap" }}>
            <AnimatePresence mode="wait">
                <motion.span
                    key={lang + text}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.018 } },
                        exit: { transition: { staggerChildren: 0.008, staggerDirection: -1 } },
                    }}
                    style={{ display: "inline-flex", flexWrap: "wrap" }}
                >
                    {text.split("").map((char, i) => (
                        <motion.span
                            key={`${char}-${i}`}
                            variants={{
                                hidden: { opacity: 0, y: 6 },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: { duration: 0.25, ease: "easeOut" },
                                },
                                exit: {
                                    opacity: 0,
                                    y: -4,
                                    transition: { duration: 0.15, ease: "easeIn" },
                                },
                            }}
                            style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}
                        >
                            {char}
                        </motion.span>
                    ))}
                </motion.span>
            </AnimatePresence>
        </Tag>
    )
}
