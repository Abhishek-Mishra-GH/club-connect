export default function isCurrentUserClub() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("isClub") === "true";
  }
  return false; // Default for server-side rendering
}
