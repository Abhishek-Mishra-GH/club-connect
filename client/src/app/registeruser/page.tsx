"use client";

import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import CustomLabel from "@/components/CustomLabel";

export default function page() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    city: "",
    university: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleRegisterForm = (e: any) => {
    e.preventDefault();
    setLoading(true);

    // validate password length
    if (user.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    const backend = process.env.NEXT_PUBLIC_BACKEND_SERVICE;
    const url = `${backend}/api/auth/register`;
    const data = { ...user };

    axios
      .post(url, data)
      .then((response) => {
        router.push("/login");
      })
      .catch((err) => {
        setError(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="w-screen bg-gradient-to-b from-cyan-50 to-white min-h-screen">
      <div className="container mx-auto px-3 py-8 flex justify-center">
      <form
        onSubmit={handleRegisterForm}
        className="flex flex-col gap-3 bg-white border-2 rounded-lg shadow-lg p-4 w-[400px]"
      >
        <div className="w-full flex flex-col">
          <CustomLabel htmlFor="fullName">Full Name</CustomLabel>
          <br />
          <input
            required
            name="fullName"
            className="border-2 rounded-sm text-lg px-4 py-2"
            onChange={(e) => {
              setUser((prev) => ({ ...prev, name: e.target.value }));
            }}
            value={user.name}
            type="text"
            id="name"
            placeholder="Name"
          />
        </div>
        <div className="w-full flex flex-col">
          <CustomLabel htmlFor="uni">University</CustomLabel>
          <br />
          <input
            required
            name="uni"
            className="border-2 rounded-sm text-lg px-4 py-2"
            onChange={(e) => {
              setUser((prev) => ({ ...prev, university: e.target.value }));
            }}
            value={user.university}
            type="text"
            id="uni"
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
              setUser((prev) => ({ ...prev, city: e.target.value }));
            }}
            value={user.city}
            type="text"
            id="city"
            placeholder="Name of the city"
          />
        </div>
        <div>
          <CustomLabel htmlFor="email">Email Address</CustomLabel>
          <input
            required
            name="email"
            className="border-2 rounded-sm text-lg px-4 py-2"
            onChange={(e) => {
              setUser((prev) => ({ ...prev, email: e.target.value }));
            }}
            value={user.email}
            type="email"
            id="email"
            placeholder="Email"
          />
        </div>
        <div>
          <CustomLabel htmlFor="pass">Password</CustomLabel>
          <input
            required
            name="pass"
            className="border-2 rounded-sm text-lg px-4 py-2"
            onChange={(e) => {
              setUser((prev) => ({ ...prev, password: e.target.value }));
            }}
            value={user.password}
            type="password"
            id="passaword"
            placeholder="Password"
          />
        </div>
        <p className="text-sm ml-1.5">
          Already have an account ?{" "}
          <Link href="/login" className="text-blue-400">
            Login now.
          </Link>
        </p>
        {error && <p className="text-red-500">* {error}</p>}
        <button
          disabled={loading}
          type="submit"
          className={twMerge(
            "rounded-md px-4 py-2 text-white bg-cyan-600 hover:bg-cyan-600/60",
            loading && "bg-cyan-600/60"
          )}
        >
          Register
        </button>
      </form>
      </div>
    </div>
  );
}
