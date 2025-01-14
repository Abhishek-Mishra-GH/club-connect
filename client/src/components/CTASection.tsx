"use client"


import React from 'react'
import { Button } from "./ui/button"
import Link  from "next/link"

export default function CTASection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-r from-cyan-600 to-cyan-400 relative">
    <div className="absolute inset-0 bg-grid-white/25 [mask-image:linear-gradient(0deg,transparent,black)]" />
    <div className="container mx-auto px-4 relative">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Find Your Community?
        </h2>
        <p className="text-white/90 mb-8">
          Join thousands of students who have found their perfect club through ClubConnect.
        </p>
        <Link href="/register">
        <Button size="lg" variant="secondary">
          Get Started Today
        </Button>
        </Link>
      </div>
    </div>
  </section>
  )
}
