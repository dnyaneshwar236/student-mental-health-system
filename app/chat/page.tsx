"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send, Bot, User, Heart, AlertTriangle, Phone } from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  type?: "crisis" | "normal"
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm MindBot, your 24/7 mental health support companion. I'm here to listen, provide resources, and help you through difficult times. How are you feeling today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const crisisKeywords = ["suicide", "kill myself", "end it all", "hurt myself", "die", "hopeless", "can't go on"]

  const detectCrisis = (message: string): boolean => {
    return crisisKeywords.some((keyword) => message.toLowerCase().includes(keyword))
  }

  const generateBotResponse = async (userMessage: string): Promise<string> => {
    const isCrisis = detectCrisis(userMessage)

    if (isCrisis) {
      return "I'm very concerned about what you're sharing. Your life has value and there are people who want to help. Please consider reaching out to the 988 Suicide & Crisis Lifeline (call or text 988) or contact emergency services (911) if you're in immediate danger. Would you like me to help you find local crisis resources?"
    }

    // Simulate different response types based on message content
    if (userMessage.toLowerCase().includes("anxious") || userMessage.toLowerCase().includes("anxiety")) {
      return "I understand you're feeling anxious. Anxiety is very common among students. Try this quick breathing exercise: breathe in for 4 counts, hold for 4, breathe out for 6. Would you like me to guide you through some other coping strategies?"
    }

    if (userMessage.toLowerCase().includes("stressed") || userMessage.toLowerCase().includes("stress")) {
      return "Stress can feel overwhelming, especially with academic pressures. Remember that it's okay to take breaks. Have you tried any stress-relief activities today? I can suggest some games or relaxation techniques that might help."
    }

    if (userMessage.toLowerCase().includes("sad") || userMessage.toLowerCase().includes("depressed")) {
      return "I hear that you're going through a difficult time. Your feelings are valid, and it's brave of you to reach out. Sometimes talking helps - would you like to share more about what's been weighing on you? I'm here to listen without judgment."
    }

    // Default supportive responses
    const responses = [
      "Thank you for sharing that with me. It takes courage to open up about your feelings. How can I best support you right now?",
      "I'm here to listen and help however I can. What's been on your mind lately?",
      "That sounds challenging. Remember that seeking help is a sign of strength, not weakness. What would feel most helpful right now?",
      "I appreciate you trusting me with your thoughts. Would you like to explore some coping strategies or resources that might help?",
    ]

    return responses[Math.floor(Math.random() * responses.length)]
  }

  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    const isCrisis = detectCrisis(inputMessage)
    if (isCrisis) {
      userMessage.type = "crisis"
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI processing time
    setTimeout(
      async () => {
        const botResponse = await generateBotResponse(inputMessage)
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: botResponse,
          sender: "bot",
          timestamp: new Date(),
          type: isCrisis ? "crisis" : "normal",
        }

        setMessages((prev) => [...prev, botMessage])
        setIsTyping(false)
      },
      1000 + Math.random() * 2000,
    )
  }

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages, isTyping])

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
                <Bot className="h-5 w-5 text-primary" />
                <span className="font-medium">24/7 Support Chat</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Online
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/support">
                  <Phone className="h-4 w-4 mr-2" />
                  Crisis Support
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <Card className="h-[calc(100vh-200px)] flex flex-col">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              MindBot - Your Mental Health Companion
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Available 24/7 for support, resources, and crisis intervention. All conversations are confidential.
            </p>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            <ScrollArea className="flex-1 px-6" ref={scrollAreaRef}>
              <div className="space-y-4 pb-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.sender === "bot" && (
                      <Avatar className="h-8 w-8 bg-primary/10">
                        <AvatarFallback>
                          <Bot className="h-4 w-4 text-primary" />
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : message.type === "crisis"
                            ? "bg-red-50 border border-red-200 text-red-900"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {message.type === "crisis" && message.sender === "bot" && (
                        <div className="flex items-center gap-2 mb-2 text-red-600">
                          <AlertTriangle className="h-4 w-4" />
                          <span className="text-xs font-medium">Crisis Support</span>
                        </div>
                      )}
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>

                    {message.sender === "user" && (
                      <Avatar className="h-8 w-8 bg-secondary">
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3 justify-start">
                    <Avatar className="h-8 w-8 bg-primary/10">
                      <AvatarFallback>
                        <Bot className="h-4 w-4 text-primary" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-lg px-4 py-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                        <div
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        />
                        <div
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="border-t border-border p-4">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message... I'm here to listen and help."
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  className="flex-1"
                />
                <Button onClick={sendMessage} disabled={!inputMessage.trim() || isTyping}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                If you're in crisis, please call 988 or text HOME to 741741 for immediate help.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
