"use client";

import { Condiment, Inter } from "next/font/google";
import "./globals.css";
import { MainNav } from "@/components/main-nav";
import { useAtom } from "jotai";
import { clubAtom, userAtom, followedClubsAtom } from "@/store/useStore";
import axios from "axios";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ user, setUser] = useAtom(userAtom);
  const [ club, setClub] = useAtom(clubAtom);
  const [ followedClubs, setFollowedClubs] = useAtom(followedClubsAtom);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isClub = localStorage.getItem("isClub") === "true" ? true : false;

    if (token && !user && !club) {
      const backend = process.env.NEXT_PUBLIC_BACKEND_SERVICE;
      const url1 = `${backend}/api/clubs/jwt`;
      const url2 = `${backend}/api/users/jwt`;
      const url = isClub ? url1 : url2;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      axios.get(url, config)
        .then(response => {
          const isClubResp = response.data.isClub;
          const entity = isClubResp? response.data.club : response.data.user;
          console.log(isClub, "isClub");
          if(!isClub) {
            setUser({
              id: entity.id,
              name: entity.name,
              email: entity.email,
              avatar: entity.avatar,
              university: entity.university,
              city: entity.city,
            });

            setFollowedClubs(entity.following);
          } else if(isClub){
            setClub({
              id: entity.id,
              name: entity.name,
              email: entity.email,
              description: entity.description,
              avatar: entity.image,
              numFollowers: entity.followers.length,
              university: entity.university,
              memberCount: entity.memberCount,
              founded: entity.founded,
              category: entity.category,
              city: entity.city
            }); 
          }
          
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
          <div className="flex min-h-screen flex-col">
            <MainNav />
            <main className="flex-1">{children}</main>
          </div>
      </body>
    </html>
  );
}
