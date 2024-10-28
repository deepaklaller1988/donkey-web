"use client";
import "../../node_modules/react-slideshow-image/dist/styles.css";
import { FaRegCirclePlay } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { BsFire } from "react-icons/bs";
import React, { useState } from "react";
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
const apiKey = process.env.NEXT_PUBLIC_MDBKEY;

const fetchTopAll = async () => {
  try {
    const response = await FetchApi.get(
      "https://api.themoviedb.org/3/trending/all/day?language=en-US"
    );
    const data = await response.json();

    const combinedResults = await Promise.all(
      data.results.map(async (item: any) => {
        try {
          // const certificateResponse = await fetch(
          //   `https://mdblist.com/api/?apikey=${apiKey}&tm=${item.id}&m=${
          //     item?.media_type === "movie" ? "movie" : "show"
          //   }`
          // );
          let imdbRating = null;
          const response = await API.get(
            `cached/imdb-rating?mediaId=${item.id}&mediaType=${
              item?.media_type === "movie" ? "movie" : "tv"
            }`
          );
          if (response.success) {
            let res = response.data;
            imdbRating = res.imdb_rating;
          }
          return {
            ...item,
            imdb_rating: imdbRating,
          };
        } catch (error) {
          console.error(
            `Failed to fetch certificate for item ID ${item.id}:`,
            error
          );
          return {
            ...item,
            certificate: null,
          };
        }
      })
    );

    return combinedResults;
  } catch (error) {
    console.error("Failed to fetch data from the primary API:", error);
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
  const {
    isLoading,
    error,
    data: products,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchTopAll,
  });

  const movieDetail = useQueries({
    queries: products
      ? products.map((item: any) => {
          return {
            queryKey: ["movie-detail", item.id],
            queryFn: () => getDetail(item),
            enabled: !!products,
          };
        })
      : [],
  });

  let combinedList = [];

  if (products && products.length > 0 && movieDetail) {
    combinedList = products.map((product: any, index: number) => {
      const detailData: any = movieDetail[index].data;
      return {
        ...product,
        genres: detailData?.genres ? detailData?.genres : [],
        runtime: detailData?.runtime ? detailData?.runtime : null,
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

  const indicators = (index: any) => (
    <div className="indicator hidden">
      <div className="transition p-1 bg-white rounded-full mx-1 cursor-pointer"></div>
    </div>
  );

  if (isLoading || roleLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="w-full relative h-full">
        <Slide indicators={indicators}>
        {combinedList &&
            combinedList.length > 0 &&
            combinedList.map((item: any, index: number) => (
              <div key={item.id} className="each-slide-effect slideMain">
            <img
                  src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                  alt="slide"
                />
              <div className="sliderSet">
                <div className="sliderContent relative z-10">
                  <div className="homewrapper">
                    <div className="sliderContentSet pl-0 md:pl-4 flex flex-col justify-center">
                      <span className="text-white/70 flex items-center">
                        <BsFire className="mr-1" /> Trending
                      </span>
                      <h2 className="text-[30px] md:text-[40px] lg:text-[50px] font-bold text-white py-0 md:pb-2">
                      {item.title ? item.title : item.name}
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
                          <span className="rounded flex items-center gap-2.5 pColor font-semibold px-2.5 my-0">
                            <FaStar className=" text-[#F3C313]" />
                            <p className="text-white">
                            {item?.imdb_rating
                                  ? item?.imdb_rating?.toFixed(1)
                                  : item?.vote_average?.toFixed(1)}
                            </p>
                            <Image
                              src="/images/imdb-logo.svg"
                              alt="Image"
                              width={40}
                              height={20}
                            />
                          </span>
                        </li>

                        {item.genres && item.genres.length > 0
                            ? item.genres.map((gen: any) => (
                                <li key={gen.id}>{gen.name}</li>
                              ))
                            : ""}
                      </ul>
                      <p className="text-white hidden md:block">
                      {item?.overview && item?.overview.length > 250
                            ? item?.overview.slice(0, 250) + "..."
                            : item?.overview}
                      </p>
                      <section className="flex mt-4 gap-4">
                      <button
                            className="btnBgBlur flex items-center gap-2 text-white  px-6 py-2 rounded-full transition font-bold"
                            onClick={() =>
                              router.push(
                                `/watch-now?type=${item.media_type?.toLowerCase()}&id=${
                                  item.id
                                }`
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
                              className="flex items-center gap-2 transition text-white hover:text-amber-500 px-6 py-2 font-semibold"
                              onClick={() => {
                                handleWatchPopup();
                                handleBookmark(
                                  item.id,
                                  item.media_type,
                                  "planning-to-watch"
                                );
                              }}
                            >
                            <FaPlus className="w-5 h-5" /> My List
                          </button>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
                <div className="absolute w-full z-0 left-0 bottom-0 flex items-end">
                  <img
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
    </>
  );
}
