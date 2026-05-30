'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Nav() {
  const pathname = usePathname()
  const [dark, setDark] = useState(false)
  const [mounted, setMounted] = useState(false)

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
    fontSize: '13px',
    fontWeight: 400 as const,
    color: 'var(--text-2)',
    transition: 'color 0.15s ease',
    textDecoration: 'none',
  }

  return (
    <header style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 50,
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 40px',
      background: 'var(--bg)',
      borderBottom: '1px solid var(--border)',
      transition: 'background 0.25s ease, border-color 0.25s ease',
    }}>
      <Link href="/" style={{
        fontFamily: 'var(--font-sans)',
        fontWeight: 600,
        fontSize: '1rem',
        color: 'var(--text-1)',
        letterSpacing: '-0.01em',
        textDecoration: 'none',
      }}>
        Dean Yoo
      </Link>

      <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        <Link href="/#work" style={linkStyle}>Projects</Link>

        <a
          href="/Dean_Yoo_Resume.pdf"
          download="Dean_Yoo_Resume.pdf"
          style={linkStyle}
        >
          Resume
        </a>

        <Link
          href="/about"
          style={{
            ...linkStyle,
            color: pathname === '/about' ? 'var(--text-1)' : 'var(--text-2)',
          }}
        >
          About
        </Link>

        {mounted && (
          <button
            onClick={toggle}
            aria-label="Toggle dark mode"
            style={{
              width: '40px',
              height: '20px',
              borderRadius: '10px',
              border: '1px solid var(--border)',
              background: dark ? '#333' : 'var(--surface)',
              cursor: 'pointer',
              position: 'relative',
              transition: 'background 0.25s ease',
              flexShrink: 0,
            }}
          >
            <span style={{
              position: 'absolute',
              top: '2px',
              left: dark ? '20px' : '2px',
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              background: dark ? '#ddd' : '#999',
              transition: 'left 0.2s cubic-bezier(0.16,1,0.3,1)',
            }} />
          </button>
        )}
      </nav>
    </header>
  )
}
