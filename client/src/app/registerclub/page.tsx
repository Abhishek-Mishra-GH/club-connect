"use client";

import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export default function page() {
  const [club, setClub] = useState({
    name: "",
    email: "",
    description: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleClubRegisterForm = (e: any) => {
    e.preventDefault();
    setLoading(true);

    // validate password length
    if(club.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    const url = "http://localhost:8080/api/auth/register-club";
    const data = {...club};
  
    axios.post(url, data)
      .then(response => {
        router.push("/login");
      })
      .catch(err => {
        setError(err.response.data.message ? err.response.data.message : "Something went wrong. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      })
  };

  return (
    <div className="w-full h-[calc(100vh-60px)] flex justify-center items-center bg-gray-100">
      <form onSubmit={handleClubRegisterForm} className="flex flex-col gap-3 bg-white border-2 p-4 w-[400px] rounded-lg shadow-md">
        <input
        required
        className="border-2 rounded-sm text-lg px-4 py-2"
          onChange={(e) => {
            setClub((prev) => ({ ...prev, name: e.target.value }));
          }}
          value={club.name}
          type="text"
          id="clubName"
          placeholder="Name of the club"
        />
        <input
        required
        className="border-2 rounded-sm text-lg px-4 py-2"
          onChange={(e) => {
            setClub((prev) => ({ ...prev, description: e.target.value }));
          }}
          value={club.description}
          type="text"
          id="clubDescription"
          placeholder="Description of the club"
        />
        <input
        required
        className="border-2 rounded-sm text-lg px-4 py-2"
          onChange={(e) => {
            setClub((prev) => ({ ...prev, email: e.target.value }));
          }}
          value={club.email}
          type="email"
          id="clubEmail"
          placeholder="Club email"
        />
        <input
        required
        className="border-2 rounded-sm text-lg px-4 py-2"
          onChange={(e) => {
            setClub((prev) => ({ ...prev, password: e.target.value }));
          }}
          value={club.password}
          type="password"
          id="clubPassaword"
          placeholder="Password"
        />
        <p className="text-sm ml-1.5">Already have an account ? <Link href="/login" className="text-blue-400">Login now.</Link></p>

        {error && <p className="text-red-500 text-sm">* {error}</p>}

        <button 
          type="submit" 
          disabled={loading}
          className={twMerge("border-2 rounded-lg px-4 py-2 text-white bg-black hover:bg-gray-700", loading && "bg-gray-700")}
          
        >Register</button>
      </form>
    </div>
  );
}
