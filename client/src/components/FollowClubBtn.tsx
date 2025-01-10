'use client'

import axios from "axios";
import React, { useEffect, useState } from 'react'
import { twMerge } from "tailwind-merge"

export default function FollowClubBtn({ clubId, className, followed } : { clubId: string, className?: string, followed?: boolean }) {
  const [loading, setLoading] = useState(false);
  const [following, setFollwing] = useState(false);
  const [isClub, setIsClub] = useState(true);


  useEffect(() => {
    setFollwing(followed ? true : false);
    setIsClub(localStorage.getItem("isClub") === "true" ? true : false);
  } ,[])
  
  const handleClick = async () => {

    setLoading(true);

    const token = localStorage.getItem("token");
    const backend = process.env.NEXT_PUBLIC_BACKEND_SERVICE;
    const followRouteUrl = `${backend}/api/clubs/follow`;
    const unfollowRouteUrl = `${backend}/api/clubs/follow`;

    const url = following ? unfollowRouteUrl : followRouteUrl;

    try {
      await axios.post(url, {clubId}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setFollwing(!following)
    } catch (err) {
      if(err instanceof Error) {
        console.log(err.message);
      } else {
        console.log(err);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <button 
      onClick={handleClick}
      disabled={loading}
      className={twMerge(className, isClub && "hidden" , "px-3 py-1.5 rounded-md", loading && "bg-gray-400/60", following ? "bg-white border-2 border-black text-black" : "bg-black text-white")}
    >
        {!following ? "Follow Club" : "Unfollow"}
    </button>
  )
}
