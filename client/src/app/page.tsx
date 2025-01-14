"use client";

import CTASection from "@/components/CTASection";
import FeaturesSection from "@/components/FeaturesSection";
import { Footer } from "@/components/Footer";
import HomePageCC from "@/components/HomePageCC";
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
      <HomePageCC/>
      <FeaturesSection />
      <CTASection />
    </div>
  );
}
