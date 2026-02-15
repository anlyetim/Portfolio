"use client"

import { useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import Image from "next/image"
import { portfolioRows, type Project, type ProjectRow } from "@/lib/site-data"
import { useSettings } from "@/lib/settings-context"
import { AnimatedText } from "@/components/animated-text"

function ArtStationIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 17.723l2.027 3.505h.001a2.424 2.424 0 0 0 2.164 1.333h13.457l-2.792-4.838H0zm24-2.218a2.403 2.403 0 0 0-.344-1.235L14.695 0a2.424 2.424 0 0 0-2.164-1.333h-.001A2.424 2.424 0 0 0 10.362 0L.867 16.468l2.792 4.838L12.53 5.505l5.902 10.215L24 15.505zM19.83 16.468L16.462 10.5l-3.37 5.968h6.738z" transform="translate(0,1.333) scale(0.95)" />
    </svg>
  )
}

function ProjectCard({
  project,
  isHovered,
  isDark,
}: {
  project: Project
  isHovered: boolean
  isDark: boolean
}) {
  const { lang, t } = useSettings()
  const glassBg = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.04)"
  const glassBorder = isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.08)"
  const glassShadow = isDark
    ? "0 0 20px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.08)"
    : "0 0 20px rgba(0,0,0,0.03), inset 0 1px 0 rgba(255,255,255,0.4)"

  const description = lang === "TR" ? project.descriptionTR : project.description

  return (
    <motion.div
      animate={isHovered ? { scale: 1.03, y: -8 } : { scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="rounded-xl overflow-hidden flex-shrink-0 w-[260px] sm:w-[280px] md:w-[320px]"
      style={{
        background: glassBg,
        border: `1px solid ${glassBorder}`,
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        boxShadow: glassShadow,
        perspective: "800px",
      }}
    >
      {/* Thumbnail */}
      <div
        className="h-40 w-full relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${project.color}15 0%, ${project.color}05 100%)`,
        }}
      >
        {project.gallery ? (
          <div className="absolute inset-0 flex">
            {project.gallery.map((src, i) => (
              <div key={i} className="relative flex-1 h-full overflow-hidden">
                {src.endsWith(".mp4") ? (
                  <video
                    src={src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image
                    src={src}
                    alt={`${project.title} ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="120px"
                  />
                )}
              </div>
            ))}
          </div>
        ) : project.thumbnailUrl ? (
          project.thumbnailUrl.endsWith(".mp4") ? (
            <video
              src={project.thumbnailUrl}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <Image
              src={project.thumbnailUrl}
              alt={project.title}
              fill
              className="object-cover"
              sizes="320px"
            />
          )
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ color: `${project.color}40` }}
          >
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="m9 8 6 4-6 4V8Z" />
            </svg>
          </div>
        )}

        {/* Hover overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-4 pointer-events-none"
              style={{
                backgroundColor: isDark ? "rgba(0,0,0,0.80)" : "rgba(255,255,255,0.85)",
                backdropFilter: "blur(8px)",
              }}
            >
              <p
                className="text-xs text-center leading-relaxed"
                style={{ color: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.5)" }}
              >
                {description}
              </p>
              <div className="flex gap-3 mt-4 pointer-events-auto">
                <motion.a
                  href={project.artstationUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-lg px-3 py-1.5 text-xs font-medium flex items-center gap-1.5"
                  style={{
                    background: isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.06)",
                    border: `1px solid ${isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.10)"}`,
                  }}
                >
                  <ArtStationIcon className="w-3.5 h-3.5" />
                  <AnimatedText text={t.artstation} />
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Card body */}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-semibold text-sm">{project.title}</h3>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded-full"
              style={{
                color: isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.45)",
                background: `${project.color}10`,
                border: `1px solid ${project.color}20`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function HorizontalRow({ row, isDark }: { row: ProjectRow; isDark: boolean }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null)
  const { lang } = useSettings()

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = direction === "left" ? -340 : 340
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" })
    }
  }

  const handleWheel = (e: React.WheelEvent) => {
    if (scrollRef.current && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault()
      scrollRef.current.scrollBy({ left: e.deltaY, behavior: "auto" })
    }
  }

  const glassBg = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.04)"
  const glassBorder = isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.08)"

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between px-1">
        <h3
          className="text-sm font-mono tracking-widest uppercase"
          style={{ color: isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.45)" }}
        >
          <AnimatedText text={lang === "TR" ? row.categoryTR : row.category} />
        </h3>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scroll("left")}
            className="rounded-lg p-2 min-w-[36px] min-h-[36px] flex items-center justify-center transition-colors"
            style={{
              background: glassBg,
              border: `1px solid ${glassBorder}`,
              color: isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.45)",
            }}
          >
            <ChevronLeft className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scroll("right")}
            className="rounded-lg p-2 min-w-[36px] min-h-[36px] flex items-center justify-center transition-colors"
            style={{
              background: glassBg,
              border: `1px solid ${glassBorder}`,
              color: isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.45)",
            }}
          >
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
      {/* Row container: hover state managed at row level */}
      <div
        ref={scrollRef}
        onWheel={handleWheel}
        onMouseLeave={() => setHoveredProjectId(null)}
        className="flex gap-4 sm:gap-5 overflow-x-auto scrollbar-hide pb-2 px-1 portfolio-row-scroll touch-allow"
      >
        {row.projects.map((project) => (
          <div
            key={project.id}
            onMouseEnter={() => setHoveredProjectId(project.id)}
          >
            <ProjectCard
              project={project}
              isHovered={hoveredProjectId === project.id}
              isDark={isDark}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export function PortfolioSection() {
  const { theme, t } = useSettings()
  const isDark = theme === "dark"

  return (
    <section
      id="portfolio"
      className="scroll-snap-section flex items-center justify-center px-5 sm:px-6 md:px-12 lg:px-24 py-10 relative overflow-hidden"
    >
      <div className="max-w-6xl w-full mx-auto flex flex-col gap-8 md:gap-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center flex flex-col gap-3"
        >
          <p
            className="font-mono text-sm tracking-widest uppercase"
            style={{ color: isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.45)" }}
          >
            <AnimatedText text={t.selectedWork} />
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-balance">
            <AnimatedText text={t.portfolio} />
          </h2>
        </motion.div>

        <div className="flex flex-col gap-8">
          {portfolioRows.map((row, index) => (
            <motion.div
              key={row.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <HorizontalRow row={row} isDark={isDark} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
