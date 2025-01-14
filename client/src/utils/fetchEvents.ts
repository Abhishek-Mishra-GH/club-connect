import axios from 'axios';
import { Event } from "@/types/event";
import { mapBackendToFrontendEvent } from "./mapBackendToFrontendEvent";

export const fetchEvents = async (): Promise<Event[]> => {
  const userId = localStorage.getItem("userid") || "NA"
  try {
    const backend = process.env.NEXT_PUBLIC_BACKEND_SERVICE
    const response = await axios.get(`${backend}/api/events?userId=${userId}`); // Adjust endpoint as needed
    const backendEvents = response.data;

    // Map backend events to the frontend Event type
    const events = backendEvents.map((backendEvent: any) => 
      mapBackendToFrontendEvent(backendEvent)
    );

    return events;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
};
