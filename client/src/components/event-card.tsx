"use client";

import { CalendarIcon, MapPinIcon, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Event } from "@/types/event";
import registerForEvent from "@/utils/registerForEvent";
import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";
import isCurrentUserClub from "@/utils/isCurrentUserClub";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const [loading, setLoading] = useState(false);
  const [numRegistrations, setNumRegistrations] = useState(event.numRegistered);
  const [registered, setRegistered] = useState(event.registered);
  const [isClub, setIsClub] = useState(true);

  useEffect(() => {
    if (!isCurrentUserClub()) {
      setIsClub(false);
    }
  }, []);

  return (
    <Card>
      <div>
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={
              event.image ||
              "https://clubconnect.blr1.digitaloceanspaces.com/placeholder/placeholder-upcoming-image.png"
            }
            alt={event.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 rounded-t-xl"
          />
        </div>
        {event.isPast && (
          <div className="absolute inset-0 bg-background/90 backdrop-blur-sm flex items-center justify-center">
            <span className="text-lg font-semibold">Past Event</span>
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle className="text-xl">{event.name}</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <CalendarIcon className="h-4 w-4" />
          {event.date.toLocaleDateString() + " " + event.time}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col justify-between">
        <p className="text-sm text-muted-foreground mb-4">
          {event.description}
        </p>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <div>
            <MapPinIcon className="h-4 w-4" />
          </div>
          <p>{event.location}</p>
        </div>
        <div
          className={twMerge(
            "flex items-center gap-2 text-sm text-muted-foreground"
          )}
        >
          <Users className="h-4 w-4" />
          <span className={twMerge("font-semibold text-black/90")}>
            {numRegistrations + " "}
          </span>{" "}
          Registrations
        </div>
        </div>
        <div className="border-2 border-green-600 flex-1">
        <Button
          onClick={() => {
            setLoading(true);
            registerForEvent(event.id);
            setRegistered(true);
            setNumRegistrations((prev) => prev + 1);
            setLoading(false);
          }}
          className={twMerge(
            "w-full",
            isClub && "hidden",
            loading && "bg-black/70",
            registered &&
              "bg-white text-black border-2 border-black hover:bg-white cursor-default"
          )}
        >
          {registered ? "Registered" : "Register for Event"}
        </Button>
        </div>
      </CardContent>
    </Card>
  );
}
