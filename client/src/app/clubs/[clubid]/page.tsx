"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EventCard } from "@/components/event-card"
import { MemberAvatar } from "@/components/member-avatar"
import { Club, ClubMember } from "@/types/club"
import { BadgeCheck, CalendarDays, Users } from 'lucide-react'
import FollowClubBtn from "@/components/FollowClubBtn"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import axios from "axios"
import { useAtom } from "jotai"
import { followedClubsAtom } from "@/store/useStore"


const events: any = [
  {
    id: "1",
    title: "Annual Hackathon 2024",
    date: new Date("2024-03-15"),
    location: "University Tech Center",
    description: "24-hour coding challenge with amazing prizes and opportunities to network with industry professionals.",
    image: "/placeholder.svg?height=200&width=400",
    numRegistered: 35
  },
  {
    id: "2",
    title: "Web Development Workshop",
    date: new Date("2024-02-20"),
    location: "Computer Science Building, Room 101",
    description: "Learn the basics of web development with React and Next.js. Perfect for beginners!",
    image: "/placeholder.svg?height=200&width=400",
    numRegistered: 45
  },
  {
    id: "3",
    title: "Tech Industry Panel",
    date: new Date("2024-02-28"),
    location: "Virtual Event",
    description: "Join us for an insightful discussion with tech industry leaders about career opportunities and industry trends.",
    image: "/placeholder.svg?height=200&width=400",
    numRegistered: 67
  }
]

const members: ClubMember[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "President",
    avatar: "/placeholder.svg?height=100&width=100"
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Vice President",
    avatar: "/placeholder.svg?height=100&width=100"
  },
  {
    id: "3",
    name: "Emily Williams",
    role: "Event Coordinator",
    avatar: "/placeholder.svg?height=100&width=100"
  },
  {
    id: "4",
    name: "David Kim",
    role: "Treasurer",
    avatar: "/placeholder.svg?height=100&width=100"
  }
]

export default function page() {
  const [clubData, setClubData] = useState<Club>({
    name: "",
    description: "",
    numFollowers: 0,
    city: "",
    memberCount: 0,
    university: "",
    founded: 0,
    id: "",
    email: "",
    category: "",
    avatar: "",
  });
  const [followedClubs, setFollowedClubs] = useAtom(followedClubsAtom);
  const [following, setFollowing] = useState(false);
  const { clubid } = useParams();

  const incrFollow = () => {
    const newFollowers = clubData?.numFollowers + 1;
    setClubData({...clubData, numFollowers: newFollowers});
  }

  const descrFollow = () => {
    const newFollowers = clubData?.numFollowers - 1;
    setClubData({...clubData, numFollowers: newFollowers});
  }

  useEffect(() => {
    const userid = localStorage.getItem("userid");
    const url = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/api/clubs/${clubid}/${userid}`

    axios.get(url)
      .then(response => {
        const cdata = response.data.club;
        setClubData({
          id: cdata.id,
          name: cdata.name,
          description: cdata.description,
          email: cdata.email,
          category: cdata.category,
          memberCount: cdata.memberCount,
          numFollowers: cdata.followers.length,
          university: cdata.university,
          city: cdata.city,
          founded: cdata.founded,
          avatar: cdata.avatar,
        })

        setFollowing(response.data.followed);
      })
  } ,[]);

  return (
    
    <div className="min-h-screen bg-background mt-2">
      {/* Hero Section */}
      <div className="relative container mx-auto rounded-lg backdrop:blur-md shadow-md mb-2 mt-4 px-2 sm:px-4 py-4 border-2">
        <div className="flex items-center gap-6 justify-center">
          {/* <img
            src={clubData.logo}
            alt={`${clubData.name} logo`}
            className="w-24 h-24 rounded-lg border-4 border-background"
          /> */}
          <div className="h-16 w-16 rounded-full bg-gray-200 flex justify-center items-center text-2xl">
            C
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-black mb-1">{clubData?.name}</h1>
            <h3 className="text-black/95 text-xl">{clubData?.university}</h3>
            <p className="text-black/70 font-bold">{clubData?.numFollowers ? (clubData.numFollowers + " Followers") : "0 Followers"} </p>
          </div>

          <div>
            <FollowClubBtn incrFollow={incrFollow} decrFollow={descrFollow} setFollowing={setFollowing} following={following} clubId={clubData ? clubData.id : ""} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8 mx-auto">
        <div className="grid lg:grid-cols-3 gap-8 place-content-center">
          {/* Left Column - Club Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="prose dark:prose-invert">
              <h2 className="text-2xl font-bold">About Us</h2>
              <p>{clubData?.description}</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {events.map((event: any) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Club Leadership</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {members.map((member) => (
                  <MemberAvatar key={member.id} member={member} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Stats & Management */}
          <div className="space-y-6">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold">Club Statistics</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium leading-none">{clubData?.memberCount} Members</p>
                      <p className="text-sm text-muted-foreground">Active community</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <CalendarDays className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium leading-none">Founded {clubData?.founded}</p>
                      <p className="text-sm text-muted-foreground">{new Date().getFullYear() - (clubData ? clubData.founded : 0)} years of excellence</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <BadgeCheck className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium leading-none">Verified Club</p>
                      <p className="text-sm text-muted-foreground">University recognized</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Tabs defaultValue="announcements" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="announcements">Announcements</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>
              <TabsContent value="announcements" className="border rounded-lg p-4 mt-2">
                <div className="space-y-4">
                  <div>
                    <p className="font-medium">New Workshop Series!</p>
                    <p className="text-sm text-muted-foreground">Posted 2 days ago</p>
                  </div>
                  <div>
                    <p className="font-medium">Meeting Room Changed</p>
                    <p className="text-sm text-muted-foreground">Posted 5 days ago</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="resources" className="border rounded-lg p-4 mt-2">
                <div className="space-y-4">
                  <div>
                    <p className="font-medium">Workshop Slides</p>
                    <p className="text-sm text-muted-foreground">Download PDF</p>
                  </div>
                  <div>
                    <p className="font-medium">Club Constitution</p>
                    <p className="text-sm text-muted-foreground">View Document</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

