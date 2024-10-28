"use client";
import { useQuery, useQueries } from "@tanstack/react-query";
import FetchApi from "@lib/FetchApi";
import SidebarCard from "./core/SidebarCard";
import { useState } from "react";
import { HiTrendingUp } from "react-icons/hi";
import { FaRankingStar } from "react-icons/fa6";
const apiKey = process.env.NEXT_PUBLIC_MDBKEY;
const CLIENT_ID = process.env.NEXT_PUBLIC_TRACK_ClientID || "";

// const fetchTop10List = async (mediaType: string, interval: string = "day") => {
//   try {
//     if(mediaType === 'Popular'){
//       return [];
//     }
//     const response = await FetchApi.get(
//       `https://api.themoviedb.org/3/trending/${mediaType.toLowerCase()}/${interval}?language=en-US`
//     );
//     const data = await response.json();
//     return data.results;
//   } catch (error) {
//     console.log(error);
//   }
// };

// const fetchPopularLists = async () => {
//   try {
//     const response = await fetch(
//       // `https://mdblist.com/api/lists/14/items?apikey=${apiKey}&limit=10`
//       `https://api.mdblist.com/lists/14/items/?apikey=${apiKey}&limit=50`
//       https://api.trakt.tv/movies/trending
//     );
//     const data = await response.json();
//     const movieIds = data?.movies?.map((item: any) => item.id);

//     const allMovieData = await Promise.all(
//       movieIds.map(async (id: any) => {
//         try {
//           const Response = await FetchApi.get(
//             `https://api.themoviedb.org/3/movie/${id}?language=en-US`
//           );
//           return await Response.json();
//         } catch (err) {
//           return null;
//         }
//       })
//     );

//     const filteredMovieData = allMovieData.filter(
//       (item: any) => item && item.success !== false
//     );
//     return filteredMovieData;
//   } catch (error) {
//     console.log("Error fetching data from the first API:", error);
//   }
// };

const fetchPopularLists = async (mediaType: string) => {
  const mediaTypeLower = mediaType.toLowerCase();
  const url = `https://api.trakt.tv/${
    mediaTypeLower === "movies" ? "movies" : "shows"
  }/trending?limit=50`;

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
    const tmdbResponses = await Promise.all(
      imdbIds.map((id: any) =>
        FetchApi.get(
          `https://api.themoviedb.org/3/${
            mediaTypeLower === "movies" ? "movie" : "tv"
          }/${id}?language=en-US`
        )
      )
    );

    const tmdbData = await Promise.all(tmdbResponses.map((res) => res.json()));
    return tmdbData;
  } catch (error) {
    console.log("Error fetching popular lists:", error);
    return [];
  }
};
// const fetchPopularLists = async () => {
//   try {
//     const response = await fetch(
//       // `https://mdblist.com/api/lists/14/items?apikey=${apiKey}&limit=10`
//       // `https://api.mdblist.com/lists/14/items/?apikey=${apiKey}&limit=50`
//       `https://api.trakt.tv/movies/trending`
//     );
//     const data = await response.json();
//     const movieIds = data?.movies?.map((item: any) => item.id);

//     const allMovieData = await Promise.all(
//       movieIds.map(async (id: any) => {
//         try {
//           const Response = await FetchApi.get(
//             `https://api.themoviedb.org/3/movie/${id}?language=en-US`
//           );
//           return await Response.json();
//         } catch (err) {
//           return null;
//         }
//       })
//     );

//     const filteredMovieData = allMovieData.filter(
//       (item: any) => item && item.success !== false
//     );
//     return filteredMovieData;
//   } catch (error) {
//     console.log("Error fetching data from the first API:", error);
//   }
// };

export default function Sidebar({ mediaType }: any) {
  const [interval, setInterval] = useState<string>("movies");
  const { isLoading: isPopular, data: popular } = useQuery({
    queryKey: ["popular", interval],
    queryFn: () => fetchPopularLists(interval),
  });

  const renderMovies = (items: any[], mediaType: string) => {
    return items.map((item: any, index: number) => (
      <SidebarCard
        key={item.id}
        movieId={item.id}
        mediaType={mediaType}
        index={index + 1}
        isPopular={isPopular}
        // isLoading={isLoading}
      />
    ));
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 justify-between">
        <h3 className="text-white text-[25px] font-semibold flex items-center gap-1">
          {mediaType === "Popular" ? (
            <HiTrendingUp className="text-amber-500 mr-1 w-8 h-8" />
          ) : (
            <HiTrendingUp className="mr-1 text-amber-500 w-8 h-8" />
          )}
          {mediaType === "Movie"
            ? "MOVIES"
            : mediaType === "Popular"
            ? "TRENDING"
            : "TV SHOWS"}
        </h3>
        {/* {mediaType !== "Popular" && ( */}
        <section className="flex gap-2">
          <button
            className={`${
              interval === "movies"
                ? "pbgColor rounded-full text-black px-2"
                : "border border-1 rounded-full text-white px-2 hover:bg-white hover:text-black transition"
            }`}
            onClick={() => setInterval("movies")}
          >
            Movies
          </button>
          <button
            className={`${
              interval === "tv"
                ? "pbgColor rounded-full text-black px-2"
                : "border border-1 rounded-full text-white px-2 hover:bg-white hover:text-black transition"
            }`}
            onClick={() => setInterval("tv")}
          >
            Shows
          </button>
          {/* <button className="border border-1 rounded-full text-white px-2 hover:bg-white hover:text-black transition">Month</button> */}
        </section>
        {/* )} */}
      </div>
      <ul className="flex flex-col gap-3 py-2 mt-[10px]">
        {mediaType === "Popular"
          ? popular && popular.length > 0
            ? renderMovies(popular.slice(0, 5), interval)
            : ""
          : // : topList && topList.length > 0
            // ? renderMovies(topList.slice(0, 10), mediaType)
            ""}
      </ul>
    </div>
  );
}
