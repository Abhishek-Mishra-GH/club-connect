"use client"

import { useEffect, useState } from "react"
import { AlertCircle, X } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export function VerifyEmailBanner() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userdata") as string);
    const club = JSON.parse(localStorage.getItem("clubdata") as string);
    const entity = user || club

    if(entity) {
      const isVerified = entity.isVerified;
      if(isVerified) {
        setIsVisible(false);
      }
    }

  }, []);


  if (!isVisible) return null

  return (
    <div className="bg-cyan-700">
      <div className="container mx-auto">
        <Alert variant="default" className="border-none rounded-none bg-cyan-700 text-primary-foreground ">
          <div className="flex items-center gap-2 text-sm">
            <AlertCircle className="h-3 w-3" />
            <AlertDescription className="flex-1">
            Please verify your email. Check your inbox for the verification link and log in again to secure your account.
            </AlertDescription>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-primary-foreground hover:text-primary-foreground/80 hover:bg-primary-foreground/10"
              onClick={() => setIsVisible(false)}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Dismiss</span>
            </Button>
          </div>
        </Alert>
      </div>
    </div>
  )
}

