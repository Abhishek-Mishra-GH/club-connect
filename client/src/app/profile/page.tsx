'use client'

import ClubAccount from "@/components/ClubAccount"
import UserAccount from "@/components/UserAccount";
import isCurrentUserClub from "@/utils/isCurrentUserClub"
import React from 'react'

export default function page() {
  const isClub = isCurrentUserClub();

  if(isClub) {
    return <ClubAccount />
  } else {
    <UserAccount />
  }
}
