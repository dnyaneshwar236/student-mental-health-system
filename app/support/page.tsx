"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Heart,
  MessageCircle,
  Phone,
  Video,
  Calendar,
  Clock,
  Shield,
  AlertTriangle,
  Send,
  ArrowLeft,
  Users,
  Headphones,
  Mail,
  Star,
  MapPin,
  Globe,
} from "lucide-react"

export default function SupportPage() {
  const [chatMessage, setChatMessage] = useState("")
  const [selectedCounselor, setSelectedCounselor] = useState<number | null>(null)

  const crisisResources = [
    {
      name: "National Suicide Prevention Lifeline",
      number: "988",
      description: "24/7 crisis support and suicide prevention",
      type: "phone",
    },
    {
      name: "Crisis Text Line",
      number: "Text HOME to 741741",
      description: "24/7 crisis support via text message",
      type: "text",
    },
    {
      name: "Campus Crisis Chat",
      number: "Available 24/7",
      description: "Immediate support through our crisis chat system",
      type: "chat",
    },
  ]

  const counselors = [
    {
      id: 1,
      name: "Dr. Sarah Mitchell",
      title: "Licensed Clinical Psychologist",
      specialties: ["Anxiety", "Depression", "Academic Stress"],
      rating: 4.9,
      experience: "8 years",
      nextAvailable: "Today, 3:00 PM",
      image: "/counselor-1.jpg",
      languages: ["English", "Spanish"],
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      title: "Licensed Professional Counselor",
      specialties: ["ADHD", "Social Anxiety", "Relationship Issues"],
      rating: 4.8,
      experience: "6 years",
      nextAvailable: "Tomorrow, 10:00 AM",
      image: "/counselor-2.jpg",
      languages: ["English", "Mandarin"],
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      title: "Licensed Marriage & Family Therapist",
      specialties: ["Trauma", "PTSD", "Family Issues"],
      rating: 4.9,
      experience: "10 years",
      nextAvailable: "Tomorrow, 2:00 PM",
      image: "/counselor-3.jpg",
      languages: ["English", "Spanish"],
    },
  ]

  const supportOptions = [
    {
      title: "Immediate Crisis Support",
      description: "Get help right now if you're in crisis",
      icon: AlertTriangle,
      color: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
      urgent: true,
    },
    {
      title: "Live Chat Support",
      description: "Chat with a trained counselor",
      icon: MessageCircle,
      color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
      urgent: false,
    },
    {
      title: "Video Counseling",
      description: "Face-to-face sessions via video call",
      icon: Video,
      color: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
      urgent: false,
    },
    {
      title: "Phone Support",
      description: "Talk to someone over the phone",
      icon: Phone,
      color: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
      urgent: false,
    },
  ]

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      // TODO: Implement chat functionality
      console.log("Sending message:", chatMessage)
      setChatMessage("")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Link>
              <div className="flex items-center gap-2">
                <Heart className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">Support Center</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Crisis Alert */}
        <Card className="mb-8 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-300">
              <AlertTriangle className="h-5 w-5" />
              In Crisis? Get Immediate Help
            </CardTitle>
            <CardDescription className="text-red-600 dark:text-red-400">
              If you're having thoughts of suicide or self-harm, please reach out for help immediately.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {crisisResources.map((resource, index) => (
                <div
                  key={index}
                  className="p-4 bg-white dark:bg-gray-900 rounded-lg border border-red-200 dark:border-red-800"
                >
                  <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2">{resource.name}</h4>
                  <p className="text-lg font-bold text-red-800 dark:text-red-200 mb-1">{resource.number}</p>
                  <p className="text-sm text-red-600 dark:text-red-400">{resource.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Get Support</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            You don't have to face mental health challenges alone. Choose from various support options that work best
            for you, from immediate crisis support to scheduled counseling sessions.
          </p>
        </div>

        <Tabs defaultValue="immediate" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="immediate">Immediate Help</TabsTrigger>
            <TabsTrigger value="chat">Live Chat</TabsTrigger>
            <TabsTrigger value="counselors">Book Session</TabsTrigger>
            <TabsTrigger value="peer">Peer Support</TabsTrigger>
          </TabsList>

          <TabsContent value="immediate" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {supportOptions.map((option, index) => {
                const Icon = option.icon
                return (
                  <Card
                    key={index}
                    className={`border-border hover:shadow-lg transition-shadow cursor-pointer ${
                      option.urgent ? "ring-2 ring-red-200 dark:ring-red-800" : ""
                    }`}
                  >
                    <CardHeader className="text-center">
                      <div className="flex justify-center mb-4">
                        <div className={`p-4 rounded-full ${option.color}`}>
                          <Icon className="h-8 w-8" />
                        </div>
                      </div>
                      <CardTitle className="text-lg">{option.title}</CardTitle>
                      <CardDescription>{option.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full" variant={option.urgent ? "destructive" : "default"}>
                        {option.urgent ? "Get Help Now" : "Start Session"}
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Additional Resources */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Additional Support Resources</CardTitle>
                <CardDescription>Other ways to get help and support</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <h4 className="font-medium">Email Support</h4>
                        <p className="text-sm text-muted-foreground">support@mindcare.edu</p>
                        <p className="text-xs text-muted-foreground">Response within 24 hours</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <h4 className="font-medium">Campus Counseling Center</h4>
                        <p className="text-sm text-muted-foreground">Student Services Building, Room 201</p>
                        <p className="text-xs text-muted-foreground">Mon-Fri, 8:00 AM - 6:00 PM</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Globe className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <h4 className="font-medium">Online Support Groups</h4>
                        <p className="text-sm text-muted-foreground">Join virtual peer support groups</p>
                        <p className="text-xs text-muted-foreground">Daily sessions available</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Headphones className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <h4 className="font-medium">Wellness Hotline</h4>
                        <p className="text-sm text-muted-foreground">(555) 123-WELL</p>
                        <p className="text-xs text-muted-foreground">24/7 wellness support</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chat" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  Live Chat Support
                </CardTitle>
                <CardDescription>
                  Connect with a trained counselor for immediate support. Average wait time: 2-3 minutes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Chat Status */}
                  <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-700 dark:text-green-300">Counselors available now</span>
                  </div>

                  {/* Mock Chat Interface */}
                  <div className="border border-border rounded-lg p-4 h-96 bg-muted/20">
                    <div className="h-full flex flex-col">
                      <div className="flex-1 space-y-4 overflow-y-auto">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/counselor-avatar.jpg" />
                            <AvatarFallback>CS</AvatarFallback>
                          </Avatar>
                          <div className="bg-card p-3 rounded-lg max-w-xs">
                            <p className="text-sm">
                              Hello! I'm here to support you. How are you feeling today, and what would you like to talk
                              about?
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">Counselor Sarah • Just now</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Input
                          placeholder="Type your message..."
                          value={chatMessage}
                          onChange={(e) => setChatMessage(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                          className="flex-1"
                        />
                        <Button onClick={handleSendMessage}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <Button size="lg">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Start Chat Session
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="counselors" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {counselors.map((counselor) => (
                <Card
                  key={counselor.id}
                  className={`border-border hover:shadow-lg transition-shadow cursor-pointer ${
                    selectedCounselor === counselor.id ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedCounselor(counselor.id)}
                >
                  <CardHeader className="text-center">
                    <Avatar className="h-20 w-20 mx-auto mb-4">
                      <AvatarImage src={counselor.image || "/placeholder.svg"} alt={counselor.name} />
                      <AvatarFallback>
                        {counselor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-lg">{counselor.name}</CardTitle>
                    <CardDescription>{counselor.title}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-current text-yellow-500" />
                        <span>{counselor.rating}</span>
                      </div>
                      <span className="text-muted-foreground">{counselor.experience}</span>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2">Specialties</h4>
                      <div className="flex flex-wrap gap-1">
                        {counselor.specialties.map((specialty, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-1">Languages</h4>
                      <p className="text-sm text-muted-foreground">{counselor.languages.join(", ")}</p>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>Next available: {counselor.nextAvailable}</span>
                    </div>

                    <Button className="w-full">
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Session
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="peer" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Peer Support Groups
                </CardTitle>
                <CardDescription>
                  Connect with other students who understand what you're going through. All groups are moderated by
                  trained facilitators.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Anxiety Support Group</h4>
                        <Badge variant="secondary">12 members</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        A safe space to share experiences and coping strategies for anxiety.
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                        <span>Tuesdays, 7:00 PM</span>
                        <span>Virtual</span>
                      </div>
                      <Button size="sm" className="w-full">
                        Join Group
                      </Button>
                    </div>

                    <div className="p-4 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Academic Stress Support</h4>
                        <Badge variant="secondary">8 members</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Discuss academic pressures and share study strategies.
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                        <span>Thursdays, 6:00 PM</span>
                        <span>Virtual</span>
                      </div>
                      <Button size="sm" className="w-full">
                        Join Group
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Depression Support Circle</h4>
                        <Badge variant="secondary">15 members</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        A supportive community for those dealing with depression.
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                        <span>Mondays, 5:00 PM</span>
                        <span>Virtual</span>
                      </div>
                      <Button size="sm" className="w-full">
                        Join Group
                      </Button>
                    </div>

                    <div className="p-4 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">LGBTQ+ Support Network</h4>
                        <Badge variant="secondary">20 members</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        A welcoming space for LGBTQ+ students to connect and support each other.
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                        <span>Wednesdays, 7:30 PM</span>
                        <span>Virtual</span>
                      </div>
                      <Button size="sm" className="w-full">
                        Join Group
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Peer Support Guidelines */}
            <Card className="border-border bg-muted/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Peer Support Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">What to Expect</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Confidential and safe environment</li>
                      <li>• Trained facilitator present</li>
                      <li>• Respectful and supportive community</li>
                      <li>• No judgment or advice-giving</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Group Rules</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Respect others' privacy</li>
                      <li>• Share only what you're comfortable with</li>
                      <li>• Listen without trying to "fix"</li>
                      <li>• Maintain confidentiality</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
