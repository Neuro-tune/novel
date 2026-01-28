"use client"



import { useState, useCallback } from "react"

import { AnimatePresence, motion } from "framer-motion"

import { getSceneById, storyData, getDynamicText, getOutfitImage, getDynamicBackground, type OutfitType } from "@/lib/story-data"

import { StartScreen } from "./start-screen"

import { BackgroundLayer } from "./background-layer"

import { CharacterLayer } from "./character-layer"

import { VignetteOverlay } from "./vignette-overlay"

import { DialogueBox } from "./dialogue-box"

import { ChoicesPanel } from "./choices-panel"

import { AudioManager } from "./audio-manager"



export function GameEngine() {

  const [gameStarted, setGameStarted] = useState(false)

  const [currentSceneId, setCurrentSceneId] = useState("wakeup") // Start from "wakeup"

  const [isTyping, setIsTyping] = useState(true)

  const [showChoices, setShowChoices] = useState(false)

  const [selectedOutfit, setSelectedOutfit] = useState<OutfitType>(null)

  const [isShaking, setIsShaking] = useState(false)



  const currentScene = getSceneById(currentSceneId) || storyData[0]



  const resolvedText = getDynamicText(currentScene, selectedOutfit)



  const resolvedCharacter = currentScene.dynamicImage ? getOutfitImage(selectedOutfit) : currentScene.character



  const resolvedBackground = getDynamicBackground(currentScene, selectedOutfit)



  const handleStart = useCallback(() => {

    setGameStarted(true)

    setIsTyping(true)

    setShowChoices(false)

    setSelectedOutfit(null)

  }, [])



  const handleTypingComplete = useCallback(() => {

    setIsTyping(false)

    setShowChoices(true)

  }, [])



  const handleSkipTyping = useCallback(() => {

    setIsTyping(false)

    setShowChoices(true)

  }, [])



  const handleChoiceSelect = useCallback((nextSceneId: string, outfit?: OutfitType) => {

    // If choice sets an outfit, save it to state

    if (outfit) {

      setSelectedOutfit(outfit)

    }



    setShowChoices(false)

    setIsTyping(true)

    setCurrentSceneId(nextSceneId)



    // Check if next scene has shake effect

    const nextScene = getSceneById(nextSceneId)

    if (nextScene?.effect === "shake") {

      setIsShaking(true)

      setTimeout(() => setIsShaking(false), 500)

    }

  }, [])



  return (

    <div className="fixed inset-0 overflow-hidden bg-background">

      <AnimatePresence mode="wait">

        {!gameStarted ? (

          <StartScreen key="start" onStart={handleStart} />

        ) : (

          <motion.div

            key="game"

            className="relative h-full w-full"

            animate={isShaking ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}

            transition={{ duration: 0.5 }}

          >

            {/* Layer 0: Background with Ken Burns effect */}

            <BackgroundLayer src={resolvedBackground} sceneId={currentScene.id} />



            {/* Layer 1: Character sprite (now with dynamic outfit support) */}

            <CharacterLayer src={resolvedCharacter} sceneId={currentScene.id} />



            {/* Layer 2: Vignette overlay */}

            <VignetteOverlay />



            {/* Layer 3: Dialogue box (now with dynamic text) */}

            <DialogueBox

              speaker={currentScene.speaker}

              text={resolvedText}

              onComplete={handleTypingComplete}

              isTyping={isTyping}

              onSkip={handleSkipTyping}

            />



            {/* Layer 4: Choices panel (now passes outfit setter) */}

            <ChoicesPanel

              choices={currentScene.choices}

              onChoiceSelect={handleChoiceSelect}

              show={showChoices}

              isWardrobeChoice={currentScene.id === "wardrobe_choice"}

            />



            {/* Audio Manager */}

            <AudioManager
              src={currentScene.music ?? ""}
              volume={currentScene.volume ?? 1.0}
              isPlaying={gameStarted}
              loop={currentScene.loop ?? true}
            />

          </motion.div>

        )}

      </AnimatePresence>

    </div>

  )

}