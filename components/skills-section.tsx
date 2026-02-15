"use client"

import { useState, useRef, useCallback, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { skills, tabAccents, type SkillPiece } from "@/lib/site-data"
import { useSettings } from "@/lib/settings-context"
import { AnimatedText } from "@/components/animated-text"

// ─── Puzzle piece shape definitions ───────────────────────────────

function generateEdges(rows: number, cols: number, seed: string) {
  // Simple seeded random for consistent edges per tab
  let h = 0
  for (let i = 0; i < seed.length; i++) {
    h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0
  }
  const seededRandom = () => {
    h = (Math.imul(h ^ (h >>> 16), 0x45d9f3b) + 0x12345) | 0
    return ((h >>> 0) / 4294967296)
  }

  const edges: { top: number; right: number; bottom: number; left: number }[][] = []
  for (let r = 0; r < rows; r++) {
    edges[r] = []
    for (let c = 0; c < cols; c++) {
      edges[r][c] = {
        top: r === 0 ? 0 : -edges[r - 1][c].bottom,
        right: c === cols - 1 ? 0 : (seededRandom() > 0.5 ? 1 : -1),
        bottom: r === rows - 1 ? 0 : (seededRandom() > 0.5 ? 1 : -1),
        left: c === 0 ? 0 : -edges[r][c - 1].right,
      }
    }
  }
  return edges
}

function buildPiecePath(
  edges: { top: number; right: number; bottom: number; left: number },
  w: number,
  h: number,
  tab: number
): string {
  const t = tab
  let d = `M 0 0`

  if (edges.top === 0) {
    d += ` L ${w} 0`
  } else {
    const dir = edges.top
    d += ` L ${w * 0.35} 0`
    d += ` C ${w * 0.35} ${-dir * t * 0.1}, ${w * 0.38} ${-dir * t * 0.8}, ${w * 0.5} ${-dir * t * 0.8}`
    d += ` C ${w * 0.62} ${-dir * t * 0.8}, ${w * 0.65} ${-dir * t * 0.1}, ${w * 0.65} 0`
    d += ` L ${w} 0`
  }

  if (edges.right === 0) {
    d += ` L ${w} ${h}`
  } else {
    const dir = edges.right
    d += ` L ${w} ${h * 0.35}`
    d += ` C ${w + dir * t * 0.1} ${h * 0.35}, ${w + dir * t * 0.8} ${h * 0.38}, ${w + dir * t * 0.8} ${h * 0.5}`
    d += ` C ${w + dir * t * 0.8} ${h * 0.62}, ${w + dir * t * 0.1} ${h * 0.65}, ${w} ${h * 0.65}`
    d += ` L ${w} ${h}`
  }

  if (edges.bottom === 0) {
    d += ` L 0 ${h}`
  } else {
    const dir = edges.bottom
    d += ` L ${w * 0.65} ${h}`
    d += ` C ${w * 0.65} ${h + dir * t * 0.1}, ${w * 0.62} ${h + dir * t * 0.8}, ${w * 0.5} ${h + dir * t * 0.8}`
    d += ` C ${w * 0.38} ${h + dir * t * 0.8}, ${w * 0.35} ${h + dir * t * 0.1}, ${w * 0.35} ${h}`
    d += ` L 0 ${h}`
  }

  if (edges.left === 0) {
    d += ` L 0 0`
  } else {
    const dir = edges.left
    d += ` L 0 ${h * 0.65}`
    d += ` C ${-dir * t * 0.1} ${h * 0.65}, ${-dir * t * 0.8} ${h * 0.62}, ${-dir * t * 0.8} ${h * 0.5}`
    d += ` C ${-dir * t * 0.8} ${h * 0.38}, ${-dir * t * 0.1} ${h * 0.35}, 0 ${h * 0.35}`
    d += ` L 0 0`
  }

  d += " Z"
  return d
}

// ─── Types ────────────────────────────────────────────────────────

interface PieceState {
  x: number
  y: number
  isLocked: boolean
  correctX: number
  correctY: number
}

type TabKey = "development" | "design" | "cyber"

// ─── Constants ───────────────────────────────────────────────────

const PIECE_W = 110
const PIECE_H = 110
const TAB_SIZE = 22
const SNAP_THRESHOLD = 30
const PADDING = TAB_SIZE + 6

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
    : { r: 128, g: 128, b: 128 }
}

