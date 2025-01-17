import { RegisteredUser } from "./registereduser"

export interface EventDetails {
  id: string
  title: string
  date: Date
  time: string
  location: string
  description: string
  image?: string
  category: string
  registeredUsers: RegisteredUser[]
}