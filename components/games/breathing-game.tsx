"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, RotateCcw, Wind } from "lucide-react"

export function BreathingGame() {
  const [isActive, setIsActive] = useState(false)
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale")
  const [progress, setProgress] = useState(0)
  const [cycle, setCycle] = useState(0)
  const [technique, setTechnique] = useState("4-4-4")

  const techniques = {
    "4-4-4": { inhale: 4, hold: 4, exhale: 4, name: "Box Breathing" },
    "4-7-8": { inhale: 4, hold: 7, exhale: 8, name: "Relaxing Breath" },
    "6-2-6": { inhale: 6, hold: 2, exhale: 6, name: "Calm Focus" },
  }

  const currentTechnique = techniques[technique as keyof typeof techniques]

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isActive) {
      const totalDuration = currentTechnique.inhale + currentTechnique.hold + currentTechnique.exhale
      let currentTime = 0

      interval = setInterval(() => {
        currentTime += 0.1

        if (currentTime <= currentTechnique.inhale) {
          setPhase("inhale")
          setProgress((currentTime / currentTechnique.inhale) * 100)
        } else if (currentTime <= currentTechnique.inhale + currentTechnique.hold) {
          setPhase("hold")
          setProgress(((currentTime - currentTechnique.inhale) / currentTechnique.hold) * 100)
        } else if (currentTime <= totalDuration) {
          setPhase("exhale")
          setProgress(((currentTime - currentTechnique.inhale - currentTechnique.hold) / currentTechnique.exhale) * 100)
        } else {
          currentTime = 0
          setCycle((prev) => prev + 1)
          setProgress(0)
        }
      }, 100)
    }

    return () => clearInterval(interval)
  }, [isActive, currentTechnique])

  const reset = () => {
    setIsActive(false)
    setPhase("inhale")
    setProgress(0)
    setCycle(0)
  }

  const getPhaseInstruction = () => {
    switch (phase) {
      case "inhale":
        return "Breathe In"
      case "hold":
        return "Hold"
      case "exhale":
        return "Breathe Out"
    }
  }

  const getCircleScale = () => {
    switch (phase) {
      case "inhale":
        return `scale(${1 + progress / 200})`
      case "hold":
        return "scale(1.5)"
      case "exhale":
        return `scale(${1.5 - progress / 200})`
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wind className="h-5 w-5 text-primary" />
            Breathing Exercise
          </CardTitle>
          <div className="flex gap-2">
            {Object.entries(techniques).map(([key, tech]) => (
              <Button
                key={key}
                variant={technique === key ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setTechnique(key)
                  reset()
                }}
              >
                {tech.name}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Breathing Circle */}
          <div className="flex justify-center">
            <div className="relative w-64 h-64 flex items-center justify-center">
              <div
                className="w-48 h-48 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary/30 flex items-center justify-center transition-transform duration-1000 ease-in-out"
                style={{ transform: getCircleScale() }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">{getPhaseInstruction()}</div>
                  <div className="text-sm text-muted-foreground">
                    {phase === "inhale" && `${currentTechnique.inhale}s`}
                    {phase === "hold" && `${currentTechnique.hold}s`}
                    {phase === "exhale" && `${currentTechnique.exhale}s`}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="capitalize">{phase} Phase</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-4">
            <Badge variant="secondary">Cycles: {cycle}</Badge>
            <Badge variant="secondary">Technique: {currentTechnique.name}</Badge>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-3">
            <Button onClick={() => setIsActive(!isActive)} size="lg">
              {isActive ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
              {isActive ? "Pause" : "Start"}
            </Button>
            <Button onClick={reset} variant="outline" size="lg">
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
