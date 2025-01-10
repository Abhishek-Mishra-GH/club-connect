'use client'

import Link from "next/link"

export default function Page() {
  return (
        <div className="w-full h-screen flex justify-center items-center flex-col gap-6">
          <Link href="/registeruser" className="px-6 py-4 border-2 rounded-sm"> Register as a Student </Link>
          <Link href="/registerclub" className="px-6 py-4 border-2 rounded-sm"> Register as a Club </Link>
        </div>
  );
}