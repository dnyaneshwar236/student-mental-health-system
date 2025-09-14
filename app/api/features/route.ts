import { NextResponse } from 'next/server';

export async function GET() {
  const features = [
    {
      id: 1,
      title: "Safe & Confidential",
      description: "Your privacy is our priority. All interactions are secure and confidential.",
      icon: "Shield",
      href: "#"
    },
    {
      id: 2,
      title: "Peer Support",
      description: "Connect with other students who understand your challenges and experiences.",
      icon: "Users",
      href: "#"
    },
    {
      id: 3,
      title: "Resource Library",
      description: "Access curated mental health resources, articles, and self-help tools.",
      icon: "BookOpen",
      href: "/resources"
    },
    {
      id: 4,
      title: "Stress Relief Games",
      description: "Engage in calming activities and games to relax and de-stress.",
      icon: "Gamepad2",
      href: "/games"
    },
    {
      id: 5,
      title: "24/7 Support Chat",
      description: "Get immediate support through our crisis chat and helpline services.",
      icon: "MessageCircle",
      href: "#"
    },
    {
      id: 6,
      title: "Appointment Booking",
      description: "Schedule sessions with licensed counselors and mental health professionals.",
      icon: "Calendar",
      href: "#"
    },
    {
      id: 7,
      title: "Wellness Tracking",
      description: "Monitor your mental health journey with mood tracking and progress insights.",
      icon: "Heart",
      href: "#"
    }
  ];

  return NextResponse.json(features);
}