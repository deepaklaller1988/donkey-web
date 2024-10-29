"use client";
import { FaRegCirclePlay } from "react-icons/fa6";
import { IoIosAddCircleOutline } from "react-icons/io";
import { TiDelete } from "react-icons/ti";
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import FetchApi from "@lib/FetchApi";
import moment from "moment";
import { useRouter } from "next/navigation";
import CardSkeleton from "./CardSkeleton";
import Image from "next/image";
import User from "@lib/User";
import API from "@lib/Api";
import { toasterError, toasterSuccess } from "./Toaster";
import { HiPlay } from "react-icons/hi2";

import { useEffect, useState } from "react";
const apiKey = process.env.NEXT_PUBLIC_MDBKEY;

const fetchDetails = async (movieId: number, mediaType: string) => {
  try {
    const response = await FetchApi.get(
      `https://api.themoviedb.org/3/${mediaType.toLowerCase()}/${movieId}?language=en-US`
    );
    const data = await response.json();
    let imdbRating = null;

    try {
      const response = await API.get(
        `cached/imdb-rating?mediaId=${movieId}&mediaType=${
          mediaType.toLowerCase() === "movie" ? "movie" : "tv"
        }`
      );
      // const certificateResponse = await fetch(`https://mdblist.com/api/?apikey=${apiKey}&tm=${movieId}&m=${mediaType.toLowerCase() ==='movie' ? 'movie' : 'show'}`);
      if (response.success) {
        let res = response.data;
        imdbRating = res.imdb_rating;
      }
    } catch (certificateError) {
      console.error(
        `Failed to fetch certificate for movie ID ${movieId}:`,
        certificateError
      );
    }

    const combinedResult = {
      ...data,
      imdb_rating: imdbRating,
    };
    return combinedResult;
  } catch (error) {
    console.error("Failed to fetch data from the primary API:", error);
  }
};

