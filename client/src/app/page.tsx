"use client";

import CTASection from "@/components/CTASection";
import FeaturesSection from "@/components/FeaturesSection";
import HomePageCC from "@/components/HomePageCC";

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
