import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import VehicleVisual from './VehicleVisual'
import Statistics from './Statistics'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, useGSAP)

const HEADLINE_TEXT = 'WELCOME ITZFIZZ'

export default function Hero() {
  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const roadRef = useRef(null)
  const carRef = useRef(null)
  const trailRef = useRef(null)
  const lettersRef = useRef([])
  const boxesRef = useRef([])
  const scrollPromptRef = useRef(null)
  const progressBadgeRef = useRef(null)

  const setBoxRef = (index, el) => {
    if (el) boxesRef.current[index] = el
  }

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const carEl = carRef.current
      const trailEl = trailRef.current
      const roadEl = roadRef.current
      const letters = lettersRef.current.filter(Boolean)
      const boxes = boxesRef.current.filter(Boolean)

      if (!carEl || !trailEl || !roadEl) return

      // Handle reduced motion preference gracefully
      if (prefersReducedMotion) {
        gsap.set(letters, { opacity: 1, y: 0 })
        gsap.set(boxes, { opacity: 1, y: 0, scale: 1 })
        gsap.set(trailEl, { width: '100%' })
        return
      }

      // Initial Entrance Timeline (smoother first view experience)
      const enterTl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      enterTl
        .fromTo(
          trackRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8 }
        )
        .fromTo(
          roadEl,
          { scaleY: 0.85, opacity: 0 },
          { scaleY: 1, opacity: 1, duration: 0.9 },
          '-=0.5'
        )
        .fromTo(
          carEl,
          { x: -140, opacity: 0 },
          { x: 0, opacity: 1, duration: 1, ease: 'back.out(1.2)' },
          '-=0.4'
        )
        .fromTo(
          scrollPromptRef.current,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          '-=0.3'
        )

      // Measure letters relative to the road container
      const getLetterMetrics = () => {
        if (!roadEl) return []
        const roadRect = roadEl.getBoundingClientRect()
        return letters.map((letter) => {
          if (!letter) return 0
          const rect = letter.getBoundingClientRect()
          // Calculate offset relative to road left
          return rect.left - roadRect.left
        })
      }

      let letterOffsets = getLetterMetrics()

      // Calculate end travel distance dynamically
      const getEndX = () => {
        const roadWidth = roadEl.offsetWidth || window.innerWidth
        const carWidth = carEl.offsetWidth || 180
        // Travel completely across the road leaving car front just kissing the right edge
        return Math.max(roadWidth - carWidth, 100)
      }

      // Master Scroll-Driven Timeline bound to ScrollTrigger
      const masterScrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.65, // Responsive, silky smooth scrubbing
          pin: trackRef.current,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: () => {
            letterOffsets = getLetterMetrics()
          },
          onUpdate: (self) => {
            // Update progress indicator badge if present
            if (progressBadgeRef.current) {
              const pct = Math.round(self.progress * 100)
              progressBadgeRef.current.innerText = `${pct}%`
            }
          },
        },
      })

      // 1. Car Movement & Trail Expansion with letter reveal logic
      masterScrollTimeline.to(
        carEl,
        {
          x: getEndX,
          ease: 'none',
          duration: 1,
          onUpdate: function () {
            const currentX = gsap.getProperty(carEl, 'x') || 0
            const carWidth = carEl.offsetWidth || 180
            // The front bumper of the car
            const carFrontX = currentX + carWidth * 0.72
            // The trail fills behind the front of the car
            const trailWidth = Math.max(0, currentX + carWidth * 0.45)

            gsap.set(trailEl, { width: trailWidth })

            // Reveal letters as car passes their position
            letters.forEach((letter, index) => {
              const letterX = letterOffsets[index] || 0
              if (carFrontX >= letterX) {
                if (letter.style.opacity !== '1') {
                  letter.style.opacity = '1'
                  letter.style.transform = 'translateY(0) scale(1)'
                }
              } else {
                if (letter.style.opacity !== '0') {
                  letter.style.opacity = '0'
                  letter.style.transform = 'translateY(4px) scale(0.92)'
                }
              }
            })
          },
        },
        0
      )

      // 2. Hide scroll guidance prompt as user scrolls
      masterScrollTimeline.to(
        scrollPromptRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.15,
          ease: 'power1.out',
        },
        0.02
      )

      // 3. Sequential Staggered Reveals for the 4 Stat Boxes
      // Box 1 (Lime Yellow 58%): top left/mid
      if (boxes[0]) {
        gsap.set(boxes[0], { opacity: 0, scale: 0.88, y: -20 })
        masterScrollTimeline.to(
          boxes[0],
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.22,
            ease: 'back.out(1.5)',
          },
          0.18
        )
      }

      // Box 2 (Sky Blue 23%): bottom left/mid
      if (boxes[1]) {
        gsap.set(boxes[1], { opacity: 0, scale: 0.88, y: 20 })
        masterScrollTimeline.to(
          boxes[1],
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.22,
            ease: 'back.out(1.5)',
          },
          0.38
        )
      }

      // Box 3 (Dark Charcoal 27%): top right
      if (boxes[2]) {
        gsap.set(boxes[2], { opacity: 0, scale: 0.88, y: -20 })
        masterScrollTimeline.to(
          boxes[2],
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.22,
            ease: 'back.out(1.5)',
          },
          0.58
        )
      }

      // Box 4 (Orange 40%): bottom right
      if (boxes[3]) {
        gsap.set(boxes[3], { opacity: 0, scale: 0.88, y: 20 })
        masterScrollTimeline.to(
          boxes[3],
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.22,
            ease: 'back.out(1.5)',
          },
          0.76
        )
      }

      // Clean up timelines on unmount
      return () => {
        masterScrollTimeline.scrollTrigger?.kill()
        masterScrollTimeline.kill()
        enterTl.kill()
      }
    },
    { scope: containerRef }
  )

  // Split characters including spaces
  const lettersArray = HEADLINE_TEXT.split('')

  return (
    <section
      ref={containerRef}
      className="scroll-hero-section h-[320vh] select-none"
      id="hero-track"
      aria-label="Interactive Car Scroll Hero Animation"
    >
      {/* Sticky Pinned Track Viewport */}
      <div ref={trackRef} className="track-viewport">
        {/* Subtle Ambient Background Track Details */}
        <div className="absolute inset-0 bg-[#cfcfcf] opacity-100 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.7)_0%,transparent_75%)] pointer-events-none" />
        
        {/* Top & Bottom Subdued Track Guidance with Note */}
        <div className="absolute top-20 left-8 hidden lg:flex items-center gap-3 text-neutral-600 font-mono text-[11px] font-semibold tracking-widest uppercase">
          <span className="w-2 h-2 rounded-full bg-neutral-500" />
          <span>STAGE / 01 — HORIZONTAL VELOCITY</span>
          <span className="text-neutral-400">|</span>
          <span className="px-2 py-0.5 rounded-full bg-black/5 border border-black/10 text-neutral-700 font-sans normal-case tracking-normal text-[11px] font-medium flex items-center gap-1.5">
            <span>📌 Note:</span>
            <span>Scroll smoothly to steer McLaren & reveal metrics</span>
          </span>
        </div>

        {/* Mobile / Tablet Compact Note Pill */}
        <div className="absolute top-16 left-1/2 -translate-x-1/2 lg:hidden flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/10 backdrop-blur-sm border border-black/10 text-neutral-800 text-[10px] font-semibold tracking-wide">
          <span>📌 Note:</span>
          <span>Scroll down to drive & reveal</span>
        </div>

        <div className="absolute top-20 right-8 hidden lg:flex items-center gap-2 px-3 py-1 bg-black/5 rounded-full border border-black/10 text-neutral-700 font-mono text-[11px] font-semibold">
          <span>PROGRESS:</span>
          <span ref={progressBadgeRef} className="text-black font-bold">0%</span>
        </div>

        {/* 4 Impact Statistics Boxes around the road */}
        <Statistics setBoxRef={setBoxRef} />

        {/* Horizontal Road Running Through Center */}
        <div ref={roadRef} className="road-container" id="road">
          {/* Road Curbs (Red and White Racing Kerbs) */}
          <div className="road-curb-top" />
          <div className="road-curb-bottom" />

          {/* Road Asphalt Texture */}
          <div className="road-texture" />

          {/* Dashed Centerline */}
          <div className="absolute top-1/2 left-0 right-0 h-0 border-t-2 border-dashed border-white/20 -translate-y-1/2 z-[1] pointer-events-none" />

          {/* Green Speed Trail */}
          <div ref={trailRef} className="speed-trail" id="trail" />

          {/* Letters: WELCOME ITZFIZZ */}
          <div
            className="welcome-letters-wrapper"
            id="valueText"
            aria-label="Welcome Itz Fizz"
          >
            {lettersArray.map((char, index) => (
              <span
                key={`${char}-${index}`}
                ref={(el) => {
                  lettersRef.current[index] = el
                }}
                className={`welcome-letter ${char === ' ' ? 'space' : ''}`}
                aria-hidden="true"
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </div>

          {/* Animated Sports Car Visual */}
          <VehicleVisual ref={carRef} id="car" />
        </div>

        {/* Floating Scroll Down Prompt */}
        <div
          ref={scrollPromptRef}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-20"
        >
          <div className="px-4 py-2 rounded-full bg-black/85 backdrop-blur-md text-white text-xs font-bold tracking-widest uppercase shadow-xl flex items-center gap-2 border border-white/10">
            <span>SCROLL DOWN TO DRIVE</span>
            <svg
              className="w-4 h-4 text-[#45db7d] animate-bounce"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
          <span className="text-[10px] text-neutral-600 font-medium tracking-wide">
            REVERSES ON SCROLL UP
          </span>
        </div>
      </div>
    </section>
  )
}
