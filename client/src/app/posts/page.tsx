"use client";

import { useEffect, useRef, useState } from "react";
import { ImagePlus, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { PostCard } from "@/components/post-card";
import { Post } from "@/types/post";
import { useAtom } from "jotai";
import { clubAtom } from "@/store/useStore";
import { twMerge } from "tailwind-merge";
import Loading from "../loading";
import axios from "axios";
import usePosts from "@/hooks/usePosts";
import { useRouter } from "next/navigation";

export default function PostsPage() {
  const [newPostContent, setNewPostContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [club, _sc] = useAtom(clubAtom);
  const [isClub, setIsClub] = useState(false);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [posts] = usePosts();
  const router = useRouter();

  useEffect(() => {
    // check if it is club
    const clubStatus = localStorage.getItem("isClub") === "true";
    setIsClub(clubStatus);

    // stop loading
    setLoading(false);
  }, []);

  const handleNewPostClick = () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("content", newPostContent)
    formData.append("clubId", club?.id!);
  
    if(image) {
      formData.append('image', image);
    }
    
    const url = `${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/api/posts/create`;

    axios
      .post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        router.refresh();
        setLoading(false);
      });
  }

  const handleButtonClick = () => {
    fileInputRef.current!.click();
  };

  
  const handleFileChange = (e: any) => {
    setImage(e.target.files?.[0] || null);
  };

  if (loading) {
    return (
      <div className="h-[calc(100vh-120px)] w-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white dark:from-cyan-950 dark:to-background">
      <div className="container mx-auto max-w-2xl py-8 px-3">
        {/* Create Post */}
        <Card className={twMerge("mb-8 pt-2 sm:py-2", !isClub && "hidden")}>
          <CardHeader className="p-4 pb-2">
            <div className="flex gap-3">
              <Avatar>
                <AvatarImage src={club?.avatar} alt={club?.name} />
                <AvatarFallback>{club?.name[0]}</AvatarFallback>
              </Avatar>
              <Textarea
                placeholder="Share an update..."
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                className="border-cyan-200 dark:border-cyan-800 h-24"
              />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <label>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                <Button variant="outline" size="sm" className="gap-2" onClick={handleButtonClick}>
                  <ImagePlus className="h-4 w-4" />
                  Add Image
                </Button>
                <p className="text-gray-400/90 text-sm">{image && `Selected: ${image.name.substring(0, 10)}.${image.type}`}</p>
              </label>

              <Button
                size="sm"
                className="gap-2"
                disabled={!newPostContent.trim()}
                onClick={handleNewPostClick}
              >
                <Send className="h-4 w-4" />
                Post
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map((post: Post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
