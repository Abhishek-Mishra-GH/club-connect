"use client";

import React from "react";
import { Button } from "./ui/button";
import { clubAtom, userAtom, followedClubsAtom } from "@/store/useStore";
import { useAtom } from "jotai";
import resetLocalStorage from "@/utils/resetLocalStorage";
import { useRouter } from "next/navigation";

export default function Logout() {
  const [user, setUser] = useAtom(userAtom);
  const [club, setClub] = useAtom(clubAtom);
  const [followedClubs, setFollowedClubs] = useAtom(followedClubsAtom);
  const router = useRouter();

  return (
    <Button
      className="bg-white text-cyan-700 rounded-md border-2 border-cyan-600 hover:border-red-600 hover:bg-white hover:text-red-600"
      onClick={() => {
        setUser(null);
        setClub(null);
        setFollowedClubs([]);
        resetLocalStorage();
        router.push('/');
      }}
    >
      Logout
    </Button>
  );
}
