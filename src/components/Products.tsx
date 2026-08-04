import { useEffect, useRef } from 'react'

const products = [
  {
    name: 'Pamoja Driving School Management System',
    status: 'Completed',
    statusColor: '#10B981',
    description: 'A comprehensive management system for driving schools, streamlining student enrollment, lesson scheduling, and payments with full M-Pesa integration.',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&h=380&fit=crop&auto=format',
    features: ['Student Registration', 'Lesson Scheduling', 'Instructor Management', 'Vehicle Management', 'M-Pesa STK Push', 'Online Payments', 'Reports & Analytics', 'Admin Dashboard', 'Reception Dashboard'],
    tech: ['Django', 'Python', 'PostgreSQL', 'HTML/CSS', 'JavaScript', 'Daraja API'],
    techColors: ['#0C4B33', '#1e3a5f', '#336791', '#E34F26', '#F7DF1E', '#00897B'],
    icon: '🚗',
    gradient: 'linear-gradient(135deg, #1E3A8A, #1D4ED8)',
  },
  {
    name: 'Medify Counterfeit Drug Detection System',
    status: 'Completed',
    statusColor: '#10B981',
    description: 'An intelligent healthcare solution that leverages verification technologies to detect counterfeit medicines, protecting patients across Kenya and Africa.',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&h=380&fit=crop&auto=format',
    features: ['Drug Authentication', 'QR & Barcode Verification', 'Medicine Database', 'Manufacturer Verification', 'Counterfeit Detection', 'Reporting Dashboard', 'Real-time Notifications'],
    tech: ['Django', 'Python', 'PostgreSQL', 'REST APIs', 'QR Technology'],
    techColors: ['#0C4B33', '#1e3a5f', '#336791', '#FF5733', '#4A90D9'],
    icon: '💊',
    gradient: 'linear-gradient(135deg, #065F46, #059669)',
  },
]

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

interface ProductsProps { darkMode: boolean }

export default function Products({ darkMode }: ProductsProps) {
  const headRef = useReveal()

  return (
    <section id="products" style={{ padding: '100px 24px', background: darkMode ? '#0A0F1E' : '#F8FAFC' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div ref={headRef} className="section-reveal" data-animate="fade-right" style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 100, padding: '6px 18px', marginBottom: 20 }}>
            <span style={{ color: '#F59E0B', fontSize: 13, fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>Featured Products</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: 'Poppins, sans-serif', fontWeight: 800, color: darkMode ? '#F1F5F9' : '#0F172A', marginBottom: 16 }}>
            Completed <span className="gold-text">Flagship Products</span>
          </h2>
          <p style={{ color: darkMode ? '#94A3B8' : '#64748B', fontSize: '1.05rem', maxWidth: 600, margin: '0 auto', lineHeight: 1.8 }}>
            Real solutions solving real problems across Kenya and Africa.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          {products.map((product, i) => (
            <div
              key={product.name}
              className="card-hover"
              style={{
                background: darkMode ? '#111827' : '#FFFFFF',
                border: `1px solid ${darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)'}`,
                borderRadius: 20,
                overflow: 'hidden',
                display: 'grid',
                gridTemplateColumns: i % 2 === 0 ? '1fr 1.2fr' : '1.2fr 1fr',
                minHeight: 380,
              }}
            >
              {/* Image side */}
              <div style={{ order: i % 2 === 0 ? 0 : 1, position: 'relative', overflow: 'hidden', minHeight: 260 }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: product.gradient,
                  opacity: 0.65,
                }} />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 12,
                }}>
                  <div style={{ fontSize: 56 }}>{product.icon}</div>
                  <span style={{
                    background: `${product.statusColor}25`,
                    border: `1px solid ${product.statusColor}60`,
                    color: product.statusColor,
                    padding: '5px 14px',
                    borderRadius: 100,
                    fontSize: 12,
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: product.statusColor, display: 'inline-block' }} />
                    {product.status}
                  </span>
                </div>
              </div>

              {/* Content side */}
              <div style={{ padding: '36px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', order: i % 2 === 0 ? 1 : 0 }}>
                <h3 style={{ fontSize: '1.35rem', fontFamily: 'Poppins, sans-serif', fontWeight: 700, color: darkMode ? '#F1F5F9' : '#0F172A', marginBottom: 12, lineHeight: 1.3 }}>
                  {product.name}
                </h3>
                <p style={{ color: darkMode ? '#94A3B8' : '#64748B', lineHeight: 1.7, marginBottom: 20, fontSize: '0.95rem' }}>
                  {product.description}
                </p>

                {/* Features */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                  {product.features.map(f => (
                    <span key={f} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: darkMode ? '#94A3B8' : '#475569', fontFamily: 'Inter, sans-serif' }}>
                      <span style={{ color: '#10B981', fontSize: 10 }}>✓</span> {f}
                    </span>
                  ))}
                </div>

                {/* Tech stack */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
                  {product.tech.map((t, ti) => (
                    <span key={t} style={{
                      background: product.techColors[ti] + '22',
                      color: product.techColors[ti],
                      border: `1px solid ${product.techColors[ti]}40`,
                      padding: '4px 10px',
                      borderRadius: 6,
                      fontSize: 11,
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 600,
                    }}>{t}</span>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <button className="btn-primary" style={{ fontSize: 13 }}>View Project →</button>
                  <button
                    style={{
                      background: 'transparent',
                      border: `1px solid ${darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'}`,
                      color: darkMode ? '#CBD5E1' : '#475569',
                      padding: '10px 20px',
                      borderRadius: 10,
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 600,
                      fontSize: 13,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#2563EB'; (e.currentTarget as HTMLButtonElement).style.color = '#2563EB' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'; (e.currentTarget as HTMLButtonElement).style.color = darkMode ? '#CBD5E1' : '#475569' }}
                  >
                    Request Demo
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #products .card-hover > div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
          }
          #products .card-hover > div[style*="order: 1"] {
            order: 0 !important;
          }
          #products .card-hover > div[style*="order: 0"] {
            order: 1 !important;
          }
        }
      `}</style>
    </section>
  )
}
