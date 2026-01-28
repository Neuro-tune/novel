"use client"

import { motion } from "framer-motion"
import type { Choice, OutfitType } from "@/lib/story-data"

interface ChoicesPanelProps {
  choices: Choice[]
  onChoiceSelect: (nextSceneId: string, outfit?: OutfitType) => void
  show: boolean
  isWardrobeChoice?: boolean
}

export function ChoicesPanel({ choices, onChoiceSelect, show, isWardrobeChoice = false }: ChoicesPanelProps) {
  if (!show || choices.length === 0) return null

  // Horizontal layout for wardrobe choices (3 outfit options)
  if (isWardrobeChoice) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute bottom-[180px] sm:bottom-[200px] inset-x-0 z-40 mx-auto max-w-4xl grid grid-cols-3 gap-4 px-4 sm:px-6"
      >
        {choices.map((choice, index) => (
          <motion.button
            key={choice.nextSceneId + choice.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChoiceSelect(choice.nextSceneId, choice.setOutfit)}
            className={`rounded-xl border border-primary/30 bg-black/70 backdrop-blur-sm px-4 sm:px-6 py-3 sm:py-4 text-center text-foreground transition-all hover:border-primary hover:bg-primary/10 hover:shadow-lg hover:shadow-primary/20 whitespace-nowrap ${index === 0
                ? "justify-self-start"
                : index === 1
                  ? "justify-self-center"
                  : "justify-self-end"
              }`}
          >
            <span className="font-medium text-sm sm:text-base">{choice.label}</span>
          </motion.button>
        ))}
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute bottom-[200px] sm:bottom-[220px] inset-x-0 z-40 flex flex-col items-center gap-3 px-4"
    >
      {choices.map((choice, index) => (
        <motion.button
          key={choice.nextSceneId + choice.label}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02, x: 5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onChoiceSelect(choice.nextSceneId, choice.setOutfit)}
          className="w-full max-w-md rounded-xl border border-primary/30 bg-black/70 backdrop-blur-sm px-6 py-4 text-left text-foreground transition-all hover:border-primary hover:bg-primary/10 hover:shadow-lg hover:shadow-primary/20"
        >
          <span className="font-medium">{choice.label}</span>
        </motion.button>
      ))}
    </motion.div>
  )
}
