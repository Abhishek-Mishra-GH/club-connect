"use client";

import { Condiment, Inter } from "next/font/google";
import "./globals.css";
import { MainNav } from "@/components/main-nav";
import { useAtom } from "jotai";
import { clubAtom, userAtom } from "@/store/useStore";
import { useEffect, useState } from "react";
import isCurrentUserClub from "@/utils/isCurrentUserClub";
import { Footer } from "@/components/Footer";
import Loading from "./loading";
import { BottomNav } from "@/components/bottom-nav";
import { VerifyEmailBanner } from "@/components/verify-email-banner";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useAtom(userAtom);
  const [club, setClub] = useAtom(clubAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isClub = isCurrentUserClub();

    if (token && !user && !club) {
      if (isClub) {
        setClub(JSON.parse(localStorage.getItem("clubdata") as string));
      } else {
        setUser(JSON.parse(localStorage.getItem("userdata") as string));
      }
    }

    setLoading(false);
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        {loading ? (
          <div>
            <Loading />
          </div>
        ) : (
          <div className="flex min-h-screen flex-col">
            {/* <VerifyEmailBanner /> */}
            <MainNav />
            <main className="flex-1">{children}</main>
            <Footer />
            <BottomNav />
          </div>
        )}
      </body>
    </html>
  );
}
