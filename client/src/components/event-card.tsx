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
      {event.image || (
        <div className="relative top-0 h-36 w-full overflow-hidden rounded-t-lg bg-gray-500">
          <img
            src={event.image}
            alt={event.name}
            className="object-cover w-full h-full"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl">{event.name}</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <CalendarIcon className="h-4 w-4" />
          {event.date.toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            {event.description}
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <div><MapPinIcon className="h-4 w-4" /></div>
            <p>{event.location}</p>
          </div>
          <div className={twMerge("flex items-center gap-2 text-sm text-muted-foreground mb-4", (event.description.length + event.location.length) < 50 ? "mb-9" : "mb-4")}>
            <Users className="h-4 w-4" />
            <span className={twMerge("font-semibold text-black/90")}>
              {numRegistrations + " "}
            </span>{" "}
            Registrations
          </div>
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
      </CardContent>
    </Card>
  );
}
