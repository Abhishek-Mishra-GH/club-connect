"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { userAtom } from "@/store/useStore";
import { useAtom } from "jotai";
import axios from "axios";

export default function ClubProfilePage() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useAtom(userAtom);
  const [avatar, setAvatar] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if(!user) return;
    
    try {
      const formData = new FormData();
      formData.append("id", user.id);
      formData.append("name", user.name);
      formData.append("city", user.city);
      formData.append("university", user.university);

      if(avatar) {
        formData.append('avatar', avatar);
      }

      const backend = process.env.NEXT_PUBLIC_BACKEND_SERVICE;
      const url = `${backend}/api/profile/save-profile?type=user`;
      const response = await axios.put(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      const newData = {...user, avatar: response.data.profile.avatar}
      setUser(newData);
      localStorage.setItem("userdata", JSON.stringify(newData));
    } catch (error: any) {
      console.log(error);
      console.log(error.response)
    }

    setLoading(false);
  }


  if (loading) {
    return (
      <div className="h-[calc(100vh-120px)] w-screen flex justify-center items-center">
        <h2 className="text-2xl">Please Wait...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Club Profile Management</h1>

        <Tabs defaultValue="details" className="space-y-4">
          <TabsList>
            <TabsTrigger value="details">Student Details</TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl">
                  Student Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <div className="space-y-2">
                      <Label htmlFor="name"> Name</Label>
                      <Input id="name" onChange={(e) => setUser({...user!, name: e.target.value })} value={user?.name} />
                    </div>
                  </div>
                  <div className="flex gap-6 items-center">
                  <div>
                      {user?.avatar ? (
                        <img
                          className="h-12 w-12 rounded-full"
                          src={user.avatar}
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-full flex justify-center items-center text-2xl bg-gray-200 text-black font-semibold">
                          {" "}
                          {user?.name.charAt(0)}{" "}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-start gap-4">
                    <Label>Change Club Logo</Label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          setAvatar(e.target.files?.[0] || null);
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" onChange={(e) => setUser({...user!, city: e.target.value })} value={user?.city} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="uni">University</Label>
                      <Input id="uni" onChange={(e) => setUser({...user!, university: e.target.value })} value={user?.university} />
                    </div>
                  </div>

                  <Button type="submit">Save Changes</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
