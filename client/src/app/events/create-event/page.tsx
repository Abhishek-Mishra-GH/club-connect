"use client";

import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { clubAtom } from "@/store/useStore";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import { useRouter } from "next/navigation";
import isCurrentUserClub from "@/utils/isCurrentUserClub";
import Loading from "@/app/loading";

export default function page() {
  const [club, setClub] = useAtom(clubAtom);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [configLoaded, setConfigLoaded] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();
  const [event, setEvent] = useState({
    name: "",
    description: "",
    location: "",
    date: "",
    time: "12:00",
    clubId: club?.id,
  });

  useEffect(() => {

    if(!localStorage.getItem("token")) {
      router.push('/login')
    }

    if(!isCurrentUserClub()) {
      router.push('/events');
    }
    setConfigLoaded(true);
  },[])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    setLoading(true);
    const url = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/api/events`;

    const isoDateTime = new Date(`${event.date}T${event.time}:00`);

    const formData = new FormData();
    formData.append("name", event.name);
    formData.append("description", event.description);
    formData.append("location", event.location);
    formData.append("clubId", event.clubId!);
    formData.append("date", isoDateTime.toISOString());

    if(image) {
      formData.append('image', image);
    }

    axios
      .post(url, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        router.push("/profile");
      })
      .catch((err) => {
        console.log(err.response);
        setError(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  if(!configLoaded) {
    return <div className="h-[calc(100vh-120px)] w-screen flex justify-center items-center">
      <h2 className="text-2xl">Please Wait...</h2>
    </div>
  }

    if(loading) return <div className="w-full h-[calc(100vh-100px)]">
      <Loading/>
    </div>

  return (
    <div className="h-[calc(100vh-80px)] bg-gradient-to-b from-cyan-50 to-white w-full flex flex-col items-center mb-12">
      <h1 className="text-3xl text-center text-cyan-600 font-semibold mt-6 mb-8">
        Create Event
      </h1>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col gap-3 w-[380px] sm:w-[450px] max-w-screen border-2 border-cyan-600 backdrop:blur-md shadow-xl rounded-xl sm:p-4 p-2"
      >
        <input
          required
          type="text"
          value={event?.name}
          placeholder="Event name"
          className="border-2 rounded-sm text-lg px-4 py-2"
          onChange={(e) => {
            setEvent({ ...event, name: e.target.value });
          }}
        />

        <textarea
          required
          className="border-2 rounded-sm text-lg px-4 py-2"
          value={event.description}
          placeholder="Description"
          onChange={(e) => {
            setEvent({ ...event, description: e.target.value });
          }}
        />

        <textarea
          required
          className="border-2 rounded-sm text-lg px-4 py-2"
          value={event.location}
          placeholder="Admin Block, SOIT RGPV Bhopal, 462033"
          onChange={(e) => {
            setEvent({ ...event, location: e.target.value });
          }}
        />

        <div className="flex items-center gap-3 px-2">
        <label htmlFor="eventDate" className="text-lg">Date:{" "}</label>
        <input
          required
          className="border-2 rounded-sm text-lg px-2 flex-1 py-1"
          type="Date"
          name="eventDate"
          id="eventDate"
          value={event.date}
          onChange={(e) => {
            setEvent({ ...event, date: e.target.value });
            console.log(typeof event.date, event.date);
          }}
        />
        </div>

        <div className="flex items-center gap-3 p-2">
          <label htmlFor="eventTime" className="text-lg">
            Time:{" "}
          </label>
          <input
            required
            className="border-2 rounded-sm text-lg px-2 flex-1 py-1"
            type="Time"
            value={event.time}
            name="eventTime"
            id="eventTime"
            onChange={(e) => {
              setEvent({ ...event, time: e.target.value });
            }}
          />
        </div>

        <div className="flex flex-col gap-3 p-2">
          <div className="text-lg">
            Cover Image:{" "}
          </div>
          <input
          required
          className="border-2 rounded-sm text-lg px-4 py-2"
          type="file"
          accept="image/*"
          onChange={(e) => {
            setImage(e.target.files?.[0] || null);
          }}
        />

        </div>



        {error && <p className="text-red-500">* {error}</p>}

        <button
          type="submit"
          disabled={loading}
          className={twMerge(
            "border-2 rounded-lg px-4 py-2 text-white bg-cyan-600 hover:bg-cyan-800",
            loading && "bg-cyan-800"
          )}
        >
          Create Event
        </button>
      </form>
    </div>
  );
}
