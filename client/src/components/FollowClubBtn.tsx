"use client";

import { followedClubsAtom } from "@/store/useStore";
import axios from "axios";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "./ui/button";
import { Users } from "lucide-react";

export default function FollowClubBtn({
  clubId,
  className,
  following,
  setFollowing,
  incrFollow,
  decrFollow,
}: {
  clubId: string;
  className?: string;
  following: boolean;
  setFollowing: any;
  incrFollow: any;
  decrFollow: any;
}) {
  const [loading, setLoading] = useState(false);
  const [followedClubs, setFollowedClubs] = useAtom(followedClubsAtom);
  const [isClub, setIsClub] = useState(true);

  useEffect(() => {
    setIsClub(localStorage.getItem("isClub") === "true" ? true : false);
  }, []);

  const handleClick = async () => {
    setLoading(true);

    const token = localStorage.getItem("token");
    const backend = process.env.NEXT_PUBLIC_BACKEND_SERVICE;
    const followRouteUrl = `${backend}/api/clubs/follow`;
    const unfollowRouteUrl = `${backend}/api/clubs/unfollow`;

    const url = following ? unfollowRouteUrl : followRouteUrl;

    try {
      const response = await axios.post(
        url,
        { clubId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFollowedClubs([...response.data.user.following]);
      if (following) {
        decrFollow();
      } else {
        incrFollow();
      }
      setFollowing(!following);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log(err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={loading}
      variant={following ? "outline" : "default"}
      className={twMerge(
        className,
        isClub && "hidden",
        "px-3 py-2 w-full",    
        loading && "bg-cyan-600/60",
      )}
    >
      <Users className="mr-2 h-4 w-4" />
      {following ? "Unfollow Club" : "Follow Club"}
    </Button>
  );
}
