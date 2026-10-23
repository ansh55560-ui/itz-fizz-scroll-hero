import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FeaturesSection from './components/FeaturesSection'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-[#121212] text-white selection:bg-[#45db7d] selection:text-black">
      <Navbar />
      <main id="main-content">
        <Hero />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  )
}
