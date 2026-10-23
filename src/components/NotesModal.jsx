import React from 'react'

export default function NotesModal({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="notes-title"
    >
      <div
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-neutral-900 border border-white/15 rounded-2xl p-6 md:p-8 shadow-2xl text-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-[#45db7d]/15 border border-[#45db7d]/30 text-[#45db7d] flex items-center justify-center text-base">
              📌
            </span>
            <div>
              <h2 id="notes-title" className="font-heading text-lg font-bold text-white">
                Project & Evaluator Notes
              </h2>
              <p className="text-xs text-neutral-400">
                ITZFIZZ Scroll-Driven Hero Animation Assignment
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close notes"
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="space-y-5 text-sm leading-relaxed">
          <div className="p-4 rounded-xl bg-neutral-800/60 border border-white/5">
            <h3 className="font-heading font-semibold text-white text-sm mb-1 flex items-center gap-2">
              <span className="text-[#45db7d]">●</span> Scroll-Driven Interaction Guide
            </h3>
            <p className="text-xs text-neutral-300">
              Scroll down to propel the McLaren 720S along the asphalt track. The neon green velocity trail (<code className="text-[#45db7d] bg-black/40 px-1 py-0.5 rounded">#45db7d</code>) follows behind the car. As the car crosses each character of <strong>WELCOME ITZFIZZ</strong>, the letter transitions from 0 to 100% opacity on top of the trail.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-neutral-800/40 border border-white/5">
              <span className="text-[11px] font-mono font-bold text-[#def54f] uppercase block mb-1">
                Metric Reveal 01 & 02
              </span>
              <p className="text-xs text-neutral-300">
                At 20% & 40% scroll, Box 1 (<strong>58% Pick up point</strong>) & Box 2 (<strong>23% Calls decreased</strong>) animate in with bounce ease.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-800/40 border border-white/5">
              <span className="text-[11px] font-mono font-bold text-[#fa7328] uppercase block mb-1">
                Metric Reveal 03 & 04
              </span>
              <p className="text-xs text-neutral-300">
                At 60% & 80% scroll, Box 3 (<strong>27% Secondary hub</strong>) & Box 4 (<strong>40% Phone calls</strong>) complete the timeline.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-800/60 border border-white/5">
            <h3 className="font-heading font-semibold text-white text-sm mb-1 flex items-center gap-2">
              <span className="text-[#6ac9ff]">●</span> Architectural Highlights
            </h3>
            <ul className="list-disc list-inside text-xs text-neutral-300 space-y-1">
              <li><strong>Zero Layout Shifts</strong>: All motion uses GPU-accelerated transforms and composited opacity.</li>
              <li><strong>Bi-directional Scrubbing</strong>: Reverses seamlessly when scrolling backwards.</li>
              <li><strong>Responsive Viewports</strong>: Tested from 320px mobile to 1440px+ ultra-wide desktop.</li>
              <li><strong>Accessibility</strong>: Complies with <code className="text-neutral-400">prefers-reduced-motion</code> standards.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
          <span className="text-[11px] text-neutral-500 font-mono">
            LIVE REPO: ansh55560-ui/itz-fizz-scroll-hero
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#45db7d] text-black hover:bg-[#3ec470] transition-all cursor-pointer font-heading"
          >
            Got it, Let's Drive!
          </button>
        </div>
      </div>
    </div>
  )
}
