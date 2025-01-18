"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ClubCard } from "@/components/club-card";
import { Club } from "@/types/club";
import { useRouter } from "next/navigation";
import { fetchClubs } from "@/utils/fetchClubs";
import Loading from "../loading";

export default function ClubsPage() {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState<string[]>(["All Categories"]);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // check configs
    if (!localStorage.getItem("token")) {
      router.push("/register");
    }

    // load events
    const loadEvents = async () => {
      try {
        const fetchedClubs = await fetchClubs();
        setClubs(fetchedClubs);
        const uniqueCategories: string[] = Array.from(
          new Set(fetchedClubs.map((club) => club.category.toLowerCase()))
        ).map(
          (catLowerCase) =>
            fetchedClubs.find(
              (club) => club.category.toLowerCase() === catLowerCase
            )!.category
        );

        setCategories(["All Categories", ...uniqueCategories]);
      } catch (err) {
        console.error("Error loading events:", err);
      }

      setLoading(false);
    };

    loadEvents();
  }, []);

  const filteredClubs = clubs.filter((club) => {
    const matchesSearch =
      club.name.toLowerCase().includes(search.toLowerCase()) ||
      club.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "All Categories" ||
      club.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="h-[calc(100vh-120px)] w-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white ">
      <div className="container mx-auto py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-600 to-cyan-400 bg-clip-text text-transparent">
            University Clubs
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover and follow amazing university clubs. Connect with like-minded
            students and pursue your passions.
          </p>
        </div>

        {/* Filters */}
        <div className="grid gap-4 md:grid-cols-3 mb-8 bg-white/50 dark:bg-gray-950/50 backdrop-blur-sm rounded-lg p-4">
          <Input
            placeholder="Search clubs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-cyan-200 dark:border-cyan-800 focus:ring-cyan-500"
          />
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="border-cyan-200 dark:border-cyan-800">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Club Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 px-2">
          {filteredClubs.map((club) => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>

        {filteredClubs.length === 0 && (
          <div className="text-center py-12 bg-white/50 dark:bg-gray-950/50 backdrop-blur-sm rounded-lg">
            <p className="text-lg text-muted-foreground">
              No clubs found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
