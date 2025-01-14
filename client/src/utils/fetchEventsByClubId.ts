"use client"

import axios from 'axios'
import { Event } from "@/types/event"
import { mapBackendToFrontendEvent } from "./mapBackendToFrontendEvent"


export const fetchEventsByClubId = async (clubId: string): Promise<Event[]> => {
  try {
    const backend = process.env.NEXT_PUBLIC_BACKEND_SERVICE;
    const response = await axios.get(`${backend}/api/events/${clubId}`);
    const backendEvents = response.data;

    const events = backendEvents.map((backendEvent: any) => 
      mapBackendToFrontendEvent(backendEvent)
    );

    return events;
  } catch (error) {
    console.log(error);
    return [];
  }
}