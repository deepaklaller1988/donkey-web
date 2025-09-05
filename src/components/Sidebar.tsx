"use client";
import { useQuery } from "@tanstack/react-query";
import FetchApi from "@lib/FetchApi";
import SidebarCard from "./core/SidebarCard";
import { useState } from "react";
import { HiTrendingUp } from "react-icons/hi";

const CLIENT_ID = process.env.NEXT_PUBLIC_TRACK_ClientID || "";

const fetchPopularLists = async (mediaType: string) => {
  const mediaTypeLower = mediaType.toLowerCase();
  const url = `https://api.trakt.tv/${mediaTypeLower === "movies" ? "movies" : "shows"
    }/trending?limit=20`;

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": "2",
        "trakt-api-key": CLIENT_ID,
      },
    });
    const data = await response.json();
    const imdbIds = data.map((item: any) =>
      mediaTypeLower === "movies" ? item.movie?.ids.imdb : item.show?.ids.tmdb
    );
    const tmdbResponses: any = await Promise.allSettled(
      imdbIds.map((id: any) =>
        FetchApi.get(
          `https://api.themoviedb.org/3/${mediaTypeLower === "movies" ? "movie" : "tv"
          }/${id}?language=en-US`
        )
      )
    );

    // const tmdbData = await Promise.all(tmdbResponses.map((res:any) => res.json()));
    // return tmdbData;
    const successfulResponses = tmdbResponses
      .filter((result: any) => result.status === "fulfilled")
      .map((result: any) => result.value);

    const tmdbData = await Promise.all(
      successfulResponses.map((res: any) => res.json())
    );

    return tmdbData;
  } catch (error) {
    console.log("Error fetching popular lists:", error);
    return [];
  }
};

export default function Sidebar({ mediaType }: any) {
  const [interval, setInterval] = useState<string>("movies");

  const { isLoading: isPopular, data: popular } = useQuery({
    queryKey: ["popular", interval],
    queryFn: () => fetchPopularLists(interval),
    staleTime: 1000 * 60 * 5,
  });

  const renderMovies = (items: any[]) => {
    return items.map((item: any, index: number) => (
      <SidebarCard
        key={item.id}
        movieId={item.id}
        mediaType={interval}
        index={index + 1}
        isPopular={isPopular}
      />
    ));
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 justify-between">
        <h3 className="text-white text-[25px] font-semibold flex items-center gap-1">
          <HiTrendingUp className="text-amber-500 mr-1 w-8 h-8" />
          Trending
        </h3>
        <section className="flex gap-2">
          <button
            className={`${interval === "movies"
              ? "pbgColor rounded-full text-black px-2"
              : "border border-1 rounded-full !cursor-pointer text-white px-2 hover:bg-white hover:text-black transition"
              }`}
            onClick={() => setInterval("movies")}
          >
            Movies
          </button>
          <button
            className={`${interval === "tv"
              ? "pbgColor rounded-full text-black px-2"
              : "border border-1 rounded-full !cursor-pointer text-white px-2 hover:bg-white hover:text-black transition"
              }`}
            onClick={() => setInterval("tv")}
          >
            Shows
          </button>
        </section>
      </div>
      <ul className="flex flex-col gap-3 py-2 mt-[10px]">
        {mediaType == "Popular"
          ? popular && popular.length > 0
            ? renderMovies(popular.slice(0, 5))
            : ""
          : ""}
      </ul>
    </div>
  );
}
