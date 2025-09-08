"use client";
import "../../node_modules/react-slideshow-image/dist/styles.css";
import { FaPlus, FaStar } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { Slide } from "react-slideshow-image";
import { useQuery, useQueries } from "@tanstack/react-query";
import moment from "moment";
import Image from "next/image";
import { HiPlay } from "react-icons/hi2";

import FetchApi from "@lib/FetchApi";
import Loader from "./core/Loader";
import { useRouter } from "next/navigation";
import useRole from "@hooks/useRole";
import User from "@lib/User";
import API from "@lib/Api";
import { toasterError, toasterSuccess } from "./core/Toaster";

const CLIENT_ID = process.env.NEXT_PUBLIC_TRACK_ClientID || "";

const fetchMoviesLogo = async (mediaId: number, mediaType: string) => {
  try {
    const type = mediaType.toLowerCase();
    const url = `https://api.themoviedb.org/3/${type}/${mediaId}/images?api_key=${CLIENT_ID}`;

    const res = await FetchApi.get(url);
    if (!res.ok) {
      console.error("❌ TMDB error:", res.status, res.statusText);
      return null;
    }

    const data = await res.json();

    const logos = data?.logos || [];
    if (!logos.length) {
      console.warn("⚠️ No logos array found for", mediaId);
      return null;
    }

    const enLogo = logos.find((logo: any) => logo.iso_639_1 === "en");
    const chosenLogo = enLogo || logos[0];

    if (chosenLogo?.file_path) {
      const logoUrl = `https://image.tmdb.org/t/p/original${chosenLogo.file_path}`;
      return logoUrl;
    }

    return null;
  } catch (err) {
    console.error("💥 Logo fetch error:", err);
    return null;
  }
};



const fetchTopAll = async () => {
  try {
    const [moviesResponse, tvResponse] = await Promise.all([
      FetchApi.get(
        "https://api.themoviedb.org/3/trending/movie/day?language=en-US&limit=10"
      ),
      FetchApi.get(
        "https://api.themoviedb.org/3/trending/tv/day?language=en-US&limit=10"
      ),
    ]);

    const moviesData = await moviesResponse.json();
    const tvData = await tvResponse.json();

    const fetchWithImdbRating = async (item: any, mediaType: string) => {
      try {
        const response = await API.get(
          `cached/imdb-rating?mediaId=${item.id}&mediaType=${mediaType}`
        );
        const imdbRating = response.success ? response.data.imdb_rating : null;
        return { ...item, imdb_rating: imdbRating, media_type: mediaType };
      } catch (error: any) {
        console.log(error.message)
        return { ...item, imdb_rating: null, media_type: mediaType };
      }
    };

    const moviesWithRatings = await Promise.all(
      moviesData.results.map((movie: any) =>
        fetchWithImdbRating(movie, "movie")
      )
    );

    const tvWithRatings = await Promise.all(
      tvData.results.map((show: any) => fetchWithImdbRating(show, "tv"))
    );

    const combinedResults = [];
    for (let i = 0; i < 5; i++) {
      if (moviesWithRatings[i]) combinedResults.push(moviesWithRatings[i]);
      if (tvWithRatings[i]) combinedResults.push(tvWithRatings[i]);
    }

    return combinedResults;
  } catch (error) {
    console.error("Failed to fetch data from the primary API:", error);
    return [];
  }
};

