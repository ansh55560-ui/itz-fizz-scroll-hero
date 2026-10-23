import React from 'react'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <footer className="relative z-20 bg-neutral-950 border-t border-white/10 py-12 px-6 md:px-12 text-neutral-400 text-xs">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-md bg-[#45db7d] text-black font-heading font-black text-xs flex items-center justify-center">
            IF
          </div>
          <span className="font-heading font-bold text-white text-sm">
            ITZFIZZ SCROLL EXPERIENCE
          </span>
          <span className="text-neutral-600">|</span>
          <span>Inspired by Paras Chaturvedi Car Scroll Animation</span>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-[#45db7d] transition-colors cursor-pointer group"
          >
            <span>BACK TO TOP</span>
            <span className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-xs group-hover:-translate-y-0.5 transition-transform">
              ↑
            </span>
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500 text-[11px]">
        <p>© {new Date().getFullYear()} ITZFIZZ Production Assignment. All rights reserved.</p>
        <p className="flex items-center gap-3">
          <span>React 19</span>
          <span>•</span>
          <span>Vite 6</span>
          <span>•</span>
          <span>Tailwind CSS v4</span>
          <span>•</span>
          <span>GSAP 3.12</span>
        </p>
      </div>
    </footer>
  )
}