function Card({
  episodeId,
  seasonId,
  movieId,
  index,
  mediaType,
  quality,
  isBookmarked = false,
  isMyList = false,
  queryClient,
}: any) {
  // console.log(index)
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  const [isDeletable, setIsDeletable] = useState(false);
  const {
    isLoading,
    error,
    data: movieDetials,
  } = useQuery<any>({
    queryKey: ["card-detials", movieId, mediaType],
    queryFn: () => fetchDetails(movieId, mediaType),
  });

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleWatchPopup = () => {
    if (!User.isUserLoggedIn) {
      toasterError("You must be signed in to use this feature..", 3000, "id");
    } else {
      setIsOpen(!isOpen);
    }
  };

  const handleBookmark = async (
    mediaID: any,
    mediaType: string,
    bookmarkType: string
  ) => {
    if (!User.isUserLoggedIn) {
      toasterError("You must be signed in to use this feature..", 3000, "id");
    }
    if (User.isUserLoggedIn) {
      try {
        let data = {
          userId: User.id,
          mediaId: mediaID,
          mediaType: mediaType,
          bookmarkType: bookmarkType,
        };

        const result = await API.post("bookmark", data);
        if (result.success) {
          toasterSuccess("Media added successfully to List.", 3000, mediaID);
          queryClient.invalidateQueries({ queryKey: ["bookmark"] });
        } else {
          toasterError(result?.error?.code, 3000, mediaID);
        }
      } catch (error: any) {
        toasterError(error?.error?.code, 3000, mediaID);
      }
      setIsOpen(false);
    }
  };

  const handleUpdateBookmark = async (
    mediaID: any,
    mediaType: string,
    bookmarkType: string
  ) => {
    try {
      let data = {
        userId: User.id,
        mediaId: mediaID,
        mediaType: mediaType,
        bookmarkType: bookmarkType,
      };

      const result = await API.put("bookmark", data);
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ["bookmark"] });

        toasterSuccess(
          `Media added successfully to ${
            bookmarkType === "watching"
              ? "Watching"
              : bookmarkType === "completed"
              ? "Completed"
              : "Plan to Watch"
          } Folder.`,
          3000,
          mediaID
        );
      } else {
        toasterError(result?.error?.code, 3000, mediaID);
      }
    } catch (error: any) {
      toasterError(error?.error?.code, 3000, mediaID);
    }
    setIsOpen(false);
  };

  const handleDeleteBookmark = async (mediaID: any, mediaType: string) => {
    try {
      let data = {
        userId: User.id,
        mediaId: mediaID,
        mediaType: mediaType,
      };

      const result = await API.delete("bookmark", data);
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ["bookmark"] });
        toasterSuccess(`Removed.`, 3000, mediaID);
      } else {
        toasterError(result?.error?.code, 3000, mediaID);
      }
    } catch (error: any) {
      console.log(error, "errr");
      toasterError(error?.error?.code, 3000, mediaID);
    }
    setIsOpen(false);
  };

  const handleDeleteList = async (mediaID: any, mediaType: string) => {
    try {
      let data = {
        userId: User.id,
        mediaId: mediaID,
        mediaType: mediaType,
      };

      const result = await API.delete("mediaprogress", data);
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ["watch-movies"] });
        toasterSuccess(
          `Media removed successfully from My List.`,
          3000,
          mediaID
        );
      } else {
        toasterError("Failed to delete movie.", 3000, mediaID);
      }
    } catch (error: any) {
      console.log(error, "errr");
      toasterError(error?.error?.code, 3000, mediaID);
    }
  };

  if (isLoading) {
    return <CardSkeleton />;
  }
  return (
    <>
      {movieDetials && (
        <>
          <li
            key={movieId}
            className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-[12.5%]  cursor-pointer cardSet relative"
          >
            <div
              className="relative w-full"
              onMouseEnter={() =>
                setIsDeletable(isBookmarked || isMyList ? true : false)
              }
              onMouseLeave={() => {
                setIsDeletable(false);
                setIsOpen(false);
              }}
            >
              <span
                className="relative folderOpened"
                onClick={() =>
                  router.push(
                    `/watch-now?type=${mediaType?.toLowerCase()}&id=${movieId}&seasonId=${seasonId?seasonId:""}&episodeId=${episodeId?episodeId:""}`
                  )
                }
              >
                {/* <FaPlayCircle className="opacity-0 transition absolute text-black -mt-5 top-1/2 text-[30px] -ml-5 left-1/2" /> */}
                <Image
                  alt="image"
                  quality={100}
                  height={100}
                  width={100}
                  className="rounded-xl w-full"
                  src={`${
                    movieDetials?.poster_path
                      ? "https://image.tmdb.org/t/p/original" +
                        movieDetials?.poster_path
                      : "/assets/images/miss.jpg"
                  }`}
                />
                {/* <label className="absolute z-0 pbgColor top-5 left-0 font-bold px-2 rounded-r-xl">
                {quality ? quality : "HD"}
              </label> */}
              </span>

              {isMyList && isDeletable && (
                <label className="absolute z-0 top-1 right-0 font-bold px-1 rounded-l-xl">
                  <div className="relative flex gap-4 hover:cursor-pointer">
                    <Image
                      alt="image"
                      quality={100}
                      height={100}
                      width={100}
                      className="w-8 h-8"
                      src="/assets/images/cross.png"
                      onClick={() =>
                        handleDeleteList(
                          movieDetials?.id,
                          mediaType === "Movie" ? "movie" : "tv"
                        )
                      }
                    />
                  </div>
                </label>
              )}

              {isBookmarked && isDeletable && (
                <label className="absolute z-0 top-1 right-0 font-bold px-1 rounded-l-xl">
                  <div className="relative flex gap-4">
                    <div className="relative flex gap-4">
                      {/* <TiDelete className=" w-8 h-8 m-1 " color="red" onClick={() => handleDeleteBookmark(movieDetials?.id, mediaType === 'Movie' ? 'movie' : 'tv')} /> */}
                      <img
                        className="w-8 h-8"
                        src="/assets/images/cross.png"
                        onClick={() =>
                          handleDeleteBookmark(
                            movieDetials?.id,
                            mediaType === "Movie" ? "movie" : "tv"
                          )
                        }
                      />
                    </div>
                  </div>
                </label>
              )}
              <section className="py-2">
                <b className="text-white font-semibold">
                  {movieDetials?.title && movieDetials.title.length > 40
                    ? movieDetials?.title?.slice(0, 40) + "..."
                    : movieDetials?.name && movieDetials?.name.length > 40
                    ? movieDetials?.name?.slice(0, 40) + "..."
                    : movieDetials?.name
                    ? movieDetials?.name
                    : movieDetials?.title}
                </b>
                <ul className="text-gray-500 flex gap-2">
                  <li className="text-sm">{mediaType}</li>.
                  <li className="text-sm">
                    {mediaType === "Movie"
                      ? moment(movieDetials?.release_date).year()
                      : "SS" + movieDetials?.last_episode_to_air?.season_number}
                  </li>
                  {/* . <li className="text-sm">{mediaType === 'Movie' ? movieDetials?.runtime + " min" : "EP" + movieDetials?.last_episode_to_air?.episode_number}</li> */}
                </ul>
              </section>

              <div
                // className={`albumDetail absolute bg-zinc-800 rounded-xl top-20 ${
                //   index + 1 === 1
                //     ? "left-full"
                //     : (index + 1) % 8 === 0 && width > 1280
                //     ? "right-full"
                //     : (index + 1) % 7 === 0 && width > 1280
                //     ? "right-full"
                //     : (index + 1) % 7 === 0 && width > 1024 && width < 1280
                //     ? "right-full"
                //     : "left-full"
                // } z-50 w-[350px]`}
                className={`albumDetail absolute bg-zinc-800 rounded-xl top-20 ${
                  (index + 1) % 8 === 7 || (index + 1) % 8 === 0
                    ? "right-full"
                    : "left-full"
                } z-50 w-[350px]`}
              >
                {" "}
                <div className="w-full p-5 relative">
                  <section className="pr-16">
                    <h2 className="text-white text-lg">
                      {movieDetials?.title || movieDetials?.name}
                    </h2>
                    <ul className="py-1 flex flex-wrap items-center text-white gap-4 font-light">
                      <li>
                        <b className="font-bold text-sm !text-white">
                          {mediaType === "Movie"
                            ? moment(movieDetials?.release_date).year()
                            : moment(movieDetials?.first_air_date).year()}
                        </b>
                      </li>
                      <li>
                        <label className="flex items-center gap-2 text-sm font-semibold">
                          <FaStar className=" text-[#F3C313]" />{" "}
                          {movieDetials?.imdb_rating
                            ? movieDetials?.imdb_rating?.toFixed(1)
                            : movieDetials?.vote_average?.toFixed(1)}
                        </label>
                      </li>
                      <li>
                        <Image
                          quality={30}
                          src="/images/imdb-logo.svg"
                          alt="Image"
                          width={40}
                          height={40}
                        />
                      </li>
                      <li className=" text-sm">
                        {mediaType === "Movie"
                          ? movieDetials?.runtime + " min"
                          : "EP" +
                            movieDetials?.last_episode_to_air?.episode_number}
                      </li>

                      <li>
                        {/* <label className=" text-sm rounded-full pbgColor text-black font-bold px-2">
                        {quality ? quality : "HD"}
                      </label> */}
                      </li>
                      {/* {movieDetials.certificate &&
                      <li>
                        <label className='text-white'>
                          {movieDetials.certificate}
                          </label>
                      </li>
                    } */}
                    </ul>
                  </section>
                  {!isBookmarked && !isMyList && (
                    <label className="absolute cursor-pointer right-5 bottom-1.5">
                      <div
                        className="relative text-white hover:text-amber-500  flex gap-1"
                        onClick={() =>
                          handleBookmark(
                            movieDetials?.id,
                            mediaType === "Movie" ? "movie" : "tv",
                            "planning-to-watch"
                          )
                        }
                      >
                        <IoIosAddCircleOutline className="w-6 h-6" /> My List
                      </div>
                    </label>
                  )}
                </div>
                <div className="w-full p-5 border-t border-1 border-white/5 text-white/50">
                  {/* <p>
                  Country:{" "}
                  <label className="text-white font-light">{movieDetials?.production_countries && movieDetials?.production_countries?.length > 0 ? movieDetials?.production_countries?.map((gen: any) => gen?.name).join(", ") : ""}</label>
                </p>
                <p>
                  Genre:{" "}
                  <label className="text-white font-light">{movieDetials?.genres && movieDetials?.genres?.length > 0 ? movieDetials?.genres?.map((gen: any) => gen?.name)?.join(", ") : ""}</label>
                </p>
                <p>
                  Scores:{" "}
                  <label className="text-white font-light">
                    {movieDetials?.vote_average?.toFixed(2)} by {movieDetials?.vote_count} reviews
                  </label>
                </p> */}
                  <p className="text-white/50 font-light pt-2">
                    {movieDetials?.overview &&
                    movieDetials?.overview.length > 150
                      ? movieDetials?.overview.slice(0, 150) + "..."
                      : movieDetials?.overview}
                  </p>
                  <button
                    className="text-white font-bold flex items-center gap-2 bg-white/30 px-6 py-2 rounded-full transition m-auto mt-4 mb-2"
                    onClick={() =>
                      router.push(
                        `/watch-now?type=${mediaType?.toLowerCase()}&id=${movieId}`
                      )
                    }
                  >
                    {/* Play <FaRegCirclePlay className="text-xl" /> */}
                    <HiPlay className="text-lg" />
                    Play
                  </button>
                </div>
              </div>
            </div>
          </li>
        </>
      )}
    </>
  );
}

export default Card;
