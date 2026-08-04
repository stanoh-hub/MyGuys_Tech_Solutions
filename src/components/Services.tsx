import { useEffect, useRef, useState } from 'react'

const serviceCategories = [
  {
    icon: '💻',
    title: 'Software Development',
    color: '#2563EB',
    items: ['ERP Systems', 'Inventory Management', 'POS Systems', 'School Management', 'Hospital Systems', 'Church Management', 'SACCO Systems', 'CRM Systems'],
  },
  {
    icon: '🌐',
    title: 'Website Development',
    color: '#06B6D4',
    items: ['Business Websites', 'Corporate Websites', 'NGO Websites', 'Church Websites', 'School Websites', 'Hotel Websites', 'E-commerce Stores', 'Landing Pages'],
  },
  {
    icon: '📱',
    title: 'Mobile App Development',
    color: '#10B981',
    items: ['Android Apps', 'iOS Apps', 'Flutter Cross-Platform', 'React Native', 'App Store Publishing', 'App Maintenance'],
  },
  {
    icon: '🔒',
    title: 'Cybersecurity',
    color: '#EF4444',
    items: ['Penetration Testing', 'Security Audits', 'Vulnerability Assessment', 'Website Security', 'Network Security', 'Security Training'],
  },
  {
    icon: '🔗',
    title: 'Networking',
    color: '#8B5CF6',
    items: ['Structured Cabling', 'LAN Installation', 'Server Installation', 'Wi-Fi Solutions', 'Network Monitoring', 'VPN Setup'],
  },
  {
    icon: '☁️',
    title: 'Cloud Services',
    color: '#F59E0B',
    items: ['AWS Solutions', 'Azure Services', 'Google Cloud', 'Cloud Hosting', 'Backup Solutions', 'Cloud Migration'],
  },
  {
    icon: '🎨',
    title: 'Graphic Design',
    color: '#EC4899',
    items: ['Logo Design', 'Poster Design', 'Company Profiles', 'Business Cards', 'Flyers & Brochures', 'Brand Identity'],
  },
  {
    icon: '📊',
    title: 'Digital Marketing',
    color: '#14B8A6',
    items: ['SEO Optimization', 'Google Ads', 'Social Media Marketing', 'Content Creation', 'Email Marketing', 'Analytics'],
  },
  {
    icon: '🧠',
    title: 'IT Consultancy',
    color: '#6366F1',
    items: ['Technology Strategy', 'Digital Transformation', 'Business Automation', 'Technical Training', 'IT Roadmaps', 'System Architecture'],
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

interface ServicesProps { darkMode: boolean }

export default function Services({ darkMode }: ServicesProps) {
  const [active, setActive] = useState<number | null>(null)
  const headRef = useReveal()
  const gridRef = useReveal()

  return (
    <section id="services" style={{ padding: '100px 24px', background: darkMode ? '#050911' : '#FFFFFF' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div ref={headRef} className="section-reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.25)', borderRadius: 100, padding: '6px 18px', marginBottom: 20 }}>
            <span style={{ color: '#2563EB', fontSize: 13, fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>What We Offer</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: 'Poppins, sans-serif', fontWeight: 800, color: darkMode ? '#F1F5F9' : '#0F172A', marginBottom: 16 }}>
            Our <span className="gradient-text">Services</span>
          </h2>
          <p style={{ color: darkMode ? '#94A3B8' : '#64748B', fontSize: '1.05rem', maxWidth: 600, margin: '0 auto', lineHeight: 1.8 }}>
            Comprehensive technology solutions tailored to drive your business forward in the digital age.
          </p>
        </div>

        <div ref={gridRef} className="section-reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
          {serviceCategories.map((cat, i) => (
            <div
              key={cat.title}
              className="service-card"
              style={{ cursor: 'pointer' }}
              onClick={() => setActive(active === i ? null : i)}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 16 }}>
                <div style={{
                  width: 52,
                  height: 52,
                  borderRadius: 12,
                  background: `${cat.color}18`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                  flexShrink: 0,
                  border: `1px solid ${cat.color}30`,
                }}>
                  {cat.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1rem', fontFamily: 'Poppins, sans-serif', fontWeight: 700, color: darkMode ? '#F1F5F9' : '#0F172A', marginBottom: 4 }}>
                    {cat.title}
                  </h3>
                  <p style={{ fontSize: 12, color: cat.color, fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
                    {cat.items.length} services →
                  </p>
                </div>
              </div>

              {active === i && (
                <div style={{ marginTop: 12, paddingTop: 16, borderTop: `1px solid ${darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}` }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {cat.items.map(item => (
                      <span
                        key={item}
                        style={{
                          background: `${cat.color}12`,
                          color: cat.color,
                          border: `1px solid ${cat.color}25`,
                          borderRadius: 6,
                          padding: '4px 10px',
                          fontSize: 12,
                          fontFamily: 'Poppins, sans-serif',
                          fontWeight: 500,
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <button
            className="btn-primary"
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Discuss Your Project →
          </button>
        </div>
      </div>
    </section>
  )
}
