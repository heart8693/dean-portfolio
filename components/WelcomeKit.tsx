'use client'

// WelcomeKit v5 — the personality layer for the home hero.
// Locked skin (black/white + cobalt, IBM Plex, motion charter easing).
//
// v4: ToolDock themed with site tokens (light/dark follows the site),
// dev segment trimmed to draw/measure/code. Every button acts
// on the hero. Comment pin + stray rectangle live in <HeroOverlays />.
//
// INSTALL
// 1. This file → components/WelcomeKit.tsx (replace)
// 2. app/page.tsx: data-wk hooks + <HeroOverlays /> (delivered page.tsx has them)
// 3. Replace the welcome-kit-extras block in globals.css with the new one

import { useEffect, useRef, useState } from 'react'

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

/* ── 1) CursorTag: visitor's name flag (ink black; cobalt belongs to Dean).
       Hidden on touch devices via .wk-cursor-tag CSS. ── */
export function CursorTag({ label = 'you 👋' }: { label?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const parent = el.parentElement
    if (!parent) return
    let raf = 0
    let tx = 0, ty = 0, cx = 0, cy = 0
    const onMove = (e: MouseEvent) => {
      const r = parent.getBoundingClientRect()
      tx = e.clientX - r.left + 18
      ty = e.clientY - r.top + 14
      setVisible(true)
    }
    const onLeave = () => setVisible(false)
    const tick = () => {
      cx += (tx - cx) * 0.18
      cy += (ty - cy) * 0.18
      el.style.transform = `translate(${cx}px, ${cy}px)`
      raf = requestAnimationFrame(tick)
    }
    parent.addEventListener('mousemove', onMove)
    parent.addEventListener('mouseleave', onLeave)
    raf = requestAnimationFrame(tick)
    return () => {
      parent.removeEventListener('mousemove', onMove)
      parent.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      className="wk-cursor-tag"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 30,
        opacity: visible ? 1 : 0,
        transition: `opacity 300ms ${EASE}`,
      }}
    >
      <span
        style={{
          display: 'inline-block',
          padding: '4px 10px',
          background: 'var(--ink, #0F1115)',
          color: 'var(--bg, #fff)',
          fontSize: '12px',
          fontWeight: 600,
          borderRadius: '4px 12px 12px 12px',
          whiteSpace: 'nowrap',
          boxShadow: '0 2px 8px rgba(10,10,12,0.18)',
        }}
      >
        {label}
      </span>
    </div>
  )
}

/* ── 2) ToolDock v3: Figma UI3 toolbar, every button acts. ── */

type ToolDef = {
  key: string
  shortcut: string
  icon: JSX.Element
  onMsg: string
  offMsg: string
  apply: (on: boolean) => void
  chevron?: boolean
}

const toggleOn = (selector: string, cls: string, on: boolean) => {
  document.querySelector(selector)?.classList.toggle(cls, on)
}

/* Pen tool: toggle. Click draws a hand-drawn cobalt loop around
   "Dean!" in the h1 (see .wk-loop in globals); click again and the
   loop retracts the way it was drawn. */
const applyPen = (on: boolean) => {
  document.body.classList.toggle('wk-pen', on)
}

