import axios from "axios";
import { Club } from "@/types/club";
import { mapBackendToFrontendClub } from "./mapBackendToFrontendClub";

export const fetchClubs = async (): Promise<Club[]> => {
  try {
    const backend = process.env.NEXT_PUBLIC_BACKEND_SERVICE;
    const response = await axios.get(`${backend}/api/clubs`);
    const backendClubs = response.data;

    const clubs = backendClubs.map((backendClub: any) =>
      mapBackendToFrontendClub(backendClub)
    );

    return clubs;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};
