import { useEffect, useRef, useState } from 'react'

const plans = [
  {
    name: 'Business Website',
    price: 'KES 25,000',
    usd: '~$190',
    delivery: '5–7 days',
    popular: false,
    color: '#2563EB',
    features: ['Up to 5 pages', 'Mobile Responsive', 'SEO Optimized', 'Contact Form', 'Google Maps', 'Social Media Links', '1 Month Free Support'],
  },
  {
    name: 'Corporate Website',
    price: 'KES 60,000',
    usd: '~$460',
    delivery: '10–14 days',
    popular: true,
    color: '#FFFFFF',
    features: ['Up to 15 pages', 'CMS Integration', 'Blog System', 'Advanced SEO', 'Newsletter', 'Analytics', 'SSL Certificate', '3 Months Support'],
  },
  {
    name: 'E-commerce Store',
    price: 'KES 85,000',
    usd: '~$650',
    delivery: '14–21 days',
    popular: false,
    color: '#2563EB',
    features: ['Full E-commerce', 'M-Pesa Integration', 'Product Management', 'Order Tracking', 'Inventory System', 'Customer Accounts', 'Discount System', '6 Months Support'],
  },
  {
    name: 'Logo Design',
    price: 'KES 5,000',
    usd: '~$38',
    delivery: '2–3 days',
    popular: false,
    color: '#06B6D4',
    features: ['3 Concepts', 'Unlimited Revisions', 'AI + PNG + SVG Files', 'Brand Guidelines', 'Social Media Versions'],
  },
  {
    name: 'Cybersecurity Assessment',
    price: 'KES 40,000',
    usd: '~$305',
    delivery: '5–7 days',
    popular: false,
    color: '#EF4444',
    features: ['Vulnerability Scan', 'Penetration Test', 'Security Report', 'Risk Assessment', 'Remediation Plan', 'Follow-up Consultation'],
  },
  {
    name: 'Custom Software',
    price: 'Custom Quote',
    usd: 'Get in touch',
    delivery: 'Project-based',
    popular: false,
    color: '#F59E0B',
    features: ['Requirements Analysis', 'Custom Development', 'Testing & QA', 'Deployment', 'Training', 'Ongoing Maintenance', 'Dedicated Support'],
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

interface PricingProps { darkMode: boolean }

export default function Pricing({ darkMode }: PricingProps) {
  const [hovered, setHovered] = useState<number | null>(null)
  const headRef = useReveal()
  const gridRef = useReveal()

  return (
    <section id="pricing" style={{ padding: '100px 24px', background: darkMode ? '#0A0F1E' : '#F8FAFC' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div ref={headRef} className="section-reveal" data-animate="fade-right" style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 100, padding: '6px 18px', marginBottom: 20 }}>
            <span style={{ color: '#F59E0B', fontSize: 13, fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>Transparent Pricing</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: 'Poppins, sans-serif', fontWeight: 800, color: darkMode ? '#F1F5F9' : '#0F172A', marginBottom: 16 }}>
            Simple, <span className="gold-text">Honest Pricing</span>
          </h2>
          <p style={{ color: darkMode ? '#94A3B8' : '#64748B', fontSize: '1.05rem', maxWidth: 600, margin: '0 auto', lineHeight: 1.8 }}>
            No hidden fees. No surprises. Just great value for world-class technology solutions.
          </p>
        </div>

        <div ref={gridRef} className="section-reveal" data-animate="fade-left" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 24 }}>
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: plan.popular
                  ? 'linear-gradient(135deg, #2563EB, #1D4ED8)'
                  : darkMode ? '#111827' : '#FFFFFF',
                border: plan.popular
                  ? 'none'
                  : hovered === i
                    ? '1px solid #2563EB'
                    : `1px solid ${darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)'}`,
                borderRadius: 18,
                padding: '32px 28px',
                position: 'relative',
                transform: plan.popular ? 'scale(1.04)' : hovered === i ? 'translateY(-4px)' : 'none',
                transition: 'all 0.3s ease',
                boxShadow: plan.popular
                  ? '0 24px 60px rgba(37,99,235,0.35)'
                  : hovered === i
                    ? '0 16px 40px rgba(37,99,235,0.12)'
                    : 'none',
              }}
            >
              {plan.popular && (
                <div style={{
                  position: 'absolute',
                  top: -12,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#F59E0B',
                  color: '#0F172A',
                  padding: '4px 16px',
                  borderRadius: 100,
                  fontSize: 11,
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                }}>
                  ⭐ MOST POPULAR
                </div>
              )}

              <h3 style={{ fontSize: '1.1rem', fontFamily: 'Poppins, sans-serif', fontWeight: 700, color: plan.popular ? 'white' : darkMode ? '#F1F5F9' : '#0F172A', marginBottom: 16 }}>
                {plan.name}
              </h3>

              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: '2rem', fontFamily: 'Poppins, sans-serif', fontWeight: 800, color: plan.popular ? 'white' : '#2563EB' }}>
                  {plan.price}
                </div>
                <div style={{ fontSize: 13, color: plan.popular ? 'rgba(255,255,255,0.7)' : darkMode ? '#64748B' : '#94A3B8', fontFamily: 'Inter, sans-serif' }}>
                  {plan.usd} · Delivery: {plan.delivery}
                </div>
              </div>

              <div style={{ marginBottom: 28 }}>
                {plan.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <span style={{ color: plan.popular ? '#86EFAC' : '#10B981', fontSize: 14, flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: 13, color: plan.popular ? 'rgba(255,255,255,0.85)' : darkMode ? '#94A3B8' : '#475569', fontFamily: 'Inter, sans-serif' }}>
                      {f}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  style={{
                    flex: 1,
                    padding: '11px 16px',
                    borderRadius: 10,
                    border: 'none',
                    background: plan.popular ? 'white' : 'linear-gradient(135deg, #2563EB, #1D4ED8)',
                    color: plan.popular ? '#2563EB' : 'white',
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  {plan.name === 'Custom Software' ? 'Get Quote' : 'Buy Now'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <p style={{ color: darkMode ? '#64748B' : '#94A3B8', fontSize: '0.9rem', fontFamily: 'Inter, sans-serif' }}>
            All prices are starting rates. Final pricing depends on project scope. We accept M-Pesa, Visa, Mastercard, PayPal & Bank Transfer.
          </p>
        </div>
      </div>
    </section>
  )
}
