"use client"

import { useState, useEffect, useCallback } from "react"

export function useTypewriter(text: string, speed = 30, enabled = true) {
  const [displayText, setDisplayText] = useState("")
  const [isComplete, setIsComplete] = useState(false)

  const skipToEnd = useCallback(() => {
    setDisplayText(text)
    setIsComplete(true)
  }, [text])

  useEffect(() => {
    if (!enabled) {
      skipToEnd()
      return
    }

    setDisplayText("")
    setIsComplete(false)

    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        setIsComplete(true)
        clearInterval(interval)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed, enabled, skipToEnd])

  return { displayText, isComplete, skipToEnd }
}
