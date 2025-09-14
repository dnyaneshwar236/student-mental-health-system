import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Shield, Users, BookOpen, MessageCircle, Calendar, Gamepad2 } from "lucide-react"

const iconComponents = {
  Shield,
  Users,
  BookOpen,
  MessageCircle,
  Calendar,
  Gamepad2,
  Heart,
};

type Feature = {
  id: number;
  title: string;
  description: string;
  icon: keyof typeof iconComponents;
  href: string;
};

async function getFeatures(): Promise<Feature[]> {
  try {
    // For production, use an absolute URL from environment variables
    // const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/features`, { cache: 'no-store' });
    const res = await fetch('http://localhost:3000/api/features', { cache: 'no-store' });
    if (!res.ok) {
      console.error('Failed to fetch features');
      return [];
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching features:', error);
    return []; // Return an empty array on error
  }
}

export default async function HomePage() {
  const features = await getFeatures();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">Medico</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/signup">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-5xl font-bold text-foreground mb-6 text-balance">
            Your Mental Health Journey Starts Here
          </h2>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
            A safe, confidential digital platform designed specifically for university students seeking mental health
            support and psychological resources.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="text-lg px-8">
                Start Your Journey
              </Button>
            </Link>
            <Link href="/resources">
              <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                Explore Resources
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-3xl font-bold text-center mb-12 text-foreground">Comprehensive Support for Students</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = iconComponents[feature.icon];
              const CardContent = (
                <Card className="border-border hover:shadow-lg transition-shadow h-full">
                  <CardHeader>
                    {Icon && <Icon className="h-12 w-12 text-primary mb-4" />}
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              );

              return feature.href !== "#" ? (
                <Link href={feature.href} key={feature.id} className="block">
                  {CardContent}
                </Link>
              ) : (
                <div key={feature.id}>{CardContent}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h3 className="text-4xl font-bold text-foreground mb-6 text-balance">
            Take the First Step Towards Better Mental Health
          </h3>
          <p className="text-lg text-muted-foreground mb-8 text-pretty">
            Join thousands of students who have found support, resources, and community through our platform. Your
            mental health matters.
          </p>
          <Link href="/signup">
            <Button size="lg" className="text-lg px-12">
              Join MindCare Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/20 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">Medico</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Supporting student mental health with compassionate, accessible care.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/crisis" className="hover:text-foreground">
                    Crisis Support
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className="hover:text-foreground">
                    Resources
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-foreground">
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Emergency</h4>
              <p className="text-sm text-muted-foreground mb-2">If you're in crisis, please contact:</p>
              <p className="text-sm font-medium">988 Suicide & Crisis Lifeline</p>
              <p className="text-sm font-medium">Text HOME to 741741</p>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 MindCare. All rights reserved. Your mental health matters.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
