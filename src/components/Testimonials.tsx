import { useEffect, useRef, useState } from 'react'

const testimonials = [
  {
    name: 'James Kamau',
    role: 'Director, Pamoja Driving School',
    avatar: 'JK',
    color: '#2563EB',
    rating: 5,
    text: "MyGuys Tech Solutions transformed our entire operations. The management system they built handles everything — student registrations, M-Pesa payments, scheduling. It cut our admin work by 70%. Absolutely brilliant team!",
  },
  {
    name: 'Dr. Amina Odhiambo',
    role: 'CEO, HealthLink Kenya',
    avatar: 'AO',
    color: '#10B981',
    rating: 5,
    text: "The Medify system they developed for us is outstanding. It's already helped us flag counterfeit drugs at three pharmacies. Their technical expertise and understanding of healthcare needs is exceptional.",
  },
  {
    name: 'Grace Wanjiku',
    role: 'Owner, The Royals Salon',
    avatar: 'GW',
    color: '#EC4899',
    rating: 5,
    text: "Our salon website now attracts clients from across Nairobi. Professional, elegant, and exactly what we envisioned. The team was patient and delivered beyond our expectations at a very fair price.",
  },
  {
    name: 'Peter Mwangi',
    role: 'IT Manager, Fahari SACCO',
    avatar: 'PM',
    color: '#F59E0B',
    rating: 5,
    text: "The SACCO system they built is robust and secure. Member management, loan tracking, and M-Pesa integration all work flawlessly. I highly recommend MyGuys Tech for any financial software project.",
  },
  {
    name: 'Sarah Njeri',
    role: 'Executive Director, Hope NGO',
    avatar: 'SN',
    color: '#06B6D4',
    rating: 5,
    text: "Professional, affordable, and reliable — that's MyGuys Tech in three words. Our new website has doubled our donor inquiries. The team understood exactly what an NGO needs.",
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', gap: 3 }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: '#F59E0B', fontSize: 14 }}>★</span>
      ))}
    </div>
  )
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.unobserve(el) } }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

interface TestimonialsProps { darkMode: boolean }

export default function Testimonials({ darkMode }: TestimonialsProps) {
  const [current, setCurrent] = useState(0)
  const headRef = useReveal()
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % testimonials.length)
    }, 5000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  const go = (i: number) => {
    setCurrent(i)
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % testimonials.length)
    }, 5000)
  }

  const t = testimonials[current]

  return (
    <section style={{ padding: '100px 24px', background: darkMode ? '#0A0F1E' : '#F8FAFC' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div ref={headRef} className="section-reveal" style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 100, padding: '6px 18px', marginBottom: 20 }}>
            <span style={{ color: '#F59E0B', fontSize: 13, fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>Client Stories</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: 'Poppins, sans-serif', fontWeight: 800, color: darkMode ? '#F1F5F9' : '#0F172A', marginBottom: 12 }}>
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
        </div>

        {/* Featured testimonial */}
        <div
          style={{
            background: darkMode ? '#111827' : '#FFFFFF',
            border: `1px solid ${darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)'}`,
            borderRadius: 20,
            padding: '48px',
            textAlign: 'center',
            marginBottom: 32,
            boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Quote mark */}
          <div style={{ position: 'absolute', top: 20, left: 28, fontSize: 80, color: `${t.color}15`, fontFamily: 'Georgia, serif', lineHeight: 1, userSelect: 'none' }}>
            "
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <Stars count={t.rating} />
          </div>

          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.15rem)',
            color: darkMode ? '#CBD5E1' : '#334155',
            lineHeight: 1.8,
            fontStyle: 'italic',
            maxWidth: 700,
            margin: '0 auto 32px',
            position: 'relative',
            zIndex: 1,
          }}>
            "{t.text}"
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
            <div style={{
              width: 52,
              height: 52,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${t.color}, ${t.color}AA)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 700,
              fontSize: 16,
            }}>
              {t.avatar}
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, color: darkMode ? '#F1F5F9' : '#0F172A' }}>{t.name}</div>
              <div style={{ fontSize: 13, color: darkMode ? '#64748B' : '#94A3B8', fontFamily: 'Inter, sans-serif' }}>{t.role}</div>
            </div>
          </div>
        </div>

        {/* Dots & mini cards */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 36 }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              style={{
                width: current === i ? 28 : 8,
                height: 8,
                borderRadius: 4,
                border: 'none',
                background: current === i ? '#2563EB' : darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>

        {/* All testimonials row */}
        <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 8 }}>
          {testimonials.map((t2, i) => (
            <div
              key={i}
              onClick={() => go(i)}
              style={{
                flexShrink: 0,
                minWidth: 220,
                background: current === i ? (darkMode ? 'rgba(37,99,235,0.15)' : 'rgba(37,99,235,0.07)') : darkMode ? '#111827' : '#FFFFFF',
                border: `1px solid ${current === i ? 'rgba(37,99,235,0.4)' : darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)'}`,
                borderRadius: 12,
                padding: '16px 18px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: `linear-gradient(135deg, ${t2.color}, ${t2.color}AA)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 11, fontWeight: 700, fontFamily: 'Poppins, sans-serif', flexShrink: 0 }}>
                  {t2.avatar}
                </div>
                <div>
                  <div style={{ fontSize: 12, fontFamily: 'Poppins, sans-serif', fontWeight: 700, color: darkMode ? '#F1F5F9' : '#0F172A' }}>{t2.name}</div>
                  <div style={{ fontSize: 10, color: darkMode ? '#64748B' : '#94A3B8', fontFamily: 'Inter, sans-serif' }}>{t2.role.split(',')[0]}</div>
                </div>
              </div>
              <Stars count={t2.rating} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
