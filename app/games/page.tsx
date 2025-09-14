"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Gamepad2, Brain, Zap, Wind, Palette, Music } from "lucide-react"
import Link from "next/link"
import { BreathingGame } from "@/components/games/breathing-game"
import { ColorTherapyGame } from "@/components/games/color-therapy-game"
import { MemoryGame } from "@/components/games/memory-game"
import { MindfulnessGame } from "@/components/games/mindfulness-game"

export default function GamesPage() {
  const [activeGame, setActiveGame] = useState<string | null>(null)

  const games = [
    {
      id: "breathing",
      title: "Breathing Exercises",
      description: "Guided breathing patterns to reduce anxiety and promote calm",
      icon: Wind,
      difficulty: "Easy",
      duration: "2-5 min",
      benefits: ["Reduces anxiety", "Lowers heart rate", "Improves focus"],
      color: "bg-blue-50 border-blue-200",
    },
    {
      id: "color-therapy",
      title: "Color Therapy",
      description: "Interactive color mixing and pattern creation for relaxation",
      icon: Palette,
      difficulty: "Easy",
      duration: "5-10 min",
      benefits: ["Creative expression", "Stress relief", "Mood improvement"],
      color: "bg-purple-50 border-purple-200",
    },
    {
      id: "memory",
      title: "Memory Challenge",
      description: "Gentle memory games that promote focus and mindfulness",
      icon: Brain,
      difficulty: "Medium",
      duration: "3-7 min",
      benefits: ["Improves focus", "Cognitive training", "Mindful attention"],
      color: "bg-green-50 border-green-200",
    },
    {
      id: "mindfulness",
      title: "Mindfulness Garden",
      description: "Virtual garden tending for meditation and stress relief",
      icon: Music,
      difficulty: "Easy",
      duration: "5-15 min",
      benefits: ["Deep relaxation", "Mindfulness", "Emotional balance"],
      color: "bg-emerald-50 border-emerald-200",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2">
                <Heart className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">MindCare</span>
              </Link>
              <div className="h-6 w-px bg-border" />
              <div className="flex items-center gap-2">
                <Gamepad2 className="h-5 w-5 text-primary" />
                <span className="font-medium">Stress-Relief Games</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/chat">Chat Support</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {!activeGame ? (
          <>
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Interactive Stress-Relief Games</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
                Take a break from stress with our collection of calming, therapeutic games designed specifically for
                student mental health and wellbeing.
              </p>
            </div>

            {/* Games Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {games.map((game) => {
                const IconComponent = game.icon
                return (
                  <Card key={game.id} className={`${game.color} hover:shadow-lg transition-all cursor-pointer`}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white rounded-lg shadow-sm">
                            <IconComponent className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{game.title}</CardTitle>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary" className="text-xs">
                                {game.difficulty}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {game.duration}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                      <CardDescription className="text-sm leading-relaxed">{game.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Benefits:</h4>
                          <div className="flex flex-wrap gap-1">
                            {game.benefits.map((benefit, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {benefit}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button
                          onClick={() => setActiveGame(game.id)}
                          className="w-full"
                          variant={game.id === "breathing" ? "default" : "outline"}
                        >
                          <Zap className="h-4 w-4 mr-2" />
                          Start Game
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Benefits Section */}
            <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  Why Play Stress-Relief Games?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Brain className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Cognitive Benefits</h3>
                    <p className="text-sm text-muted-foreground">
                      Improve focus, memory, and mental clarity through engaging activities.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Wind className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Stress Reduction</h3>
                    <p className="text-sm text-muted-foreground">
                      Lower cortisol levels and activate your body's relaxation response.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Palette className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Emotional Wellbeing</h3>
                    <p className="text-sm text-muted-foreground">
                      Express creativity and process emotions in a safe, supportive environment.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Button variant="outline" onClick={() => setActiveGame(null)}>
                ← Back to Games
              </Button>
              <h2 className="text-2xl font-bold">{games.find((g) => g.id === activeGame)?.title}</h2>
              <div />
            </div>

            {activeGame === "breathing" && <BreathingGame />}
            {activeGame === "color-therapy" && <ColorTherapyGame />}
            {activeGame === "memory" && <MemoryGame />}
            {activeGame === "mindfulness" && <MindfulnessGame />}
          </div>
        )}
      </div>
    </div>
  )
}
