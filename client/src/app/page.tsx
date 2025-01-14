"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    
  } ,[])


  return (
    <div className="flex-1">
      <section className="w-full sm:min-h-[55vh] md:min-h-[65vh] lg:min-h-[calc(100vh-90px)] py-12 md:py-24 lg:py-52 xl:py-52 flex justify-center items-center md:items-start">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="sm:space-y-3 space-y-5">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Discover Amazing Club Events
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Follow clubs, attend events, and connect with people who share
                your interests.
              </p>
            </div>
            <div className="sm:space-x-4 sm:inline-block flex flex-col space-y-4 ">
              <Link href={"/clubs"}>
                <Button size="lg">Browse Clubs</Button>
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
      <section className="w-full py-12 bg-gray-100 dark:bg-gray-800 flex justify-center">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="popular" className="space-y-4">
            <TabsList>
              <TabsTrigger value="popular" className="px-4 py-2 text-lg ml-4 sm:ml-0">
                Popular Events
              </TabsTrigger>
              {/* <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="recommended">Recommended</TabsTrigger> */}
            </TabsList>
            <TabsContent value="popular" className="space-y-4">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 place-content-center px-4 sm:px-0">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="max-w-[340px] md:max-w-lg">
                    <CardHeader>
                      <CardTitle>Tech Meetup {i + 1}</CardTitle>
                      <CardDescription>
                        Join us for an evening of tech talks
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Image
                        alt="Event image"
                        className="aspect-video object-cover rounded-lg"
                        height={225}
                        src="/placeholder.svg"
                        width={400}
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
