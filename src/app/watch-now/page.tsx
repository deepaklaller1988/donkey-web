"use client";
import "./album-detail.css";

import API from "@lib/Api";
import moment from "moment";
import Link from "next/link";
import User from "@lib/User";
import Image from "next/image";
import useRole from "@hooks/useRole";
import FetchApi from "@lib/FetchApi";
import { FaStar } from "react-icons/fa";
import Card from "@components/core/Card";
import Loader from "@components/core/Loader";
import { useSearchParams } from "next/navigation";
import Recommended from "@components/Recommended";
import React, { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { toasterError, toasterSuccess } from "@components/core/Toaster";
import { IoIosAddCircleOutline, IoIosArrowRoundForward } from "react-icons/io";


export default function WatchNow() {

  const [roleLoading] = useRole();
  const iframeRef = useRef(null);
  const searchParams = useSearchParams();
  const movieId: any = searchParams.get("id");
  const mediaType: any = searchParams.get("type");
  const seasonId: any = searchParams.get("seasonId");
  const episodeId: any = searchParams.get("episodeId");
  const [selectedSeason, setSelectedSeason] = useState<any>(null);
  const [selectedEpisode, setSelectedEpisode] = useState<any>(null);
  const [goToEpisode, setGoToEpisode] = useState<any>("");
  const [isAutoplay, setIsAutoplay] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<any>("videasy.net");
  const [iframeMouseOver, setIframeMouseOver] = useState(false);

  const userId = User.id;
  const playerOptions = [
    // { label: "Player 1", value: "vidsrc.dev" },
    { label: "Player 1", value: "videasy.net" },
    { label: "Player 2", value: "vidsrc.co" },
     { label: "Player 3", value: "vidsrc.cc" },
    { label: "Player 4", value: "embed" },
    { label: "Player 5", value: "vidsrc.me" },
    // { label: "Dubbed", value: "player.autoembed" },
  ];

  
const fetchDetails = async (movieId: number, mediaType: string) => {
  try {
    const response = await FetchApi.get(
      `https://api.themoviedb.org/3/${mediaType.toLowerCase()}/${movieId}?language=en-US`
    );
const data = await response.json().catch((err) => {
  console.error("JSON parse failed:", err);
  return null;
});
if (!data) throw new Error("Invalid response data."); 

 let imdbRating = null;
    try {
      const response = await API.get(
        `cached/imdb-rating?mediaId=${movieId}&mediaType=${mediaType === "movie" ? "movie" : "tv"
        }`
      );
      // const certificateResponse = await fetch(`https://mdblist.com/api/?apikey=${apiKey}&tm=${movieId}&m=${mediaType==='movie' ? 'movie' : 'show'}`);

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

    const combinedResults = {
      ...data,
      imdb_rating: imdbRating,
    };

    return combinedResults||{};
  } catch (error) {
    console.error("Failed to fetch data from the primary API:", error);
  }
};

const fetchCredits = async (movieId: number, mediaType: string) => {
  try {
    const response = await FetchApi.get(
      `https://api.themoviedb.org/3/${mediaType.toLowerCase()}/${movieId}/credits?language=en-US`
    );
const data = await response.json().catch((err) => {
  console.error("JSON parse failed:", err);
  return null;
});
if (!data) throw new Error("Invalid response data.");    
    return data;
  } catch (error) {
    console.log(error);
  }
};

const fetchSimilarLists = async (movieId: number, mediaType: string) => {
  try {
    const response = await FetchApi.get(
      `https://api.themoviedb.org/3/${mediaType.toLowerCase()}/${movieId}/similar?language=en-US`
    );
const data = await response.json().catch((err) => {
  console.error("JSON parse failed:", err);
  return null;
});
if (!data) throw new Error("Invalid response data.");

    const filteredResults = data?.results?.filter(
      (item: any) => item.genre_ids && item.genre_ids.length > 0
    );
    return filteredResults;
  } catch (error) {
    console.log(error);
  }
};

const fetchPopularLists = async (mediaType: string, pages = 2) => {
  try {
    const allResults = [];
    for (let page = 1; page <= pages; page++) {
      const response = await FetchApi.get(
        `https://api.themoviedb.org/3/${mediaType.toLowerCase()}/popular?language=en-US&page=${pages}`
      );
 const data = await response.json().catch((err:any) => {
  console.error("JSON parse failed:", err);
  return null;
});
if (!data) throw new Error("Invalid response data.");
      const filteredResults = data?.results?.filter(
        (item: any) => item.genre_ids && item.genre_ids.length > 0
      );
      allResults.push(...filteredResults);
    }

    return allResults;
  } catch (error) {
    console.log(error);
    return [];
  }
};

  const onPlayerSelect = (e: any) => {
    setSelectedPlayer(e.value);
  };

  const {
    isLoading,
    error,
    data: watchDetials,
  } = useQuery<any>({
    queryKey: ["watch-detials", movieId, mediaType],
    queryFn: () => fetchDetails(movieId, mediaType),
  });

  useEffect(() => {
    const initializeValues = async () => {
      // if (userId && selectedPlayer === "vidsrc.dev") {
      if (userId && selectedPlayer === "videasy.net") {
        try {
          const response = await API.get(
            `mediaprogress/tv?user_id=${userId}&media_type=${mediaType}&media_id=${movieId}`
          );
          if (response?.data) {
            const { season_id, episode_id } = response?.data[0];

            setSelectedSeason(
              season_id ? Number(season_id) : seasonId ? Number(seasonId) : 1
            );
            setSelectedEpisode(
              episode_id
                ? Number(episode_id)
                : episodeId
                  ? Number(episodeId)
                  : 1
            );
          } else {
            console.error("No progress found, using provided IDs");
            setSelectedSeason(seasonId ? Number(seasonId) : 1);
            setSelectedEpisode(episodeId ? Number(episodeId) : 1);
          }
        } catch (error) {
          console.error("Error fetching media progress:", error);
          setSelectedSeason(seasonId ? Number(seasonId) : 1);
          setSelectedEpisode(episodeId ? Number(episodeId) : 1);
        }
      } else {
        if (!selectedEpisode || !selectedSeason) {
          setSelectedSeason(seasonId ? Number(seasonId) : 1);
          setSelectedEpisode(episodeId ? Number(episodeId) : 1);
        }
      }
    };

    initializeValues();
  }, [userId, selectedPlayer, movieId, mediaType, seasonId, episodeId]);

  useEffect(() => {
    // if (seasonId && episodeId && selectedPlayer !== "vidsrc.dev") {
    if (seasonId && episodeId && selectedPlayer !== "videasy.net") {
      if (!selectedEpisode && !selectedSeason) {
        setSelectedSeason(1);
        setSelectedEpisode(1);
      }
    }
  }, [selectedPlayer, seasonId, episodeId]);

  useEffect(() => {
    const handleMessage = (event: any) => {
      // if (event.origin !== "https://vidsrc.dev") return;
      if (event.origin !== "https://videasy.net") return;

      try {
        const data = event.data;
        if (data.key === "player-config") {
          setIsAutoplay(data?.data?.autoplay);
          setIsPlaying(data?.data?.autoplay);
        }
      } catch (error) {
        console.error("Error parsing message data:", error);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [isAutoplay]);

  useEffect(() => {
    window.focus();
    const onWindowBlur = () => {
      if (iframeMouseOver) {
        // if (selectedPlayer === "vidsrc.dev" && userId && movieId && mediaType) {
        if (selectedPlayer === "videasy.net" && userId && movieId && mediaType) {
          const payload = {
            user_id: Number(userId),
            media_id: movieId.toString(),
            media_type: mediaType,
            progress_time: "12",
            status: true,
            season_id: mediaType === "tv" ? selectedSeason : 1,
            episode_id: mediaType === "tv" ? selectedEpisode : 1,
          };
          mutation.mutate(payload);
        }
      }
    };
    window.addEventListener("blur", onWindowBlur);
    return () => {
      window.removeEventListener("blur", onWindowBlur);
    };
  }, [
    iframeMouseOver,
    selectedPlayer,
    mediaType,
    userId,
    movieId,
    selectedSeason,
    selectedEpisode,
  ]);

  const fetchEpisodesLists = async (
    mediaType: string,
    seriesId: number,
    season: any
  ) => {
    try {
      if (mediaType === "movie") {
        return [];
      }
      const response = await FetchApi.get(
        `https://api.themoviedb.org/3/${mediaType.toLowerCase()}/${seriesId}/season/${season && season.season_number ? season.season_number : selectedSeason
        }}?language=en-US&page=1`
      );
const data = await response.json().catch((err) => {
  console.error("JSON parse failed:", err);
  return null;
});
if (!data) throw new Error("Invalid response data.");   

   return data;
    } catch (error) {
      console.log(error);
    }
  };

  const { isLoading: isCreditLoading, data: creditDetials } = useQuery<any>({
    queryKey: ["credit-detials", movieId, mediaType],
    queryFn: () => fetchCredits(movieId, mediaType),
  });
  const { isLoading: isSimilarLoading, data: similarMovies } = useQuery<any>({
    queryKey: ["similar-lists", movieId, mediaType],
    queryFn: () => fetchSimilarLists(movieId, mediaType),
  });
  const { isLoading: isPopularLoading, data: popularList } = useQuery<any>({
    queryKey: ["popular-lists", mediaType],
    queryFn: () => fetchPopularLists(mediaType),
  });
  const { isLoading: isEpisodeLoading, data: episodesList } = useQuery<any>({
    queryKey: ["episodes-lists", mediaType, movieId, selectedSeason],
    queryFn: () => fetchEpisodesLists(mediaType, movieId, selectedSeason),
    enabled: !!(selectedSeason || watchDetials),
  });

  const mutation = useMutation({
    mutationFn: async (progressData: any) => {
      return await API.post("mediaprogress", progressData);
    },
    onSuccess: (data) => {
      if (data?.message) {
      }
    },
    onError: (error: any) => { },
  });

  const handleSeasonChange = (e: any) => {
    setSelectedSeason(e.value);
    setSelectedEpisode(1);
  };

  const handleChange = (e: any) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setGoToEpisode(e.target.value);
    } else {
      setGoToEpisode("");
    }
  };

  const handleJumpToEpisode = () => {
    if (
      episodesList &&
      episodesList.episodes &&
      episodesList.episodes.length > 0
    ) {
      let noOfEpiosode = Math.max(
        ...episodesList.episodes.map((item: any) => item.episode_number)
      );
      if (Number(goToEpisode) <= noOfEpiosode && Number(goToEpisode) > 0) {
        setSelectedEpisode(Number(goToEpisode));
      }
    }
  };

  const handleOverlayClick = () => {
    setIsPlaying(true);
  };

  const handleBookmark = async (
    mediaID: any,
    mediaType: string,
    bookmarkType: string
  ) => {
    if (!User.isUserLoggedIn) {
      toasterError("Please login or signup to use this feature.", 3000, "id");
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
        } else {
          toasterError(result?.error?.code, 3000, mediaID);
        }
      } catch (error: any) {
        toasterError(error?.error?.code, 3000, mediaID);
      }
    }
  };

  if (
    isLoading ||
    isPopularLoading ||
    isSimilarLoading ||
    isCreditLoading ||
    isEpisodeLoading ||
    roleLoading
  ) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  const getPlayerUrl = () => {
    // const baseVidSrcUrl = `https://vidsrc.dev/embed/${mediaType}/${watchDetials.id ? watchDetials.id : watchDetials.imdb_id
    //   }${mediaType === "tv"
    //     ? selectedSeason
    //       ? "/" + (selectedSeason.season_number || selectedSeason || 1)
    //       : "/1"
    //     : ""
    //   }${mediaType === "tv" ? (selectedEpisode ? "/" + selectedEpisode : "/1") : ""
    //   }`;
    const baseVidSrcUrl:any = `https://player.videasy.net/${mediaType}/${watchDetials.id ? watchDetials.id : watchDetials.imdb_id
      }${mediaType === "tv"
        ? selectedSeason
          ? "/" + (selectedSeason.season_number || selectedSeason || 1)
          : "/1"
        : ""
      }${mediaType === "tv" ? (selectedEpisode ? "/" + selectedEpisode : "/1") : ""
      }?color=FFA500`;

     const baseEmbedUrl:any = `https://embed.su/embed/${mediaType}/${watchDetials.imdb_id ? watchDetials.imdb_id : watchDetials.id
      }${mediaType === "tv"
        ? selectedSeason
          ? "/" + (selectedSeason.season_number || selectedSeason || 1)
          : "/1"
        : ""
      }${mediaType === "tv" ? (selectedEpisode ? "/" + selectedEpisode : "/1") : ""
      }`;

    const baseVidSrcmeUrl:any = `https://vidsrc.me/embed/${mediaType}?${watchDetials.imdb_id
      ? "imdb=" + watchDetials.imdb_id
      : "tmdb=" + watchDetials.id
      }${mediaType === "tv" && selectedSeason
        ? "&season=" + (selectedSeason.season_number || 1)
        : "&season=1"
      }${mediaType === "tv" && selectedEpisode ? "&episode=" + selectedEpisode : ""
      }`;
    // https://flicky.host/embed/tv/?id=71446/1/1
    // https://flicky.host/embed/movie/?id=402431

    // const baseVidFlickyHostUrl = `https://flicky.host/embed/${mediaType}/?id=${watchDetials.imdb_id ? watchDetials.imdb_id : watchDetials.id
    // }${mediaType === "tv"
    //   ? selectedSeason
    //     ? "/" + (selectedSeason.season_number || selectedSeason || 1)
    //     : "/1"
    //   : ""
    // }${mediaType === "tv" ? (selectedEpisode ? "/" + selectedEpisode : "/1") : ""
    // }`;

// autoplay=true&autonext=true&nextbutton=true&poster=true&primarycolor=6C63FF&secondarycolor=9F9BFF&iconcolor=FFFFFF&fontcolor=FFFFFF&fontsize=16px&opacity=0.5&font=Poppins
    // https://player.vidsrc.co/embed
    
  const baseVidSrccoUrl:any = `https://player.vidsrc.co/embed/${mediaType}/${watchDetials.id ? watchDetials.id : watchDetials.imdb_id
      }${mediaType === "tv"
        ? selectedSeason
          ? "/" + (selectedSeason.season_number || selectedSeason || 1)
          : "/1"
        : ""
      }${mediaType === "tv" ? (selectedEpisode ? "/" + selectedEpisode : "/1") : ""
      }?primarycolor=FFA500&secondarycolor=FFD699`;

 
       const baseVidSrcccUrl:any = `https://vidsrc.cc/v2/embed/${mediaType}/${watchDetials.id ? watchDetials.id : watchDetials.imdb_id
      }${mediaType === "tv"
        ? selectedSeason
          ? "/" + (selectedSeason.season_number || selectedSeason || 1)
          : "/1"
        : ""
      }${mediaType === "tv" ? (selectedEpisode ? "/" + selectedEpisode : "/1") : ""
      }`;

    const baseAutoEmbedUrl:any = `https://player.autoembed.cc/embed/${mediaType}/${watchDetials.imdb_id ? watchDetials.imdb_id : watchDetials.id
      }${mediaType === "tv"
        ? selectedSeason
          ? "/" + (selectedSeason.season_number || selectedSeason || 1)
          : "/1"
        : ""
      }${mediaType === "tv" ? (selectedEpisode ? "/" + selectedEpisode : "/1") : ""
      }`;

    const playerUrls: any = {
      // "vidsrc.dev": baseVidSrcUrl,
      "videasy.net": baseVidSrcUrl,
      "vidsrc.co":baseVidSrccoUrl,
       "vidsrc.cc":baseVidSrcccUrl,
      embed: baseEmbedUrl,
      "vidsrc.me": baseVidSrcmeUrl,
      "player.autoembed": baseAutoEmbedUrl,
    };

    return playerUrls[selectedPlayer] || playerUrls["videasy.net"];
  };

  const handleOnMouseOver = () => {
    setIframeMouseOver(true);
  };

  const handleOnMouseOut = () => {
    window.focus();
    setIframeMouseOver(false);
  };

  if (!movieId || !mediaType) {
  return (
    <div className="text-red-700 font-semibold text-4xl absolute top-1/2 left-1/2 z-30">
      Invalid or missing movie ID or media type in the URL.
    </div>
  );
}
  return (
    <div className="w-full">
      {watchDetials && getPlayerUrl() ? 
      (
        <>
          <div className="w-full ">
            <section className="relative">
              <Image
                height={1000}
                width={1000}
                quality={70}
                className="bgAlbumDetail"
                src={`${watchDetials?.backdrop_path
                  ? `https://image.tmdb.org/t/p/original${watchDetials?.backdrop_path}`
                  : "/assets/images/slides/1.jpg"
                  }`}
                alt="Video"
              />
              <div className="w-full h-full absolute top-0 left-0 z-0 pt-[80px]">
                <div className="homewrapper relative z-10">
                  <div
                    className="w-full iframeWrapper"
                    onMouseOver={handleOnMouseOver}
                    onMouseOut={handleOnMouseOut}
                  >
                    <iframe
                     src={getPlayerUrl()}
                       className="w-full mt-5 rounded-lg videoFrame"
                       title="Vidsrc video player"
                       referrerPolicy="origin"
                         {...((selectedPlayer !== "embed" && selectedPlayer !== "videasy.net") && {
                         sandbox: "allow-scripts allow-same-origin allow-presentation"
                       })}
                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                       allowFullScreen
                       ref={iframeRef}
                       id="myiframe"
                     />
                   </div>
                </div>
                {!isAutoplay && !isPlaying && (
                  <div
                    className="absolute top-0 left-0 w-full h-full cursor-pointer bg-[#00000070]"
                    onClick={handleOverlayClick}
                  ></div>
                )}
                <div className="absolute w-full z-0 left-0 bottom-0">
                  <Image
                    quality={100}
                    src="/assets/images/slides/shadow.png"
                    alt="shadow"
                    className="w-full h-[280px]"
                    height={50}
                    width={50}
                  />
                </div>
              </div>
            </section>
          </div>
          <div className="w-full pt-24">
            <div className="homewrapper">
              <div className="flex items-center w-full justify-center text-white pb-3 rounded-lg text-sm">
                <span className="text-sm tracking-wider font-light">
                  Media not loading? Try another player
                </span>
                <div className=" bg-[#272727] rounded-lg ml-4 ">
                  <section className="flex items-center justify-center text-white ">
                    <Dropdown
                      value={selectedPlayer?selectedPlayer:"selected player is not defined"}
                      onChange={onPlayerSelect}
                      options={playerOptions}
                      optionLabel="label"
                      placeholder="Select Player"
                      className="text-[#fea500] p-2 px-3 custom-dropdown-text"
                      panelClassName="custom-dropdown-panel"
                    />
                  </section>
                </div>
              </div>
              <div className="w-full flex flex-col lg:flex-row gap-5">
                <div className="w-full flex flex-col md:flex-row gap-5">
                  <section className="min-w-[170px] max-w-[170px] md:min-w-[270px] md:max-w-[270px] m-auto md:m-0">
                    <Image
                      height={400}
                      width={400}
                      quality={70}
                      className="w-full rounded-lg"
                      src={`https://image.tmdb.org/t/p/original${watchDetials?.poster_path}`}
                      alt="album"
                    />
                  </section>
                  <section>
                    <div className="w-full flex flex-col lg:flex-row gap-5 justify-between flex-wrap lg:flex-nowrap">
                      <section>
                        <h3 className="text-white text-[25px] font-semibold">
                          {watchDetials?.title || watchDetials?.name}
                        </h3>
                        <ul className="py-1 flex flex-wrap text-white gap-x-3 font-light items-center">
                          <li>
                            <b className="font-bold">
                              {mediaType === "movie"
                                ? moment(watchDetials?.release_date).year()
                                : moment(watchDetials?.first_air_date).year()}
                            </b>
                          </li>
                          <li>
                            <span className="flex items-center gap-2 pColor font-semibold">
                              <FaStar className=" text-[#F3C313]" />
                              <p className="text-white">
                                {watchDetials?.imdb_rating
                                  ? watchDetials?.imdb_rating?.toFixed(1)
                                  : watchDetials?.vote_average?.toFixed(1)}
                              </p>
                              <Image
                                src="/images/imdb-logo.svg"
                                alt="Image"
                                width={40}
                                height={20}
                                quality={20}
                              />
                            </span>
                          </li>
                          <li>
                            {mediaType === "movie"
                              ? watchDetials?.runtime + " min"
                              : "EP" +
                                watchDetials?.last_episode_to_air ? (watchDetials?.last_episode_to_air
                                  ?.episode_number) : " "}
                          </li>
                        </ul>
                        <ul className="py-1 flex flex-wrap text-white gap-x-3 font-light items-center">
                          {watchDetials.genres && watchDetials.genres.length > 0
                            ? watchDetials.genres.map((gen: any) => (
                              <li key={gen.id}>{gen.name}</li>
                            ))
                            : ""}
                        </ul>
                      </section>
                      <section className="relative text-white hover:text-amber-500  flex items-end justify-end gap-1">
                        <div
                          className="flex gap-1 text-[20px] cursor-pointer"
                          onClick={() =>
                            handleBookmark(
                              watchDetials?.id,
                              mediaType === "movie" ? "movie" : "tv",
                              "planning-to-watch"
                            )
                          }
                        >
                          <IoIosAddCircleOutline className="w-7 h-7" /> My List
                        </div>
                      </section>
                    </div>
                    <div className="w-full">
                      <p className="text-white/50 mt-3 font-light">
                        {watchDetials?.overview}
                      </p>
                    </div>
                    <div className="w-full">
                      <div className="w-full p-5 pl-0 mt-5 border-t border-1 border-white/5 text-white/50">
                        <p>
                          Type:{" "}
                          <label className="text-white font-light">
                            <Link
                              href={`/filters?mediaType=${mediaType}`}
                              className="transition hover:text-amber-500"
                            >
                              {mediaType.toUpperCase()}
                            </Link>
                          </label>
                        </p>
                        <p>
                          Country:{" "}
                          <label className="text-white font-light">
                            {watchDetials?.production_countries &&
                              watchDetials?.production_countries.length > 0
                              ? watchDetials?.production_countries.map(
                                (gen: any, index: number) => (
                                  <span key={index}>
                                    <Link
                                      href={`/filters?mediaType=${mediaType}&country=${gen.iso_3166_1}`}
                                      className="transition hover:text-amber-500"
                                    >
                                      {gen.name}
                                    </Link>
                                    {index <
                                      watchDetials.production_countries
                                        .length -
                                      1 && ", "}
                                  </span>
                                )
                              )
                              : ""}
                          </label>
                        </p>
                        <p>
                          Genre:{" "}
                          <label className="text-white font-light">
                            {watchDetials?.genres &&
                              watchDetials?.genres.length > 0
                              ? watchDetials?.genres.map(
                                (gen: any, index: number) => (
                                  <span key={index}>
                                    <Link
                                      href={`/filters?mediaType=${mediaType}&genre=${gen.id}`}
                                      className="transition hover:text-amber-500"
                                    >
                                      {gen.name}
                                    </Link>
                                    {index < watchDetials.genres.length - 1 &&
                                      ", "}
                                  </span>
                                )
                              )
                              : ""}
                          </label>
                        </p>
                        <p>
                          Release:{" "}
                          <label className="text-white font-light">
                            {mediaType === "movie"
                              ? moment(watchDetials?.release_date).format(
                                "MMM DD, YYYY"
                              )
                              : moment(watchDetials?.first_air_date).format(
                                "MMM DD, YYYY"
                              )}
                          </label>
                        </p>
                        <p>
                          Director:{" "}
                          <label className="text-white font-light">
                            {creditDetials?.crew &&
                              creditDetials?.crew.length > 0
                              ? creditDetials?.crew
                                .filter(
                                  (item: any) => item?.job === "Director"
                                )
                                .map((gen: any) => gen.name)
                                .join(", ")
                              : ""}
                          </label>
                        </p>
                        <p>
                          Production:{" "}
                          <label className="text-white font-light">
                            {watchDetials.production_companies &&
                              watchDetials.production_companies.length > 0
                              ? watchDetials.production_companies
                                .map((gen: any) => gen.name)
                                .join(", ")
                              : ""}
                          </label>
                        </p>
                        <p>
                          Cast:{" "}
                          <label className="text-white font-light">
                            {creditDetials?.cast &&
                              creditDetials?.cast.length > 0
                              ? creditDetials?.cast
                                .slice(0, 5)
                                .map((gen: any) => gen.name)
                                .join(", ")
                              : ""}
                          </label>
                        </p>
                        <p>
                          Tagline:{" "}
                          <label className="text-white font-light">
                            {watchDetials.tagline
                              ? watchDetials.tagline
                              : "N/A"}
                          </label>
                        </p>
                      </div>
                    </div>
                  </section>
                </div>
                <div className="min-w-full md:min-w-[376px]">
                  <div className="w-full bg-[#272727] rounded-lg">
                    <section className="episodeSelectionMain flex items-center justify-center text-white">
                      {mediaType === "movie" ? (
                        <div className="p-3 px-20">Movie Files</div>
                      ) : (
                        <>
                          <Dropdown
                            value={selectedSeason}
                            onChange={(e: DropdownChangeEvent) => {
                              handleSeasonChange(e);
                              // if (selectedPlayer === "vidsrc.dev") {
                              if (selectedPlayer === "videasy.net") {
                                const mediaId = watchDetials.id
                                  ? watchDetials.id
                                  : watchDetials.imdb_id;

                                if (userId && mediaId && mediaType) {
                                  mutation.mutate({
                                    user_id: Number(userId),
                                    media_id: mediaId.toString(),
                                    media_type: mediaType,
                                    progress_time: "12",
                                    season_id:
                                      mediaType === "tv"
                                        ? e.value?.season_number
                                          ? e.value?.season_number
                                          : e.value
                                        : 1,
                                    episode_id:
                                      mediaType === "tv" ? selectedEpisode : 1,
                                    status: true,
                                  });
                                }
                              }
                            }}
                            options={
                              watchDetials.seasons &&
                                watchDetials.seasons.length > 0
                                ? watchDetials.seasons.filter(
                                  (item: any) => item?.season_number > 0
                                )
                                : []
                            }
                            optionLabel="name"
                            placeholder={
                              selectedSeason
                                ? "Season" +
                                `\n` +
                                `${selectedSeason === "undefined"
                                  ? "1"
                                  : selectedSeason
                                }`
                                : "Season 1"
                            }
                            className="episodeSelection p-3 px-20"
                          />
                        </>
                      )}
                    </section>
                    <section className="episodeLists bg-neutral-950 max-h-[500px] overflow-auto">
                      <ul className="text-white/50">
                        {mediaType === "movie" ? (
                          <>
                            <li className="episodeActive">
                              <div className="text-[14px] py-3 px-4 block cursor-pointer">
                                Movie 1
                              </div>
                              <span>
                                {moment(watchDetials?.release_date).format(
                                  "MMM DD, YYYY"
                                )}
                              </span>
                            </li>
                          </>
                        ) : (
                          <>
                            {episodesList &&
                              episodesList.episodes &&
                              episodesList.episodes.length > 0
                              ? episodesList.episodes.map((item: any) => (
                                <>
                                  <li key={item?.episode_number}>
                                    <div
                                      className={`text-[14px] py-3 px-4 block cursor-pointer ${selectedEpisode === undefined
                                        ? item?.episode_number === 1
                                          ? "episodeActive"
                                          : ""
                                        : item?.episode_number ===
                                          selectedEpisode
                                          ? "episodeActive"
                                          : ""
                                        }`}
                                      onClick={() => {
                                        setSelectedEpisode(
                                          item?.episode_number
                                        );
                                        // if (selectedPlayer === "vidsrc.dev") {
                                        if (selectedPlayer === "videasy.net") {
                                          const mediaId = watchDetials.id
                                            ? watchDetials.id
                                            : watchDetials.imdb_id;
                                          if (
                                            userId &&
                                            mediaId &&
                                            mediaType
                                          ) {
                                            mutation.mutate({
                                              user_id: Number(userId),
                                              media_id: mediaId.toString(),
                                              media_type: mediaType,
                                              progress_time: "12",
                                              season_id:
                                                mediaType == "tv"
                                                  ? selectedSeason?.season_number
                                                    ? selectedSeason?.season_number
                                                    : selectedSeason
                                                  : "",
                                              episode_id:
                                                mediaType === "tv"
                                                  ? item.episode_number
                                                  : "",
                                              status: true,
                                            });
                                          }
                                        }
                                      }}
                                    >
                                      Episode {item?.episode_number}:{" "}
                                      {item?.name}
                                    </div>
                                    <span>
                                      {moment(item?.air_date).format(
                                        "DD/MM/YYYY"
                                      )}
                                    </span>
                                  </li>
                                </>
                              ))
                              : ""}
                          </>
                        )}
                      </ul>
                    </section>
                    <section className="flex text-white gap-5 justify-between items-center p-2 px-4">
                      {mediaType === "movie" ? (
                        <></>
                      ) : (
                        <>
                          <label>Go to episode</label>
                          <div className="nextPrev flex gap-3 items-center text-white/50">
                            <input
                              type="text"
                              value={goToEpisode}
                              className="w-[50px] text-center rounded text-white bg-white/10 py-1"
                              placeholder="1"
                              onChange={(e) => handleChange(e)}
                            />
                            <IoIosArrowRoundForward
                              className="w-8 h-8 text-amber-500 cursor-pointer"
                              onClick={handleJumpToEpisode}
                            />
                          </div>
                        </>
                      )}
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ):
      (<p className="text-red-700 absolute font-semibold top-1/2 left-1/2 z-50">
        watchDetials is undefined
      </p>)}
      <div className="w-full">
        <div className="w-full mt-20">
          <div className="homewrapper">
            <div className="containerHub flex gap-5 flex-col lg:flex-row">
              <div className="w-full">
                <div className="w-full">
                  <div className="flex items-center gap-4">
                    <h3 className="text-white text-[25px] font-semibold">
                      RECOMMENDED{" "}
                      {mediaType === "movie" ? "MOVIES" : "TV SHOWS"}
                    </h3>
                  </div>
                  <div className="w-full py-2">
                    <ul className="w-full flex flex-wrap gap-y-5 md:gap-y-10">
                      {popularList && popularList.length > 0
                        ? popularList
                          .slice(0, 24)
                          .map((item: any, index: any) => (
                            <Card
                              index={index}
                              key={item.id}
                              movieId={item.id}
                              mediaType={
                                mediaType === "movie" ? "Movie" : "TV"
                              }
                            />
                          ))
                        : ""}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="min-w-full md:min-w-[376px]">
                <Recommended
                  title={"SIMILAR"}
                  data={
                    similarMovies && similarMovies.length > 0
                      ? similarMovies.slice(0, 10)
                      : []
                  }
                  movieId={movieId}
                  mediaType={mediaType === "movie" ? "Movie" : "TV"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
