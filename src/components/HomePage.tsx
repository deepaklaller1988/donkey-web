"use client";
import "../app/home/home.css";

import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import HomeSlider from "@components/HomeSlider";
import Sidebar from "@components/Sidebar";
const Card = lazy(() => import('@components/core/Card'));

import FetchApi from "@lib/FetchApi";
import { lazy, Suspense, useEffect, useState } from "react";
import useTitle from "@hooks/useTitle";
import Loader from "@components/core/Loader";
import Image from "next/image";
import useRole from "@hooks/useRole";
const CLIENT_ID = process.env.NEXT_PUBLIC_TRACK_ClientID || "";

const fetchTrendingList = async (mediaType: string) => {
  const mediaTypeLower = mediaType.toLowerCase();
  const url = `https://api.trakt.tv/shows/trending?limit=50`;

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
          `https://api.themoviedb.org/3/${mediaTypeLower === "movies" ? "movie" : "tv"
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
const fetchPopularLists = async (mediaType: string) => {
  const mediaTypeLower = mediaType.toLowerCase();
  const url = `https://api.trakt.tv/${mediaTypeLower === "movie" ? "movies" : "shows"
    }/popular?limit=50`;

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "trakt-api-version": "2",
        "trakt-api-key": CLIENT_ID,
      },
    });
    const data = await response.json();
    const imdbIds = data.map((item: any) => item.ids.tmdb);
    const tmdbResponses = await Promise.all(
      imdbIds.map((id: any) =>
        FetchApi.get(
          `https://api.themoviedb.org/3/${mediaTypeLower}/${id}?language=en-US`
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

const fetchLatestList = async (mediaType: string) => {
  let url = "";
  if (mediaType === "movie") {
    url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`;
  } else {
    url = `https://api.themoviedb.org/3/trending/tv/day?language=en-US`;
  }
  try {
    const response = await FetchApi.get(url);
    const data = await response.json();

    return data.results;
  } catch (error) {
    console.log(error);
  }
};

const HomePage = () => {
  useTitle("Home");
  const router = useRouter();
  const [roleLoading] = useRole();

  const [selectedMedia, setSelectedMedia] = useState<string>("Movie");

  const { isLoading: ispopularLoading, data: popularList, isError: errorpopular } = useQuery({
    queryKey: ["popular", selectedMedia],
    queryFn: () => fetchPopularLists(selectedMedia),
  });

  const { isLoading: tvLoading, data: latestTVList } = useQuery({
    queryKey: ["latest-movies", "tv"],
    queryFn: () => fetchTrendingList("tv"),
  });

  const { isLoading: movieLoading, data: latestMovieList } = useQuery({
    queryKey: ["latest-movies", "movie"],
    queryFn: () => fetchLatestList("movie"),
  });

  if (movieLoading || tvLoading || roleLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  
  return (
    <div className="w-full">
      <div className="w-full flex flex-col lg:flex-row justify-between homeSliderCZHub">
        <div className="homeSliderCZ relative">
          <div className="absolute right-0 flex z-10 w-[40px] lg:visible invisible">
            <Image
              height={1000}
              width={1000}
              quality={100}
              className="w-full h-full"
              src="/images/shadow-left.png"
              alt="shadow-left"
            />
          </div>
          <Suspense fallback={<Loader />}>
            <HomeSlider />
          </Suspense>

        </div>
        <div className="lg:min-w-[400px] min-w-100% max-w-100% lg:max-w-[400px] homeSliderCZSidebar">
          <Suspense fallback={<Loader />}>
            {errorpopular ? <p>Error loading sidebar</p> : <Sidebar mediaType={"Popular"} />}
          </Suspense>

        </div>
      </div>
      <div className="w-full">
        <div className="w-full mb-6 md:mb-12"></div>
        <div className="homewrapper">
          <div className="containerHub flex gap-5 flex-col lg:flex-row">
            <div className="w-full">
              <div className="w-full">
                <div className="homewrapper">
                  <div className="flex justify-between  items-center gap-4">
                    <h3 className="text-white text-[25px] font-semibold">
                      LATEST MOVIES
                    </h3>
                    <button
                      className="border border-1 rounded-full text-white px-2 mr-2 hover:bg-white hover:text-black transition"
                      onClick={() => router.push(`/media/movie`)}
                    >
                      View More
                    </button>
                  </div>

                  <div className="w-fullSearch">
                    <ul className="w-full flex flex-wrap gap-y-5 md:gap-y-10 justify-center">
                      {latestMovieList && latestMovieList.length > 0
                        ? latestMovieList
                          .slice(0, 16)
                          .map((item: any, index: any) => (
                            <Suspense fallback={<Loader />} key={item.id}>
                              <Card
                                index={index}
                                key={item.id}
                                movieId={item.id}
                                mediaType={"Movie"}
                                isLoading={movieLoading}
                              />
                            </Suspense>
                          ))
                        : ""}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="share-container py-10 max-w-screen-md sm:mx-auto mx-5">
                <a
                  href="https://www.reddit.com/r/donkey_to/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/assets/images/redditbanner3.jpg"
                    alt="Banner"
                    width={800}
                    height={150}
                    quality={20}
                  />
                </a>
              </div>
              <div className="w-full">
                <div className="flex justify-between items-center gap-4">
                  <h3 className="text-white text-[25px] font-semibold">
                    TRENDING SHOWS
                  </h3>
                  <button
                    className="border border-1 rounded-full mr-2 text-white px-2 hover:bg-white hover:text-black transition"
                    onClick={() => router.push(`/media/tv`)}
                  >
                    View More
                  </button>
                </div>
                <div className="w-full py-2">
                  <ul className="w-full flex flex-wrap gap-y-5 md:gap-y-10">
                    {latestTVList && latestTVList.length > 0
                      ? latestTVList
                        .slice(0, 16)
                        .map((item: any, index: any) => (
                          // <Suspense fallback={<Loader />}>
                          <Card
                            index={index}
                            key={item.id}
                            movieId={item.id}
                            mediaType={"TV"}
                            isLoading={tvLoading}
                          />
                          // </Suspense>
                        ))
                      : ""}
                  </ul>
                </div>
              </div>
              <div className="w-full pt-10">
                <div className="flex items-center gap-4">
                  <h3 className="text-white text-[25px] font-semibold">
                    POPULAR
                  </h3>
                  <section className="flex gap-2">
                    <button
                      className={`${selectedMedia === "Movie"
                        ? "pbgColor rounded-full text-black px-2"
                        : "border border-1 rounded-full text-white px-2 hover:bg-white hover:text-black transition"
                        }`}
                      onClick={() => setSelectedMedia("Movie")}
                    >
                      Movies
                    </button>
                    <button
                      className={`${selectedMedia === "TV"
                        ? "pbgColor rounded-full text-black px-2"
                        : "border border-1 rounded-full text-white px-2 hover:bg-white hover:text-black transition"
                        }`}
                      onClick={() => setSelectedMedia("TV")}
                    >
                      TV Shows
                    </button>
                  </section>
                </div>
                <div className="w-full py-2">
                  <ul className="w-full flex flex-wrap gap-y-5 md:gap-y-10">
                    {popularList && popularList.length > 0
                      ? popularList
                        .slice(0, 16)
                        .map((item: any, index: any) => (
                          <Suspense fallback={<Loader />} key={item.id}>
                            <Card
                              index={index}
                              key={item.id}
                              movieId={item.id}
                              mediaType={selectedMedia}
                              isLoading={ispopularLoading}
                            />
                          </Suspense>
                        ))
                      : ""}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage