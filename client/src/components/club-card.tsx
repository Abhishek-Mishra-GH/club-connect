import Link from "next/link";
import { Users } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Club } from "@/types/club";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface ClubCardProps {
  club: Club;
}

export function ClubCard({ club }: ClubCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
      <CardHeader className="flex flex-col items-center pt-8 pb-4">
        <Avatar className="w-16 h-16">
          <AvatarImage
            src={club.avatar ? club.avatar : undefined}
            alt={club.name}
          />
          <AvatarFallback>{club.name[0]}</AvatarFallback>
        </Avatar>
        <h3 className="font-semibold text-xl text-center">{club.name}</h3>
        <p className="text-sm text-muted-foreground text-center">
          {club.university}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2 text-center">
          {club.description}
        </p>
        <div className="flex items-center justify-center gap-3">
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-cyan-100 text-cyan-600 text-xs font-medium dark:bg-cyan-950 dark:text-cyan-200">
            <Users className="h-3 w-3" />
            {club.numFollowers ? club.numFollowers : "0 "} Followers
          </div>
          <div className="px-2 py-1 rounded-full bg-cyan-100 text-cyan-600 text-xs font-medium dark:bg-cyan-950 dark:text-cyan-200">
            {club.category}
          </div>
          <div className="px-2 py-1 rounded-full bg-cyan-100 text-cyan-600 text-xs font-medium dark:bg-cyan-950 dark:text-cyan-200">
            {club.city}
          </div>
        </div>
        <Link href={`/clubs/${club.id}`} className="block">
          <Button
            variant="outline"
            className="w-full hover:bg-cyan-600 hover:text-white transition-colors"
          >
            View Club
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
