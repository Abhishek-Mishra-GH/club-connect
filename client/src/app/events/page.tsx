"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { EventCard } from "@/components/event-card";
import { Event } from "@/types/event";
import { fetchEvents } from "@/utils/fetchEvents";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Loading from "../loading";

export default function EventsPage() {
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [showPastEvents, setShowPastEvents] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [cities, setCities] = useState<string[]>(["All Cities"]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const [isClub, setIsClub] = useState(false);

  useEffect(() => {
    // check configs

    if (!localStorage.getItem("token")) {
      router.push("/login");
    }

    // check if it is club
    const clubStatus = localStorage.getItem("isClub") === "true";
    setIsClub(clubStatus);

    // load events
    const loadEvents = async () => {
      try {
        const fetchedEvents = await fetchEvents();
        setEvents(fetchedEvents);
        const uniqueCities: string[] = Array.from(
          new Set(fetchedEvents.map((event) => event.city.toLowerCase()))
        ).map(
          (cityLowerCase) =>
            fetchedEvents.find(
              (event) => event.city.toLowerCase() === cityLowerCase
            )!.city
        );

        setCities(["All Cities", ...uniqueCities]);
      } catch (err) {
        console.error("Error loading events:", err);
        setError("Failed to load events. Please try again later.");
      } 


      setLoading(false);
    };

    loadEvents();
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.name.toLowerCase().includes(search.toLowerCase()) ||
      event.description.toLowerCase().includes(search.toLowerCase());
    const matchesCity = selectedCity === "All Cities" || event.city === selectedCity
    const matchesPastFilter = showPastEvents || !event.isPast;
    return matchesSearch && matchesCity && matchesPastFilter
  });

  if (loading) {
    return (
      <div className="h-[calc(100vh-120px)] w-screen flex justify-center items-center">
        <Loading/>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[calc(100vh-120px)] w-screen flex justify-center items-center">
        <h2 className="text-2xl">{error}</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-2">
      <div className="container py-8 mx-auto">
        <div className="flex justify-between">
        <h1 className="text-2xl sm:text-4xl font-bold mb-8 text-cyan-600">
          Explore Amazing Events
        </h1>
        {isClub && <Link href="/events/create-event">
          <Button>Create Event</Button>
        </Link>}
        </div>
        {/* Filters */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Input
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger>
              <SelectValue placeholder="Select City" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex items-center space-x-2">
            <Switch
              id="past-events"
              checked={showPastEvents}
              onCheckedChange={setShowPastEvents}
            />
            <Label htmlFor="past-events">Show past events</Label>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No events found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
