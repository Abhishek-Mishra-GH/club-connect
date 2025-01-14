"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ClubCard } from "@/components/club-card"
import { Club } from "@/types/club"

// Sample data - replace with actual data fetching
const clubs: Club[] = [
  {
    id: "1",
    name: "ClubConnect",
    description: "A community of tech enthusiasts and future innovators.",
    category: "Technology",
    memberCount: 156,
    university: "School of information technology, RGPV",
    founded: 2015,
    avatar: "https://clubconnect.blr1.digitaloceanspaces.com/cm5rsn86i0000h76w73s1kc5h/avatars/abf0bb16-949b-4519-a5de-856cc9ed5aac.png",
    numFollowers: 2,
    city: "Bhopal",
    email: ""
  },
  // Add more sample clubs...
]

const categories = ["All", "Technology", "Sports", "Arts", "Academic", "Social"]
const universities = ["All", "State University", "City College", "Tech Institute"]

export default function ClubsPage() {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredClubs = clubs.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(search.toLowerCase()) ||
      club.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === "All" || club.category === selectedCategory
    return matchesSearch && matchesCategory 
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white ">
      <div className="container mx-auto py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-600 to-cyan-400 bg-clip-text text-transparent">
            University Clubs
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover and join amazing university clubs. Connect with like-minded students and pursue your passions.
          </p>
        </div>
        
        {/* Filters */}
        <div className="grid gap-4 md:grid-cols-3 mb-8 bg-white/50 dark:bg-gray-950/50 backdrop-blur-sm rounded-lg p-4">
          <Input
            placeholder="Search clubs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-cyan-200 dark:border-cyan-800 focus:ring-cyan-500"
          />
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="border-cyan-200 dark:border-cyan-800">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Club Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredClubs.map((club) => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>

        {filteredClubs.length === 0 && (
          <div className="text-center py-12 bg-white/50 dark:bg-gray-950/50 backdrop-blur-sm rounded-lg">
            <p className="text-lg text-muted-foreground">No clubs found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}

