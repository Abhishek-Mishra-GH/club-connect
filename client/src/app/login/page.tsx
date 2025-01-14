'use client'

import Link from "next/link"
import React, { useState } from 'react'
import axios from "axios"
import { useRouter } from "next/navigation"
import { clubAtom, userAtom } from "@/store/useStore"
import LoadingButton from "@/components/LoadingButton"
import { useAtom } from "jotai"

export default function page() {
  const [user, setUser] = useAtom(userAtom);
  const [club, setClub] = useAtom(clubAtom);
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLoginForm = (e: any) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;
    const url = "http://localhost:8080/api/auth/login";
    const data = { email, password };

    axios.post(url, data)
      .then(response => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("isClub", response.data.isClub);
        setError(null);

        const entity = response.data.entity;
        const isClub = response.data.isClub;

        if(!isClub) {
          const userData = {
            id: entity.id,
            name: entity.name,
            email: entity.email,
            avatar: entity.avatar,
            university: entity.university,
            city: entity.city
          };

          setUser(userData);

          localStorage.setItem("userdata", JSON.stringify(userData));
          localStorage.setItem("userid", entity.id);
        } else {

          const clubData = {
            id: entity.id,
            name: entity.name,
            email: entity.email,
            description: entity.description,
            avatar: entity.image,
            numFollowers: entity.followers.length,
            memberCount: entity.memberCount,
            category: entity.category,
            university: entity.university,
            city: entity.city,
            founded: entity.founded,
          }

          setClub(clubData);
          localStorage.setItem("clubdata", JSON.stringify(clubData));
          localStorage.setItem("clubid", entity.id);
        }

        router.push("/");
      })
      .catch(err => {
        console.error(err);
        setError(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      })
  }

  return (
    <div className="w-full h-[calc(100vh-60px)] flex justify-center items-center bg-gray-100">
      {/* login card */}
      <div className="border-2  shadow-xl bg-white rounded-lg px-4 py-6 w-[400px]">
        <form className="flex flex-col gap-4" onSubmit={handleLoginForm}>
          <input
          required
            className="border-2 rounded-sm px-4 py-2 text-lg"
            type="email"
            id="email"
            placeholder="email"
          />
          <input
          required
            className="border-2 rounded-sm px-4 py-2 text-lg"
            type="password"
            id="password"
            placeholder="password"
          />
          <p className="text-sm ml-1.5">Don't have an account ? <Link href="/register" className="text-blue-400">Register now.</Link></p>
          {/* <button id="loginBtn" className="border-2 rounded-sm p-2 text-white bg-black">Login</button> */}
          {error && <p className="text-red-500">* {error}</p >}
          <LoadingButton
            label="Login" 
            isLoading={loading}
          />
        </form>
      </div>
    </div>
  )
}