import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

async function getSessionUser() {
  const cookieStore = await cookies()
  const session = cookieStore.get("session")

  if (!session) {
    return null
  }

  try {
    const sessionData = JSON.parse(Buffer.from(session.value, "base64").toString())
    return sessionData
  } catch {
    return null
  }
}

export async function GET() {
  try {
    const user = await getSessionUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Mock game progress data
    const gameProgress = {
      breathing: {
        sessionsCompleted: 12,
        totalMinutes: 45,
        favoritePattern: "4-4-4",
        streak: 3,
      },
      colorTherapy: {
        artworksCreated: 8,
        colorsUsed: 24,
        timeSpent: 120, // minutes
        lastCreated: "2024-01-20",
      },
      memory: {
        gamesPlayed: 15,
        bestScore: 8, // moves
        averageScore: 12,
        difficulty: "medium",
      },
      mindfulness: {
        gardensCompleted: 5,
        plantsGrown: 15,
        mindfulnessPoints: 150,
        currentLevel: 6,
      },
    }

    return NextResponse.json({ success: true, progress: gameProgress })
  } catch (error) {
    console.error("Game progress fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getSessionUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { gameType, data } = await request.json()

    if (!gameType || !data) {
      return NextResponse.json({ error: "Game type and data are required" }, { status: 400 })
    }

    // In production, save to database
    const progressEntry = {
      id: Date.now().toString(),
      userId: user.userId,
      gameType,
      data,
      timestamp: new Date().toISOString(),
    }

    return NextResponse.json({ success: true, entry: progressEntry })
  } catch (error) {
    console.error("Game progress save error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
