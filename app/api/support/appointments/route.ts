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

    // Mock appointments data
    const appointments = [
      {
        id: "1",
        counselorName: "Dr. Sarah Wilson",
        date: "2024-01-25",
        time: "14:00",
        type: "individual",
        status: "confirmed",
        notes: "Initial consultation",
      },
      {
        id: "2",
        counselorName: "Dr. Michael Chen",
        date: "2024-01-30",
        time: "10:30",
        type: "group",
        status: "pending",
        notes: "Anxiety support group",
      },
    ]

    return NextResponse.json({ success: true, appointments })
  } catch (error) {
    console.error("Appointments fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getSessionUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { counselorId, date, time, type, notes } = await request.json()

    if (!counselorId || !date || !time || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In production, save to database and send notifications
    const newAppointment = {
      id: Date.now().toString(),
      userId: user.userId,
      counselorId,
      date,
      time,
      type,
      notes: notes || "",
      status: "pending",
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({ success: true, appointment: newAppointment })
  } catch (error) {
    console.error("Appointment booking error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
