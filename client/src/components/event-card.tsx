'use client'

import { CalendarIcon, MapPinIcon } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ClubEvent } from "@/types/club"

interface EventCardProps {
  event: ClubEvent
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Card>
      {event.image && (
        <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
          <img
            src={event.image}
            alt={event.title}
            className="object-cover w-full h-full"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle>{event.title}</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <CalendarIcon className="h-4 w-4" />
          {event.date.toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{event.description}</p>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <MapPinIcon className="h-4 w-4" />
          {event.location}
        </div>
        <Button className="w-full">Register for Event</Button>
      </CardContent>
    </Card>
  )
}

