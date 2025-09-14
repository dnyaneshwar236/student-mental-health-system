"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Flower, Droplets, Sun, Leaf, Music, RotateCcw } from "lucide-react"

interface Plant {
  id: string
  type: "flower" | "tree" | "herb"
  growth: number
  watered: boolean
  sunlight: boolean
  name: string
  icon: React.ComponentType<{ className?: string }>
}

export function MindfulnessGame() {
  const [plants, setPlants] = useState<Plant[]>([])
  const [selectedPlant, setSelectedPlant] = useState<string | null>(null)
  const [gardenLevel, setGardenLevel] = useState(1)
  const [mindfulnessPoints, setMindfulnessPoints] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const plantTypes = [
    { type: "flower" as const, name: "Peace Lily", icon: Flower },
    { type: "tree" as const, name: "Calm Oak", icon: Leaf },
    { type: "herb" as const, name: "Serenity Sage", icon: Sun },
  ]

  const initializeGarden = () => {
    const initialPlants: Plant[] = plantTypes.map((plantType, index) => ({
      id: `plant-${index}`,
      type: plantType.type,
      growth: 0,
      watered: false,
      sunlight: false,
      name: plantType.name,
      icon: plantType.icon,
    }))
    setPlants(initialPlants)
    setSelectedPlant(initialPlants[0].id)
    setMindfulnessPoints(0)
    setGardenLevel(1)
  }

  useEffect(() => {
    initializeGarden()
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isPlaying) {
      interval = setInterval(() => {
        setPlants((prev) =>
          prev.map((plant) => {
            if (plant.watered && plant.sunlight && plant.growth < 100) {
              const newGrowth = Math.min(plant.growth + 2, 100)
              if (newGrowth === 100 && plant.growth < 100) {
                setMindfulnessPoints((points) => points + 10)
              }
              return { ...plant, growth: newGrowth }
            }
            return plant
          }),
        )
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isPlaying])

  const waterPlant = (plantId: string) => {
    setPlants((prev) => prev.map((plant) => (plant.id === plantId ? { ...plant, watered: true } : plant)))
    setMindfulnessPoints((prev) => prev + 1)
  }

  const giveSunlight = (plantId: string) => {
    setPlants((prev) => prev.map((plant) => (plant.id === plantId ? { ...plant, sunlight: true } : plant)))
    setMindfulnessPoints((prev) => prev + 1)
  }

  const selectedPlantData = plants.find((p) => p.id === selectedPlant)

  const allPlantsGrown = plants.every((plant) => plant.growth === 100)

  useEffect(() => {
    if (allPlantsGrown && plants.length > 0) {
      setGardenLevel((prev) => prev + 1)
      setTimeout(() => {
        initializeGarden()
      }, 2000)
    }
  }, [allPlantsGrown])

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flower className="h-5 w-5 text-primary" />
            Mindfulness Garden
          </CardTitle>
          <div className="flex items-center gap-4">
            <Badge variant="secondary">Level {gardenLevel}</Badge>
            <Badge variant="secondary">Mindfulness Points: {mindfulnessPoints}</Badge>
            <Button onClick={() => setIsPlaying(!isPlaying)} size="sm" variant={isPlaying ? "destructive" : "default"}>
              <Music className="h-4 w-4 mr-2" />
              {isPlaying ? "Pause" : "Start"} Garden
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Garden View */}
          <div className="grid md:grid-cols-3 gap-4">
            {plants.map((plant) => {
              const IconComponent = plant.icon
              return (
                <Card
                  key={plant.id}
                  className={`cursor-pointer transition-all ${
                    selectedPlant === plant.id ? "ring-2 ring-primary bg-primary/5" : "hover:bg-muted/50"
                  }`}
                  onClick={() => setSelectedPlant(plant.id)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="mb-3">
                      <IconComponent
                        className={`h-12 w-12 mx-auto transition-all ${
                          plant.growth === 100
                            ? "text-green-500"
                            : plant.growth > 50
                              ? "text-primary"
                              : "text-muted-foreground"
                        }`}
                        style={{
                          transform: `scale(${0.5 + (plant.growth / 100) * 0.5})`,
                        }}
                      />
                    </div>
                    <h3 className="font-medium text-sm mb-2">{plant.name}</h3>
                    <Progress value={plant.growth} className="h-2 mb-2" />
                    <div className="flex justify-center gap-1">
                      {plant.watered && <Droplets className="h-3 w-3 text-blue-500" />}
                      {plant.sunlight && <Sun className="h-3 w-3 text-yellow-500" />}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Plant Care Actions */}
          {selectedPlantData && (
            <Card className="bg-muted/30">
              <CardHeader>
                <CardTitle className="text-lg">Caring for {selectedPlantData.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Growth Progress</span>
                  <span className="text-sm font-medium">{selectedPlantData.growth}%</span>
                </div>
                <Progress value={selectedPlantData.growth} className="h-3" />

                <div className="flex gap-3">
                  <Button
                    onClick={() => waterPlant(selectedPlantData.id)}
                    disabled={selectedPlantData.watered}
                    variant={selectedPlantData.watered ? "secondary" : "default"}
                    className="flex-1"
                  >
                    <Droplets className="h-4 w-4 mr-2" />
                    {selectedPlantData.watered ? "Watered" : "Water Plant"}
                  </Button>
                  <Button
                    onClick={() => giveSunlight(selectedPlantData.id)}
                    disabled={selectedPlantData.sunlight}
                    variant={selectedPlantData.sunlight ? "secondary" : "default"}
                    className="flex-1"
                  >
                    <Sun className="h-4 w-4 mr-2" />
                    {selectedPlantData.sunlight ? "Sunny" : "Give Sunlight"}
                  </Button>
                </div>

                {selectedPlantData.growth === 100 && (
                  <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <Flower className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-green-800 font-medium">{selectedPlantData.name} has fully bloomed!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {allPlantsGrown && (
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <CardContent className="pt-6 text-center">
                <Flower className="h-12 w-12 text-green-600 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-green-800 mb-2">Garden Complete!</h3>
                <p className="text-green-700 mb-4">
                  You've successfully grown all plants with mindful care. Moving to Level {gardenLevel + 1}...
                </p>
                <Badge className="bg-green-100 text-green-800">+{mindfulnessPoints} Mindfulness Points</Badge>
              </CardContent>
            </Card>
          )}

          {/* Reset Button */}
          <div className="flex justify-center">
            <Button onClick={initializeGarden} variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset Garden
            </Button>
          </div>

          {/* Mindfulness Tips */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <h4 className="font-medium mb-2">Mindfulness Garden Benefits:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Practice patience and present-moment awareness</li>
                <li>• Develop nurturing and self-care habits</li>
                <li>• Experience the calming effects of virtual nature</li>
                <li>• Build mindful attention through gentle focus</li>
              </ul>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}
