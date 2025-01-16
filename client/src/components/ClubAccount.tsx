"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Event } from "@/types/event";
import { fetchEventsByClubId } from "@/utils/fetchEventsByClubId";
import { EventCard } from "./event-card";
import { clubAtom } from "@/store/useStore";
import { useAtom } from "jotai";
import axios from "axios";
import CreateEventBtn from "./CreateEventBtn";
import Logout from "./Logout";

export default function ClubProfilePage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [club, setClub] = useAtom(clubAtom);
  const [avatar, setAvatar] = useState<File | null>(null);


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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if(!club) return;
    
    try {
      const formData = new FormData();
      formData.append("id", club.id);
      formData.append("name", club.name);
      formData.append("description", club.description);
      formData.append("category", club.category);
      formData.append("city", club.city);
      formData.append("university", club.university);
      formData.append("memberCount", club.memberCount.toString());
      formData.append("founded", club.founded.toString())

      if(avatar) {
        formData.append('avatar', avatar);
      }

      const backend = process.env.NEXT_PUBLIC_BACKEND_SERVICE;
      const url = `${backend}/api/profile/save-profile?type=club`;
      const response = await axios.put(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      const newData = {...club, avatar: response.data.profile.avatar}
      setClub(newData);
      localStorage.setItem("clubdata", JSON.stringify(newData));
    } catch (error: any) {
      console.log(error);
      console.log(error.response)
    }

    setLoading(false);
  }


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
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-cyan-600">Club Profile Management</h1>

        <Tabs defaultValue="details" className="space-y-4">
          <div className="flex justify-between">
          <TabsList>
            <TabsTrigger value="details">Club Details</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>
          <Logout/>
          </div>

          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl">
                  Club Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <div className="space-y-2">
                      <Label htmlFor="name">Club Name</Label>
                      <Input id="name" onChange={(e) => setClub({...club!, name: e.target.value })} value={club?.name} />
                    </div>
                  </div>
                  <div className="flex gap-1 sm:gap-6 items-center">
                  <div>
                      {club?.avatar ? (
                        <img
                          className="h-12 w-12 rounded-full"
                          src={club.avatar}
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-full flex justify-center items-center text-2xl bg-gray-200 text-black font-semibold">
                          {" "}
                          {club?.name.charAt(0)}{" "}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-start gap-2 sm:gap-4">
                    <Label>Change Club Logo</Label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          setAvatar(e.target.files?.[0] || null);
                        }}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      onChange={(e) => setClub({...club!, description: e.target.value })} 
                      value={club?.description}
                    />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Input id="category" onChange={(e) => setClub({...club!, category: e.target.value })} value={club?.category} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" onChange={(e) => setClub({...club!, city: e.target.value })} value={club?.city} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="uni">University</Label>
                      <Input id="uni" onChange={(e) => setClub({...club!, university: e.target.value })} value={club?.university} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="founded">Founded Year</Label>
                      <Input
                        id="founded"
                        type="number"
                        onChange={(e) => setClub({...club!, founded: Number(e.target.value)  })} value={club?.founded}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="founded">Total Members</Label>
                      <Input
                        required
                        id="memberCount"
                        type="number"
                        onChange={(e) => setClub({...club!, memberCount: Number(e.target.value)  })} value={club?.memberCount}
                      />
                    </div>
                  </div>

                  <Button type="submit">Save Changes</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events">
            <Card>
              <CardHeader>
                <div className="w-full flex justify-between ">
                  <CardTitle className="text-xl sm:text-2xl">Events</CardTitle>
                  <CreateEventBtn/>
                </div>
              </CardHeader>
              <CardContent>
                {/* Events Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {events.map((event) => {
                    return <EventCard key={event.id} event={event} />;
                  })}
                  {/* {events.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))} */}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
}
