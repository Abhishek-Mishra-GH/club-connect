"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, Upload, X } from "lucide-react";
import { Club } from "@/types/club";
import { Event } from "@/types/event";
import { fetchEventsByClubId } from "@/utils/fetchEventsByClubId";
import { EventCard } from "./event-card";
import Link from "next/link";

// Sample data - replace with actual data fetching
const clubData: Partial<Club> = {
  id: "1",
  name: "Computer Science Society",
  description: "A community of tech enthusiasts and future innovators.",
  category: "Technology",
  memberCount: 156,
  university: "State University",
  founded: 2015,
  avatar: "/placeholder.svg?height=100&width=100",
};

export default function ClubProfilePage() {
  const [gallery, setGallery] = useState<string[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const clubId = localStorage.getItem("clubid") || "";
        const fetchedEvents = await fetchEventsByClubId(clubId);
        setEvents([...fetchedEvents]);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // In a real application, you would handle file upload to your storage service
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGallery([...gallery, reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return (
      <div className="h-[calc(100vh-120px)] w-screen flex justify-center items-center">
        <h2 className="text-2xl">Please Wait...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 mx-auto">
        <h1 className="text-4xl font-bold mb-8">Club Profile Management</h1>

        <Tabs defaultValue="details" className="space-y-4">
          <TabsList>
            <TabsTrigger value="details">Club Details</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl">Club Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Club Name</Label>
                    <Input id="name" defaultValue={clubData.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      defaultValue={clubData.description}
                    />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Input id="category" defaultValue={clubData.category} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="founded">Founded Year</Label>
                      <Input
                        id="founded"
                        type="number"
                        defaultValue={clubData.founded}
                      />
                    </div>
                  </div>
                  {/* <div className="space-y-2">
                    <Label>Cover Image</Label>
                    <div className="flex items-center gap-4">
                      <img
                        src={clubData.coverImage}
                        alt="Cover"
                        className="w-40 h-24 object-cover rounded-lg"
                      />
                      <Button variant="outline" size="icon">
                        <ImagePlus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div> */}
                  <div className="space-y-2">
                    <Label>Club Logo</Label>
                    <div className="flex items-center gap-4">
                      <img
                        src={clubData.avatar}
                        alt="Logo"
                        className="w-24 h-24 object-cover rounded-lg  border-2 border-Black"
                      />
                      <Button variant="outline" size="icon">
                        <ImagePlus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button>Save Changes</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events">
            <Card>
              <CardHeader>
                
              <div className="w-full flex justify-between ">
                  <CardTitle className="text-xl sm:text-2xl">Events</CardTitle>
                  <Link href="/events/create-event">
                  <Button>
                    Create Event
                  </Button>
                  </Link>
              </div>
              </CardHeader>
              <CardContent>
                {/* Events Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {events.map(event => {
                    return <EventCard key={event.id} event={event}/>
                  })}
                  {/* {events.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))} */}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gallery">
            <Card>
              <CardHeader>
                <CardTitle>Club Gallery</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="h-8 w-8 mb-4 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleImageUpload}
                        accept="image/*"
                      />
                    </label>
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    {gallery.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Gallery image ${index + 1}`}
                          className="w-full aspect-square object-cover rounded-lg"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() =>
                            setGallery(gallery.filter((_, i) => i !== index))
                          }
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
