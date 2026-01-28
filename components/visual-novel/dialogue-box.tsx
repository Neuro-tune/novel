"use client"

import { motion } from "framer-motion"
import { useTypewriter } from "@/hooks/use-typewriter"
import { useEffect } from "react"

interface DialogueBoxProps {
  speaker: string
  text: string
  onComplete: () => void
  isTyping: boolean
  onSkip: () => void
}

export function DialogueBox({ speaker, text, onComplete, isTyping, onSkip }: DialogueBoxProps) {
  const { displayText, isComplete } = useTypewriter(text, 30, isTyping)

  useEffect(() => {
    if (isComplete) {
      onComplete()
    }
  }, [isComplete, onComplete])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute bottom-0 inset-x-0 z-30 p-4 sm:p-6"
      onClick={!isComplete ? onSkip : undefined}
    >
      <div className="mx-auto max-w-4xl">
        {/* Glassmorphism dialogue container */}
        <div className="rounded-2xl border border-white/10 bg-black/60 backdrop-blur-md p-4 sm:p-6 shadow-2xl">
          {/* Speaker name */}
          <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="mb-3">
            <span className="inline-block rounded-full bg-primary/20 px-4 py-1 font-serif text-lg font-semibold text-primary">
              {speaker}
            </span>
          </motion.div>

          {/* Dialogue text */}
          <p className="min-h-[4rem] text-base leading-relaxed text-foreground/90 sm:text-lg sm:leading-relaxed">
            {displayText}
            {!isComplete && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
                className="inline-block ml-1 h-5 w-0.5 bg-primary"
              />
            )}
          </p>

          {/* Click to continue indicator */}
          {!isComplete && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              className="mt-3 text-xs text-muted-foreground"
            >
              Tap to skip...
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  )
}