const getDetail = async (item: any) => {
  try {
    const response = await FetchApi.get(
      `https://api.themoviedb.org/3/${item.media_type}/${item.id}?language=en-US`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default function HomeSlider() {
  const router = useRouter();
  const [roleLoading, roleData] = useRole();
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading, data: products } = useQuery({
    queryKey: ["products"],
    queryFn: fetchTopAll,
  });

  const movieDetail = useQueries({
    queries: products
      ? products.map((item: any) => ({
        queryKey: ["movie-detail", item.id],
        queryFn: () => getDetail(item),
        enabled: !!products,
      }))
      : [],
  });

  const [logos, setLogos] = useState<{ [key: number]: string | null }>({});

  useEffect(() => {
    if (products && products.length > 0) {
      const fetchAllLogos = async () => {
        const logoPromises = products.map(async (item: any) => {
          const logo = await fetchMoviesLogo(item.id, item.media_type);
          return { id: item.id, logo };
        });

        const results = await Promise.all(logoPromises);
        const logoMap: { [key: number]: string | null } = {};
        results.forEach((res) => {
          logoMap[res.id] = res.logo;
        });

        setLogos(logoMap);
      };

      fetchAllLogos();
    }
  }, [products]);



  let combinedList: any[] = [];
  if (products && products.length > 0 && movieDetail) {
    combinedList = products.map((product: any, index: number) => {
      const detailData: any = movieDetail[index].data;
      return {
        ...product,
        genres: detailData?.genres || [],
        runtime: detailData?.runtime || null,
        release_date:
          product.media_type === "tv"
            ? detailData?.first_air_date
            : product.release_date,
      };
    });
  }

  const handleWatchPopup = () => {
    if (!User.isUserLoggedIn) {
      toasterError("You must be signed in to use this feature..", 3000, "id");
    } else {
      setIsOpen(true);
    }
  };

  const handleBookmark = async (
    mediaID: any,
    mediaType: string,
    bookmarkType: string
  ) => {
    if (User.isUserLoggedIn) {
      try {
        setIsOpen(false);
        let data = {
          userId: User.id ? User.id : roleData.id,
          mediaId: mediaID,
          mediaType: mediaType,
          bookmarkType: bookmarkType,
        };

        const result = await API.post("bookmark", data);
        if (result.success) {
          toasterSuccess("Media added successfully to List.", 3000, mediaID);
        }
      } catch (error: any) {
        toasterError(error?.error.code, 3000, mediaID);
      }
    }
  };

  if (isLoading || roleLoading) {
    return (
      <div className="mt-52">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full relative h-full">
      <Slide indicators={() => <div className="hidden" />}>
        {combinedList.map((item: any) => (
          <div key={item.id} className="each-slide-effect slideMain relative">
            <Image
              quality={100}
              height={550}
              width={550}
              src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
              alt="slide"
            />
            <div className="sliderSet">
              <div className="sliderContent relative z-10">
                <div className="homewrapper">

                  <div className="sliderContentSet pl-0 md:pl-4 flex flex-col justify-center pt-8">
                    <h2 className="text-[30px] md:text-[40px] lg:text-[50px] font-bold text-white py-0 md:pb-2">
                      {logos[item.id] ? (
                        <img
                          src={logos[item.id] as string}
                          alt={item.title || item.name}
                          className="!max-h-[80px] !object-fill !w-[250px]"
                        />
                      ) : (
                        item.title || item.name
                      )}
                    </h2>


                    <ul className="py-1 flex flex-wrap items-center text-white gap-x-3">
                      <li>
                        <b className="font-bold">
                          {item.release_date
                            ? moment(item.release_date).year()
                            : ""}
                        </b>
                      </li>
                      <li>
                        <span className="rounded flex items-center gap-2 pColor font-semibold px-2.5 my-0">
                          <FaStar className="text-[#F3C313]" />
                          <p className="text-white">
                            {item?.imdb_rating
                              ? item?.imdb_rating?.toFixed(1)
                              : "No Rating"}
                          </p>
                          <Image
                            quality={10}
                            src="/images/imdb-logo.svg"
                            alt="Image"
                            width={40}
                            height={20}
                          />
                        </span>
                      </li>
                      {item.genres?.map((gen: any) => (
                        <li key={gen.id}>{gen.name}</li>
                      ))}
                    </ul>

                    <p className="text-white hidden md:block">
                      {item?.overview && item?.overview.length > 200
                        ? item?.overview.slice(0, 150) + "..."
                        : item?.overview}
                    </p>

                    <section className="flex mt-4 gap-4">
                      <button
                        className="btnBgBlur flex items-center gap-2 text-white  px-6 py-2 rounded-full transition font-bold"
                        onClick={() =>
                          router.push(
                            `/watch-now?type=${item.media_type}&id=${item.id}`
                          )
                        }
                      >
                        <HiPlay className="text-lg" />
                        Play
                      </button>

                      <div
                        className="relative flex gap-4"
                        onMouseLeave={() => setIsOpen(false)}
                      >
                        <button
                          className="flex items-center gap-2 transition text-white hover:!text-amber-500 px-6 py-2 font-semibold"
                          onClick={() => {
                            handleWatchPopup();
                            handleBookmark(
                              item.id,
                              item.media_type,
                              "planning-to-watch"
                            );
                          }}
                        >
                          <FaPlus className="w-5 h-5 text-inherit" /> My List
                        </button>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
              <div className="absolute w-full z-0 left-0 bottom-0 flex items-end">
                <Image
                  height={1000}
                  width={1000}
                  quality={100}
                  className="w-full h-[70px]"
                  src="/assets/images/slides/shadow.png"
                  alt="shadow"
                />
              </div>
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
}