const MAIN_TOOLS: ToolDef[] = [
  {
    key: 'move',
    shortcut: 'V',
    chevron: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M4.6 2.6l9.4 6.5c.5.4.3 1.1-.3 1.2l-4 .8-1.8 3.9c-.3.6-1.1.5-1.2-.1L4 3.3c-.1-.5.3-.9.6-.7z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
    onMsg: 'Moved 4 layers.',
    offMsg: 'Undo. Everything back.',
    apply: on => document.body.classList.toggle('wk-shuffle', on),
  },
  {
    key: 'frame',
    shortcut: 'F',
    chevron: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M5.5 2v14M12.5 2v14M2 5.5h14M2 12.5h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    onMsg: 'Frame 1 selected.',
    offMsg: 'Deselected.',
    apply: on => toggleOn('[data-wk="h1"]', 'wk-framed', on),
  },
  {
    key: 'rect',
    shortcut: 'R',
    chevron: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="3" y="3" width="12" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    onMsg: 'Rectangle 1 drawn.',
    offMsg: 'Rectangle deleted.',
    apply: on => document.body.classList.toggle('wk-rect', on),
  },
  {
    key: 'pen',
    shortcut: 'P',
    chevron: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M10.8 2.6l4.6 4.6-6.7 6.7-5.4 1.8 1.8-5.4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="8.6" cy="9.4" r="1.2" fill="currentColor" />
      </svg>
    ),
    onMsg: 'Circled the important part.',
    offMsg: 'Uncircled.',
    apply: applyPen,
  },
  {
    key: 'text',
    shortcut: 'T',
    chevron: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M3.5 5V3.5h11V5M9 3.5v11M7 14.5h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    onMsg: 'Editing the headline.',
    offMsg: 'Done editing.',
    apply: on => toggleOn('[data-wk="h1"]', 'wk-editing', on),
  },
  {
    key: 'comment',
    shortcut: 'C',
    chevron: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 15.5A6.5 6.5 0 1 1 15.5 9v6.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    onMsg: '1 comment from Dean.',
    offMsg: 'Comment resolved.',
    apply: on => document.body.classList.toggle('wk-commented', on),
  },
]

const DEV_TOOLS: ToolDef[] = [
  {
    key: 'draw',
    shortcut: 'Shift+P',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M2.5 11c1.8-5 4.2-5 6 0s4.2 5 6 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    onMsg: 'Marked up the headline.',
    offMsg: 'Markup cleared.',
    apply: applyPen,
  },
  {
    key: 'measure',
    shortcut: 'M',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M4 3v12M4 9h9.5M11 6.5L13.5 9 11 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    onMsg: 'Measuring with Sift tokens.',
    offMsg: 'Guides hidden.',
    apply: on => document.body.classList.toggle('wk-measure', on),
  },
  {
    key: 'code',
    shortcut: 'D',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M6.5 6L3.5 9l3 3M11.5 6l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    onMsg: 'Inspecting tokens.',
    offMsg: 'Inspect off.',
    apply: on => document.body.classList.toggle('wk-code', on),
  },
]

const BODY_CLASSES = ['wk-shuffle', 'wk-rect', 'wk-commented', 'wk-measure', 'wk-code', 'wk-pen']

