import { useEffect, useRef, useState } from 'react'

interface Message {
  role: 'bot' | 'user'
  text: string
}

const quickReplies = [
  'What services do you offer?',
  'Get a quote',
  'View pricing',
  'Book consultation',
  'Contact on WhatsApp',
]

const responses: Record<string, string> = {
  default: "Thanks for your message! Our team will get back to you shortly. You can also reach us on WhatsApp at +254 700 000 000 for immediate assistance. 😊",
  services: "We offer: \n• Software Development (ERP, POS, SACCO, Hospital Systems)\n• Website & E-commerce Development\n• Mobile Apps (Android, iOS, Flutter)\n• Cybersecurity & Penetration Testing\n• Cloud Services & Networking\n• Graphic Design & Digital Marketing\n\nWhich service interests you most?",
  quote: "I'd love to help you get a quote! Please share:\n1️⃣ What type of system/website do you need?\n2️⃣ Key features required\n3️⃣ Your timeline\n4️⃣ Your budget range\n\nOr fill our contact form for a detailed free consultation!",
  pricing: "Our starting prices:\n💻 Business Website: KES 25,000\n🏢 Corporate Website: KES 60,000\n🛒 E-commerce: KES 85,000\n🎨 Logo Design: KES 5,000\n🔒 Security Assessment: KES 40,000\n\nAll prices are negotiable based on scope. Want a custom quote?",
  consultation: "Book a FREE consultation with our team! \n\n📅 Available: Mon–Fri 8am–6pm, Sat 9am–3pm\n📞 Call: +254 700 000 000\n📧 Email: info@myguystecsolutions.co.ke\n💬 WhatsApp: +254 700 000 000\n\nOr scroll up to fill the contact form.",
  whatsapp: "Connect with us on WhatsApp for instant support! 💬\n\nClick here: wa.me/254700000000\n\nWe're available Mon–Sat and typically respond within 5 minutes during business hours.",
}

function getResponse(input: string): string {
  const lower = input.toLowerCase()
  if (lower.includes('service') || lower.includes('offer') || lower.includes('do you')) return responses.services
  if (lower.includes('quote') || lower.includes('cost') || lower.includes('price') || lower.includes('how much') || lower.includes('pricing')) return responses.pricing
  if (lower.includes('consult') || lower.includes('book') || lower.includes('appointment') || lower.includes('meeting')) return responses.consultation
  if (lower.includes('whatsapp') || lower.includes('contact') || lower.includes('reach') || lower.includes('call')) return responses.whatsapp
  if (lower.includes('view pricing') || lower.includes('packages')) return responses.pricing
  return responses.default
}

interface ChatBotProps { darkMode: boolean }

