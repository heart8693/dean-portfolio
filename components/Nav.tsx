'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Nav() {
  const pathname = usePathname()
  const [dark, setDark] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('theme')
    if (saved === 'dark') {
      setDark(true)
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  // Body scroll lock + ESC key when menu open
  useEffect(() => {
    if (!menuOpen) return
    document.body.style.overflow = 'hidden'
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', handleEsc)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEsc)
    }
  }, [menuOpen])

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  function toggle() {
    const next = !dark
    setDark(next)
    if (next) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  const linkStyle = {
    fontSize: '15px',
    fontWeight: 500 as const,
    color: 'inherit',
    transition: 'color 0.15s ease',
    textDecoration: 'none',
    lineHeight: 1.4,
    fontFamily: 'inherit',
  }

  const mobileLinkStyle = {
    fontSize: '40px',
    fontWeight: 400 as const,
    color: 'inherit',
    transition: 'color 0.15s ease',
    textDecoration: 'none',
    letterSpacing: '-0.005em',
    lineHeight: 0.95,
    textTransform: 'uppercase' as const,
    fontFamily: "var(--font-anton), 'Helvetica Neue Condensed', sans-serif",
  }

  return (
    <>
      <header className="nav-header tj-nav-chrome" style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 50,
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
        transition: 'background 0.25s ease, border-color 0.25s ease',
      }}>
        <Link href="/" style={{
          fontWeight: 700,
          fontSize: '17px',
          color: 'inherit',
          letterSpacing: '0.01em',
          textDecoration: 'none',
          fontFamily: 'inherit',
        }}>
          DEAN YOO
        </Link>

        {/* Desktop nav — Nike chrome, flat type-driven.
            All three links share the same 2px bottom rail (transparent
            by default) so baselines stay aligned regardless of active state. */}
        <nav className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <Link
            href="/#work"
            style={{
              ...linkStyle,
              borderBottom: '2px solid transparent',
              paddingBottom: '2px',
            }}
          >
            Projects
          </Link>
          <a
            href="/Dean_Yoo_Resume.pdf"
            download="Dean_Yoo_Resume.pdf"
            style={{
              ...linkStyle,
              borderBottom: '2px solid transparent',
              paddingBottom: '2px',
            }}
          >
            Resume
          </a>
          <Link
            href="/about"
            style={{
              ...linkStyle,
              borderBottom: pathname === '/about' ? '2px solid currentColor' : '2px solid transparent',
              paddingBottom: '2px',
            }}
          >
            About
          </Link>
          {mounted && (
            <button
              onClick={toggle}
              aria-label="Toggle dark mode"
              style={{
                width: '44px',
                height: '20px',
                borderRadius: 0,
                border: '1.5px solid currentColor',
                background: 'transparent',
                cursor: 'pointer',
                position: 'relative',
                transition: 'background 0.2s ease',
                flexShrink: 0,
              }}
            >
              <span style={{
                position: 'absolute',
                top: '2px',
                left: dark ? '22px' : '2px',
                width: '17px',
                height: '13px',
                borderRadius: 0,
                background: 'currentColor',
                transition: 'left 0.18s cubic-bezier(0.4,0,0.2,1)',
              }} />
            </button>
          )}
          <a
            href="mailto:hyart2021@gmail.com"
            className="tj-cta-block tj-cta-block--mono"
            style={{ padding: '12px 20px', fontSize: '13px', height: '40px' }}
          >
            Contact
          </a>
        </nav>

        {/* Hamburger — shown only on mobile via CSS */}
        <button
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          className="nav-hamburger"
          style={{
            background: 'transparent',
            border: 'none',
            padding: '8px',
            cursor: 'pointer',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden="true">
            <line x1="0" y1="1" x2="22" y2="1" stroke="var(--text-1)" strokeWidth="2" strokeLinecap="round" />
            <line x1="0" y1="8" x2="22" y2="8" stroke="var(--text-1)" strokeWidth="2" strokeLinecap="round" />
            <line x1="0" y1="15" x2="22" y2="15" stroke="var(--text-1)" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </header>

      {/* Mobile overlay menu */}
      {menuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="tj-nav-chrome"
          onClick={(e) => {
            if (e.target === e.currentTarget) setMenuOpen(false)
          }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            borderBottom: 'none',
            animation: 'navFadeIn 0.2s ease',
          }}
        >
          {/* Top bar inside overlay — mirrors the main header */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
          }}>
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              style={{
                fontWeight: 700,
                fontSize: '17px',
                color: 'inherit',
                letterSpacing: '0.01em',
                textDecoration: 'none',
                fontFamily: 'inherit',
              }}
            >
              DEAN YOO
            </Link>

            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              style={{
                background: 'transparent',
                border: 'none',
                padding: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'inherit',
              }}
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <line x1="3" y1="3" x2="19" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="19" y1="3" x2="3" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Menu items — vertically centered */}
          <nav style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '32px',
            textAlign: 'center',
          }}>
            <Link href="/#work" onClick={() => setMenuOpen(false)} style={mobileLinkStyle}>
              Projects
            </Link>
            <a
              href="/Dean_Yoo_Resume.pdf"
              download="Dean_Yoo_Resume.pdf"
              onClick={() => setMenuOpen(false)}
              style={mobileLinkStyle}
            >
              Resume
            </a>
            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              style={{
                ...mobileLinkStyle,
                borderBottom: pathname === '/about' ? '3px solid currentColor' : '3px solid transparent',
                paddingBottom: '2px',
              }}
            >
              About
            </Link>
            <a
              href="mailto:hyart2021@gmail.com"
              onClick={() => setMenuOpen(false)}
              className="tj-cta-block tj-cta-block--mono"
              style={{ marginTop: '16px' }}
            >
              Contact
            </a>

            {mounted && (
              <button
                onClick={toggle}
                aria-label="Toggle dark mode"
                style={{
                  marginTop: '32px',
                  width: '60px',
                  height: '26px',
                  borderRadius: 0,
                  border: '1.5px solid currentColor',
                  background: 'transparent',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'background 0.25s ease',
                }}
              >
                <span style={{
                  position: 'absolute',
                  top: '3px',
                  left: dark ? '32px' : '3px',
                  width: '23px',
                  height: '17px',
                  borderRadius: 0,
                  background: 'currentColor',
                  transition: 'left 0.18s cubic-bezier(0.4,0,0.2,1)',
                }} />
              </button>
            )}
          </nav>
        </div>
      )}

      <style>{`
        @keyframes navFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        /* Default (desktop): show desktop nav, hide hamburger */
        .nav-desktop { display: flex; }
        .nav-hamburger { display: none; }
        
        /* Mobile (≤720px): swap */
        @media (max-width: 720px) {
          .nav-header { padding: 0 24px !important; }
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  )
}