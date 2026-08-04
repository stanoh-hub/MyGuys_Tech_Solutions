import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Products from './components/Products'
import Portfolio from './components/Portfolio'
import Pricing from './components/Pricing'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ChatBot from './components/ChatBot'

export default function App() {
  const [darkMode, setDarkMode] = useState(true)

  return (
    <div className={darkMode ? 'dark' : ''} style={{ minHeight: '100vh', background: darkMode ? '#0A0F1E' : '#F8FAFC' }}>
      <Navbar darkMode={darkMode} toggleDark={() => setDarkMode(d => !d)} />
      <main>
        <Hero darkMode={darkMode} />
        <About darkMode={darkMode} />
        <Services darkMode={darkMode} />
        <Products darkMode={darkMode} />
        <Portfolio darkMode={darkMode} />
        <Pricing darkMode={darkMode} />
        <Testimonials darkMode={darkMode} />
        <FAQ darkMode={darkMode} />
        <Contact darkMode={darkMode} />
      </main>
      <Footer darkMode={darkMode} />
      <ChatBot darkMode={darkMode} />
    </div>
  )
}
