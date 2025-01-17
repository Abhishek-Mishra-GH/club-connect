export interface UserData {
  id: string
  name: string
  email: string
  avatar?: string
  university?: string
  city?: string
}

export interface ClubData {
  id: string
  name: string
  email: string
  description?: string
  avatar?: string
  numFollowers: number
  memberCount: number
  category?: string
  university?: string
  city?: string
  founded?: string
}

