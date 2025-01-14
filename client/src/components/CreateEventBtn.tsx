"use client"

import Link from "next/link"
import React, { use, useEffect, useState } from 'react'
import { Button } from "./ui/button"

export default function CreateEventBtn() {  
  return (
    <Link href="/events/create-event">
      <Button>Create Event</Button>
    </Link>
  )
}
