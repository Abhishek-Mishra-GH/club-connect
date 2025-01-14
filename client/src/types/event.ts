export interface Event {
  id: string;
  name: string;
  description: string;
  date: Date;
  isPast: boolean; // this refers to status on prisma schema
  numRegistered: number;
  time: String;
  location: string;
  clubId: string;
  image: string;
  registered: boolean;
  city: string;
}