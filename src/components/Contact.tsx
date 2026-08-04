import { useEffect, useRef, useState } from 'react'

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

interface ContactProps { darkMode: boolean }

export default function Contact({ darkMode }: ContactProps) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const headRef = useReveal()
  const contentRef = useReveal()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    borderRadius: 10,
    border: `1px solid ${darkMode ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'}`,
    background: darkMode ? 'rgba(255,255,255,0.05)' : '#F8FAFC',
    color: darkMode ? '#F1F5F9' : '#0F172A',
    fontFamily: 'Inter, sans-serif',
    fontSize: 14,
    outline: 'none',
    transition: 'border-color 0.2s ease',
    boxSizing: 'border-box' as const,
  }

  const contactInfo = [
    { icon: '📞', label: 'Phone', value: '+254 700 000 000', link: 'tel:+254700000000' },
    { icon: '📧', label: 'Email', value: 'info@myguystecsolutions.co.ke', link: 'mailto:info@myguystecsolutions.co.ke' },
    { icon: '💬', label: 'WhatsApp', value: '+254 700 000 000', link: 'https://wa.me/254700000000' },
    { icon: '📍', label: 'Location', value: 'Nairobi, Kenya', link: '#' },
    { icon: '🕒', label: 'Business Hours', value: 'Mon–Fri: 8am–6pm, Sat: 9am–3pm', link: '#' },
  ]

  return (
    <section id="contact" style={{ padding: '100px 24px', background: darkMode ? '#0A0F1E' : '#F8FAFC' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div ref={headRef} className="section-reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.25)', borderRadius: 100, padding: '6px 18px', marginBottom: 20 }}>
            <span style={{ color: '#2563EB', fontSize: 13, fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>Get In Touch</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: 'Poppins, sans-serif', fontWeight: 800, color: darkMode ? '#F1F5F9' : '#0F172A', marginBottom: 16 }}>
            Let's Build Something <span className="gradient-text">Amazing Together</span>
          </h2>
          <p style={{ color: darkMode ? '#94A3B8' : '#64748B', fontSize: '1.05rem', maxWidth: 600, margin: '0 auto', lineHeight: 1.8 }}>
            Ready to transform your business with technology? Let's talk about your project.
          </p>
        </div>

        <div ref={contentRef} className="section-reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 48, alignItems: 'start' }}>
          {/* Contact Info */}
          <div>
            <div style={{ marginBottom: 32 }}>
              {contactInfo.map(info => (
                <a
                  key={info.label}
                  href={info.link}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    padding: '16px 0',
                    borderBottom: `1px solid ${darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: 'rgba(37,99,235,0.1)',
                    border: '1px solid rgba(37,99,235,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 20,
                    flexShrink: 0,
                  }}>
                    {info.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: darkMode ? '#64748B' : '#94A3B8', fontFamily: 'Poppins, sans-serif', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>{info.label}</div>
                    <div style={{ fontSize: 14, color: darkMode ? '#CBD5E1' : '#334155', fontFamily: 'Inter, sans-serif', fontWeight: 500, marginTop: 2 }}>{info.value}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <p style={{ fontSize: 13, color: darkMode ? '#64748B' : '#94A3B8', fontFamily: 'Poppins, sans-serif', fontWeight: 600, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>
                Follow Us
              </p>
              <div style={{ display: 'flex', gap: 12 }}>
                {[
                  { label: 'LinkedIn', icon: '💼', color: '#0A66C2' },
                  { label: 'Twitter', icon: '🐦', color: '#1DA1F2' },
                  { label: 'Facebook', icon: '📘', color: '#1877F2' },
                  { label: 'Instagram', icon: '📸', color: '#E4405F' },
                  { label: 'YouTube', icon: '▶️', color: '#FF0000' },
                ].map(s => (
                  <button
                    key={s.label}
                    title={s.label}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                      background: darkMode ? 'rgba(255,255,255,0.05)' : '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 16,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = `${s.color}20`; (e.currentTarget as HTMLButtonElement).style.borderColor = `${s.color}60` }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = darkMode ? 'rgba(255,255,255,0.05)' : '#FFFFFF'; (e.currentTarget as HTMLButtonElement).style.borderColor = darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
                  >
                    {s.icon}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div style={{
            background: darkMode ? '#111827' : '#FFFFFF',
            border: `1px solid ${darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)'}`,
            borderRadius: 20,
            padding: '40px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.07)',
          }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: 64, marginBottom: 20 }}>🎉</div>
                <h3 style={{ fontSize: '1.5rem', fontFamily: 'Poppins, sans-serif', fontWeight: 700, color: darkMode ? '#F1F5F9' : '#0F172A', marginBottom: 12 }}>
                  Message Received!
                </h3>
                <p style={{ color: darkMode ? '#94A3B8' : '#64748B', lineHeight: 1.7 }}>
                  Thank you for reaching out. Our team will contact you within 24 hours to discuss your project.
                </p>
                <button className="btn-primary" style={{ marginTop: 24 }} onClick={() => setSubmitted(false)}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontSize: '1.3rem', fontFamily: 'Poppins, sans-serif', fontWeight: 700, color: darkMode ? '#F1F5F9' : '#0F172A', marginBottom: 24 }}>
                  Get Free Consultation
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontFamily: 'Poppins, sans-serif', fontWeight: 600, color: darkMode ? '#94A3B8' : '#64748B', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      Full Name *
                    </label>
                    <input
                      required
                      style={inputStyle}
                      placeholder="John Kamau"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      onFocus={e => (e.target.style.borderColor = '#2563EB')}
                      onBlur={e => (e.target.style.borderColor = darkMode ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)')}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontFamily: 'Poppins, sans-serif', fontWeight: 600, color: darkMode ? '#94A3B8' : '#64748B', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      Email *
                    </label>
                    <input
                      required
                      type="email"
                      style={inputStyle}
                      placeholder="john@company.co.ke"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      onFocus={e => (e.target.style.borderColor = '#2563EB')}
                      onBlur={e => (e.target.style.borderColor = darkMode ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)')}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontFamily: 'Poppins, sans-serif', fontWeight: 600, color: darkMode ? '#94A3B8' : '#64748B', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      Phone
                    </label>
                    <input
                      style={inputStyle}
                      placeholder="+254 7XX XXX XXX"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      onFocus={e => (e.target.style.borderColor = '#2563EB')}
                      onBlur={e => (e.target.style.borderColor = darkMode ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)')}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontFamily: 'Poppins, sans-serif', fontWeight: 600, color: darkMode ? '#94A3B8' : '#64748B', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      Service
                    </label>
                    <select
                      style={{ ...inputStyle, cursor: 'pointer' }}
                      value={form.service}
                      onChange={e => setForm({ ...form, service: e.target.value })}
                      onFocus={e => (e.target.style.borderColor = '#2563EB')}
                      onBlur={e => (e.target.style.borderColor = darkMode ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)')}
                    >
                      <option value="">Select service...</option>
                      <option>Software Development</option>
                      <option>Website Development</option>
                      <option>Mobile App</option>
                      <option>Cybersecurity</option>
                      <option>Graphic Design</option>
                      <option>Digital Marketing</option>
                      <option>IT Consultancy</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: 'block', fontSize: 12, fontFamily: 'Poppins, sans-serif', fontWeight: 600, color: darkMode ? '#94A3B8' : '#64748B', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    style={{ ...inputStyle, resize: 'vertical' }}
                    placeholder="Tell us about your project, timeline, and budget..."
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    onFocus={e => (e.target.style.borderColor = '#2563EB')}
                    onBlur={e => (e.target.style.borderColor = darkMode ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)')}
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px 24px', fontSize: 15 }}>
                  🚀 Send Message — It's Free
                </button>

                <p style={{ fontSize: 12, color: darkMode ? '#64748B' : '#94A3B8', textAlign: 'center', marginTop: 14, fontFamily: 'Inter, sans-serif' }}>
                  We respond within 24 hours · No spam, ever
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #contact .section-reveal > div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
