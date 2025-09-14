import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { message, userId } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Crisis detection keywords
    const crisisKeywords = ["suicide", "kill myself", "end it all", "hurt myself", "die", "hopeless", "can't go on"]
    const isCrisis = crisisKeywords.some((keyword) => message.toLowerCase().includes(keyword))

    // Generate AI response based on message content
    let botResponse = ""

    if (isCrisis) {
      botResponse =
        "I'm very concerned about what you're sharing. Your life has value and there are people who want to help. Please consider reaching out to the 988 Suicide & Crisis Lifeline (call or text 988) or contact emergency services (911) if you're in immediate danger. Would you like me to help you find local crisis resources?"
    } else if (message.toLowerCase().includes("anxious") || message.toLowerCase().includes("anxiety")) {
      botResponse =
        "I understand you're feeling anxious. Anxiety is very common among students. Try this quick breathing exercise: breathe in for 4 counts, hold for 4, breathe out for 6. Would you like me to guide you through some other coping strategies?"
    } else if (message.toLowerCase().includes("stressed") || message.toLowerCase().includes("stress")) {
      botResponse =
        "Stress can feel overwhelming, especially with academic pressures. Remember that it's okay to take breaks. Have you tried any stress-relief activities today? I can suggest some games or relaxation techniques that might help."
    } else if (message.toLowerCase().includes("sad") || message.toLowerCase().includes("depressed")) {
      botResponse =
        "I hear that you're going through a difficult time. Your feelings are valid, and it's brave of you to reach out. Sometimes talking helps - would you like to share more about what's been weighing on you? I'm here to listen without judgment."
    } else {
      const responses = [
        "Thank you for sharing that with me. It takes courage to open up about your feelings. How can I best support you right now?",
        "I'm here to listen and help however I can. What's been on your mind lately?",
        "That sounds challenging. Remember that seeking help is a sign of strength, not weakness. What would feel most helpful right now?",
        "I appreciate you trusting me with your thoughts. Would you like to explore some coping strategies or resources that might help?",
      ]
      botResponse = responses[Math.floor(Math.random() * responses.length)]
    }

    // In production, save chat history to database
    const chatEntry = {
      id: Date.now().toString(),
      userId: userId || "anonymous",
      userMessage: message,
      botResponse,
      isCrisis,
      timestamp: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      response: botResponse,
      isCrisis,
      timestamp: chatEntry.timestamp,
    })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
