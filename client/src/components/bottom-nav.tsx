"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, Compass, Home, MessageSquare, User } from 'lucide-react'
import { cn } from "@/lib/utils"

export function BottomNav() {
  const pathname = usePathname()

  const links = [
    {
      href: "/",
      label: "Home",
      icon: Home
    },
    {
      href: "/clubs",
      label: "Explore",
      icon: Compass
    },
    {
      href: "/events",
      label: "Events",
      icon: Calendar
    },
    {
      href: "/posts",
      label: "Posts",
      icon: MessageSquare
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden border-t bg-background/80 backdrop-blur-lg">
      <nav className="flex items-center justify-around p-2">
        {links.map((link) => {
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 p-2 rounded-lg transition-colors",
                isActive 
                  ? "text-cyan-600" 
                  : "text-muted-foreground hover:text-cyan-600"
              )}
            >
              <link.icon className="h-5 w-5" />
              <span className="text-xs font-medium">{link.label}</span>
            </Link>
          )
        })}
      </nav>
      {/* Safe area padding for mobile devices */}
      <div className="h-safe-area-inset-bottom" />
    </div>
  )
}

