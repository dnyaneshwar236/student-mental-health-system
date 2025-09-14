// Database utility functions for the Mental Health Platform
// This file provides helper functions for database operations

export interface User {
  id: string
  email: string
  name: string
  university?: string
  year?: string
  major?: string
  createdAt: string
  updatedAt: string
}

export interface UserPreferences {
  id: string
  userId: string
  notifications: boolean
  darkMode: boolean
  language: string
  privacyLevel: string
}

export interface MoodEntry {
  id: string
  userId: string
  moodScore: number
  notes?: string
  entryDate: string
  createdAt: string
}

export interface ChatSession {
  id: string
  userId: string
  startedAt: string
  endedAt?: string
  sessionType: string
  isActive: boolean
}

export interface ChatMessage {
  id: string
  sessionId: string
  sender: "user" | "bot"
  message: string
  isCrisis: boolean
  sentimentScore?: number
  createdAt: string
}

export interface GameSession {
  id: string
  userId: string
  gameType: string
  sessionData: Record<string, any>
  durationMinutes?: number
  completed: boolean
  score?: number
  createdAt: string
}

export interface Counselor {
  id: string
  name: string
  title: string
  specializations: string[]
  bio: string
  availableHours: Record<string, string[]>
  isActive: boolean
}

export interface Appointment {
  id: string
  userId: string
  counselorId: string
  appointmentDate: string
  appointmentTime: string
  appointmentType: string
  status: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface Resource {
  id: string
  title: string
  description: string
  content: string
  category: string
  resourceType: string
  tags: string[]
  readTimeMinutes: number
  author: string
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

export interface CrisisLog {
  id: string
  userId: string
  triggerType: string
  severityLevel: number
  actionTaken: string
  followUpRequired: boolean
  resolved: boolean
  createdAt: string
  resolvedAt?: string
}

// Database connection helper (placeholder for actual database implementation)
export class DatabaseService {
  // In a real implementation, this would connect to your chosen database
  // For now, we'll use mock data that matches the API responses

  static async getUser(id: string): Promise<User | null> {
    // Mock implementation - replace with actual database query
    return {
      id,
      email: "demo@mindcare.com",
      name: "Demo Student",
      university: "State University",
      year: "Junior",
      major: "Psychology",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  }

  static async createUser(userData: Partial<User>): Promise<User> {
    // Mock implementation - replace with actual database insert
    return {
      id: Date.now().toString(),
      email: userData.email!,
      name: userData.name!,
      university: userData.university,
      year: userData.year,
      major: userData.major,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  }

  static async getMoodEntries(userId: string, limit = 30): Promise<MoodEntry[]> {
    // Mock implementation - replace with actual database query
    return [
      {
        id: "1",
        userId,
        moodScore: 7,
        notes: "Good day, felt productive",
        entryDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        createdAt: new Date().toISOString(),
      },
      // Add more mock entries...
    ]
  }

  static async createMoodEntry(entryData: Partial<MoodEntry>): Promise<MoodEntry> {
    // Mock implementation - replace with actual database insert
    return {
      id: Date.now().toString(),
      userId: entryData.userId!,
      moodScore: entryData.moodScore!,
      notes: entryData.notes,
      entryDate: entryData.entryDate || new Date().toISOString().split("T")[0],
      createdAt: new Date().toISOString(),
    }
  }

  static async getGameSessions(userId: string, gameType?: string): Promise<GameSession[]> {
    // Mock implementation - replace with actual database query
    return [
      {
        id: "1",
        userId,
        gameType: "breathing",
        sessionData: { technique: "4-4-4", cycles: 10 },
        durationMinutes: 5,
        completed: true,
        score: 10,
        createdAt: new Date().toISOString(),
      },
      // Add more mock sessions...
    ]
  }

  static async createGameSession(sessionData: Partial<GameSession>): Promise<GameSession> {
    // Mock implementation - replace with actual database insert
    return {
      id: Date.now().toString(),
      userId: sessionData.userId!,
      gameType: sessionData.gameType!,
      sessionData: sessionData.sessionData || {},
      durationMinutes: sessionData.durationMinutes,
      completed: sessionData.completed || false,
      score: sessionData.score,
      createdAt: new Date().toISOString(),
    }
  }

  static async getCounselors(): Promise<Counselor[]> {
    // Mock implementation - replace with actual database query
    return [
      {
        id: "1",
        name: "Dr. Sarah Wilson",
        title: "Licensed Clinical Psychologist",
        specializations: ["Anxiety", "Depression", "Academic Stress"],
        bio: "Dr. Wilson specializes in cognitive behavioral therapy and has over 10 years of experience working with college students.",
        availableHours: {
          monday: ["09:00", "17:00"],
          tuesday: ["09:00", "17:00"],
          wednesday: ["09:00", "17:00"],
          thursday: ["09:00", "17:00"],
          friday: ["09:00", "15:00"],
        },
        isActive: true,
      },
      // Add more mock counselors...
    ]
  }

  static async getResources(category?: string, search?: string): Promise<Resource[]> {
    // Mock implementation - replace with actual database query
    const allResources = [
      {
        id: "1",
        title: "Understanding Anxiety in College",
        description: "Learn about common anxiety triggers and coping strategies for college students.",
        content: "Anxiety is one of the most common mental health challenges...",
        category: "anxiety",
        resourceType: "article",
        tags: ["anxiety", "coping", "college"],
        readTimeMinutes: 5,
        author: "Dr. Sarah Wilson",
        isPublished: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      // Add more mock resources...
    ]

    // Apply filters
    let filtered = allResources
    if (category && category !== "all") {
      filtered = filtered.filter((r) => r.category === category)
    }
    if (search) {
      const searchLower = search.toLowerCase()
      filtered = filtered.filter(
        (r) =>
          r.title.toLowerCase().includes(searchLower) ||
          r.description.toLowerCase().includes(searchLower) ||
          r.tags.some((tag) => tag.toLowerCase().includes(searchLower)),
      )
    }

    return filtered
  }

  static async createCrisisLog(logData: Partial<CrisisLog>): Promise<CrisisLog> {
    // Mock implementation - replace with actual database insert
    return {
      id: Date.now().toString(),
      userId: logData.userId!,
      triggerType: logData.triggerType!,
      severityLevel: logData.severityLevel!,
      actionTaken: logData.actionTaken!,
      followUpRequired: logData.followUpRequired || false,
      resolved: logData.resolved || false,
      createdAt: new Date().toISOString(),
      resolvedAt: logData.resolvedAt,
    }
  }
}

// Utility functions for common database operations
export const dbUtils = {
  // Hash password (use bcrypt in production)
  hashPassword: (password: string): string => {
    // Mock implementation - use proper bcrypt in production
    return Buffer.from(password).toString("base64")
  },

  // Verify password (use bcrypt in production)
  verifyPassword: (password: string, hash: string): boolean => {
    // Mock implementation - use proper bcrypt in production
    return Buffer.from(password).toString("base64") === hash
  },

  // Generate session token (use proper JWT in production)
  generateSessionToken: (userId: string, email: string): string => {
    return Buffer.from(JSON.stringify({ userId, email, timestamp: Date.now() })).toString("base64")
  },

  // Verify session token (use proper JWT in production)
  verifySessionToken: (token: string): { userId: string; email: string } | null => {
    try {
      const decoded = JSON.parse(Buffer.from(token, "base64").toString())
      // In production, verify expiration and signature
      return { userId: decoded.userId, email: decoded.email }
    } catch {
      return null
    }
  },

  // Sanitize user input
  sanitizeInput: (input: string): string => {
    return input.trim().replace(/[<>]/g, "")
  },

  // Format date for database
  formatDate: (date: Date): string => {
    return date.toISOString().split("T")[0]
  },

  // Calculate mood trend
  calculateMoodTrend: (moodEntries: MoodEntry[]): "improving" | "declining" | "stable" => {
    if (moodEntries.length < 2) return "stable"

    const recent = moodEntries.slice(-7) // Last 7 entries
    const older = moodEntries.slice(-14, -7) // Previous 7 entries

    if (recent.length === 0 || older.length === 0) return "stable"

    const recentAvg = recent.reduce((sum, entry) => sum + entry.moodScore, 0) / recent.length
    const olderAvg = older.reduce((sum, entry) => sum + entry.moodScore, 0) / older.length

    const difference = recentAvg - olderAvg

    if (difference > 0.5) return "improving"
    if (difference < -0.5) return "declining"
    return "stable"
  },
}
