"use client"

import React from 'react'
import { BookOpen, Calendar, Globe2, Users } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"


const features = [
  {
    title: "Club Discovery",
    description: "Find and join clubs that match your interests from universities across the country.",
    icon: Globe2,
  },
  {
    title: "Event Management",
    description: "Create, manage, and promote club events with ease. Track registrations and attendance.",
    icon: Calendar,
  },
  {
    title: "Community Building",
    description: "Connect with like-minded students and build lasting relationships through shared interests.",
    icon: Users,
  },
  {
    title: "Upcoming Features",
    description: "Discover new tools, templates, and expert resources designed to help your club thrive and achieve greater success.",
    icon: BookOpen,
  },
]

export default function FeaturesSection() {
  return (
          <section className="py-20 md:py-28 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-600 to-cyan-400 bg-clip-text text-transparent">
                Everything You Need to Thrive
              </h2>
              <p className="text-muted-foreground">
                ClubConnect provides all the tools and features you need to discover, follow, and manage university clubs.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature) => (
                <Card key={feature.title} className="bg-gradient-to-b from-white to-cyan-50/50 dark:from-gray-950 dark:to-cyan-950/20">
                  <CardHeader>
                    <feature.icon className="h-10 w-10 text-cyan-600 mb-2" />
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
  )
}
