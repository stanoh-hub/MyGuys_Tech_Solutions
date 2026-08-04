import { useEffect, useRef, useState } from 'react'

interface HeroProps {
  darkMode: boolean
}

function useCounter(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [start, target, duration])
  return count
}

const stats = [
  { label: 'Projects Completed', value: 50, suffix: '+' },
  { label: 'Happy Clients', value: 30, suffix: '+' },
  { label: 'Years Experience', value: 5, suffix: '+' },
  { label: 'Satisfaction Rate', value: 98, suffix: '%' },
  { label: 'Support', value: 24, suffix: '/7' },
]

export default function Hero({ darkMode: _darkMode }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [countersStarted, setCountersStarted] = useState(false)
  const counts = [
    useCounter(stats[0].value, 2000, countersStarted),
    useCounter(stats[1].value, 2200, countersStarted),
    useCounter(stats[2].value, 1800, countersStarted),
    useCounter(stats[3].value, 2400, countersStarted),
    useCounter(stats[4].value, 1600, countersStarted),
  ]

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const particles: Array<{ x: number; y: number; vx: number; vy: number; r: number; alpha: number }> = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.2,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(96, 165, 250, ${p.alpha})`
        ctx.fill()
      })

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(96,165,250,${0.15 * (1 - dist / 100)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })
      animId = requestAnimationFrame(draw)
    }
    draw()

    // Start counters after delay
    setTimeout(() => setCountersStarted(true), 600)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0A0F1E 0%, #0F2150 35%, #0A1628 65%, #0A0F1E 100%)',
        overflow: 'hidden',
        paddingTop: 80,
      }}
    >
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />

      {/* Radial glow */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 700,
          height: 700,
          background: 'radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '60%',
          right: '10%',
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Hero Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          padding: '0 16px',
          maxWidth: 900,
          width: '100%',
          margin: '0 auto',
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(37,99,235,0.2)',
            border: '1px solid rgba(37,99,235,0.4)',
            borderRadius: 100,
            padding: '6px 18px',
            marginBottom: 28,
            animation: 'fadeInUp 0.5s ease forwards',
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', display: 'inline-block', boxShadow: '0 0 8px #10B981' }} />
          <span style={{ color: '#93C5FD', fontSize: 13, fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
            Kenya's Premier Tech Partner
          </span>
        </div>

        <h1
          style={{
            fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 800,
            color: '#FFFFFF',
            lineHeight: 1.1,
            marginBottom: 20,
            animation: 'fadeInUp 0.6s ease 0.1s both',
          }}
        >
          Building Africa's
          <br />
          <span className="gradient-text">Digital Future</span>
        </h1>

        <p
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            color: '#94A3B8',
            lineHeight: 1.8,
            maxWidth: 680,
            margin: '0 auto 40px',
            animation: 'fadeInUp 0.6s ease 0.2s both',
          }}
        >
          We build websites, software systems, mobile applications, cybersecurity
          solutions, AI-powered platforms, and digital experiences that help
          businesses grow across Africa and beyond.
        </p>

        <div
          style={{
            display: 'flex',
            gap: 14,
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: 64,
            animation: 'fadeInUp 0.6s ease 0.3s both',
          }}
        >
          <button className="btn-primary" onClick={() => scrollTo('#contact')}>
            <span>🚀</span> Get Free Consultation
          </button>
          <button className="btn-outline" onClick={() => scrollTo('#portfolio')}>
            <span>👁</span> View Portfolio
          </button>
          <button
            onClick={() => scrollTo('#pricing')}
            style={{
              background: 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(245,158,11,0.1))',
              border: '1px solid rgba(245,158,11,0.5)',
              color: '#FCD34D',
              padding: '12px 24px',
              borderRadius: 10,
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 600,
              fontSize: 14,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span>💰</span> Request Quote
          </button>
        </div>

        {/* Stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: 16,
            maxWidth: 800,
            margin: '0 auto',
            animation: 'fadeInUp 0.6s ease 0.4s both',
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="glass"
              style={{
                borderRadius: 14,
                padding: '20px 16px',
                textAlign: 'center',
                transition: 'transform 0.3s ease',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)')}
              onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)')}
            >
              <div
                style={{
                  fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #60A5FA, #06B6D4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {counts[i]}
                {stat.suffix}
              </div>
              <div style={{ color: '#94A3B8', fontSize: 11, fontFamily: 'Poppins, sans-serif', fontWeight: 500, marginTop: 4 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          animation: 'float 2s ease-in-out infinite',
          cursor: 'pointer',
        }}
        onClick={() => scrollTo('#about')}
      >
        <span style={{ color: '#64748B', fontSize: 11, fontFamily: 'Poppins, sans-serif', letterSpacing: 2, textTransform: 'uppercase' }}>
          Scroll
        </span>
        <div style={{ width: 24, height: 40, border: '2px solid rgba(100,116,139,0.5)', borderRadius: 12, display: 'flex', justifyContent: 'center', padding: 4 }}>
          <div
            style={{
              width: 4,
              height: 8,
              background: '#2563EB',
              borderRadius: 2,
              animation: 'float 1.5s ease-in-out infinite',
            }}
          />
        </div>
      </div>
    </section>
  )
}
