'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ClubMember } from "@/types/club"

interface MemberAvatarProps {
  member: ClubMember
}

export function MemberAvatar({ member }: MemberAvatarProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <Avatar className="h-20 w-20">
        <AvatarImage src={member.avatar} alt={member.name} />
        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="text-center">
        <p className="font-medium">{member.name}</p>
        <p className="text-sm text-muted-foreground">{member.role}</p>
      </div>
    </div>
  )
}

