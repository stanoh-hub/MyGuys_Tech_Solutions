import { useEffect, useRef, useState } from 'react'

const categories = ['All', 'Software', 'Websites', 'Design', 'Mobile']

const portfolioItems = [
  { title: 'Pamoja Driving School System', category: 'Software', tags: ['Django', 'Python', 'M-Pesa'], image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=500&h=320&fit=crop&auto=format', date: '2024', color: '#2563EB' },
  { title: 'Medify Drug Detection System', category: 'Software', tags: ['Django', 'REST API', 'ML'], image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500&h=320&fit=crop&auto=format', date: '2024', color: '#10B981' },
  { title: 'The Royals Salon Website', category: 'Websites', tags: ['React', 'Tailwind', 'SEO'], image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500&h=320&fit=crop&auto=format', date: '2023', color: '#EC4899' },
  { title: 'Corporate Website Portfolio', category: 'Websites', tags: ['React', 'Next.js', 'CMS'], image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=500&h=320&fit=crop&auto=format', date: '2024', color: '#6366F1' },
  { title: 'E-commerce Store Platform', category: 'Websites', tags: ['React', 'M-Pesa', 'Cart'], image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&h=320&fit=crop&auto=format', date: '2023', color: '#F59E0B' },
  { title: 'Logo Design Projects', category: 'Design', tags: ['Illustrator', 'Branding', 'SVG'], image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=500&h=320&fit=crop&auto=format', date: '2024', color: '#06B6D4' },
  { title: 'Company Brand Identity', category: 'Design', tags: ['Brand', 'Guidelines', 'Print'], image: 'https://images.unsplash.com/photo-1612909671727-8ab53e0e1c63?w=500&h=320&fit=crop&auto=format', date: '2023', color: '#8B5CF6' },
  { title: 'Mobile Health App', category: 'Mobile', tags: ['Flutter', 'Firebase', 'Android'], image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&h=320&fit=crop&auto=format', date: '2024', color: '#14B8A6' },
]

const techStack = [
  { name: 'React', icon: '⚛️', category: 'Frontend' },
  { name: 'Next.js', icon: '▲', category: 'Frontend' },
  { name: 'Tailwind', icon: '💨', category: 'Frontend' },
  { name: 'TypeScript', icon: '🔷', category: 'Frontend' },
  { name: 'Django', icon: '🐍', category: 'Backend' },
  { name: 'Laravel', icon: '🎵', category: 'Backend' },
  { name: 'Python', icon: '🐍', category: 'Backend' },
  { name: 'PostgreSQL', icon: '🐘', category: 'Database' },
  { name: 'MySQL', icon: '🗄️', category: 'Database' },
  { name: 'Docker', icon: '🐳', category: 'DevOps' },
  { name: 'AWS', icon: '☁️', category: 'Cloud' },
  { name: 'M-Pesa', icon: '💚', category: 'Payments' },
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

interface PortfolioProps { darkMode: boolean }

export default function Portfolio({ darkMode }: PortfolioProps) {
  const [filter, setFilter] = useState('All')
  const headRef = useReveal()
  const gridRef = useReveal()

  const filtered = filter === 'All' ? portfolioItems : portfolioItems.filter(p => p.category === filter)

  return (
    <section id="portfolio" style={{ padding: '100px 24px', background: darkMode ? '#050911' : '#FFFFFF' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div ref={headRef} className="section-reveal" data-animate="fade-right" style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.25)', borderRadius: 100, padding: '6px 18px', marginBottom: 20 }}>
            <span style={{ color: '#2563EB', fontSize: 13, fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>Our Work</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: 'Poppins, sans-serif', fontWeight: 800, color: darkMode ? '#F1F5F9' : '#0F172A', marginBottom: 16 }}>
            Project <span className="gradient-text">Portfolio</span>
          </h2>
          <p style={{ color: darkMode ? '#94A3B8' : '#64748B', fontSize: '1.05rem', maxWidth: 600, margin: '0 auto 32px', lineHeight: 1.8 }}>
            A showcase of completed projects that demonstrate our technical expertise and creative excellence.
          </p>

          {/* Filter Tabs */}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  padding: '8px 20px',
                  borderRadius: 100,
                  border: filter === cat ? 'none' : `1px solid ${darkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'}`,
                  background: filter === cat ? 'linear-gradient(135deg, #2563EB, #1D4ED8)' : 'transparent',
                  color: filter === cat ? 'white' : darkMode ? '#94A3B8' : '#64748B',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div ref={gridRef} className="section-reveal" data-animate="fade-left" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24, marginBottom: 80 }}>
          {filtered.map(item => (
            <div
              key={item.title}
              className="card-hover hover-float"
              style={{
                background: darkMode ? '#111827' : '#FFFFFF',
                border: `1px solid ${darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)'}`,
                borderRadius: 16,
                overflow: 'hidden',
                cursor: 'pointer',
              }}
            >
              <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
                <img src={item.image} alt={item.title} className="hover-zoom" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: 12, right: 12, background: `${item.color}22`, border: `1px solid ${item.color}50`, color: item.color, padding: '3px 10px', borderRadius: 100, fontSize: 11, fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                  {item.category}
                </div>
              </div>
              <div style={{ padding: '20px 20px 24px' }}>
                <h3 style={{ fontSize: '1rem', fontFamily: 'Poppins, sans-serif', fontWeight: 700, color: darkMode ? '#F1F5F9' : '#0F172A', marginBottom: 8, lineHeight: 1.4 }}>
                  {item.title}
                </h3>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
                  {item.tags.map(tag => (
                    <span key={tag} style={{ background: `${item.color}12`, color: item.color, border: `1px solid ${item.color}25`, padding: '3px 8px', borderRadius: 4, fontSize: 11, fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 12, color: darkMode ? '#64748B' : '#94A3B8', fontFamily: 'Inter, sans-serif' }}>Completed {item.date}</span>
                  <button style={{ background: 'none', border: 'none', color: item.color, fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                    View →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <div style={{ borderTop: `1px solid ${darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)'}`, paddingTop: 64 }}>
          <h3 style={{ textAlign: 'center', fontSize: '1.5rem', fontFamily: 'Poppins, sans-serif', fontWeight: 700, color: darkMode ? '#F1F5F9' : '#0F172A', marginBottom: 36 }}>
            Technologies We <span className="gradient-text">Master</span>
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            {techStack.map(tech => (
              <div
                key={tech.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 18px',
                  borderRadius: 10,
                  background: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(37,99,235,0.05)',
                  border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(37,99,235,0.15)'}`,
                  transition: 'all 0.2s ease',
                  cursor: 'default',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(37,99,235,0.12)'; (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(37,99,235,0.35)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(37,99,235,0.05)'; (e.currentTarget as HTMLDivElement).style.borderColor = darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(37,99,235,0.15)' }}
              >
                <span style={{ fontSize: 18 }}>{tech.icon}</span>
                <span style={{ fontSize: 13, fontFamily: 'Poppins, sans-serif', fontWeight: 600, color: darkMode ? '#CBD5E1' : '#334155' }}>{tech.name}</span>
                <span style={{ fontSize: 10, color: darkMode ? '#64748B' : '#94A3B8', fontFamily: 'Inter, sans-serif' }}>{tech.category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
