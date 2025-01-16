"use client"

import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-cyan-100 to-cyan-50 dark:from-background dark:to-cyan-950/50">
      <div className="container mx-auto py-16 pb-0 px-2">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-600 to-cyan-400 bg-clip-text text-transparent">
              About ClubConnect
            </h2>
            <p className="text-muted-foreground max-w-md mb-6">
              ClubConnect is the premier platform for university clubs and societies. We connect students with their passions,
              help clubs grow their communities, and make campus life more vibrant and engaging.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-cyan-600 transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-cyan-600 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-cyan-600 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-cyan-600 transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
          <div className="grid gap-8 grid-cols-2 text-sm sm:text-md">
            <div>
              <h3 className="font-semibold mb-3">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/clubs" className="text-muted-foreground hover:text-cyan-600 transition-colors">
                    Browse Clubs
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="text-muted-foreground hover:text-cyan-600 transition-colors">
                    Upcoming Events
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-cyan-600 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-cyan-600 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/help" className="text-muted-foreground hover:text-cyan-600 transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/guidelines" className="text-muted-foreground hover:text-cyan-600 transition-colors">
                    Club Guidelines
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-muted-foreground hover:text-cyan-600 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-muted-foreground hover:text-cyan-600 transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 h-16 border-t border-gray-200 dark:border-gray-800 flex items-center justify-center">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} ClubConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

