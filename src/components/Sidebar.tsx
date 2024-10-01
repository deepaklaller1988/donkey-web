"use client";
import { useQuery, useQueries } from "@tanstack/react-query";
import FetchApi from "@lib/FetchApi";
import SidebarCard from "./core/SidebarCard";
import { useState } from "react";
import { HiTrendingUp } from "react-icons/hi";
import { FaRankingStar } from "react-icons/fa6";

const fetchTop10List = async (mediaType: string, interval: string = "day") => {
  try {
    const response = await FetchApi.get(
      `https://api.themoviedb.org/3/trending/${mediaType.toLowerCase()}/${interval}?language=en-US`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(error);
  }
};

const fetchPopularLists = async () => {
  try {
    const response = await fetch(
      "https://mdblist.com/api/lists/14/items?apikey=178glc77gig10s6b8t3nact7g&limit=10"
    );
    const data = await response.json();
    const movieIds = data.map((item:any) => item.id);

    const allMovieData = await Promise.all(
      movieIds.map(async (id:any) => {
        try {
          const Response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?language=en-US`
          );
          return await Response.json();
        } catch (err) {
          console.error(`Error fetching data for ID ${id}:`, err);
          return null;
        }
      })
    );
    return allMovieData
  } catch (error) {
    console.log("Error fetching data from the first API:", error);
  }
};

export default function Sidebar({ mediaType }: any) {

  const [interval, setInterval] = useState<string>("day");
  const { isLoading, data: topList } = useQuery({
    queryKey: ["top-10", mediaType, interval],
    queryFn: () => fetchTop10List(mediaType, interval),
  });

  const { isLoading: isPopular, data: popular } = useQuery({
    queryKey: ["popular"],
    queryFn: () => fetchPopularLists(),
  });

  const renderMovies = (items: any[], mediaType: string) => {
    return items.map((item: any, index: number) => (
      <SidebarCard
        key={item.id}
        movieId={item.id}
        mediaType={mediaType}
        index={index + 1}
        isPopular={isPopular}
        isLoading={isLoading}
      />
    ));
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 justify-between">
        <h3 className="text-white text-[25px] font-semibold flex items-center gap-1">
          {mediaType === "Popular" ? (
            <FaRankingStar className="text-amber-500 mr-1 w-8 h-8" />
          ) : (
            <HiTrendingUp className="mr-1 text-amber-500 w-8 h-8" />
          )}
          {mediaType === "Movie"
            ? "MOVIES"
            : mediaType === "Popular"
            ? "POPULAR"
            : "TV SHOWS"}
        </h3>
        {mediaType !== "Popular" && (
          <section className="flex gap-2">
            <button
              className={`${
                interval === "day"
                  ? "pbgColor rounded-full text-black px-2"
                  : "border border-1 rounded-full text-white px-2 hover:bg-white hover:text-black transition"
              }`}
              onClick={() => setInterval("day")}
            >
              Day
            </button>
            <button
              className={`${
                interval === "week"
                  ? "pbgColor rounded-full text-black px-2"
                  : "border border-1 rounded-full text-white px-2 hover:bg-white hover:text-black transition"
              }`}
              onClick={() => setInterval("week")}
            >
              Week
            </button>
            {/* <button className="border border-1 rounded-full text-white px-2 hover:bg-white hover:text-black transition">Month</button> */}
          </section>
        )}
      </div>
      <ul className="flex flex-col gap-3 py-2 mt-[10px]">
        {mediaType === "Popular"
          ? popular && popular.length > 0
            ? renderMovies(popular, "Movie")
            : ""
          : topList && topList.length > 0
          ? renderMovies(topList.slice(0, 10), mediaType)
          : ""}
      </ul>
    </div>
  );
}
