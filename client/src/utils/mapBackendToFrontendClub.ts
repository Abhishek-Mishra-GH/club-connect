import { Club } from "@/types/club";

export const mapBackendToFrontendClub = (backendClub: any): Club => {

  return {
    id: backendClub.id,
    name: backendClub.name,
    description: backendClub.description,
    avatar: backendClub.avatar,
    university: backendClub.registered,
    city: backendClub.city,
    email: backendClub.email,
    category: backendClub.category,
    numFollowers: backendClub.followers?.length || 0,
    founded: backendClub.founded,
    memberCount: backendClub.memberCount,
  };
};
