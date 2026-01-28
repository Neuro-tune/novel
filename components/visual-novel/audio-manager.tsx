"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Volume2, VolumeX } from "lucide-react"

interface AudioManagerProps {
  src: string
  volume: number
  isPlaying: boolean
  loop?: boolean
}

class AudioController {
  private currentAudio: HTMLAudioElement
  private outgoingAudio: HTMLAudioElement | null = null
  private fadeInterval: NodeJS.Timeout | null = null
  private readonly FADE_DURATION = 1000 // 2 seconds fade
  private readonly FADE_STEPS = 20 // Number of steps for fade
  private targetVolume: number = 1.0

  constructor() {
    this.currentAudio = new Audio()
    this.currentAudio.loop = true
  }

  public setTargetVolume(vol: number) {
    this.targetVolume = Math.max(0, Math.min(1, vol))
    // If we are just playing normally (no fade in progress), adjust immediately or smooth transition?
    // The requirement says "adjust the volume smoothly if needed" for same track.
    // For simplicity in this "No Libraries" approach, if track is same, we'll just let the fade logic handle it or set it.
    // But if we are already playing, let's just update the volume if no transition is happening.
    if (!this.outgoingAudio && !this.fadeInterval) {
      this.currentAudio.volume = this.targetVolume
    }
  }

  public play(src: string, volume: number, loop: boolean = true) {
    // Update target volume immediately
    this.targetVolume = Math.max(0, Math.min(1, volume))

    // 1. If same track, just ensure it's playing and adjust volume
    // Note: src might be empty string or null from prop, but we expect string here.
    // If src is empty, we treat it as "stop/silence".

    const isSameTrack = this.currentAudio.src.endsWith(src) && src !== "" && this.currentAudio.src !== ""

    if (isSameTrack) {
      if (this.currentAudio.paused) {
        this.currentAudio.play().catch(console.error)
      }
      // Smooth volume adjustment
      this.fadeVolumeTo(this.currentAudio, this.targetVolume)
      return
    }

    // 2. If different track (or silence), start transition
    this.startTransition(src, loop)
  }

  private startTransition(newSrc: string, loop: boolean) {
    // Clear any existing fade interval to avoid conflicts
    if (this.fadeInterval) {
      clearInterval(this.fadeInterval)
      this.fadeInterval = null
    }

    // If we have an outgoing audio stuck from a previous rapid change, kill it
    if (this.outgoingAudio) {
      this.outgoingAudio.pause()
      this.outgoingAudio = null
    }

    // The current track becomes the outgoing track
    let initialOutgoingVol = 0
    if (!this.currentAudio.paused && this.currentAudio.src) {
      this.outgoingAudio = this.currentAudio
      initialOutgoingVol = this.outgoingAudio.volume // Capture current volume
      // Create a new element for the new track
      this.currentAudio = new Audio()
    } else {
      // If nothing was playing, we don't need an outgoing track, just start the new one
      // Reuse currentAudio object
    }

    // Set loop for the new track
    this.currentAudio.loop = loop

    // Setup new track
    if (newSrc) {
      this.currentAudio.src = newSrc
      this.currentAudio.volume = 0 // Start silent
      this.currentAudio.play().catch(console.error)
    }

    // Start crossfade
    const stepTime = this.FADE_DURATION / this.FADE_STEPS
    // const volStep = 1.0 / this.FADE_STEPS // Not used directly anymore

    let stepCount = 0

    this.fadeInterval = setInterval(() => {
      stepCount++
      const progress = stepCount / this.FADE_STEPS // 0.0 to 1.0

      // Fade IN new track (to targetVolume)
      if (newSrc && this.currentAudio) {
        const newVol = progress * this.targetVolume
        this.currentAudio.volume = Math.min(this.targetVolume, Math.max(0, newVol))
      }

      // Fade OUT old track (from captured initial volume to 0)
      if (this.outgoingAudio) {
        const newOutgoingVol = initialOutgoingVol * (1 - progress)
        this.outgoingAudio.volume = Math.max(0, newOutgoingVol)
      }

      if (stepCount >= this.FADE_STEPS) {
        // Done
        if (this.fadeInterval) clearInterval(this.fadeInterval)
        this.fadeInterval = null

        // Cleanup outgoing
        if (this.outgoingAudio) {
          this.outgoingAudio.pause()
          this.outgoingAudio = null
        }

        // Ensure final volume is exact
        if (newSrc && this.currentAudio) {
          this.currentAudio.volume = this.targetVolume
        }
      }
    }, stepTime)
  }

  // Helper for smooth volume change on same track
  private fadeVolumeTo(audio: HTMLAudioElement, target: number) {
    // Simple interval to move volume towards target
    // We can reuse the main interval logic or a separate small one.
    // For safety/simplicity, let's just set it for now as "Same track" usually implies minor adjustments.
    // If user wants super smooth volume changes on same track, we can add it.
    // Let's do a quick 500ms fade for volume changes.

    // Check if we are already close
    if (Math.abs(audio.volume - target) < 0.05) {
      audio.volume = target
      return
    }

    const duration = 1000
    const steps = 10
    const stepTime = duration / steps
    const startVol = audio.volume
    const diff = target - startVol

    let step = 0
    const volInterval = setInterval(() => {
      step++
      const progress = step / steps
      const newVol = startVol + (diff * progress)
      audio.volume = Math.max(0, Math.min(1, newVol))

      if (step >= steps) {
        clearInterval(volInterval)
        audio.volume = target
      }
    }, stepTime)
  }

  public setMute(muted: boolean) {
    if (this.currentAudio) this.currentAudio.muted = muted
    if (this.outgoingAudio) this.outgoingAudio.muted = muted
  }

  public stop() {
    if (this.currentAudio) this.currentAudio.pause()
    if (this.outgoingAudio) this.outgoingAudio.pause()
    if (this.fadeInterval) clearInterval(this.fadeInterval)
  }
}

export function AudioManager({ src, volume, isPlaying, loop = true }: AudioManagerProps) {
  const controllerRef = useRef<AudioController | null>(null)
  const [isMuted, setIsMuted] = useState(false)

  // Initialize controller
  useEffect(() => {
    controllerRef.current = new AudioController()
    return () => {
      controllerRef.current?.stop()
    }
  }, [])

  // Sync props with controller
  useEffect(() => {
    const controller = controllerRef.current
    if (!controller) return

    controller.setMute(isMuted)

    if (isPlaying) {
      controller.play(src, volume, loop)
    } else {
      controller.stop()
    }

  }, [src, volume, isPlaying, isMuted, loop])

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      onClick={() => setIsMuted(!isMuted)}
      className="fixed right-4 top-4 z-50 rounded-full bg-black/50 p-3 text-foreground/80 backdrop-blur-sm transition-all hover:bg-black/70 hover:text-foreground"
      aria-label={isMuted ? "Unmute" : "Mute"}
    >
      {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
    </motion.button>
  )
}