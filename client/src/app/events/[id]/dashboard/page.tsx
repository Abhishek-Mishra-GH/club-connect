"use client"

import { useEffect, useState } from "react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { StatCard } from "@/components/stat-card"
import { EventDetails } from "@/types/eventstatdata"
import { useParams, useRouter } from 'next/navigation';
import { CalendarDays, GraduationCap, MapPin, Search, Trash2, Users } from 'lucide-react'
import Loading from "@/app/loading"
import axios from "axios"


// Sample data - replace with actual data fetching
// const eventData: EventDetails = {
//   id: "1",
//   title: "Annual Hackathon 2024",
//   date: new Date("2024-03-15"),
//   time: "02:00 PM",
//   location: "University Tech Center",
//   description: "24-hour coding challenge with amazing prizes and opportunities to network with industry professionals.",
//   image: "/placeholder.svg?height=200&width=400",
//   category: "Technology",
//   registeredUsers: Array.from({ length: 25 }, (_, i) => ({
//     id: `user-${i + 1}`,
//     name: `Student ${i + 1}`,
//     email: `student${i + 1}@university.edu`,
//     city: ["New York", "Boston", "San Francisco", "Chicago"][Math.floor(Math.random() * 4)],
//     university: ["State University", "Tech Institute", "City College"][Math.floor(Math.random() * 3)],
//     registrationDate: new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000),
//     avatar: `/placeholder.svg?height=40&width=40&text=${i + 1}`
//   }))
// }

export default function EventDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [eventData, setEventData] = useState<EventDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const backend = process.env.NEXT_PUBLIC_BACKEND_SERVICE;
    const url = `${backend}/api/events/stats/${id}`

    axios.post(url, {eventId: id}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then((response) => {
      console.log(response.data);
      setEventData(response.data);
    })
    .catch((err) => {
      console.log(err.response);
    })
    .finally(() => {
      setLoading(false);
    })
  }, [])
  
  const filteredUsers = eventData?.registeredUsers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.city.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleDeleteEvent = () => {
    setLoading(true);
    const backend = process.env.NEXT_PUBLIC_BACKEND_SERVICE;
    const url = `${backend}/api/events/${id}`

    axios.delete(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((err) => {
      console.log(err.response.message);
    })
    .finally(() => {
      setLoading(false);
      router.push('/events');
    })
    
  }

    if (loading) {
      return (
        <div className="h-[calc(100vh-120px)] w-screen flex justify-center items-center">
          <Loading/>
        </div>
      );
    }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-3">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left Column - Event Details */}
          <div className="lg:col-span-2">
            <Card>
              {eventData?.image && (
                <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                  <img
                    src={eventData.image || "/placeholder.svg"}
                    alt={eventData.title}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle>{eventData?.title}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  {(new Date(eventData?.date!).toLocaleDateString())}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{eventData?.description}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {eventData?.location}
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="w-full">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Event
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the event
                        and remove all registrations.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteEvent}>
                        Delete Event
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Registrations */}
          <div className="lg:col-span-3 space-y-6">
            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-3">
              <StatCard
                title="Total Registrations"
                value={Number(eventData?.registeredUsers.length)}
                icon={Users}
              />
              <StatCard
                title="Universities"
                value={new Set(eventData?.registeredUsers.map(u => u.university)).size}
                icon={GraduationCap}
              />
              <StatCard
                title="Cities"
                value={new Set(eventData?.registeredUsers.map(u => u.city)).size}
                icon={MapPin}
              />
            </div>

            {/* Registered Users */}
            <Card>
              <CardHeader>
                <CardTitle>Registered Users</CardTitle>
                <CardDescription>
                  View and manage event registrations
                </CardDescription>
                <div className="mt-4">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px] pr-4">
                  <div className="space-y-4">
                    {filteredUsers?.map((user) => (
                      <Card key={user.id}>
                        <CardContent className="flex items-center gap-4 py-4">
                          <Avatar>
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-1">
                            <p className="font-medium leading-none">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <GraduationCap className="h-3 w-3" />
                              {user.university}
                              <span>•</span>
                              <MapPin className="h-3 w-3" />
                              {user.city}
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Registered {(new Date(user?.registrationDate!).toLocaleDateString())}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    {filteredUsers?.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        No users found matching your search criteria.
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

