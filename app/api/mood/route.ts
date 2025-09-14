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

    // Mock mood tracking data
    const moodData = [
      { date: "2024-01-15", mood: 7, notes: "Good day, felt productive" },
      { date: "2024-01-16", mood: 5, notes: "Stressed about exams" },
      { date: "2024-01-17", mood: 8, notes: "Great session with counselor" },
      { date: "2024-01-18", mood: 6, notes: "Average day" },
      { date: "2024-01-19", mood: 9, notes: "Excellent day, felt very positive" },
      { date: "2024-01-20", mood: 4, notes: "Feeling anxious about presentation" },
      { date: "2024-01-21", mood: 7, notes: "Better after talking to friends" },
    ]

    return NextResponse.json({ success: true, moodData })
  } catch (error) {
    console.error("Mood data fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getSessionUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { mood, notes, date } = await request.json()

    if (!mood || mood < 1 || mood > 10) {
      return NextResponse.json({ error: "Mood must be between 1 and 10" }, { status: 400 })
    }

    // In production, save to database
    const moodEntry = {
      id: Date.now().toString(),
      userId: user.userId,
      mood,
      notes: notes || "",
      date: date || new Date().toISOString().split("T")[0],
      timestamp: new Date().toISOString(),
    }

    return NextResponse.json({ success: true, entry: moodEntry })
  } catch (error) {
    console.error("Mood tracking error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
