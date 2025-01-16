"use client"

import Link from "next/link"
import { Building2, GraduationCap } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { isUserLoggedIn } from "@/utils/auth"
import { useRouter } from "next/navigation"
import Loading from "../loading"

export default function page() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if(isUserLoggedIn()) {
      router.push('/events');
    } else {
      setLoading(false);
    }
  } ,[]);
  
  if(loading) return <div className="w-full h-[calc(100vh-100px)]">
    <Loading/>
  </div>

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white dark:from-cyan-950 dark:to-background flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-600 to-cyan-400 bg-clip-text text-transparent">
            Join ClubConnect Today
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Choose how you want to be part of our community. Register as a club to create and manage your organization, or as a student to join and participate in Events.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/registerclub" className="group">
            <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-gradient-to-b from-white to-cyan-50/50 dark:from-gray-950 dark:to-cyan-950/20">
              <CardHeader className="text-center pb-4">
                <Building2 className="w-12 h-12 mx-auto mb-4 text-cyan-600" />
                <CardTitle className="text-2xl">Register as a Club</CardTitle>
                <CardDescription>Create and manage your university club</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <ul className="text-sm text-muted-foreground space-y-2 mb-3">
                  <li>Create your club profile</li>
                  <li>Manage events</li>
                  <li>Share updates </li>
                  <li>Connect with students</li>
                </ul>
                <Button className="w-full group-hover:bg-cyan-600">Get Started</Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/registeruser" className="group">
            <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-gradient-to-b from-white to-cyan-50/50 dark:from-gray-950 dark:to-cyan-950/20">
              <CardHeader className="text-center pb-4">
                <GraduationCap className="w-12 h-12 mx-auto mb-4 text-cyan-600" />
                <CardTitle className="text-2xl">Register as a Student</CardTitle>
                <CardDescription>Join and participate in club Events</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <ul className="text-sm text-muted-foreground space-y-2 mb-3">
                  <li>Discover clubs and events</li>
                  <li>Follow your favorite clubs</li>
                  <li>Register for events</li>
                  <li>Connect with peers</li>
                </ul>
                <Button className="w-full group-hover:bg-cyan-600">Get Started</Button>
              </CardContent>
            </Card>
          </Link>
        </div>

        <p className="text-center mt-8 text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-cyan-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

