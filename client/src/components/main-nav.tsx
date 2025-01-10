"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { clubAtom, userAtom } from "@/store/useStore";
import { useAtom } from "jotai";
import Search from "./Search";
import NavLink from "./NavLink";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion"

export function MainNav() {
  const [user, setUser] = useAtom(userAtom);
  const [club, setClub] = useAtom(clubAtom);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  let entity = user ? user : club;

  return (
    <header className="sticky top-0 z-50  flex justify-center items-center w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 sm:h-20 items-center mx-2 sm:mx-8">
        <div className="mr-4 flex">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <span className=" font-bold text-lg inline-block">ClubConnect</span>
          </Link>
          <nav className="hidden sm:flex items-center space-x-6 text-lg font-medium">
            <NavLink href="/clubs">Clubs</NavLink>
            <NavLink href="/events">Events</NavLink>
          </nav>
        </div>
        <div className="hidden sm:flex flex-1 items-center justify-end space-x-4 ">
          <div>
            <Search />
          </div>
          {entity ? (
            <Link href="/profile">
              <Avatar>
                <AvatarImage
                  src={entity.avatar ? entity.avatar : undefined}
                  alt={entity.name}
                />
                <AvatarFallback>{entity.name[0]}</AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            <Link href="/login">
              <Button size="sm" className="text-md">
                Login
              </Button>
            </Link>
          )}
          {entity ? (
            <Button
              onClick={() => {
                setUser(null);
                setClub(null);
                localStorage.removeItem("token");
                localStorage.removeItem("isClub");
              }}
            >
              Logout
            </Button>
          ) : (
            ""
          )}
        </div>
      </div>



      {/* mobile nav */}

      <div className="flex h-full sm:hidden items-center border">
      {!entity ? 
            (
            <Link href="/login">
              <Button size="sm" className="text-md">
                Login
              </Button>
            </Link>
          ) : ""}
      </div>

      <div className="flex sm:hidden justify-center items-center px-2 hover:bg-gray-200/50 cursor-pointer my-3 mx-2 ">
        <div
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={twMerge(
            isMenuOpen ? "hidden" : "flex",
            "h-full w-full justify-center items-center"
          )}
        >
          <GiHamburgerMenu className="text-2xl"/>
        </div>

        <div
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={twMerge(isMenuOpen ? "flex" : "hidden", "w-full h-full justify-center items-center")}
        >
          <MdClose className="text-2xl font-bold" />
        </div>

        <motion.div 
        initial={{ 
          height: 0,
          padding: "0 1.5rem",
          display: "none",
          opacity: 0,
      }}
        animate={{
          height: isMenuOpen ? "auto" : 0, 
          padding: isMenuOpen ? "1.5rem" : "0 1.5rem",
          display: isMenuOpen ? "flex" : "none",
          opacity: isMenuOpen ? 1 : 0,
      }}
        transition={{ duration: 0.4, ease: "linear"}}
        className="sm:hidden flex gap-3 text-lg text-white absolute top-24 right-4 flex-col bg-white shadow-xl border-2 rounded-lg p-6 overflow-hidden">

          {entity ? (
            <NavLink href="/profile"> 
            <div className="flex justify-center items-center text-lg gap-2">
              <div className="h-10 w-10 rounded-full bg-gray-200 font-bold flex justify-center items-center text-lg">{entity?.name[0]}</div>
              <div className="font-bold">{entity?.name}</div>
            </div>
           </NavLink>
          ) : ""} 
          
          <div className="flex flex-col gap-2 items-end">
            <Link href="/clubs" className="w-full text-black hover:font-semibold"> Clubs </Link>
            <Link href="/events" className="w-full text-black hover:font-semibold">  Events</Link>
          </div>
          
      </motion.div>
      </div>
    </header>
  );
}
