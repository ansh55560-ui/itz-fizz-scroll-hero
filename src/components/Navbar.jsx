import React, { useState } from 'react'
import NotesModal from './NotesModal'

export default function Navbar() {
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [notesOpen, setNotesOpen] = useState(false)

  // Synthetic engine hum using Web Audio API (zero external asset dependency)
  const toggleSound = () => {
    try {
      const next = !soundEnabled
      setSoundEnabled(next)
      if (next && window.AudioContext) {
        const ctx = new (window.AudioContext || window.webkitAudioContext)()
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sawtooth'
        osc.frequency.setValueAtTime(65, ctx.currentTime)
        gain.gain.setValueAtTime(0.04, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start()
        osc.stop(ctx.currentTime + 1.2)
      }
    } catch {
      // Audio playback silent fallback
    }
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-3.5 flex items-center justify-between pointer-events-auto backdrop-blur-md bg-[#121212]/80 border-b border-white/10 transition-all duration-300">
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="flex items-center gap-2 group focus:outline-none"
            aria-label="ITZFIZZ Home"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#45db7d] to-[#16a34a] flex items-center justify-center font-heading font-black text-black text-sm shadow-[0_0_15px_rgba(69,219,125,0.4)] group-hover:scale-105 transition-transform">
              IF
            </div>
            <span className="font-heading font-extrabold text-lg tracking-tight text-white flex items-center">
              ITZFIZZ<span className="text-[#45db7d]">.</span>
            </span>
          </a>

          <div className="hidden sm:flex items-center gap-2 ml-3 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-medium text-neutral-300">
            <span className="w-2 h-2 rounded-full bg-[#45db7d] animate-pulse" />
            <span>SCROLL ENGINE ACTIVE</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Notes Trigger Button */}
          <button
            onClick={() => setNotesOpen(true)}
            type="button"
            aria-label="Open Project and Evaluator Notes"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#def54f]/15 hover:bg-[#def54f]/25 text-[#def54f] border border-[#def54f]/30 transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <span>📌</span>
            <span className="font-heading">Notes</span>
          </button>

          {/* Rev Sound Toggle */}
          <button
            onClick={toggleSound}
            type="button"
            aria-label={soundEnabled ? 'Mute engine audio' : 'Enable engine audio'}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/10 transition-colors cursor-pointer"
          >
            <span>{soundEnabled ? '🔊 REV ON' : '🔈 REV OFF'}</span>
          </button>

          <a
            href="#features"
            className="hidden sm:inline-block text-xs font-semibold px-3 py-1.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-white/10 transition-all"
          >
            Specs
          </a>

          <a
            href="https://github.com/ansh55560-ui/itz-fizz-scroll-hero"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-full bg-[#45db7d] hover:bg-[#3ec470] text-black shadow-sm transition-all hover:shadow-[0_0_14px_rgba(69,219,125,0.5)] active:scale-95"
          >
            <span>GitHub</span>
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        </div>
      </header>

      {/* Evaluator and Project Notes Modal */}
      <NotesModal isOpen={notesOpen} onClose={() => setNotesOpen(false)} />
    </>
  )
}
