"use client"

export function VignetteOverlay() {
  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      {/* Top gradient for readability */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/40 to-transparent" />

      {/* Bottom gradient for dialogue box */}
      <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

      {/* Vignette corners */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
    </div>
  )
}
