"use client"

import { motion, AnimatePresence } from "framer-motion"

interface CharacterLayerProps {
  src: string | null
  sceneId: string
}

export function CharacterLayer({ src, sceneId }: CharacterLayerProps) {
  if (!src) return null

  return (
    <div className="absolute inset-0 z-10 flex items-end justify-center pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={`${sceneId}-${src}`}
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative h-[60%] sm:h-[70%] w-auto max-w-[80%]"
        >
          <img
            src={src || "/placeholder.svg"}
            alt="Character"
            className="h-full w-auto object-contain drop-shadow-2xl"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
