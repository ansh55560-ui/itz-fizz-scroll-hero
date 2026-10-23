import React from 'react'

export default function FeaturesSection() {
  const jumpToProgress = (pct) => {
    const heroEl = document.getElementById('hero-track')
    if (!heroEl) return
    const rect = heroEl.getBoundingClientRect()
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const heroTop = rect.top + scrollTop
    const heroHeight = heroEl.offsetHeight - window.innerHeight
    const targetScroll = heroTop + (heroHeight * pct)
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    })
  }

  const features = [
    {
      badge: 'GSAP 3.12 + ScrollTrigger',
      title: 'Scrubbed Velocity Control',
      description: 'Zero audio-stutter or layout thrashing. Object coordinates, trail width, and letter reveals are directly synchronized with the browser scroll engine.',
      icon: '⚡',
    },
    {
      badge: 'React 19 + @gsap/react',
      title: 'Scoped Component Lifecycle',
      description: 'Safe for StrictMode double-mounting with automatic trigger teardown and dynamic recalculations across all responsive viewports.',
      icon: '🛡️',
    },
    {
      badge: 'Hardware Accelerated',
      title: 'Sub-pixel Transform Engine',
      description: 'Zero paint bottleneck using GPU-accelerated CSS transforms and composited opacity changes running at a silky 60-120 FPS.',
      icon: '🏎️',
    },
    {
      badge: 'Accessible & Responsive',
      title: 'Universal Device Scaling',
      description: 'Fluid clamp scaling, mobile touch support, full keyboard accessibility, and respect for prefers-reduced-motion media queries.',
      icon: '📱',
    },
  ]

  return (
    <section id="features" className="relative z-20 bg-[#121212] py-24 px-6 md:px-12 text-white border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        {/* Quick Jump Scrubbing Dock */}
        <div className="mb-20 p-6 md:p-8 rounded-2xl bg-neutral-900/90 border border-white/10 shadow-2xl backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#45db7d]" />
              <h3 className="font-heading font-bold text-lg text-white">Interactive Drive Positioner</h3>
            </div>
            <p className="text-sm text-neutral-400">
              Jump to any stage of the hero animation or drive in reverse:
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {[
              { label: 'Start (0%)', val: 0 },
              { label: 'Stage 1 (25%)', val: 0.25 },
              { label: 'Stage 2 (50%)', val: 0.5 },
              { label: 'Stage 3 (75%)', val: 0.75 },
              { label: 'Finish (100%)', val: 1.0 },
            ].map((btn) => (
              <button
                key={btn.label}
                onClick={() => jumpToProgress(btn.val)}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-neutral-800 hover:bg-[#45db7d] hover:text-black border border-white/10 transition-all duration-200 active:scale-95 cursor-pointer"
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase bg-[#45db7d]/10 text-[#45db7d] border border-[#45db7d]/20 mb-4 inline-block">
            ARCHITECTURAL HIGHLIGHTS
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Built for Extreme Speed & Visual Fidelity
          </h2>
          <p className="text-neutral-400 text-base">
            Every millimeter of vehicle travel is calculated with sub-pixel precision, delivering an unforgettable branded hero experience.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-gradient-to-b from-neutral-900 to-neutral-900/50 border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <span className="text-[11px] font-mono font-semibold tracking-wider uppercase text-[#45db7d] block mb-2">
                {item.badge}
              </span>
              <h3 className="font-heading text-xl font-bold mb-3 text-white">
                {item.title}
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Impact Metrics Summary Table */}
        <div className="p-8 rounded-2xl bg-neutral-900/60 border border-white/10">
          <h3 className="font-heading font-bold text-xl mb-6 flex items-center gap-3">
            <span className="text-[#45db7d]">●</span> Reference Metrics Specification
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div className="p-4 rounded-xl bg-neutral-800/60 border border-white/5">
              <span className="text-3xl font-heading font-extrabold text-[#def54f] block mb-1">58%</span>
              <span className="text-xs text-neutral-300 font-medium">Pick up point usage increase</span>
            </div>
            <div className="p-4 rounded-xl bg-neutral-800/60 border border-white/5">
              <span className="text-3xl font-heading font-extrabold text-[#6ac9ff] block mb-1">23%</span>
              <span className="text-xs text-neutral-300 font-medium">Customer phone calls decreased</span>
            </div>
            <div className="p-4 rounded-xl bg-neutral-800/60 border border-white/5">
              <span className="text-3xl font-heading font-extrabold text-white block mb-1">27%</span>
              <span className="text-xs text-neutral-300 font-medium">Secondary hub efficiency gain</span>
            </div>
            <div className="p-4 rounded-xl bg-neutral-800/60 border border-white/5">
              <span className="text-3xl font-heading font-extrabold text-[#fa7328] block mb-1">40%</span>
              <span className="text-xs text-neutral-300 font-medium">Direct inbound inquiry reduction</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
