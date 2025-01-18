"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { clubAtom, userAtom, followedClubsAtom } from "@/store/useStore";
import { useAtom } from "jotai";
import Search from "./Search";
import NavLink from "./NavLink";
import Logout from "./Logout";

export function MainNav() {
  const [user, setUser] = useAtom(userAtom);
  const [club, setClub] = useAtom(clubAtom);

  let entity = user ? user : club;

  return (
    <header className="sticky top-0 z-50  flex justify-center items-center w-full border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-cyan-50/20 shadow-sm">
      <div className="container flex h-16 sm:h-20 items-center mx-3 sm:mx-8">
        <div className="mr-4 flex">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <div className="flex items-center gap-1.5">
              <img src="https://clubconnect.blr1.digitaloceanspaces.com/clubconnect-assets/clubconnectlogo.png" className="h-9 w-9 rounded-full object-contain"/>
            <span className="text-lg sm:text-xl font-semibold inline-block"><span className=" text-cyan-600">Club</span>Connect</span>
            </div>
          </Link>
          <nav className="hidden sm:flex items-center space-x-6 text-lg font-medium">
            <NavLink href="/events">Events</NavLink>
            <NavLink href="/posts">Posts</NavLink>
            <NavLink href="/clubs">Clubs</NavLink>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4 ">
          <div className="hidden md:block">
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
          {/* {entity ? <Logout /> : ""} */}
        </div>
      </div>

    </header>
  );
}