// ─── Jigsaw Piece Component ─────────────────────────────────────

function JigsawPiece({
  piece,
  state,
  edgeData,
  isDragging,
  accentColor,
  isDark,
}: {
  piece: SkillPiece
  state: PieceState
  edgeData: { top: number; right: number; bottom: number; left: number }
  isDragging: boolean
  accentColor: string
  isDark: boolean
}) {
  const path = useMemo(
    () => buildPiecePath(edgeData, PIECE_W, PIECE_H, TAB_SIZE),
    [edgeData]
  )
  const clipId = `clip-${piece.id}`
  const gradId = `grad-${piece.id}`
  const rgb = hexToRgb(piece.color)

  const svgW = PIECE_W + PADDING * 2
  const svgH = PIECE_H + PADDING * 2

  return (
    <svg
      width={svgW}
      height={svgH}
      viewBox={`${-PADDING} ${-PADDING} ${svgW} ${svgH}`}
      className="overflow-visible"
      style={{
        filter: state.isLocked
          ? `drop-shadow(0 0 8px ${accentColor}40)`
          : isDragging
            ? "drop-shadow(0 12px 32px rgba(255,255,255,0.12))"
            : "drop-shadow(0 4px 12px rgba(0,0,0,0.5))",
      }}
    >
      <defs>
        <clipPath id={clipId}>
          <path d={path} />
        </clipPath>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={`rgba(${rgb.r},${rgb.g},${rgb.b},0.35)`} />
          <stop offset="50%" stopColor={`rgba(${rgb.r},${rgb.g},${rgb.b},0.22)`} />
          <stop offset="100%" stopColor={`rgba(${rgb.r},${rgb.g},${rgb.b},0.12)`} />
        </linearGradient>
      </defs>

      {/* Full piece fill */}
      <path d={path} fill={`url(#${gradId})`} />
      <path d={path} fill={isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)"} />

      {/* Content */}
      <g clipPath={`url(#${clipId})`}>
        <foreignObject x={0} y={0} width={PIECE_W} height={PIECE_H}>
          <div className="w-full h-full flex flex-col items-center justify-center gap-1.5">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center font-mono font-bold text-sm"
              style={{
                color: piece.color,
                backgroundColor: `rgba(${rgb.r},${rgb.g},${rgb.b},0.15)`,
                border: `1px solid rgba(${rgb.r},${rgb.g},${rgb.b},0.25)`,
              }}
            >
              {piece.icon}
            </div>
            <span
              className="text-[10px] font-medium tracking-wider"
              style={{ color: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.5)" }}
            >
              {piece.name}
            </span>
          </div>
        </foreignObject>
      </g>

      {/* Bevel highlight */}
      <path d={path} fill="none" stroke={isDark ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.3)"} strokeWidth={1} transform="translate(0.4, 0.4)" />
      {/* Color outline */}
      <path d={path} fill="none" stroke={`rgba(${rgb.r},${rgb.g},${rgb.b},0.3)`} strokeWidth={1.5} />
      {/* Shadow edge */}
      <path d={path} fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth={1} transform="translate(-0.4, -0.4)" />

      {/* Lock glow */}
      {state.isLocked && (
        <path d={path} fill="none" stroke={piece.color} strokeWidth={2} opacity={0.4}>
          <animate attributeName="opacity" values="0;0.5;0" dur="1.2s" repeatCount="1" />
        </path>
      )}
    </svg>
  )
}

// ─── Puzzle Board Component ──────────────────────────────────────

function PuzzleBoard({
  skillList,
  boardKey,
  accentColor,
}: {
  skillList: SkillPiece[]
  boardKey: string
  accentColor: string
}) {
  const { theme, t } = useSettings()
  const isDark = theme === "dark"

  const rows = Math.max(...skillList.map((s) => s.row)) + 1
  const cols = Math.max(...skillList.map((s) => s.col)) + 1

  const boardW = cols * PIECE_W + PADDING * 2
  const boardH = rows * PIECE_H + PADDING * 2

  const boardRef = useRef<HTMLDivElement>(null)
  const draggingRef = useRef<string | null>(null)
  // Store the offset from the piece's top-left corner to the cursor
  const dragOffsetRef = useRef({ x: 0, y: 0 })

  const edgeMap = useMemo(() => {
    const edgeGrid = generateEdges(rows, cols, boardKey)
    const map: Record<string, { top: number; right: number; bottom: number; left: number }> = {}
    skillList.forEach((s) => {
      map[s.id] = edgeGrid[s.row][s.col]
    })
    return map
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardKey, rows, cols])

  const getCorrectPositions = useCallback(() => {
    const positions: Record<string, { x: number; y: number }> = {}
    skillList.forEach((s) => {
      positions[s.id] = {
        x: s.col * PIECE_W + PADDING,
        y: s.row * PIECE_H + PADDING,
      }
    })
    return positions
  }, [skillList])

  const [isScattered, setIsScattered] = useState(false)
  const [justSolved, setJustSolved] = useState(false)
  const [draggingId, setDraggingId] = useState<string | null>(null)

  const [pieces, setPieces] = useState<Record<string, PieceState>>(() => {
    const correct = getCorrectPositions()
    const result: Record<string, PieceState> = {}
    skillList.forEach((s) => {
      result[s.id] = {
        x: correct[s.id].x,
        y: correct[s.id].y,
        correctX: correct[s.id].x,
        correctY: correct[s.id].y,
        isLocked: false,
      }
    })
    return result
  })

  useEffect(() => {
    const correct = getCorrectPositions()
    const result: Record<string, PieceState> = {}
    skillList.forEach((s) => {
      result[s.id] = {
        x: correct[s.id].x,
        y: correct[s.id].y,
        correctX: correct[s.id].x,
        correctY: correct[s.id].y,
        isLocked: false,
      }
    })
    setPieces(result)
    setIsScattered(false)
    setJustSolved(false)
  }, [skillList, getCorrectPositions])

  const scatter = useCallback(() => {
    setPieces((prev) => {
      const next = { ...prev }
      Object.keys(next).forEach((id) => {
        const randX = PADDING + Math.random() * (boardW - PIECE_W - PADDING * 2)
        const randY = PADDING + Math.random() * (boardH - PIECE_H - PADDING * 2)
        next[id] = { ...next[id], x: randX, y: randY, isLocked: false }
      })
      return next
    })
    setIsScattered(true)
    setJustSolved(false)
  }, [boardW, boardH])

  const solve = useCallback(() => {
    setPieces((prev) => {
      const next = { ...prev }
      Object.keys(next).forEach((id) => {
        next[id] = { ...next[id], x: next[id].correctX, y: next[id].correctY, isLocked: false }
      })
      return next
    })
    setIsScattered(false)
  }, [])

  const allLocked = useMemo(() => {
    return Object.values(pieces).every((p) => p.isLocked)
  }, [pieces])

  useEffect(() => {
    if (allLocked && isScattered) {
      setJustSolved(true)
      setIsScattered(false)
      const timeout = setTimeout(() => setJustSolved(false), 2500)
      return () => clearTimeout(timeout)
    }
  }, [allLocked, isScattered])

  // ─── Pointer drag handlers (offset-correct) ──────────────────

  const handlePointerDown = useCallback((id: string, e: React.PointerEvent) => {
    const boardRect = boardRef.current?.getBoundingClientRect()
    if (!boardRect) return
    const piece = pieces[id]
    if (!piece || piece.isLocked) return

    // Calculate the offset: cursor position minus piece's current top-left
    // piece.x/y is the position of the piece content area, but the visual element
    // is offset by -PADDING, so the visual top-left is at (piece.x - PADDING, piece.y - PADDING)
    const pieceVisualLeft = piece.x - PADDING
    const pieceVisualTop = piece.y - PADDING
    const cursorInBoard = {
      x: e.clientX - boardRect.left,
      y: e.clientY - boardRect.top,
    }
    dragOffsetRef.current = {
      x: cursorInBoard.x - pieceVisualLeft,
      y: cursorInBoard.y - pieceVisualTop,
    }

    draggingRef.current = id
    setDraggingId(id)
      ; (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pieces])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const id = draggingRef.current
    if (!id) return
    const boardRect = boardRef.current?.getBoundingClientRect()
    if (!boardRect) return

    const cursorInBoard = {
      x: e.clientX - boardRect.left,
      y: e.clientY - boardRect.top,
    }

    // New visual top-left = cursor - offset
    const newVisualX = cursorInBoard.x - dragOffsetRef.current.x
    const newVisualY = cursorInBoard.y - dragOffsetRef.current.y

    // Convert visual position back to piece x/y (add PADDING back)
    const newX = newVisualX + PADDING
    const newY = newVisualY + PADDING

    setPieces((prev) => ({
      ...prev,
      [id]: { ...prev[id], x: newX, y: newY },
    }))
  }, [])

  const handlePointerUp = useCallback(() => {
    const id = draggingRef.current
    if (!id) return
    draggingRef.current = null
    setDraggingId(null)

    setPieces((prev) => {
      const piece = prev[id]
      const dx = Math.abs(piece.x - piece.correctX)
      const dy = Math.abs(piece.y - piece.correctY)

      if (dx < SNAP_THRESHOLD && dy < SNAP_THRESHOLD) {
        return {
          ...prev,
          [id]: { ...piece, x: piece.correctX, y: piece.correctY, isLocked: true },
        }
      }
      return prev
    })
  }, [])

  const accentRgb = hexToRgb(accentColor)

  const boardBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.03)"
  const boardBorder = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)"
  const boardShadow = `0 8px 32px rgba(0,0,0,${isDark ? 0.4 : 0.08}), 0 0 20px rgba(${accentRgb.r},${accentRgb.g},${accentRgb.b},0.04), inset 0 1px 0 rgba(255,255,255,${isDark ? 0.08 : 0.3})`

  return (
    <div className="flex flex-col items-center gap-6">
      <div
        ref={boardRef}
        className="relative rounded-2xl overflow-hidden touch-none touch-allow-all"
        style={{
          width: boardW,
          height: boardH,
          maxWidth: "100%",
          background: boardBg,
          border: `1px solid ${boardBorder}`,
          backdropFilter: "blur(32px)",
          WebkitBackdropFilter: "blur(32px)",
          boxShadow: boardShadow,
        }}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Ghost slots */}
        {isScattered && skillList.map((s) => {
          const correct = getCorrectPositions()[s.id]
          return (
            <div
              key={`ghost-${s.id}`}
              className="absolute rounded-md border border-dashed pointer-events-none"
              style={{
                left: correct.x,
                top: correct.y,
                width: PIECE_W,
                height: PIECE_H,
                borderColor: `rgba(${accentRgb.r},${accentRgb.g},${accentRgb.b},0.15)`,
              }}
            />
          )
        })}

        {/* Puzzle pieces */}
        {skillList.map((s) => {
          const st = pieces[s.id]
          if (!st) return null
          const svgW = PIECE_W + PADDING * 2
          const svgH = PIECE_H + PADDING * 2
          const isThisDragging = draggingId === s.id

          return (
            <div
              key={s.id}
              className={cn(
                "absolute touch-none select-none",
                st.isLocked ? "cursor-default" : "cursor-grab active:cursor-grabbing",
                isThisDragging && "z-50"
              )}
              style={{
                left: st.x - PADDING,
                top: st.y - PADDING,
                width: svgW,
                height: svgH,
                transition: isThisDragging ? "none" : "left 0.3s ease, top 0.3s ease",
              }}
              onPointerDown={(e) => handlePointerDown(s.id, e)}
            >
              <JigsawPiece
                piece={s}
                state={st}
                edgeData={edgeMap[s.id]}
                isDragging={isThisDragging}
                accentColor={accentColor}
                isDark={isDark}
              />
            </div>
          )
        })}

        {/* Solved overlay */}
        <AnimatePresence>
          {justSolved && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center z-[60] pointer-events-none"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.2, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="rounded-2xl px-8 py-4 flex flex-col items-center gap-2"
                style={{
                  background: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.06)",
                  border: `1px solid ${isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.08)"}`,
                  backdropFilter: "blur(32px)",
                  WebkitBackdropFilter: "blur(32px)",
                  boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 30px rgba(${accentRgb.r},${accentRgb.g},${accentRgb.b},0.15), inset 0 1px 0 rgba(255,255,255,0.1)`,
                }}
              >
                <div className="rounded-full p-3">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <span className="font-bold text-lg tracking-wide" style={{ color: accentColor }}>
                  <AnimatedText text={t.solved} />
                </span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scatter / Collect button */}
      <motion.button
        onClick={isScattered ? solve : scatter}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.97 }}
        className="rounded-lg px-6 py-3 flex items-center gap-3 text-sm font-medium tracking-wide transition-all duration-300"
        style={{
          background: isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.05)",
          border: `1px solid rgba(${accentRgb.r},${accentRgb.g},${accentRgb.b},0.25)`,
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          boxShadow: `0 0 20px rgba(${accentRgb.r},${accentRgb.g},${accentRgb.b},0.08), inset 0 1px 0 rgba(255,255,255,${isDark ? 0.08 : 0.3})`,
        }}
      >
        {isScattered ? (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12h7l-3-3m0 6l3-3" />
              <path d="M21 12h-7l3-3m0 6l-3-3" />
            </svg>
            <span><AnimatedText text={t.collect} /></span>
          </>
        ) : (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 3h5v5" />
              <path d="M8 3H3v5" />
              <path d="M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3" />
              <path d="m15 9 6-6" />
            </svg>
            <span><AnimatedText text={t.scatter} /></span>
          </>
        )}
      </motion.button>
    </div>
  )
}

// ─── Main Skills Section ─────────────────────────────────────────

const TABS: TabKey[] = ["development", "design", "cyber"]

const SKILL_MAP: Record<TabKey, SkillPiece[]> = {
  development: skills.development,
  design: skills.design,
  cyber: skills.cyber,
}

export function SkillsSection() {
  const [activeTab, setActiveTab] = useState<TabKey>("development")
  const { theme, t } = useSettings()
  const isDark = theme === "dark"
  const accent = tabAccents[activeTab]
  const accentRgb = hexToRgb(accent)

  const tabLabels: Record<TabKey, string> = {
    development: t.development,
    design: t.design,
    cyber: t.cyberSecurity,
  }

  const glassBg = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.05)"
  const glassBorder = isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.08)"
  const glassShadow = isDark
    ? "0 0 20px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.08)"
    : "0 0 20px rgba(0,0,0,0.03), inset 0 1px 0 rgba(255,255,255,0.4)"

  return (
    <section
      id="skills"
      className="scroll-snap-section flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-24 py-10 relative overflow-hidden"
    >
      {/* Ambient light */}
      <motion.div
        key={activeTab}
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -80, 60, 0],
          opacity: [0.04, 0.08, 0.04],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none"
        style={{ backgroundColor: `rgba(${accentRgb.r},${accentRgb.g},${accentRgb.b},0.08)` }}
      />

      <div className="max-w-4xl w-full flex flex-col items-center gap-8 relative z-10">
        {/* 3-tab segmented toggle (no title above it) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-full p-1 flex"
          style={{
            background: glassBg,
            border: `1px solid ${glassBorder}`,
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            boxShadow: glassShadow,
          }}
        >
          {TABS.map((tab) => {
            const tabAccent = tabAccents[tab]
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  activeTab === tab
                    ? "text-black"
                    : isDark ? "text-white/50 hover:text-white/80" : "text-black/40 hover:text-black/70"
                )}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="skillsActiveTab"
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: tabAccent }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10"><AnimatedText text={tabLabels[tab]} /></span>
              </button>
            )
          })}
        </motion.div>

        {/* Puzzle boards */}
        <div className="w-full flex justify-center overflow-x-auto scrollbar-hide">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <PuzzleBoard skillList={SKILL_MAP[activeTab]} boardKey={activeTab} accentColor={accent} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
