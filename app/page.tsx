"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { HomeSection } from "@/components/home-section"
import { SkillsSection } from "@/components/skills-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { ContactSection } from "@/components/contact-section"
import { SectionNavigation } from "@/components/section-navigation"
import { ProgressIndicator } from "@/components/progress-indicator"
import { SettingsToggles } from "@/components/settings-toggles"
import { SettingsProvider } from "@/lib/settings-context"
import { useIsMobile } from "@/hooks/use-mobile"

const sectionIds = ["home", "skills", "portfolio", "contact"]

function PortfolioApp() {
  const [currentSection, setCurrentSection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const index = sectionIds.indexOf(entry.target.id)
            if (index !== -1) {
              setCurrentSection(index)
            }
          }
        })
      },
      {
        root: container,
        threshold: 0.5,
      }
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observerRef.current?.observe(el)
    })

    return () => observerRef.current?.disconnect()
  }, [])

  // Mobile: lock body scrolling — navigate only via Continue button
  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = "hidden"
      document.body.style.position = "fixed"
      document.body.style.width = "100%"
      document.body.style.height = "100%"
    } else {
      document.body.style.overflow = ""
      document.body.style.position = ""
      document.body.style.width = ""
      document.body.style.height = ""
    }
    return () => {
      document.body.style.overflow = ""
      document.body.style.position = ""
      document.body.style.width = ""
      document.body.style.height = ""
    }
  }, [isMobile])

  const navigateTo = useCallback((index: number) => {
    const el = document.getElementById(sectionIds[index])
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  return (
    <main
      ref={containerRef}
      className={`scroll-snap-container relative ${isMobile ? "mobile-locked" : ""}`}
    >
      {/* Noise overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Top controls */}
      <ProgressIndicator currentSection={currentSection} />
      <SettingsToggles />

      {/* Continue-only navigation (no back button) */}
      <SectionNavigation
        currentSection={currentSection}
        onNavigate={navigateTo}
      />

      {/* Sections */}
      <HomeSection />
      <SkillsSection />
      <PortfolioSection />
      <ContactSection />
    </main>
  )
}

export default function Page() {
  return (
    <SettingsProvider>
      <PortfolioApp />
    </SettingsProvider>
  )
}
