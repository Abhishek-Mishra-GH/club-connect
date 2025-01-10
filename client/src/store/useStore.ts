import { atom } from 'jotai';
import { Club } from "@/types/club";

// Interfaces
interface User {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  university: string;
  city: string
}

// interface Club {
//   id: string;
//   name: string;
//   email: string;
//   description: string;
//   avatar: string | null;
//   numFollowers: number;
// }



export interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  clubId: string | null;
  image: string | null;
}

interface IsClub {
  value: boolean;
}

// Jotai Atoms
export const isClubAtom = atom<IsClub | null>(null);
export const userAtom = atom<User | null>(null);
export const clubAtom = atom<Club | null>(null);
export const followedClubsAtom = atom<Club[] | null>([]);
export const registeredEventsAtom = atom<Event[]>([]);