export default function ChatBot({ darkMode }: ChatBotProps) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: "👋 Hello! I'm MyGuys AI, your digital assistant. How can I help you today?\n\nI can answer questions about our services, provide quotes, or connect you with our team!" },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const [pulse, setPulse] = useState(true)

  useEffect(() => {
    if (open) {
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50)
    }
  }, [messages, open])

  useEffect(() => {
    const t = setTimeout(() => setPulse(false), 5000)
    return () => clearTimeout(t)
  }, [])

  const send = (text: string) => {
    if (!text.trim()) return
    const userMsg: Message = { role: 'user', text }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      const botMsg: Message = { role: 'bot', text: getResponse(text) }
      setMessages(prev => [...prev, botMsg])
      setTyping(false)
    }, 900 + Math.random() * 600)
  }

  return (
    <>
      {/* Floating Button */}
      <div style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 999 }}>
        {/* Pulse ring */}
        {pulse && !open && (
          <div style={{
            position: 'absolute',
            inset: -8,
            borderRadius: '50%',
            border: '2px solid rgba(37,99,235,0.5)',
            animation: 'pulse-ring 1.5s ease-out infinite',
          }} />
        )}

        {/* Notification badge */}
        {!open && (
          <div style={{
            position: 'absolute',
            top: -4,
            right: -4,
            width: 18,
            height: 18,
            background: '#10B981',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 10,
            color: 'white',
            fontWeight: 700,
            fontFamily: 'Poppins, sans-serif',
            border: '2px solid white',
            zIndex: 1,
          }}>
            1
          </div>
        )}

        <button
          onClick={() => setOpen(!open)}
          style={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #2563EB, #1D4ED8)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 24,
            boxShadow: '0 8px 25px rgba(37,99,235,0.45)',
            transition: 'transform 0.3s ease',
            transform: open ? 'rotate(10deg) scale(0.95)' : 'scale(1)',
          }}
          aria-label="Open AI Assistant"
        >
          {open ? '✕' : '🤖'}
        </button>
      </div>

      {/* Chat Window */}
      {open && (
        <div
          style={{
            position: 'fixed',
            bottom: 104,
            right: 28,
            width: 360,
            maxWidth: 'calc(100vw - 32px)',
            height: 520,
            background: darkMode ? '#111827' : '#FFFFFF',
            border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
            borderRadius: 20,
            boxShadow: '0 24px 60px rgba(0,0,0,0.18)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: 998,
            animation: 'fadeInUp 0.3s ease',
          }}
        >
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #2563EB, #1D4ED8)',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
              🤖
            </div>
            <div>
              <div style={{ color: 'white', fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 15 }}>MyGuys AI</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 7, height: 7, background: '#4ADE80', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 6px #4ADE80' }} />
                <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, fontFamily: 'Inter, sans-serif' }}>Online · Typically replies instantly</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 8px' }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    maxWidth: '82%',
                    padding: '10px 14px',
                    borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    background: msg.role === 'user'
                      ? 'linear-gradient(135deg, #2563EB, #1D4ED8)'
                      : darkMode ? '#1E293B' : '#F1F5F9',
                    color: msg.role === 'user' ? 'white' : darkMode ? '#CBD5E1' : '#334155',
                    fontSize: 13,
                    fontFamily: 'Inter, sans-serif',
                    lineHeight: 1.6,
                    whiteSpace: 'pre-line',
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {typing && (
              <div style={{ display: 'flex', gap: 4, padding: '10px 14px', background: darkMode ? '#1E293B' : '#F1F5F9', borderRadius: '16px 16px 16px 4px', width: 'fit-content', marginBottom: 12 }}>
                {[0, 1, 2].map(i => (
                  <div
                    key={i}
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: '50%',
                      background: '#94A3B8',
                      animation: `float ${0.8 + i * 0.15}s ease-in-out infinite`,
                      animationDelay: `${i * 0.15}s`,
                    }}
                  />
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Quick Replies */}
          <div style={{ padding: '0 12px 8px', display: 'flex', gap: 6, overflowX: 'auto' }}>
            {quickReplies.map(qr => (
              <button
                key={qr}
                onClick={() => send(qr)}
                style={{
                  flexShrink: 0,
                  padding: '6px 12px',
                  borderRadius: 100,
                  border: `1px solid ${darkMode ? 'rgba(37,99,235,0.4)' : 'rgba(37,99,235,0.3)'}`,
                  background: 'transparent',
                  color: '#2563EB',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 500,
                  fontSize: 11,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(37,99,235,0.1)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}
              >
                {qr}
              </button>
            ))}
          </div>

          {/* Input */}
          <div style={{
            padding: '12px 16px',
            borderTop: `1px solid ${darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)'}`,
            display: 'flex',
            gap: 8,
          }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input) } }}
              placeholder="Type a message..."
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: 10,
                border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                background: darkMode ? 'rgba(255,255,255,0.05)' : '#F8FAFC',
                color: darkMode ? '#F1F5F9' : '#0F172A',
                fontFamily: 'Inter, sans-serif',
                fontSize: 13,
                outline: 'none',
              }}
            />
            <button
              onClick={() => send(input)}
              disabled={!input.trim()}
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                border: 'none',
                background: input.trim() ? 'linear-gradient(135deg, #2563EB, #1D4ED8)' : darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                color: input.trim() ? 'white' : '#94A3B8',
                cursor: input.trim() ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 16,
                transition: 'all 0.2s ease',
                flexShrink: 0,
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  )
}
