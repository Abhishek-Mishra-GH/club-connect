"use client"

const resetLocalStorage = (): void => {
  localStorage.removeItem("token");
  localStorage.removeItem("isClub");
  localStorage.removeItem("userid");
  localStorage.removeItem("clubid");
  localStorage.removeItem("clubdata");
  localStorage.removeItem("userdata");
}

export default resetLocalStorage;