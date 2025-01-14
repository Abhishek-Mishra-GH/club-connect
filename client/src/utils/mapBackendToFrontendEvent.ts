
import { format, parseISO } from 'date-fns';
import { Event } from "@/types/event";

export const mapBackendToFrontendEvent = (backendEvent: any): Event => {
  const isPast = new Date(backendEvent.date) < new Date();

  return {
    id: backendEvent.id,
    name: backendEvent.name,
    description: backendEvent.description,
    date: new Date(backendEvent.date),
    isPast,
    numRegistered: backendEvent.numRegistered,
    time: format(parseISO(backendEvent.date), "h:mm a"), // Format time
    location: backendEvent.location,
    clubId: backendEvent.clubId,
    image: backendEvent.image,
    registered: backendEvent.registered,
    city: backendEvent.city,
  };
};
