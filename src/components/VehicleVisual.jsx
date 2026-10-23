import React, { forwardRef, useState } from 'react'

/**
 * Top-down McLaren 720S Vehicle Component
 * Uses high-res PNG from the reference, with automatic base path resolution
 * and an inline SVG fallback in case of network issues.
 */
const VehicleVisual = forwardRef(({ className = '', ...props }, ref) => {
  const [imageFailed, setImageFailed] = useState(false)
  const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '')
  const carImageUrl = `${baseUrl}/images/car.png`

  return (
    <div
      ref={ref}
      className={`car-actor ${className}`}
      aria-label="McLaren 720S Sports Car"
      role="img"
      {...props}
    >
      {!imageFailed ? (
        <img
          src={carImageUrl}
          alt="McLaren 720S 2022 Top View"
          onError={() => setImageFailed(true)}
          className="select-none pointer-events-none drop-shadow-2xl"
          draggable={false}
        />
      ) : (
        /* High-fidelity top-down sports car SVG fallback */
        <svg
          viewBox="0 0 520 220"
          className="w-auto h-full max-h-[220px] select-none pointer-events-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Car Ground Shadow */}
          <ellipse cx="260" cy="110" rx="230" ry="85" fill="#000000" opacity="0.45" filter="blur(8px)" />
          
          {/* Wheels (4 corners) */}
          <rect x="75" y="16" width="70" height="26" rx="8" fill="#111" stroke="#333" strokeWidth="2" />
          <rect x="375" y="16" width="70" height="26" rx="8" fill="#111" stroke="#333" strokeWidth="2" />
          <rect x="75" y="178" width="70" height="26" rx="8" fill="#111" stroke="#333" strokeWidth="2" />
          <rect x="375" y="178" width="70" height="26" rx="8" fill="#111" stroke="#333" strokeWidth="2" />

          {/* Aerodynamic Body Shell (Orange Papaya McLaren tone) */}
          <path
            d="M50 110 C50 60 90 35 150 32 L360 32 C430 35 480 70 495 110 C480 150 430 185 360 188 L150 188 C90 185 50 160 50 110 Z"
            fill="url(#mclarenOrange)"
            stroke="#b84507"
            strokeWidth="3"
          />

          {/* Carbon Fiber Diffuser / Rear Wing */}
          <path d="M42 90 L32 75 L32 145 L42 130 Z" fill="#18181b" stroke="#27272a" />
          <rect x="25" y="65" width="14" height="90" rx="3" fill="#09090b" />

          {/* Windshield & Canopy */}
          <path
            d="M170 60 C230 45 310 45 350 60 C370 70 380 90 380 110 C380 130 370 150 350 160 C310 175 230 175 170 160 C150 148 140 130 140 110 C140 90 150 72 170 60 Z"
            fill="url(#cockpitGlass)"
            stroke="#383838"
            strokeWidth="2"
          />

          {/* Roof Scoop & Engine Cover */}
          <path d="M190 85 L280 85 L260 135 L190 135 Z" fill="#1c1917" opacity="0.9" />
          <line x1="200" y1="95" x2="250" y2="95" stroke="#444" strokeWidth="2" />
          <line x1="195" y1="110" x2="245" y2="110" stroke="#444" strokeWidth="2" />
          <line x1="190" y1="125" x2="240" y2="125" stroke="#444" strokeWidth="2" />

          {/* Hood Vents & McLaren Headlights */}
          <path d="M420 70 C445 74 465 85 470 95 C450 92 430 84 420 70 Z" fill="#09090b" />
          <path d="M420 150 C445 146 465 135 470 125 C450 128 430 136 420 150 Z" fill="#09090b" />
          <path d="M455 82 L480 92 L455 90 Z" fill="#fef08a" opacity="0.95" />
          <path d="M455 138 L480 128 L455 130 Z" fill="#fef08a" opacity="0.95" />

          {/* Gradients */}
          <defs>
            <linearGradient id="mclarenOrange" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fa7328" />
              <stop offset="45%" stopColor="#f97316" />
              <stop offset="85%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#c2410c" />
            </linearGradient>
            <linearGradient id="cockpitGlass" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#09090b" />
              <stop offset="50%" stopColor="#27272a" />
              <stop offset="100%" stopColor="#09090b" />
            </linearGradient>
          </defs>
        </svg>
      )}
    </div>
  )
})

VehicleVisual.displayName = 'VehicleVisual'

export default VehicleVisual
