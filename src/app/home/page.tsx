"use client";
import "./home.css";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import HomeSlider from "@components/HomeSlider";
import Sidebar from "@components/Sidebar";
import Card from "@components/core/Card";
import FetchApi from "@lib/FetchApi";
import { useState } from "react";
import useTitle from "@hooks/useTitle";
import Loader from "@components/core/Loader";
import Image from "next/image";
import useRole from "@hooks/useRole";
import { useAuth } from "context/AuthContext";
const CLIENT_ID = process.env.NEXT_PUBLIC_TRACK_ClientID || "";

const fetchPopularLists = async (mediaType: string) => {
  console.log(mediaType);
  const mediaTypeLower = mediaType.toLowerCase();
  const url = `https://api.trakt.tv/${
    mediaTypeLower === "movie" ? "movies" : "shows"
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
    // let response = await fetch(`https://vidsrc.to/vapi/${mediaType}/new/1`, { method: "GET", });
    const data = await response.json();
    // if (data.status === 200) {
    //     if (data.result) return data.result.items;
    // } else {
    //     return [];
    // }
    return data.results;
  } catch (error) {
    console.log(error);
  }
};

export default function Home() {
  const router = useRouter();
  const [roleLoading, roleData] = useRole();

  const { token }: any = useAuth();
  useTitle("Home");
  const [selectedMedia, setSelectedMedia] = useState<string>("Movie");
  const { data: popularList } = useQuery({
    queryKey: ["popular", selectedMedia],
    queryFn: () => fetchPopularLists(selectedMedia),
  });
  const { isLoading: tvLoading, data: latestTVList } = useQuery({
    queryKey: ["latest-movies", "tv"],
    queryFn: () => fetchLatestList("tv"),
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
      <HomeSlider />
      <div className="w-full">
        <div className="w-full mb-10 md:mb-20">        
        </div>
        <div className="homewrapper">
          <div className="containerHub flex gap-5 flex-col lg:flex-row">
            <div className="w-full">
              {/* {token && (
                <>
                  <WatchingPage type={"home"} />
                </>
              )} */}
              <div className="w-full">
                <div className="flex justify-between  items-center gap-4">
                  <h3 className="text-white text-[25px] font-semibold">
                    LATEST MOVIES
                  </h3>
                  <button
                    className="border border-1 rounded-full text-white px-2 hover:bg-white hover:text-black transition"
                    onClick={() => router.push(`/media/movie`)}
                  >
                    View More
                  </button>
                </div>
                
                <div className="w-full py-2">
                  <ul className="w-full flex flex-wrap gap-y-5 md:gap-y-10">
                    {latestMovieList && latestMovieList.length > 0
                      ? latestMovieList
                          .slice(0, 12)
                          .map((item: any) => (
                            <Card
                              key={item.id}
                              movieId={item.id}
                              mediaType={"Movie"}
                            />
                          ))
                      : ""}
                  </ul>
                </div>
              </div>
              <div className="share-container py-10 max-w-screen-md sm:mx-auto mx-5">
                <a
                  href="https://fststvpn.com/66fa7e897d554"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/assets/images/redditbanner3.jpg"
                    alt="Banner"
                    width={800}
                    height={150}
                  />
                </a>
              </div>
              <div className="w-full">
                <div className="flex justify-between items-center gap-4">
                  <h3 className="text-white text-[25px] font-semibold">
                    TRENDING SHOWS
                  </h3>
                  <button
                    className="border border-1 rounded-full text-white px-2 hover:bg-white hover:text-black transition"
                    onClick={() => router.push(`/media/tv`)}
                  >
                    View More
                  </button>

                </div>
                <div className="w-full py-2">
                  <ul className="w-full flex flex-wrap gap-y-5 md:gap-y-10">
                    {latestTVList && latestTVList.length > 0
                      ? latestTVList
                          .slice(0, 12)
                          .map((item: any) => (
                            <Card
                              key={item.id}
                              movieId={item.id}
                              mediaType={"TV"}
                            />
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
                      className={`${
                        selectedMedia === "Movie"
                          ? "pbgColor rounded-full text-black px-2"
                          : "border border-1 rounded-full text-white px-2 hover:bg-white hover:text-black transition"
                      }`}
                      onClick={() => setSelectedMedia("Movie")}
                    >
                      Movies
                    </button>
                    <button
                      className={`${
                        selectedMedia === "TV"
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
                          .slice(0, 18)
                          .map((item: any) => (
                            <Card
                              key={item.id}
                              movieId={item.id}
                              mediaType={selectedMedia}
                            />
                          ))
                      : ""}
                  </ul>
                </div>
              </div>
            </div>
            <div className="min-w-full md:min-w-[376px]">
              <div>
                <Sidebar mediaType={"Popular"} />
              </div>
              <div className="mt-20">
                <Sidebar mediaType={"Movie"} />
              </div>
              <div className="mt-20">
                <Sidebar mediaType={"TV"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
