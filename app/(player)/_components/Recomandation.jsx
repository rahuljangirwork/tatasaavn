"use client";

import AlbumCard from "@/components/cards/album";
import Next from "@/components/cards/next";
import SongCard from "@/components/cards/song";
import { Skeleton } from "@/components/ui/skeleton";
import { NextContext } from "@/hooks/use-context";
import { getSongsSuggestions } from "@/lib/fetch";
import { useContext, useEffect, useState } from "react";

export default function Recomandation({ id }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const next = useContext(NextContext);

    const getData = async () => {
        try {
            const res = await getSongsSuggestions(id);
            const data = await res.json();

            // Check if the response is valid and contains songs data
            if (data && data.data && Array.isArray(data.data)) {
                setData(data.data);

                // Pick a random song for the next suggestion
                const randomSong = data.data[Math.floor(Math.random() * data.data.length)];
                next.setNextData({
                    id: randomSong.id,
                    name: randomSong.name,
                    artist: randomSong.artists.primary[0]?.name || "unknown",
                    album: randomSong.album.name,
                    image: randomSong.image[1]?.url || "",
                });
            } else {
                // If no valid data, show a message
                setData([]);
            }
        } catch (error) {
            console.error("Error fetching song suggestions:", error);
            toast.error("Failed to load recommendations.");
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, [id]);

    return (
        <section className="py-10 px-6 md:px-20 lg:px-32">
        <div>
          <h1 className="text-2xl font-semibold">Recommendation</h1>
          <p className="text-sm text-muted-foreground">You might like this</p>
        </div>
      
        <div className="rounded-md mt-6">
          {/* If data is loading, show skeleton loader */}
          {loading ? (
            <div className="grid gap-6 grid-cols-1">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="grid gap-2">
                  <Skeleton className="h-[200px] w-full rounded-2xl" />
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-3 w-20 -mt-1" />
                </div>
              ))}
            </div>
          ) : (
            // If no data, show "No Suggestions" message
            data.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-hidden">
                {data.map((song) => (
                  <Next
                    next={false}
                    key={song.id}
                    image={song.image[2]?.url}
                    name={song.name}
                    artist={song.artists.primary[0]?.name || "unknown"}
                    id={song.id}
                    className="transition-transform transform hover:scale-105 duration-200" // Hover effect
                  />
                ))}
              </div>
            ) : (
              // Show "No suggestions available" when no data is available
              <div className="flex items-center justify-center text-center h-[100px]">
                <p className="text-sm text-muted-foreground">No suggestions available.</p>
              </div>
            )
          )}
        </div>
      </section>
      
      
    );
}
