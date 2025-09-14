import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, university } = await request.json()

    // Basic validation
    if (!email || !password || !name) {
      return NextResponse.json({ error: "Email, password, and name are required" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
    }

    // Check if user already exists (mock check)
    const existingUsers = ["student@university.edu", "demo@mindcare.com"]
    if (existingUsers.includes(email)) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 })
    }

    // Create new user (in production, save to database)
    const newUser = {
      id: Date.now().toString(),
      email,
      name,
      university: university || "Unknown University",
      createdAt: new Date().toISOString(),
    }

    // Create session token
    const sessionToken = Buffer.from(JSON.stringify({ userId: newUser.id, email: newUser.email })).toString("base64")

    // Set session cookie
    const cookieStore = await cookies()
    cookieStore.set("session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        university: newUser.university,
      },
    })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
