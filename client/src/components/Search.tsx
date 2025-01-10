"use client";

import { useState } from "react";
import axios from "axios";
import { IoMdSearch } from "react-icons/io";
import * as Popover from "@radix-ui/react-popover";
import { MdClose } from "react-icons/md";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

interface SearchResult {
  clubs?: { id: string; name: string }[];
  // events?: { id: string; title: string }[];
}

const Search: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<SearchResult | any>({});
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setExpanded((expanded) => !expanded);
    setIsSearching(true);
    try {
      const response = await axios.get<SearchResult>(`http://localhost:8080/api/search?q=${query}`);
      console.log(response.data)
      setResults(response.data);
    } catch (error) {
      console.error("Error searching:", error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="relative flex items-center">
      <div className="flex items-center border-2 border-black rounded-full w-80 bg-white">
       <div className="h-full px-2">
       <IoMdSearch className="text-black font-bold" />
       </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search clubs..."
          className="p-2 pl-0 w-full rounded-full text-black outline-none"
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />

        {/* close button */}
        <button onClick={() => setExpanded(false)} className={twMerge("p-2 bg-white rounded-full", expanded ? "block" : "hidden")}>
        <MdClose  className="text-2xl mr-2 font-extrabold"/>
        </button>

      </div>

      {expanded && (
        <Popover.Root
          open={expanded}
          onOpenChange={(open) => !open && setResults({})}
        >
          <Popover.Anchor />
          <Popover.Content
            side="bottom"
            align="end"
            sideOffset={36}
            alignOffset={-10}
            className="p-4 bg-white rounded-md shadow-md w-80 max-h-60 overflow-y-auto"
          >
            {isSearching ? (
              <p className="text-gray-500">Searching...</p>
            ) : results.clubs?.length ? (
              <div>
                {/* <h3 className="font-bold text-gray-800 mb-2">Results</h3> */}
                {results.clubs?.length > 0 && (
                  <div>
                    <ul className="flex flex-col gap-3">
                      {results.clubs.map((club: any) => (
                        <Link href="/profile" key={club.id}>
                        <li className="border-b bg-white shadow-md border border-gray-200 text-lg text-gray-900 rounded-md px-3 py-2 flex items-center gap-3">
                          <div className="h-10 w-10 flex justify-center items-center rounded-full bg-gray-300">{club.name[0]}</div>
                          <h3>{club.name}</h3>
                        </li>
                        </Link>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-600">No results found.</p>
            )}
          </Popover.Content>
        </Popover.Root>
      )}
    </div>
  );
};

export default Search;
