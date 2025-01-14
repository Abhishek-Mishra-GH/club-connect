"use client"

import ClubAccount from "@/components/ClubAccount"
import UserAccount from "@/components/UserAccount";
import isCurrentUserClub from "@/utils/isCurrentUserClub"
import React, { useEffect, useState } from 'react'

export default function page() {
  const [isClub, setIsClub] = useState(false);

  useEffect(() => {
    const clubStatus = localStorage.getItem("isClub") === "true";
    setIsClub(clubStatus);
  }, []);

  if(isClub) {
    return <ClubAccount />
  } else {
    return <UserAccount />
  }
}
