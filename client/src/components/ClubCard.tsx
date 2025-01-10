'use client'

import axios from "axios";
import React from "react";
import { twMerge } from "tailwind-merge";

export default function ClubCard({ name, description, id, isClub } : { name: string, description: string, id: number, isClub: boolean | null }) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [followed, setFollowed] = React.useState<boolean>(false);

  const handleFollow = async () => {
    setLoading(true);

    const token = localStorage.getItem("token");

    const followRouteUrl = `http://localhost:8080/api/clubs/follow`;
    const unfollowRouteUrl = `http://localhost:8080/api/clubs/unfollow`;

    const url = followed ? unfollowRouteUrl : followRouteUrl;
    // make follow request using axios
    try {
      await axios.post(url, { clubId: id }, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      })

      setFollowed(!followed);
    } catch (error ) {
      if(error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full flex justify-between p-4 border-2 rounded-lg shadow-lg">
      <div>
        <h3 className="font-bold text-xl"> {name} </h3>
        <p className="text-md"> {description} </p>
      </div>

      <div>
        <button 
          onClick={handleFollow}
          disabled={loading}
          className={twMerge("px-4 py-2 rounded-lg m-4", followed ? "bg-white text-blue-500 border-2 border-blue-500" : "text-white bg-blue-500", loading && "opacity-75", isClub ? "hidden" : "block")}>{ followed ? "Following" : "Follow" }
        </button>
      </div>
    </div>
  );
}