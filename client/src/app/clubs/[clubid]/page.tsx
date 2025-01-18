"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventCard } from "@/components/event-card";
import { Club } from "@/types/club";
import { Building2, Calendar, Mail, MapPin, Users } from "lucide-react";
import FollowClubBtn from "@/components/FollowClubBtn";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { mapBackendToFrontendEvent } from "@/utils/mapBackendToFrontendEvent";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@radix-ui/react-select";
import { Badge } from "@/components/ui/badge";
import { Post } from "@/types/post";
import { PostCard } from "@/components/post-card";

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
  const [events, setEvents] = useState<Event[] | null>(null);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [following, setFollowing] = useState(false);
  const { clubid } = useParams();

  const incrFollow = () => {
    const newFollowers = clubData?.numFollowers + 1;
    setClubData({ ...clubData, numFollowers: newFollowers });
  };

  const descrFollow = () => {
    const newFollowers = clubData?.numFollowers - 1;
    setClubData({ ...clubData, numFollowers: newFollowers });
  };

  useEffect(() => {
    const userid = localStorage.getItem("userid");
    const backend = process.env.NEXT_PUBLIC_BACKEND_SERVICE;
    const url = `${backend}/api/clubs/${clubid}/${userid}`;
    const postsRouteUrl = `${backend}/api/posts/${clubid}`;
    console.log(postsRouteUrl, "posturl");

    axios.get(url).then((response) => {
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
      });

      axios.get(postsRouteUrl).then((response) => {
        const pData = response.data;
        if(pData.length !== 0) {
          setPosts(pData);
        }
      });

      const backendEvents = response.data.events;
      const eventsData = backendEvents.map((backendEvent: any) =>
        mapBackendToFrontendEvent(backendEvent)
      );

      console.log(eventsData.length, "ejlkfja event data", eventsData)
      if(eventsData.length !== 0) {
        setEvents(eventsData);
      }
      

      setFollowing(response.data.followed);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white dark:from-cyan-950">
      <div className="container mx-auto py-8 px-3">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-1 space-y-6">
            <Card className="sticky top-6">
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={clubData.avatar} alt={clubData.name} />
                  <AvatarFallback>{clubData.name[0]}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-2xl">{clubData.name}</CardTitle>
                <CardDescription>{clubData.university}</CardDescription>
                <div className="flex flex-wrap gap-2 justify-center mt-2">
                  <Badge
                    variant={"secondary"}
                    className="bg-cyan-100 text-cyan-600 dark:bg-cyan-950 dark:text-cyan-200"
                  >
                    {clubData.city}
                  </Badge>
                  <Badge
                    variant={"secondary"}
                    className="bg-cyan-100 text-cyan-600 dark:bg-cyan-950 dark:text-cyan-200"
                  >
                    {clubData.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-sm text-muted-foreground">
                  {clubData.description}
                </p>

                <div className="grid grid-cols-2 gap-4 py-4 border-y">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-cyan-600">
                      {clubData.memberCount}
                    </p>
                    <p className="text-sm text-muted-foreground">Members</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-cyan-600">
                      {clubData.numFollowers}
                    </p>
                    <p className="text-sm text-muted-foreground">Followers</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Building2 className="h-4 w-4" />
                    Founded in {clubData.founded}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {clubData.city}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    {clubData.email}
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <FollowClubBtn
                    incrFollow={incrFollow}
                    decrFollow={descrFollow}
                    setFollowing={setFollowing}
                    following={following}
                    clubId={clubData?.id || ""}
                  />
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() =>
                      (window.location.href = `mailto:${clubData.email}`)
                    }
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Contact Club
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Content Area */}
          <div className="md:col-span-2">
            <Tabs defaultValue="posts" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="posts">
                  <Users className="mr-2 h-4 w-4" />
                  Posts
                </TabsTrigger>
                <TabsTrigger value="events">
                  <Calendar className="mr-2 h-4 w-4" />
                  Events
                </TabsTrigger>
              </TabsList>

              <TabsContent value="posts" className="space-y-4">
                {posts ? (
                  posts.map((post) => <PostCard key={post.id} post={post} />)
                ) : (
                  <Card>
                    <CardContent className="text-center py-6">
                      <p className="text-muted-foreground">No posts yet</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="events">
                <div className="grid sm:grid-cols-2 gap-4">
                  {events ?
                    (events.map((event: any) => (
                      <EventCard key={event.id} event={event} />
                    ))) : (
                      <Card>
                        <CardContent className="text-center py-6">
                          <p className="text-muted-foreground">No events yet</p>
                        </CardContent>
                      </Card>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
