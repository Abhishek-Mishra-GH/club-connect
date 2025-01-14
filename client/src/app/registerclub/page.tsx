"use client";

import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import CustomLabel from "@/components/CustomLabel";
import { Button } from "@/components/ui/button";



export default function page() {
  const [club, setClub] = useState({
    name: "",
    email: "",
    description: "",
    category: "",
    memberCount: "",
    university: "",
    city: "",
    password: "",
    founded: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleClubRegisterForm = (e: any) => {
    e.preventDefault();
    setLoading(true);

    // validate password length
    if (club.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    const backend = process.env.NEXT_PUBLIC_BACKEND_SERVICE;
    const url = `${backend}/api/auth/register-club`;
    const data = { ...club };

    axios
      .post(url, data)
      .then((response) => {
        router.push("/login");
      })
      .catch((err) => {
        setError(
          err.response.data.message
            ? err.response.data.message
            : "Something went wrong. Please try again later."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleClubRegisterForm}
        className="grid grid-cols-1 lg:grid-cols-2 gap-3 bg-white border-2 p-4 min-w-[380px] rounded-lg shadow-md"
      >
        <div className="w-full flex flex-col">
          <CustomLabel htmlFor="clubName">Club Name</CustomLabel>
          <br />
          <input
            required
            name="clubName"
            className="border-2 rounded-sm text-lg px-4 py-2"
            onChange={(e) => {
              setClub((prev) => ({ ...prev, name: e.target.value }));
            }}
            value={club.name}
            type="text"
            id="clubName"
            placeholder="ClubConnect"
          />
        </div>
        <div className="w-full flex flex-col">
          <CustomLabel htmlFor="university">University</CustomLabel>
          <br />
          <input
            required
            name="university"
            className="border-2 rounded-sm text-lg px-4 py-2"
            onChange={(e) => {
              setClub((prev) => ({ ...prev, university: e.target.value }));
            }}
            value={club.university}
            type="text"
            id="clubUniversity"
            placeholder="Name of the university"
          />
        </div>
        <div className="w-full flex flex-col">
          <CustomLabel htmlFor="city">City</CustomLabel>
          <br />
          <input
            required
            name="city"
            className="border-2 rounded-sm text-lg px-4 py-2"
            onChange={(e) => {
              setClub((prev) => ({ ...prev, city: e.target.value }));
            }}
            value={club.city}
            type="text"
            id="city"
            placeholder="Bhopal"
          />
        </div>
        <div className="w-full flex flex-col">
          <CustomLabel htmlFor="clubCategory">Category</CustomLabel>
          <br />
          <input
            required
            name="clubCategory"
            className="border-2 rounded-sm text-lg px-4 py-2"
            onChange={(e) => {
              setClub((prev) => ({ ...prev, category: e.target.value }));
            }}
            value={club.category}
            type="text"
            id="clubCategory"
            placeholder="Coding"
          />
        </div>
        <div className="w-full flex flex-col col-span-2">
          <CustomLabel htmlFor="clubDescription">Description</CustomLabel>
          <br />
          <textarea
            required
            name="clubDescription"
            className="border-2 rounded-sm text-lg px-4 py-2 "
            onChange={(e) => {
              setClub((prev) => ({ ...prev, description: e.target.value }));
            }}
            value={club.description}
            id="clubDescription"
            placeholder="Official club of ClubConnect"
          />
        </div>
        {/* other details */}
        <div className="w-full flex flex-col">
          <CustomLabel htmlFor="founded">Founded In</CustomLabel>
          <br />
          <input
            required
            name="founded"
            className="border-2 rounded-sm text-lg px-4 py-2"
            onChange={(e) => {
              setClub((prev) => ({ ...prev, founded: e.target.value }));
            }}
            value={club.founded}
            type="number"
            id="founded"
            placeholder="2025"
          />
        </div>

        <div className="w-full flex flex-col">
          <CustomLabel htmlFor="totalMembers">Total Members</CustomLabel>
          <br />
          <input
            required
            name="totalmembers"
            className="border-2 rounded-sm text-lg px-4 py-2"
            onChange={(e) => {
              setClub((prev) => ({ ...prev, memberCount: e.target.value }));
            }}
            value={club.memberCount}
            type="number"
            id="memberCount"
            placeholder="25"
          />
        </div>
            
        {/* other details */}
        <div className="w-full flex flex-col">
          <CustomLabel htmlFor="clubEmail">Club Email</CustomLabel>
          <br />
          <input
            required
            name="clubEmail"
            className="border-2 rounded-sm text-lg px-4 py-2"
            onChange={(e) => {
              setClub((prev) => ({ ...prev, email: e.target.value }));
            }}
            value={club.email}
            type="email"
            id="clubEmail"
            placeholder="Club email"
          />
        </div>
        <div className="w-full flex flex-col">
          <CustomLabel htmlFor="clubPassword">Password</CustomLabel>
          <br />
          <input
            required
            name="clubPassword"
            className="border-2 rounded-sm text-lg px-4 py-2"
            onChange={(e) => {
              setClub((prev) => ({ ...prev, password: e.target.value }));
            }}
            value={club.password}
            type="password"
            id="clubPassaword"
            placeholder="Password"
          />
        </div>
        
        <div className="col-span-2">
        <p className="text-sm ml-1.5">
          Already have an account ?{" "}
          <Link href="/login" className="text-blue-400">
            Login now.
          </Link>
        </p>

        {error && <p className="text-red-500 text-sm">* {error}</p>}
        </div>

        <Button
          type="submit"
          disabled={loading}
          size="lg"
          className={twMerge(
            "border-2 rounded-lg px-6 py-6 col-span-2 text-lg",
            loading && "bg-gray-700"
          )}
        >
          Register
        </Button>
      </form>
    </div>
  );
}
