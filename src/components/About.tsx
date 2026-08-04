import { useEffect, useRef } from 'react'

const values = [
  { icon: '💡', title: 'Innovation', desc: 'Pioneering cutting-edge solutions for modern challenges.' },
  { icon: '🛡️', title: 'Integrity', desc: 'Transparent, honest, and ethical in everything we do.' },
  { icon: '⭐', title: 'Excellence', desc: 'Delivering quality that exceeds expectations every time.' },
  { icon: '🤝', title: 'Customer Success', desc: 'Your growth is our ultimate measure of success.' },
  { icon: '🔒', title: 'Security', desc: 'Security-first approach in every solution we build.' },
  { icon: '📚', title: 'Continuous Learning', desc: 'Always evolving with the latest technologies.' },
]

const whyUs = [
  { icon: '💰', title: 'Affordable Solutions', desc: 'Enterprise-grade quality at prices that fit your budget.' },
  { icon: '⚡', title: 'Fast Delivery', desc: 'Rapid development without sacrificing quality.' },
  { icon: '🔐', title: 'Secure Development', desc: 'Security baked in from the ground up.' },
  { icon: '🤖', title: 'AI Integration', desc: 'Smart AI features built into your systems.' },
  { icon: '📱', title: 'M-Pesa Integration', desc: 'Seamless mobile payment solutions for Africa.' },
  { icon: '☁️', title: 'Cloud Ready', desc: 'Scalable cloud-native architectures.' },
  { icon: '🌍', title: 'SEO Optimized', desc: 'Built to rank and be found online.' },
  { icon: '🔧', title: 'Ongoing Support', desc: '24/7 support and maintenance packages.' },
]

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          obs.unobserve(el)
        }
      },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return ref
}

interface AboutProps {
  darkMode: boolean
}

export default function About({ darkMode }: AboutProps) {
  const headRef = useReveal()
  const valuesRef = useReveal()
  const whyRef = useReveal()

  return (
    <section id="about" style={{ padding: '100px 24px', background: darkMode ? '#0A0F1E' : '#F8FAFC' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Section Header */}
        <div ref={headRef} className="section-reveal" style={{ textAlign: 'center', marginBottom: 72 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.25)', borderRadius: 100, padding: '6px 18px', marginBottom: 20 }}>
            <span style={{ color: '#2563EB', fontSize: 13, fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>Our Story</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: 'Poppins, sans-serif', fontWeight: 800, color: darkMode ? '#F1F5F9' : '#0F172A', marginBottom: 20 }}>
            About <span className="gradient-text">MyGuys Tech Solutions</span>
          </h2>
          <p style={{ fontSize: '1.1rem', color: darkMode ? '#94A3B8' : '#64748B', maxWidth: 700, margin: '0 auto', lineHeight: 1.8 }}>
            We believe technology should create opportunities. Founded with a mission to empower
            businesses across Kenya and Africa, we build solutions that solve real-world challenges
            through innovation, security, and excellence.
          </p>
        </div>

        {/* Mission & Vision */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 80 }}>
          {[
            {
              icon: '🎯',
              title: 'Our Mission',
              text: 'Empowering businesses, organizations, startups, schools, healthcare providers, NGOs, and communities through innovative software, cybersecurity, AI, cloud technologies, networking, and digital transformation.',
              gradient: 'linear-gradient(135deg, #2563EB, #1D4ED8)',
            },
            {
              icon: '🔭',
              title: 'Our Vision',
              text: "To become Africa's leading technology company delivering secure, intelligent, and scalable digital solutions that transform lives and create lasting economic value across the continent.",
              gradient: 'linear-gradient(135deg, #06B6D4, #0891B2)',
            },
          ].map(item => (
            <div
              key={item.title}
              className="card-hover"
              style={{
                background: item.gradient,
                borderRadius: 16,
                padding: 36,
                color: 'white',
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 16 }}>{item.icon}</div>
              <h3 style={{ fontSize: '1.5rem', fontFamily: 'Poppins, sans-serif', fontWeight: 700, marginBottom: 14 }}>{item.title}</h3>
              <p style={{ lineHeight: 1.8, opacity: 0.9 }}>{item.text}</p>
            </div>
          ))}
        </div>

        {/* Core Values */}
        <div ref={valuesRef} className="section-reveal" style={{ marginBottom: 80 }}>
          <h3 style={{ textAlign: 'center', fontSize: '1.8rem', fontFamily: 'Poppins, sans-serif', fontWeight: 700, color: darkMode ? '#F1F5F9' : '#0F172A', marginBottom: 40 }}>
            Our Core <span className="gradient-text">Values</span>
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20 }}>
            {values.map((v, i) => (
              <div
                key={v.title}
                className="service-card"
                style={{ textAlign: 'center', animationDelay: `${i * 0.1}s` }}
              >
                <div style={{ fontSize: 32, marginBottom: 12 }}>{v.icon}</div>
                <h4 style={{ fontSize: '1rem', fontFamily: 'Poppins, sans-serif', fontWeight: 700, color: darkMode ? '#F1F5F9' : '#0F172A', marginBottom: 8 }}>{v.title}</h4>
                <p style={{ fontSize: 13, color: darkMode ? '#94A3B8' : '#64748B', lineHeight: 1.6 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div ref={whyRef} className="section-reveal">
          <h3 style={{ textAlign: 'center', fontSize: '1.8rem', fontFamily: 'Poppins, sans-serif', fontWeight: 700, color: darkMode ? '#F1F5F9' : '#0F172A', marginBottom: 40 }}>
            Why Choose <span className="gradient-text">Us?</span>
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {whyUs.map((item, i) => (
              <div
                key={item.title}
                className="service-card"
                style={{ display: 'flex', gap: 16, animationDelay: `${i * 0.08}s` }}
              >
                <div style={{ fontSize: 28, flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontFamily: 'Poppins, sans-serif', fontWeight: 700, color: darkMode ? '#F1F5F9' : '#0F172A', marginBottom: 6 }}>{item.title}</h4>
                  <p style={{ fontSize: 13, color: darkMode ? '#94A3B8' : '#64748B', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
