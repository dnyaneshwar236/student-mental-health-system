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

    // In production, fetch from database
    const mockProfile = {
      id: user.userId,
      email: user.email,
      name: "Alex Johnson",
      university: "State University",
      year: "Junior",
      major: "Computer Science",
      joinedDate: "2024-01-15",
      preferences: {
        notifications: true,
        darkMode: false,
        language: "en",
      },
      stats: {
        chatSessions: 15,
        gamesPlayed: 8,
        resourcesViewed: 23,
        streakDays: 5,
      },
    }

    return NextResponse.json({ success: true, profile: mockProfile })
  } catch (error) {
    console.error("Profile fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await getSessionUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const updates = await request.json()

    // In production, update database
    const updatedProfile = {
      ...updates,
      id: user.userId,
      email: user.email,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({ success: true, profile: updatedProfile })
  } catch (error) {
    console.error("Profile update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
