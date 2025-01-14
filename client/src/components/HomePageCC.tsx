"use client"

import Link from "next/link"
import React from 'react'
import { Button } from "./ui/button"

export default function HomePageCC() {
  return (
    <section className="bg-gradient-to-b from-cyan-50 to-white w-full sm:min-h-[55vh] md:min-h-[65vh] lg:min-h-[calc(100vh-90px)] py-12 md:py-24 lg:py-52 xl:py-52 flex justify-center items-center md:items-start">
    <div className="container px-4 md:px-6">
      <div className="flex flex-col items-center space-y-4 text-center">
        <div className="sm:space-y-3 space-y-5">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-cyan-600">
            Discover Amazing Club Events
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            Follow clubs, attend events, and connect with people who share
            your interests.
          </p>
        </div>
        <div className="sm:space-x-4 sm:inline-block flex flex-col space-y-4 ">
          <Link href={"/clubs"}>
            <Button size="lg" >Browse Clubs</Button>
          </Link>
          <Link href={"/events"}>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              Explore Events
            </Button>
          </Link>
        </div>
      </div>
    </div>
  </section>
  )
}
