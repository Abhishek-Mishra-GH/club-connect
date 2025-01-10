export interface ClubMember {
  id: string
  name: string
  role: string
  avatar: string
}

export interface ClubEvent {
  id: string
  title: string
  date: Date
  location: string
  description: string
  image?: string
  numRegistered: number
}

export interface Club {
  id: string
  name: string
  description: string
  email: string
  category: string
  memberCount: number
  numFollowers: number
  university: string
  city: string
  founded: number
  avatar: string
}

