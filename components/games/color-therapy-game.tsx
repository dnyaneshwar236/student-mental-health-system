"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Palette, Download, RotateCcw, Brush } from "lucide-react"

export function ColorTherapyGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentColor, setCurrentColor] = useState("#4ade80")
  const [brushSize, setBrushSize] = useState(10)

  const colors = [
    "#4ade80", // Green
    "#60a5fa", // Blue
    "#a78bfa", // Purple
    "#fb7185", // Pink
    "#fbbf24", // Yellow
    "#f97316", // Orange
    "#ef4444", // Red
    "#06b6d4", // Cyan
    "#8b5cf6", // Violet
    "#10b981", // Emerald
  ]

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    draw(e)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    ctx.globalCompositeOperation = "source-over"
    ctx.fillStyle = currentColor
    ctx.beginPath()
    ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2)
    ctx.fill()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Add a subtle background gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, "#f8fafc")
    gradient.addColorStop(1, "#f1f5f9")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  const downloadArt = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const link = document.createElement("a")
    link.download = "mindcare-art.png"
    link.href = canvas.toDataURL()
    link.click()
  }

  // Initialize canvas with background
  const initCanvas = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, "#f8fafc")
    gradient.addColorStop(1, "#f1f5f9")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5 text-primary" />
            Color Therapy Canvas
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Express yourself through colors and patterns. Let your creativity flow and find peace through art.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Color Palette */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Choose Your Color</h3>
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  className={`w-10 h-10 rounded-full border-2 transition-all ${
                    currentColor === color ? "border-foreground scale-110" : "border-border hover:scale-105"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setCurrentColor(color)}
                />
              ))}
              <input
                type="color"
                value={currentColor}
                onChange={(e) => setCurrentColor(e.target.value)}
                className="w-10 h-10 rounded-full border-2 border-border cursor-pointer"
              />
            </div>
          </div>

          {/* Brush Size */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Brush Size</h3>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="5"
                max="50"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="flex-1"
              />
              <div className="flex items-center gap-2">
                <Brush className="h-4 w-4" />
                <span className="text-sm font-medium w-8">{brushSize}px</span>
              </div>
            </div>
          </div>

          {/* Canvas */}
          <div className="border border-border rounded-lg overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
            <canvas
              ref={(canvas) => {
                if (canvas) {
                  canvasRef.current = canvas
                  initCanvas(canvas)
                }
              }}
              width={800}
              height={500}
              className="w-full cursor-crosshair"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
            />
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-3">
            <Button onClick={clearCanvas} variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              Clear Canvas
            </Button>
            <Button onClick={downloadArt}>
              <Download className="h-4 w-4 mr-2" />
              Save Artwork
            </Button>
          </div>

          {/* Tips */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <h4 className="font-medium mb-2">Color Therapy Tips:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Use cool colors (blues, greens) for calming effects</li>
                <li>• Warm colors (reds, oranges) can energize and uplift</li>
                <li>• Create patterns or mandalas for meditative drawing</li>
                <li>• Focus on the process, not the outcome</li>
              </ul>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}
