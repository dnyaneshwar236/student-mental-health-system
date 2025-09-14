import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const search = searchParams.get("search")

    // Mock resources data
    const allResources = [
      {
        id: "1",
        title: "Understanding Anxiety in College",
        category: "anxiety",
        type: "article",
        description: "Learn about common anxiety triggers and coping strategies for college students.",
        url: "/resources/anxiety-guide",
        readTime: "5 min",
        tags: ["anxiety", "coping", "college"],
      },
      {
        id: "2",
        title: "Stress Management Techniques",
        category: "stress",
        type: "guide",
        description: "Practical techniques for managing academic and social stress.",
        url: "/resources/stress-management",
        readTime: "8 min",
        tags: ["stress", "management", "techniques"],
      },
      {
        id: "3",
        title: "Building Healthy Sleep Habits",
        category: "wellness",
        type: "article",
        description: "Tips for improving sleep quality and establishing healthy sleep routines.",
        url: "/resources/sleep-habits",
        readTime: "6 min",
        tags: ["sleep", "wellness", "habits"],
      },
      {
        id: "4",
        title: "Mindfulness Meditation for Beginners",
        category: "mindfulness",
        type: "video",
        description: "A gentle introduction to mindfulness meditation practices.",
        url: "/resources/mindfulness-intro",
        readTime: "12 min",
        tags: ["mindfulness", "meditation", "beginners"],
      },
      {
        id: "5",
        title: "Recognizing Depression Symptoms",
        category: "depression",
        type: "article",
        description: "Understanding the signs of depression and when to seek help.",
        url: "/resources/depression-signs",
        readTime: "7 min",
        tags: ["depression", "symptoms", "help"],
      },
    ]

    let filteredResources = allResources

    // Filter by category
    if (category && category !== "all") {
      filteredResources = filteredResources.filter((resource) => resource.category === category)
    }

    // Filter by search term
    if (search) {
      const searchLower = search.toLowerCase()
      filteredResources = filteredResources.filter(
        (resource) =>
          resource.title.toLowerCase().includes(searchLower) ||
          resource.description.toLowerCase().includes(searchLower) ||
          resource.tags.some((tag) => tag.toLowerCase().includes(searchLower)),
      )
    }

    return NextResponse.json({
      success: true,
      resources: filteredResources,
      total: filteredResources.length,
    })
  } catch (error) {
    console.error("Resources fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
