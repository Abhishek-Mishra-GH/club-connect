"use client";

import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export default function page() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleRegisterForm = (e: any) => {
    e.preventDefault();
    setLoading(true);

        // validate password length
        if(user.password.length < 6) {
          setError("Password must be at least 6 characters long.");
          setLoading(false);
          return;
        }

    const url = "http://localhost:8080/api/auth/register";
    const data = {...user};
  
    axios.post(url, data)
      .then(response => {
        router.push("/login");
      })
      .catch(err => {
        setError(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="w-full bg-gray-100 h-[calc(100vh-60px)] flex justify-center items-center">
      <form onSubmit={handleRegisterForm} className="flex flex-col gap-3 bg-white border-2 rounded-lg shadow-lg p-4 w-[400px]">
        <input
        required
        className="border-2 rounded-sm text-lg px-4 py-2"
          onChange={(e) => {
            setUser((prev) => ({ ...prev, name: e.target.value }));
          }}
          value={user.name}
          type="text"
          id="name"
          placeholder="Name"
        />
        <input
        required
        className="border-2 rounded-sm text-lg px-4 py-2"
          onChange={(e) => {
            setUser((prev) => ({ ...prev, email: e.target.value }));
          }}
          value={user.email}
          type="email"
          id="email"
          placeholder="Email"
        />
        <input
        required
        className="border-2 rounded-sm text-lg px-4 py-2"
          onChange={(e) => {
            setUser((prev) => ({ ...prev, password: e.target.value }));
          }}
          value={user.password}
          type="password"
          id="passaword"
          placeholder="Password"
        />
        <p className="text-sm ml-1.5">Already have an account ? <Link href="/login" className="text-blue-400">Login now.</Link></p>
        {error && <p className="text-red-500">* {error}</p>}
        <button disabled={loading} type="submit" className={twMerge("border-2 rounded-lg px-4 py-2 text-white bg-black hover:bg-gray-700", loading && "bg-gray-700")}>Register</button>
      </form>
    </div>
  );
}
