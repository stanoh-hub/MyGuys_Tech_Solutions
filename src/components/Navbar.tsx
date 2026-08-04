import { useState, useEffect } from 'react'
import logoImg from '@/imports/developers_logo.png'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Products', href: '#products' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
]

interface NavbarProps {
  darkMode: boolean
  toggleDark: () => void
}

export default function Navbar({ darkMode, toggleDark }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href: string) => {
    setActive(href)
    setOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'all 0.3s ease',
        background: scrolled
          ? darkMode
            ? 'rgba(10,15,30,0.95)'
            : 'rgba(255,255,255,0.95)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled
          ? `1px solid ${darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`
          : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.08)' : 'none',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
          {/* Logo */}
          <button
            onClick={() => handleNav('#home')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <img src={logoImg} alt="MyGuys Tech Solutions" style={{ height: 48, width: 'auto', objectFit: 'contain' }} />
          </button>

          {/* Desktop Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, listStyle: 'none' }} className="hidden-mobile">
            {navLinks.map(link => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px 14px',
                  borderRadius: 8,
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 500,
                  fontSize: 14,
                  color: active === link.href
                    ? '#2563EB'
                    : darkMode ? '#CBD5E1' : '#334155',
                  backgroundColor: active === link.href
                    ? darkMode ? 'rgba(37,99,235,0.12)' : 'rgba(37,99,235,0.08)'
                    : 'transparent',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  if (active !== link.href) {
                    ;(e.currentTarget as HTMLButtonElement).style.color = '#2563EB'
                    ;(e.currentTarget as HTMLButtonElement).style.backgroundColor = darkMode
                      ? 'rgba(37,99,235,0.08)'
                      : 'rgba(37,99,235,0.05)'
                  }
                }}
                onMouseLeave={e => {
                  if (active !== link.href) {
                    ;(e.currentTarget as HTMLButtonElement).style.color = darkMode ? '#CBD5E1' : '#334155'
                    ;(e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'
                  }
                }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDark}
              style={{
                background: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                border: 'none',
                borderRadius: 8,
                padding: '8px 10px',
                cursor: 'pointer',
                fontSize: 18,
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>

            {/* CTA */}
            <button
              onClick={() => handleNav('#contact')}
              className="btn-primary hidden-mobile"
              style={{ padding: '9px 20px', fontSize: 13 }}
            >
              Get Free Consultation
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="show-mobile"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 4,
                color: darkMode ? '#F1F5F9' : '#0F172A',
              }}
              aria-label="Toggle menu"
            >
              <div style={{ width: 24, height: 18, position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <span style={{ display: 'block', height: 2, background: 'currentColor', borderRadius: 2, transition: 'all 0.3s', transform: open ? 'rotate(45deg) translateY(8px)' : 'none' }} />
                <span style={{ display: 'block', height: 2, background: 'currentColor', borderRadius: 2, transition: 'all 0.3s', opacity: open ? 0 : 1 }} />
                <span style={{ display: 'block', height: 2, background: 'currentColor', borderRadius: 2, transition: 'all 0.3s', transform: open ? 'rotate(-45deg) translateY(-8px)' : 'none' }} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          style={{
            background: darkMode ? 'rgba(10,15,30,0.98)' : 'rgba(255,255,255,0.98)',
            backdropFilter: 'blur(16px)',
            padding: '16px 24px 24px',
            borderTop: `1px solid ${darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
          }}
        >
          {navLinks.map(link => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '12px 16px',
                borderRadius: 8,
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 500,
                fontSize: 15,
                color: active === link.href ? '#2563EB' : darkMode ? '#CBD5E1' : '#334155',
                backgroundColor: active === link.href
                  ? darkMode ? 'rgba(37,99,235,0.12)' : 'rgba(37,99,235,0.08)'
                  : 'transparent',
                marginBottom: 4,
              }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNav('#contact')}
            className="btn-primary"
            style={{ width: '100%', marginTop: 12, justifyContent: 'center' }}
          >
            Get Free Consultation
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
      `}</style>
    </nav>
  )
}
