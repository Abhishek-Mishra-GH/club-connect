"use client"

import Link from "next/link"
import { twMerge } from "tailwind-merge"
import { usePathname } from "next/navigation"

export default function NavLink({href, children}: Readonly<{href: string, children: React.ReactNode}>) {
  const pathname = usePathname()
  return (
    <Link href={href} className={twMerge("text-black text-md hover:text-cyan-500", pathname === href ? "font-semibold text-cyan-600" : "")}>
      {children}
    </Link>
  )
}