"use client"

export default function isCurrentUserClub() {
  return localStorage.getItem("isClub") === "true" ? true : false;
}