export function ToolDock() {
  const [activeKeys, setActiveKeys] = useState<Record<string, boolean>>({})
  const [status, setStatus] = useState<string | null>(null)

  useEffect(() => {
    return () => {
      document.body.classList.remove(...BODY_CLASSES)
      document.querySelector('[data-wk="h1"]')?.classList.remove('wk-framed', 'wk-editing')
    }
  }, [])

  const onTool = (t: ToolDef) => {
    const next = !activeKeys[t.key]
    setActiveKeys(prev => ({ ...prev, [t.key]: next }))
    t.apply(next)
    setStatus(next ? t.onMsg : t.offMsg)
  }

  const clearAll = () => {
    ;[...MAIN_TOOLS, ...DEV_TOOLS].forEach(t => t.apply(false))
    document.body.classList.remove(...BODY_CLASSES)
    setActiveKeys({})
    setStatus('Cleared the canvas.')
  }

  const renderTool = (t: ToolDef) => (
    <span key={t.key} className="wk-toolwrap" style={{ display: 'inline-flex', alignItems: 'center' }}>
      <button
        onClick={() => onTool(t)}
        aria-label={`${t.key} tool`}
        aria-pressed={!!activeKeys[t.key]}
        title={`${t.key} (${t.shortcut})`}
        className={`wk-tool${activeKeys[t.key] ? ' wk-tool-on' : ''}`}
      >
        {t.icon}
      </button>
      {t.chevron && (
        <span className="wk-chev" aria-hidden>
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path d="M2 3l2 2 2-2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
    </span>
  )

  return (
    <div style={{ position: 'relative', display: 'inline-block', marginTop: '40px' }}>
      <div className="wk-dock">
        {MAIN_TOOLS.map(renderTool)}

        <button
          onClick={clearAll}
          aria-label="undo all changes"
          title="Undo all (⌘Z)"
          className="wk-tool"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M5.8 3.6L2.8 6.6l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2.8 6.6h7.4a4.4 4.4 0 0 1 0 8.8H7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <span className="wk-divider" aria-hidden />

        <span className="wk-devseg">
          {DEV_TOOLS.map(renderTool)}
        </span>
      </div>

      {status && (
        <div
          key={status}
          className="wk-status"
          aria-live="polite"
          style={{
            position: 'absolute',
            left: '50%',
            top: 'calc(100% + 10px)',
            transform: 'translateX(-50%)',
            whiteSpace: 'nowrap',
            fontSize: '13px',
            fontWeight: 500,
            color: 'var(--ink-2, #4A5160)',
            zIndex: 20,
          }}
        >
          {status}
        </div>
      )}

      <div className="wk-tokens" aria-hidden>
        IBM Plex · cobalt #2055E6 · 8pt grid
      </div>
    </div>
  )
}

/* ── 3) HeroOverlays: Dean's comment pin + the stray rectangle.
       Mount once inside the hero; the tools toggle visibility. ── */
export function HeroOverlays() {
  return (
    <>
      <div aria-hidden className="wk-pin">
        <span className="wk-pin-avatar">D</span>
        <span className="wk-pin-note">Feedback lives here. Be kind, or be specific.</span>
      </div>
      <div aria-hidden className="wk-stray" />
    </>
  )
}

/* ── 4) StickerField ── */
const STICKERS: { src: string; top: string; left?: string; right?: string; size: number; rot: number; delay: number }[] = [
  { src: '/stickers/dean-wave.png', top: '17%', left: '7%', size: 128, rot: -8, delay: 0 },
  { src: '/stickers/cats.png', top: '15%', right: '6%', size: 144, rot: 5, delay: 80 },
  { src: '/stickers/coffee.png', top: '50%', left: '5%', size: 84, rot: -6, delay: 160 },
  { src: '/stickers/sparkle.png', top: '47%', right: '10%', size: 58, rot: 12, delay: 240 },
]

// Parked for a later pass (footer placement):
//   { src: '/stickers/paw.png', size: 74, rot: -10 }
//   { src: '/stickers/dean-thumbsup.png', size: 122, rot: 6 }

export function StickerField() {
  return (
    <div aria-hidden className="wk-stickers" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {STICKERS.map(s => (
        <span
          key={s.src}
          className="wk-stickerwrap"
          style={{
            position: 'absolute',
            display: 'block',
            top: s.top,
            ...(s.left ? { left: s.left } : {}),
            ...(s.right ? { right: s.right } : {}),
            width: s.size,
            ['--rot' as string]: `${s.rot}deg`,
          }}
        >
          <img
            src={s.src}
            alt=""
            className="wk-sticker"
            style={{ width: '100%', pointerEvents: 'auto', animationDelay: `${s.delay}ms` }}
          />
        </span>
      ))}
    </div>
  )
}

/* ── 5) Keycap ── */
export function Keycap({ children }: { children: React.ReactNode }) {
  return (
    <kbd
      style={{
        display: 'inline-grid',
        placeItems: 'center',
        minWidth: '26px',
        height: '26px',
        padding: '0 7px',
        margin: '0 2px',
        background: 'var(--surface, #F5F5F7)',
        border: '1px solid var(--hairline, #E6E8EC)',
        borderBottomWidth: '2.5px',
        borderRadius: '7px',
        fontFamily: 'inherit',
        fontSize: '13px',
        fontWeight: 600,
        color: 'var(--ink, #111113)',
        verticalAlign: 'middle',
      }}
    >
      {children}
    </kbd>
  )
}
