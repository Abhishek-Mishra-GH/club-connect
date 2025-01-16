"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

interface PostCardProps {
  post: any;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4">
        <div className="flex items-center gap-3">
          <Link href={`/clubs/${post.club.id}`}>
            <Avatar>
              <AvatarImage src={post.club.avatar} alt={post.club.name} />
              <AvatarFallback>{post.club.name[0]}</AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex-1">
            <Link
              href={`/clubs/${post.club.id}`}
              className="font-semibold hover:text-cyan-600 transition-colors"
            >
              {post.club.name}
            </Link>
            <p className="text-sm text-muted-foreground">
              {formatDistanceToNow(post.createdAt, { addSuffix: true })}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="whitespace-pre-wrap">{post.content}</p>
        {post.image &&  (
          <div>
            <img
              src={post.image || "/placeholder.svg"}
              alt={`Post`}
              className="w-full h-full object-cover rounded-lg"
              style={{
                aspectRatio: "16/9"
              }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
