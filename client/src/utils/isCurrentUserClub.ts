export default function isCurrentUserClub() {
    return localStorage.getItem("isClub") === "true";
}
