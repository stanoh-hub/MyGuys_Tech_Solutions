import logoImg from '@/imports/developers_logo.png'

interface FooterProps { darkMode: boolean }

export default function Footer({ darkMode }: FooterProps) {
  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  const cols = [
    {
      title: 'Services',
      links: ['Software Development', 'Website Development', 'Mobile Apps', 'Cybersecurity', 'Networking', 'Cloud Services', 'Graphic Design', 'Digital Marketing'],
    },
    {
      title: 'Company',
      links: ['About Us', 'Our Portfolio', 'Pricing', 'Testimonials', 'Blog', 'Careers'],
    },
    {
      title: 'Legal',
      links: ['Privacy Policy', 'Terms & Conditions', 'Cookie Policy', 'Refund Policy'],
    },
  ]

  return (
    <footer style={{ background: '#0A0F1E', color: '#94A3B8', paddingTop: 72 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        {/* Top Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr repeat(3, 1fr)', gap: 48, paddingBottom: 56, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          {/* Brand */}
          <div>
            <img src={logoImg} alt="MyGuys Tech Solutions" style={{ height: 52, objectFit: 'contain', marginBottom: 20, filter: 'brightness(1.1)' }} />
            <p style={{ lineHeight: 1.8, fontSize: 14, marginBottom: 24, maxWidth: 300, color: '#64748B' }}>
              Building Africa's Digital Future, One Solution at a Time. Your trusted technology partner in Kenya and across Africa.
            </p>

            {/* Newsletter */}
            <div>
              <p style={{ fontSize: 12, fontFamily: 'Poppins, sans-serif', fontWeight: 600, color: '#CBD5E1', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>
                Newsletter
              </p>
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    borderRadius: 8,
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.05)',
                    color: '#F1F5F9',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 13,
                    outline: 'none',
                  }}
                />
                <button className="btn-primary" style={{ padding: '10px 16px', fontSize: 13, flexShrink: 0 }}>
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {cols.map(col => (
            <div key={col.title}>
              <h4 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 14, color: '#F1F5F9', marginBottom: 20, textTransform: 'uppercase', letterSpacing: 1 }}>
                {col.title}
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.links.map(link => (
                  <li key={link}>
                    <button
                      onClick={() => {
                        const map: Record<string, string> = {
                          'About Us': '#about', 'Our Portfolio': '#portfolio', 'Pricing': '#pricing',
                          'Testimonials': '#testimonials', 'Software Development': '#services',
                        }
                        if (map[link]) scrollTo(map[link])
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#64748B',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: 14,
                        cursor: 'pointer',
                        padding: 0,
                        textAlign: 'left',
                        transition: 'color 0.2s ease',
                      }}
                      onMouseEnter={e => ((e.target as HTMLButtonElement).style.color = '#3B82F6')}
                      onMouseLeave={e => ((e.target as HTMLButtonElement).style.color = '#64748B')}
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Row */}
        <div style={{ padding: '24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <p style={{ fontSize: 13, margin: 0 }}>
            © {new Date().getFullYear()} MyGuys Tech Solutions. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <span style={{ fontSize: 13 }}>Made with ❤️ in Kenya</span>
            <div style={{ display: 'flex', gap: 12 }}>
              {['💼', '🐦', '📘', '📸'].map((icon, i) => (
                <button
                  key={i}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: 16,
                    cursor: 'pointer',
                    opacity: 0.6,
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={e => ((e.target as HTMLButtonElement).style.opacity = '1')}
                  onMouseLeave={e => ((e.target as HTMLButtonElement).style.opacity = '0.6')}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          footer > div > div:first-of-type {
            grid-template-columns: 1fr 1fr !important;
          }
          footer > div > div:first-of-type > div:first-child {
            grid-column: 1 / -1;
          }
        }
        @media (max-width: 600px) {
          footer > div > div:first-of-type {
            grid-template-columns: 1fr !important;
          }
          footer > div > div:last-of-type {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  )
}
