import { useEffect, useRef, useState } from 'react'

const faqs = [
  { q: 'How long does it take to build a website?', a: 'Typically 5–21 days depending on the scope. A simple business website takes 5–7 days, while complex corporate sites or e-commerce stores may take 14–21 days. We provide a detailed timeline upfront.' },
  { q: 'What payment methods do you accept?', a: 'We accept M-Pesa (Paybill & Till), Visa, Mastercard, PayPal, and Bank Transfer. For local Kenyan clients, M-Pesa is the most convenient. We can also accept 50% upfront and 50% on delivery.' },
  { q: 'Do you offer post-launch support and maintenance?', a: 'Yes! All our packages include free support for 1–6 months depending on the plan. After that, we offer affordable monthly maintenance plans covering security updates, backups, bug fixes, and content updates.' },
  { q: 'Can you integrate M-Pesa payments into my system?', a: "Absolutely. M-Pesa Daraja API integration is one of our specialties. We've implemented STK Push, C2B, B2C, and other payment flows for multiple clients across Kenya." },
  { q: 'Do you work with startups and small businesses?', a: 'Yes! We love working with startups and SMEs. We have affordable packages tailored for businesses at every stage of growth. Our goal is to help you scale with technology.' },
  { q: 'How do you ensure security in your software?', a: 'Security is built in from day one. We implement HTTPS, secure authentication, CSRF/XSS protection, encrypted passwords, role-based access control, and regular security audits on every project.' },
  { q: 'Do you provide hosting services?', a: 'Yes, we can host your website on secure cloud servers (AWS, DigitalOcean, or cPanel hosting). We handle the technical setup, SSL certificates, backups, and performance optimization.' },
  { q: 'Can you help with digital marketing after building my website?', a: 'Yes! We offer SEO, Google Ads management, social media marketing, and content creation services to help drive traffic and conversions to your new website.' },
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

interface FAQProps { darkMode: boolean }

export default function FAQ({ darkMode }: FAQProps) {
  const [open, setOpen] = useState<number | null>(null)
  const headRef = useReveal()
  const listRef = useReveal()

  return (
    <section style={{ padding: '100px 24px', background: darkMode ? '#050911' : '#FFFFFF' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div ref={headRef} className="section-reveal" style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.25)', borderRadius: 100, padding: '6px 18px', marginBottom: 20 }}>
            <span style={{ color: '#2563EB', fontSize: 13, fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>Got Questions?</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: 'Poppins, sans-serif', fontWeight: 800, color: darkMode ? '#F1F5F9' : '#0F172A', marginBottom: 16 }}>
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p style={{ color: darkMode ? '#94A3B8' : '#64748B', lineHeight: 1.8 }}>
            Everything you need to know about working with MyGuys Tech Solutions.
          </p>
        </div>

        <div ref={listRef} className="section-reveal" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              style={{
                background: darkMode ? '#111827' : '#FFFFFF',
                border: `1px solid ${open === i ? '#2563EB' : darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)'}`,
                borderRadius: 14,
                overflow: 'hidden',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                boxShadow: open === i ? '0 4px 20px rgba(37,99,235,0.1)' : 'none',
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: '100%',
                  padding: '20px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 16,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '0.95rem', color: darkMode ? '#F1F5F9' : '#0F172A', lineHeight: 1.5 }}>
                  {faq.q}
                </span>
                <span style={{
                  flexShrink: 0,
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: open === i ? '#2563EB' : darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(37,99,235,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: open === i ? 'white' : '#2563EB',
                  fontSize: 18,
                  fontWeight: 300,
                  transition: 'all 0.3s ease',
                  transform: open === i ? 'rotate(45deg)' : 'none',
                }}>
                  +
                </span>
              </button>
              {open === i && (
                <div style={{ padding: '0 24px 20px' }}>
                  <p style={{ color: darkMode ? '#94A3B8' : '#64748B', lineHeight: 1.8, fontSize: '0.9rem', fontFamily: 'Inter, sans-serif', margin: 0 }}>
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <p style={{ color: darkMode ? '#64748B' : '#94A3B8', fontFamily: 'Inter, sans-serif', marginBottom: 20, fontSize: '0.95rem' }}>
            Still have questions? We're here to help.
          </p>
          <button
            className="btn-primary"
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Contact Us →
          </button>
        </div>
      </div>
    </section>
  )
}
