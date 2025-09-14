"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Heart,
  Calendar,
  BookOpen,
  MessageCircle,
  TrendingUp,
  Clock,
  Users,
  Shield,
  Bell,
  Settings,
  LogOut,
  Plus,
  Activity,
  Target,
  Smile,
  Meh,
  Frown,
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [currentMood, setCurrentMood] = useState<"good" | "okay" | "difficult" | null>(null)

  // Mock data - in real app this would come from API
  const user = {
    name: "Sarah Johnson",
    university: "State University",
    joinDate: "September 2024",
    avatar: "/student-avatar.png",
  }

  const weeklyProgress = 75
  const upcomingAppointments = [
    { id: 1, type: "Counseling Session", date: "Today, 2:00 PM", counselor: "Dr. Smith" },
    { id: 2, type: "Group Therapy", date: "Tomorrow, 10:00 AM", counselor: "Dr. Johnson" },
  ]

  const recentActivities = [
    { id: 1, activity: "Completed mindfulness exercise", time: "2 hours ago", type: "wellness" },
    { id: 2, activity: "Read article on stress management", time: "1 day ago", type: "resource" },
    { id: 3, activity: "Joined peer support group", time: "2 days ago", type: "community" },
  ]

  const quickStats = {
    sessionsCompleted: 8,
    resourcesRead: 15,
    daysActive: 23,
    moodEntries: 45,
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <Heart className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">MindCare</span>
              </Link>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Student Dashboard
              </Badge>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium hidden sm:inline">{user.name}</span>
              </div>
              <Button variant="ghost" size="sm">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {user.name.split(" ")[0]}!</h1>
          <p className="text-muted-foreground">How are you feeling today? Your mental health journey continues here.</p>
        </div>

        {/* Quick Mood Check */}
        <Card className="mb-8 border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Quick Mood Check
            </CardTitle>
            <CardDescription>How are you feeling right now?</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 justify-center">
              <Button
                variant={currentMood === "good" ? "default" : "outline"}
                onClick={() => setCurrentMood("good")}
                className="flex flex-col items-center gap-2 h-auto py-4 px-6"
              >
                <Smile className="h-6 w-6" />
                <span className="text-sm">Good</span>
              </Button>
              <Button
                variant={currentMood === "okay" ? "default" : "outline"}
                onClick={() => setCurrentMood("okay")}
                className="flex flex-col items-center gap-2 h-auto py-4 px-6"
              >
                <Meh className="h-6 w-6" />
                <span className="text-sm">Okay</span>
              </Button>
              <Button
                variant={currentMood === "difficult" ? "default" : "outline"}
                onClick={() => setCurrentMood("difficult")}
                className="flex flex-col items-center gap-2 h-auto py-4 px-6"
              >
                <Frown className="h-6 w-6" />
                <span className="text-sm">Difficult</span>
              </Button>
            </div>
            {currentMood && (
              <div className="mt-4 p-4 bg-muted/50 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">
                  Thank you for sharing. {currentMood === "difficult" && "Remember, it's okay to not be okay. "}
                  Would you like to explore some resources or talk to someone?
                </p>
                <div className="flex gap-2 justify-center mt-3">
                  <Button size="sm" variant="outline">
                    Find Resources
                  </Button>
                  <Button size="sm">Get Support</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Overview */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Your Progress This Week
                </CardTitle>
                <CardDescription>Keep up the great work on your mental health journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Weekly Wellness Goal</span>
                      <span>{weeklyProgress}%</span>
                    </div>
                    <Progress value={weeklyProgress} className="h-2" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{quickStats.sessionsCompleted}</div>
                      <div className="text-xs text-muted-foreground">Sessions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{quickStats.resourcesRead}</div>
                      <div className="text-xs text-muted-foreground">Resources</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{quickStats.daysActive}</div>
                      <div className="text-xs text-muted-foreground">Days Active</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{quickStats.moodEntries}</div>
                      <div className="text-xs text-muted-foreground">Mood Entries</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Access your most-used features</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Link href="/resources">
                    <Button variant="outline" className="w-full h-auto flex-col gap-2 py-4 bg-transparent">
                      <BookOpen className="h-6 w-6" />
                      <span className="text-sm">Resources</span>
                    </Button>
                  </Link>
                  <Link href="/appointments">
                    <Button variant="outline" className="w-full h-auto flex-col gap-2 py-4 bg-transparent">
                      <Calendar className="h-6 w-6" />
                      <span className="text-sm">Book Session</span>
                    </Button>
                  </Link>
                  <Link href="/support">
                    <Button variant="outline" className="w-full h-auto flex-col gap-2 py-4 bg-transparent">
                      <MessageCircle className="h-6 w-6" />
                      <span className="text-sm">Get Support</span>
                    </Button>
                  </Link>
                  <Link href="/community">
                    <Button variant="outline" className="w-full h-auto flex-col gap-2 py-4 bg-transparent">
                      <Users className="h-6 w-6" />
                      <span className="text-sm">Community</span>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                      <div className="p-2 bg-primary/10 rounded-full">
                        {activity.type === "wellness" && <Target className="h-4 w-4 text-primary" />}
                        {activity.type === "resource" && <BookOpen className="h-4 w-4 text-primary" />}
                        {activity.type === "community" && <Users className="h-4 w-4 text-primary" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.activity}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Appointments */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Upcoming Sessions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="p-3 bg-muted/30 rounded-lg">
                      <div className="font-medium text-sm">{appointment.type}</div>
                      <div className="text-xs text-muted-foreground">{appointment.date}</div>
                      <div className="text-xs text-muted-foreground">with {appointment.counselor}</div>
                    </div>
                  ))}
                  <Button className="w-full" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Schedule New Session
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Crisis Support */}
            <Card className="border-border bg-destructive/5 border-destructive/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <Shield className="h-5 w-5" />
                  Crisis Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  If you're experiencing a mental health crisis, help is available 24/7.
                </p>
                <div className="space-y-2">
                  <Button variant="destructive" className="w-full" size="sm">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Crisis Chat
                  </Button>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Call 988 or text HOME to 741741</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Daily Tip */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  Daily Wellness Tip
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Take 5 minutes today to practice deep breathing. Inhale for 4 counts, hold for 4, exhale for 6. This
                  simple technique can help reduce stress and anxiety.
                </p>
                <Button variant="outline" size="sm" className="w-full mt-3 bg-transparent">
                  Try Breathing Exercise
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
