"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, RotateCcw, Trophy } from "lucide-react"

interface MemoryCard {
  id: number
  symbol: string
  isFlipped: boolean
  isMatched: boolean
}

export function MemoryGame() {
  const [cards, setCards] = useState<MemoryCard[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [matches, setMatches] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("easy")

  const symbols = ["🌸", "🌿", "🦋", "🌙", "⭐", "🌊", "🍃", "🌺", "🌻", "🌈", "☀️", "🌷"]

  const difficultySettings = {
    easy: { pairs: 6, gridCols: 3 },
    medium: { pairs: 8, gridCols: 4 },
    hard: { pairs: 12, gridCols: 4 },
  }

  const initializeGame = () => {
    const { pairs } = difficultySettings[difficulty]
    const gameSymbols = symbols.slice(0, pairs)
    const cardPairs = [...gameSymbols, ...gameSymbols]

    const shuffledCards = cardPairs
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({
        id: index,
        symbol,
        isFlipped: false,
        isMatched: false,
      }))

    setCards(shuffledCards)
    setFlippedCards([])
    setMoves(0)
    setMatches(0)
    setGameComplete(false)
  }

  useEffect(() => {
    initializeGame()
  }, [difficulty])

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards
      const firstCard = cards.find((card) => card.id === first)
      const secondCard = cards.find((card) => card.id === second)

      if (firstCard && secondCard && firstCard.symbol === secondCard.symbol) {
        // Match found
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) => (card.id === first || card.id === second ? { ...card, isMatched: true } : card)),
          )
          setMatches((prev) => prev + 1)
          setFlippedCards([])
        }, 1000)
      } else {
        // No match
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) => (card.id === first || card.id === second ? { ...card, isFlipped: false } : card)),
          )
          setFlippedCards([])
        }, 1000)
      }
      setMoves((prev) => prev + 1)
    }
  }, [flippedCards, cards])

  useEffect(() => {
    const { pairs } = difficultySettings[difficulty]
    if (matches === pairs) {
      setGameComplete(true)
    }
  }, [matches, difficulty])

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2) return
    if (flippedCards.includes(cardId)) return

    const card = cards.find((c) => c.id === cardId)
    if (!card || card.isMatched) return

    setCards((prev) => prev.map((c) => (c.id === cardId ? { ...c, isFlipped: true } : c)))
    setFlippedCards((prev) => [...prev, cardId])
  }

  const { gridCols } = difficultySettings[difficulty]

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            Memory Challenge
          </CardTitle>
          <div className="flex gap-2">
            {(["easy", "medium", "hard"] as const).map((level) => (
              <Button
                key={level}
                variant={difficulty === level ? "default" : "outline"}
                size="sm"
                onClick={() => setDifficulty(level)}
                className="capitalize"
              >
                {level}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Game Stats */}
          <div className="flex justify-center gap-4">
            <Badge variant="secondary">Moves: {moves}</Badge>
            <Badge variant="secondary">
              Matches: {matches}/{difficultySettings[difficulty].pairs}
            </Badge>
            {gameComplete && (
              <Badge className="bg-green-100 text-green-800">
                <Trophy className="h-3 w-3 mr-1" />
                Complete!
              </Badge>
            )}
          </div>

          {/* Game Board */}
          <div className={`grid gap-3 mx-auto max-w-md`} style={{ gridTemplateColumns: `repeat(${gridCols}, 1fr)` }}>
            {cards.map((card) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                disabled={card.isFlipped || card.isMatched || flippedCards.length === 2}
                className={`aspect-square rounded-lg border-2 text-2xl font-bold transition-all duration-300 ${
                  card.isFlipped || card.isMatched
                    ? "bg-primary/10 border-primary/30 text-primary"
                    : "bg-muted hover:bg-muted/80 border-border"
                } ${card.isMatched ? "opacity-75" : ""}`}
              >
                {card.isFlipped || card.isMatched ? card.symbol : "?"}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex justify-center">
            <Button onClick={initializeGame} variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              New Game
            </Button>
          </div>

          {gameComplete && (
            <Card className="bg-green-50 border-green-200">
              <CardContent className="pt-6 text-center">
                <Trophy className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-green-800 mb-1">Congratulations!</h3>
                <p className="text-sm text-green-700">
                  You completed the {difficulty} level in {moves} moves!
                </p>
              </CardContent>
            </Card>
          )}

          {/* Benefits */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <h4 className="font-medium mb-2">Memory Game Benefits:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Improves working memory and concentration</li>
                <li>• Enhances pattern recognition skills</li>
                <li>• Provides mindful focus and stress relief</li>
                <li>• Builds cognitive resilience</li>
              </ul>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}
