"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

interface BackgroundLayerProps {
  src: string
  sceneId: string
}

export function BackgroundLayer({ src, sceneId }: BackgroundLayerProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  // Scenes where the background should be static (no Ken Burns effect)
  const STATIC_SCENES = [
    "wakeup",
    "blanket_fort",
    "intro_call",
    "meet_producer",
    "meet_producer_force",
    "magic_explanation",
    "finale",
    "credits",
  ]

  const isStatic = STATIC_SCENES.includes(sceneId)

  useEffect(() => {
    setImageLoaded(false)
    const img = new window.Image()
    img.crossOrigin = "anonymous"
    img.src = src
    img.onload = () => setImageLoaded(true)
  }, [src])

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={src}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{
            opacity: imageLoaded ? 1 : 0,
            scale: 1,
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0"
        >
          {/* Ken Burns effect - slow zoom and pan */}
          <motion.img
            src={src}
            alt="Scene background"
            crossOrigin="anonymous"
            className="h-full w-full object-cover"
            animate={
              isStatic
                ? undefined
                : {
                  scale: [1, 1.1],
                  x: [0, 20],
                  y: [0, -10],
                }
            }
            transition={
              isStatic
                ? undefined
                : {
                  duration: 20,
                  ease: "linear",
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }
            }
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
