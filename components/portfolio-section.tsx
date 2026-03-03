"use client"

import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react"
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

/* ─── Shared thumbnail renderer ─── */
function ProjectThumbnail({ project, isDark, height = "h-40" }: { project: Project; isDark: boolean; height?: string }) {
  return (
    <div
      className={`${height} w-full relative overflow-hidden`}
      style={{
        background: `linear-gradient(135deg, ${project.color}15 0%, ${project.color}05 100%)`,
      }}
    >
      {project.gallery ? (
        <div className="absolute inset-0 flex">
          {project.gallery.map((src, i) => (
            <div key={i} className="relative flex-1 h-full overflow-hidden">
              {src.endsWith(".mp4") ? (
                <video src={src} autoPlay loop muted playsInline className="w-full h-full object-cover" />
              ) : (
                <Image src={src} alt={`${project.title} ${i + 1}`} fill className="object-cover" sizes="120px" />
              )}
            </div>
          ))}
        </div>
      ) : project.thumbnailMode === "icon" && project.thumbnailUrl ? (
        <div className="absolute inset-0 flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${project.color}30 0%, ${project.color}10 100%)` }}
        >
          <Image src={project.thumbnailUrl} alt={project.title} width={80} height={80} className="rounded-2xl object-contain" />
        </div>
      ) : project.thumbnailMode === "themed-icon" && project.thumbnailUrl ? (
        <div className="absolute inset-0 flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${project.color}20 0%, ${project.color}08 100%)` }}
        >
          <img src={project.thumbnailUrl} alt={project.title} width={72} height={72} draggable={false}
            style={{ filter: isDark ? "brightness(0) invert(1)" : "brightness(0)", opacity: 0.7 }}
          />
        </div>
      ) : project.thumbnailUrl ? (
        project.thumbnailUrl.endsWith(".mp4") ? (
          <video src={project.thumbnailUrl} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <Image src={project.thumbnailUrl} alt={project.title} fill className="object-cover" sizes="320px" />
        )
      ) : (
        <div className="absolute inset-0 flex items-center justify-center" style={{ color: `${project.color}40` }}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="m9 8 6 4-6 4V8Z" />
          </svg>
        </div>
      )}
    </div>
  )
}

/* ─── Desktop Project Card (hover to reveal) ─── */
function ProjectCard({ project, isHovered, isDark }: { project: Project; isHovered: boolean; isDark: boolean }) {
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
      style={{ background: glassBg, border: `1px solid ${glassBorder}`, backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", boxShadow: glassShadow }}
    >
      <div className="relative">
        <ProjectThumbnail project={project} isDark={isDark} />
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-4 pointer-events-none"
              style={{ backgroundColor: isDark ? "rgba(0,0,0,0.80)" : "rgba(255,255,255,0.85)", backdropFilter: "blur(8px)" }}
            >
              <p className="text-xs text-center leading-relaxed" style={{ color: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.5)" }}>
                {description}
              </p>
              <div className="flex gap-3 mt-4 pointer-events-auto">
                {project.githubUrl && (
                  <motion.a href={project.githubUrl} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                    className="rounded-lg px-3 py-1.5 text-xs font-medium flex items-center gap-1.5"
                    style={{ background: isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.06)", border: `1px solid ${isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.10)"}` }}
                  >
                    <Github className="w-3.5 h-3.5" /> GitHub <ExternalLink className="w-3 h-3 opacity-60" />
                  </motion.a>
                )}
                {project.artstationUrl && (
                  <motion.a href={project.artstationUrl} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                    className="rounded-lg px-3 py-1.5 text-xs font-medium flex items-center gap-1.5"
                    style={{ background: isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.06)", border: `1px solid ${isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.10)"}` }}
                  >
                    <ArtStationIcon className="w-3.5 h-3.5" /> <AnimatedText text={t.artstation} /> <ExternalLink className="w-3 h-3 opacity-60" />
                  </motion.a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-semibold text-sm">{project.title}</h3>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded-full"
              style={{ color: isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.45)", background: `${project.color}10`, border: `1px solid ${project.color}20` }}
            >{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Desktop: Horizontal scrollable row ─── */
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
        <h3 className="text-sm font-mono tracking-widest uppercase"
          style={{ color: isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.45)" }}
        >
          <AnimatedText text={lang === "TR" ? row.categoryTR : row.category} />
        </h3>
        <div className="flex gap-2">
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => scroll("left")}
            className="rounded-lg p-2 min-w-[36px] min-h-[36px] flex items-center justify-center transition-colors"
            style={{ background: glassBg, border: `1px solid ${glassBorder}`, color: isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.45)" }}
          >
            <ChevronLeft className="w-4 h-4" />
          </motion.button>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => scroll("right")}
            className="rounded-lg p-2 min-w-[36px] min-h-[36px] flex items-center justify-center transition-colors"
            style={{ background: glassBg, border: `1px solid ${glassBorder}`, color: isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.45)" }}
          >
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
      <div ref={scrollRef} onWheel={handleWheel} onMouseLeave={() => setHoveredProjectId(null)}
        className="flex gap-4 sm:gap-5 overflow-x-auto scrollbar-hide pb-2 px-1 portfolio-row-scroll touch-allow"
      >
        {row.projects.map((project) => (
          <div key={project.id} onMouseEnter={() => setHoveredProjectId(project.id)}>
            <ProjectCard project={project} isHovered={hoveredProjectId === project.id} isDark={isDark} />
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Mobile: Single card carousel with tap to reveal ─── */
function MobileCarouselRow({ row, isDark }: { row: ProjectRow; isDark: boolean }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [tapped, setTapped] = useState(false)
  const { lang, t } = useSettings()

  const project = row.projects[currentIndex]
  const description = lang === "TR" ? project.descriptionTR : project.description

  const goNext = () => {
    setTapped(false)
    setCurrentIndex((prev) => (prev + 1) % row.projects.length)
  }
  const goPrev = () => {
    setTapped(false)
    setCurrentIndex((prev) => (prev - 1 + row.projects.length) % row.projects.length)
  }

  const glassBg = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.04)"
  const glassBorder = isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.08)"
  const glassShadow = isDark
    ? "0 0 20px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.08)"
    : "0 0 20px rgba(0,0,0,0.03), inset 0 1px 0 rgba(255,255,255,0.4)"

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-xs font-mono tracking-widest uppercase px-1"
        style={{ color: isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.45)" }}
      >
        <AnimatedText text={lang === "TR" ? row.categoryTR : row.category} />
      </h3>

      {/* Card */}
      <div className="flex justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="rounded-xl overflow-hidden w-[280px]"
            style={{ background: glassBg, border: `1px solid ${glassBorder}`, backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", boxShadow: glassShadow }}
            onClick={() => setTapped(!tapped)}
          >
            <div className="relative">
              <ProjectThumbnail project={project} isDark={isDark} height="h-44" />
              {/* Tap overlay */}
              <AnimatePresence>
                {tapped && (
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex flex-col items-center justify-center p-4"
                    style={{ backgroundColor: isDark ? "rgba(0,0,0,0.85)" : "rgba(255,255,255,0.9)", backdropFilter: "blur(8px)" }}
                  >
                    <p className="text-xs text-center leading-relaxed mb-3"
                      style={{ color: isDark ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.55)" }}
                    >
                      {description}
                    </p>
                    <div className="flex gap-2">
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                          className="rounded-lg px-3 py-1.5 text-xs font-medium flex items-center gap-1.5"
                          style={{ background: isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.06)", border: `1px solid ${isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.10)"}` }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="w-3.5 h-3.5" /> GitHub <ExternalLink className="w-3 h-3 opacity-60" />
                        </a>
                      )}
                      {project.artstationUrl && (
                        <a href={project.artstationUrl} target="_blank" rel="noopener noreferrer"
                          className="rounded-lg px-3 py-1.5 text-xs font-medium flex items-center gap-1.5"
                          style={{ background: isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.06)", border: `1px solid ${isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.10)"}` }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ArtStationIcon className="w-3.5 h-3.5" /> <AnimatedText text={t.artstation} /> <ExternalLink className="w-3 h-3 opacity-60" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="p-3 flex flex-col gap-1.5">
              <h3 className="font-semibold text-sm">{project.title}</h3>
              <div className="flex flex-wrap gap-1">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-[9px] font-mono tracking-wider px-1.5 py-0.5 rounded-full"
                    style={{ color: isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.45)", background: `${project.color}10`, border: `1px solid ${project.color}20` }}
                  >{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation buttons below card */}
      <div className="flex items-center justify-center gap-4 mt-1">
        <motion.button whileTap={{ scale: 0.9 }} onClick={goPrev}
          className="rounded-full p-2.5 min-w-[40px] min-h-[40px] flex items-center justify-center"
          style={{ background: glassBg, border: `1px solid ${glassBorder}`, color: isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.45)" }}
        >
          <ChevronLeft className="w-4 h-4" />
        </motion.button>
        <span className="text-xs font-mono" style={{ color: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.3)" }}>
          {currentIndex + 1} / {row.projects.length}
        </span>
        <motion.button whileTap={{ scale: 0.9 }} onClick={goNext}
          className="rounded-full p-2.5 min-w-[40px] min-h-[40px] flex items-center justify-center"
          style={{ background: glassBg, border: `1px solid ${glassBorder}`, color: isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.45)" }}
        >
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  )
}

/* ─── Main Section ─── */
export function PortfolioSection() {
  const { theme, t } = useSettings()
  const isDark = theme === "dark"
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  return (
    <section
      id="portfolio"
      className="scroll-snap-section flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-24 py-10 relative overflow-hidden"
    >
      <div className="max-w-6xl w-full mx-auto flex flex-col gap-6 md:gap-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center flex flex-col gap-2 hidden md:flex"
        >
          <p className="font-mono text-sm tracking-widest uppercase"
            style={{ color: isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.45)" }}
          >
            <AnimatedText text={t.selectedWork} />
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-balance">
            <AnimatedText text={t.portfolio} />
          </h2>
        </motion.div>

        <div className="flex flex-col gap-6 md:gap-8">
          {portfolioRows.map((row, index) => (
            <motion.div
              key={row.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {isMobile ? (
                <MobileCarouselRow row={row} isDark={isDark} />
              ) : (
                <HorizontalRow row={row} isDark={isDark} />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
