"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
import { IoIosArrowRoundForward } from "react-icons/io";
import Recommended from "@components/Recommended";
import "./album-detail.css";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { useSearchParams } from "next/navigation";
import FetchApi from "@lib/FetchApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loader from "@components/core/Loader";
import moment from "moment";
import Card from "@components/core/Card";
import RatingPopUp from "@components/core/RatingPopUp";
import { toasterInfo } from "@components/core/Toaster";
import API from "@lib/Api";
import User from "@lib/User";
import ToastProvider from "@components/core/ToasterProvider";
import useRole from "@hooks/useRole";
import Link from "next/link";
const apiKey =process.env.NEXT_PUBLIC_MDBKEY


// const fetchTopAll = async () => {
//   try {
//     const response = await FetchApi.get('https://api.themoviedb.org/3/trending/all/day?language=en-US');
//     const data = await response.json();

//     const combinedResults = await Promise.all(data.results.map(async (item: any) => {
//       const certificateResponse = await fetch(https://mdblist.com/api/?apikey=${apiKey}&tm=${item.id});
//       const certificateData = await certificateResponse.json();
//       return {
//         ...item,
//         certificate: certificateData.certification ||null
//       };
//     }));
//     return combinedResults;
//   } catch (error) {
//     console.error(error);
//   }
// };
const fetchDetails = async (movieId: number, mediaType: string) => {
  try {
    const response = await FetchApi.get(`https://api.themoviedb.org/3/${mediaType.toLowerCase()}/${movieId}?language=en-US`);
    const data = await response.json();

    let certificate = null;
    let imdbRating = null;
    try {
      const certificateResponse = await fetch(`https://mdblist.com/api/?apikey=${apiKey}&tm=${movieId}&m=${mediaType==='movie' ? 'movie' : 'show'}`);
      const certificateData = await certificateResponse.json();
      certificate = certificateData.certification || null;

      if(certificateData){
        if(certificateData.ratings && certificateData.ratings.length > 0){
          imdbRating = certificateData.ratings.find((rating: any) => rating.source === "imdb").value;
        }
      }
    } catch (certificateError) {
      console.error(`Failed to fetch certificate for movie ID ${movieId}:`, certificateError);
    }

    const combinedResults = {
      ...data,
      certificate,
      imdb_rating: imdbRating,
    };

    return combinedResults;
  } catch (error) {
    console.error('Failed to fetch data from the primary API:', error);
  }
};



const fetchCredits = async (movieId: number, mediaType: string) => {
  try {
    const response = await FetchApi.get(`https://api.themoviedb.org/3/${mediaType.toLowerCase()}/${movieId}/credits?language=en-US`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error)
  }
};

const fetchSimilarLists = async (movieId: number, mediaType: string) => {
  try {
    const response = await FetchApi.get(`https://api.themoviedb.org/3/${mediaType.toLowerCase()}/${movieId}/similar?language=en-US`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(error)
  }
};


const fetchPopularLists = async (mediaType: string) => {
  try {
    const response = await FetchApi.get(`https://api.themoviedb.org/3/${mediaType.toLowerCase()}/popular?language=en-US&page=1`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(error)
  }
};

const fetchEpisodesLists = async (mediaType: string, seriesId: number, season: any) => {
  try {
    if (mediaType === 'movie') {
      return [];
    }
    const response = await FetchApi.get(`https://api.themoviedb.org/3/${mediaType.toLowerCase()}/${seriesId}/season/${season && season.season_number ? season.season_number : 1}}?language=en-US&page=1`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error)
  }
};


interface Season {
  name: string;
  code: string;
}
export default function WatchNow() {
  const [roleLoading, roleData] = useRole();
  const videoRef: any = useRef(null);
  const searchParams = useSearchParams();
  const movieId: any = searchParams.get("id");
  const mediaType: any = searchParams.get("type");
  const [selectedSeason, setSelectedSeason] = useState<any>(null);
  const [selectedEpisode, setSelectedEpisode] = useState<any>(1);
  const [goToEpisode, setGoToEpisode] = useState<any>("");
  const [isAutoplay, setIsAutoplay] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const userId = User.id

  const {
    isLoading,
    error,
    data: watchDetials,
  } = useQuery<any>({
    queryKey: ['watch-detials', movieId, mediaType],
    queryFn: () => fetchDetails(movieId, mediaType),
  });

  const {
    isLoading: isCreditLoading,
    data: creditDetials,
  } = useQuery<any>({
    queryKey: ['credit-detials', movieId, mediaType],
    queryFn: () => fetchCredits(movieId, mediaType),
  });

  const {
    isLoading: isSimilarLoading,
    data: similarMovies,
  } = useQuery<any>({
    queryKey: ['similar-lists', movieId, mediaType],
    queryFn: () => fetchSimilarLists(movieId, mediaType),
  });

  const {
    isLoading: isPopularLoading,
    data: popularList,
  } = useQuery<any>({
    queryKey: ['popular-lists', mediaType],
    queryFn: () => fetchPopularLists(mediaType),
  });

const {
  isLoading: isEpisodeLoading,
  data: episodesList,
} = useQuery<any>({
  queryKey: ['episodes-lists', mediaType,movieId, selectedSeason],
  queryFn: () =>fetchEpisodesLists(mediaType, movieId, selectedSeason),
  enabled: !!(selectedSeason || watchDetials)
});

const mutation = useMutation({
  mutationFn: async (progressData: any) => {

    return await API.post("mediaprogress", progressData);
  },
  onSuccess: (data) => {
    if (data?.message) {

    }
  },
  onError: (error: any) => {

  },
});

  const handleSeasonChange = (e: any) => {
    setSelectedSeason(e.value);
    setSelectedEpisode(1)
  }

  const handleChange = (e: any) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      setGoToEpisode(e.target.value);
    } else {
      setGoToEpisode("");
    }
  };

  const handleJumpToEpisode = () => {
    if (episodesList && episodesList.episodes && episodesList.episodes.length > 0) {
      let noOfEpiosode = Math.max(...episodesList.episodes.map((item: any) => item.episode_number));
      if (Number(goToEpisode) <= noOfEpiosode && Number(goToEpisode) > 0) {
        setSelectedEpisode(Number(goToEpisode));
      }
    }

  }

  const handleOverlayClick = () => {
      setIsPlaying(true);
  };

  useEffect(() => {
    const handleMessage = (event: any) => {
      if (event.origin !== 'https://vidsrc.pro') return;

      try {
        const data = event.data;
        if (data.key === 'player-config') {
          setIsAutoplay(data.data.autoplay);
          setIsPlaying(data.data.autoplay);
        }
      } catch (error) {
        console.error('Error parsing message data:', error);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };

  }, [isAutoplay]);

  useEffect(() => {
    if (isPlaying === true) {
      const mediaId = watchDetials.id ? watchDetials.id : watchDetials.imdb_id;
      if (videoRef.current && userId && mediaId && mediaType) {
        mutation.mutate({
          user_id: Number(userId),
          media_id: mediaId.toString(),
          media_type: mediaType,
          progress_time: "12",
          status: true,
        });
      }
    }
  }, [isPlaying])

  if (isLoading || isPopularLoading || isSimilarLoading || isCreditLoading || isEpisodeLoading || roleLoading) {
    return (
      <div>
        <Loader />
      </div>
    )
  }

  return (
    <div className="w-full">
      {watchDetials && (<>
        <div className="w-full pt-20">
          <section className="relative">
            <img
              className="bgAlbumDetail"
              src={`${watchDetials?.backdrop_path ? `https://image.tmdb.org/t/p/original${watchDetials?.backdrop_path}` : "assets/images/slides/1.jpg"}`}
              // "assets/images/slides/1.jpg"
              alt="Video"
            />
            <div className="w-full h-full absolute top-0 left-0 z-0">
              <div className="homewrapper relative z-10">
                <div className="w-full">

                  {/*------- vidsrc.me ----- */}
                  {/* src={`https://vidsrc.me/embed/${mediaType}?${watchDetials.imdb_id ? "imdb=" + watchDetials.imdb_id : "tmdb=" + watchDetials.id}${mediaType==='tv' && selectedSeason ? '&season=' + (selectedSeason.season_number || 1) : '&season=1'}${mediaType==='tv' && selectedEpisode ? '&episode=' + selectedEpisode : ''}`}  */}

                  {/* --------- vidsrc.to embed link -------- */}
                  <iframe
                    src={`https://vidsrc.pro/embed/${mediaType}/${watchDetials.imdb_id ? watchDetials.imdb_id : watchDetials.id}${mediaType === 'tv' ? selectedSeason ? '/' + (selectedSeason.season_number || 1) : '/1' : ''}${mediaType === 'tv' ? selectedEpisode ? '/' + selectedEpisode : '/1' : ''}`}
                    className="w-full mt-5 rounded-lg videoFrame"
                    title="Vidsrc video player"
                    referrerPolicy="origin"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    ref={videoRef}
                    id="myiframe"
                    // onTimeUpdate={() => handleTimeUpdate(watchDetials.imdb_id ? watchDetials.imdb_id : watchDetials.id)}
                    // onLoad={() => handleTimeUpdate(watchDetials.id ? watchDetials.id : watchDetials.imdb_id)}
                  ></iframe>

                </div>
              </div>
              {(!isAutoplay && !isPlaying) && (
              <div
                   className="absolute top-0 left-0 w-full h-full cursor-pointer z-20 bg-transparent"
                  onClick={handleOverlayClick}
                ></div>
              )}
              <div className="absolute w-full z-0 left-0 bottom-0">
                <img src="/assets/images/slides/shadow.png" alt="shadow" />
              </div>
            </div>
          </section>
        </div>
        <div className="w-full pt-32">
          <div className="homewrapper">
            <div className="w-full flex flex-col lg:flex-row gap-5">
              <div className="w-full flex flex-col md:flex-row gap-5">
                <section className="min-w-[170px] max-w-[170px] md:min-w-[270px] md:max-w-[270px] m-auto md:m-0">
                  <img
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
                          <b className="font-bold">{mediaType === 'movie' ? moment(watchDetials?.release_date).year() : moment(watchDetials?.first_air_date).year()}</b>
                        </li>
                        {/* <li>
                          <label className="rounded-full pbgColor text-black font-bold px-2">
                            HD
                          </label>
                        </li> */}
                        <li>
                          <span className="flex items-center gap-2 pColor font-semibold">
                            <FaStar /> {watchDetials?.imdb_rating ? watchDetials?.imdb_rating?.toFixed(1) : watchDetials?.vote_average?.toFixed(1)}
                          </span>
                        </li>
                        <li>{mediaType === 'movie' ? watchDetials?.runtime + " min" : "EP" + watchDetials?.last_episode_to_air?.episode_number}</li>
                      </ul>
                      <ul className="py-1 flex flex-wrap text-white gap-x-3 font-light items-center">
                        <li className='text-white'>{watchDetials.certificate}</li>
                        {watchDetials.genres && watchDetials.genres.length > 0 ? watchDetials.genres.map((gen: any) => (<li key={gen.id}>{gen.name}</li>)) : ""}


                      </ul>
                    </section>
                    <RatingPopUp />
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
                          <Link href={`/filters?mediaType=${mediaType}`} className="transition hover:text-amber-500">
                            {mediaType.toUpperCase()}
                          </Link>
                      </label>
                      </p>
                      <p>
                        Country:{" "}
                        <label className="text-white font-light">
                        {watchDetials?.production_countries && watchDetials?.production_countries.length > 0 ? watchDetials?.production_countries.map((gen:any, index:number) => (<span key={index}>
                          <Link href={`/filters?mediaType=${mediaType}&country=${gen.iso_3166_1}`} className="transition hover:text-amber-500">
                            {gen.name}
                          </Link>
                         {index < watchDetials.production_countries.length - 1 && ', '}
                        </span>)) : ""}
                      </label>
                      </p>
                      <p>
                      Genre:{" "}
                      <label className="text-white font-light"> 
                        {watchDetials?.genres && watchDetials?.genres.length > 0 ? watchDetials?.genres.map((gen:any, index:number) => (<span key={index}>
                          <Link href={`/filters?mediaType=${mediaType}&genre=${gen.id}`} className="transition hover:text-amber-500">
                            {gen.name}
                          </Link>
                      {index < watchDetials.genres.length - 1 && ', '}
                    </span>)) : ""}
                      </label>
                    </p>
                    <p>
                      Release:{" "}
                      <label className="text-white font-light">
                      {mediaType === 'movie' ? moment(watchDetials?.release_date).format('MMM DD, YYYY') : moment(watchDetials?.first_air_date).format('MMM DD, YYYY')}
                      </label>
                    </p>
                    <p>
                      Director:{" "}
                      <label className="text-white font-light">{creditDetials?.crew && creditDetials?.crew.length > 0 ? creditDetials?.crew.filter((item: any) => item?.job==='Director').map((gen:any) => gen.name).join(", ") : ""}</label>
                    </p>
                    <p>
                      Production:{" "}
                      <label className="text-white font-light">
                        {watchDetials.production_companies && watchDetials.production_companies.length > 0 ? watchDetials.production_companies.map((gen:any) => gen.name).join(", ") : ""}
                      </label>
                    </p>
                    <p>
                      Cast:{" "}
                      <label className="text-white font-light">
                        {creditDetials?.cast && creditDetials?.cast.length > 0 ? creditDetials?.cast.slice(0,5).map((gen:any) => gen.name).join(", ") : ""}
                      </label>
                    </p>
                    <p>
                      Tagline:{" "}
                      <label className="text-white font-light">
                        {watchDetials.tagline ? watchDetials.tagline : "N/A"}
                      </label>
                    </p>
                    </div>
                  </div>
                </section>
              </div>
              <div className="min-w-full md:min-w-[376px]">
                <div className="w-full bg-[#272727] rounded-lg">
                  <section className="episodeSelectionMain flex items-center justify-center text-white">
                    {mediaType === 'movie' ? (
                      <div className="p-3 px-20">
                        Movie Files
                      </div>) : (
                      <>
                        <Dropdown
                          value={selectedSeason}
                          onChange={(e: DropdownChangeEvent) =>
                            handleSeasonChange(e)
                          }
                          options={watchDetials.seasons && watchDetials.seasons.length > 0 ? watchDetials.seasons.filter((item: any) => item?.season_number > 0) : []}
                          optionLabel="name"
                          placeholder="Season 1"
                          className="episodeSelection p-3 px-20"
                        />
                      </>)}

                  </section>
                  <section className="episodeLists bg-neutral-950 max-h-[500px] overflow-auto">
                    <ul className="text-white/50">
                      {mediaType === 'movie' ? (
                        <>
                          <li className="episodeActive">
                            <div className="text-[14px] py-3 px-4 block cursor-pointer">
                              Movie 1
                            </div>
                            <span>{moment(watchDetials?.release_date).format('MMM DD, YYYY')}</span>
                          </li>
                        </>) :
                        (
                          <>
                            {episodesList && episodesList.episodes && episodesList.episodes.length > 0 ? episodesList.episodes.map((item: any) => (<>
                              <li key={item?.episode_number}>
                                <div className={`text-[14px] py-3 px-4 block ${item?.episode_number === selectedEpisode ? 'episodeActive' : ""}`} onClick={() => setSelectedEpisode(item?.episode_number)}>
                                  Episode {item?.episode_number}: {item?.name}
                                </div>
                                <span>{moment(item?.air_date).format("DD/MM/YYYY")}</span>
                              </li>
                            </>)) : ""}
                          </>
                        )}
                    </ul>
                  </section>
                  <section className="flex text-white gap-5 justify-between items-center p-2 px-4">
                    {
                      mediaType === 'movie' ? (<>
                      </>) : (<>
                        <label>Go to episode</label>
                        <div className="nextPrev flex gap-3 items-center text-white/50">
                          <input type="text" value={goToEpisode} className="w-[50px] text-center rounded text-white bg-white/10 py-1" placeholder="1" onChange={(e) => handleChange(e)} />
                          <IoIosArrowRoundForward className="w-8 h-8 text-amber-500 cursor-pointer" onClick={handleJumpToEpisode} />
                        </div>
                      </>)
                    }

                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>)}
      <div className="w-full">
        <div className="w-full mt-20">
          <div className="homewrapper">
            <div className="containerHub flex gap-5 flex-col lg:flex-row">
              <div className="w-full">
                <div className="w-full">
                  <div className="flex items-center gap-4">
                    <h3 className="text-white text-[25px] font-semibold">
                      RECOMMENDED {mediaType === 'movie' ? 'MOVIES' : 'TV SHOWS'}
                    </h3>
                  </div>
                  <div className="w-full py-2">
                    <ul className="w-full flex flex-wrap gap-y-5 md:gap-y-10">
                      {
                        popularList && popularList.length > 0 ? popularList.slice(0, 18).map((item: any) => (<Card key={item.id} movieId={item.id} mediaType={mediaType === 'movie' ? 'Movie' : 'TV'} />)) : ""
                      }
                    </ul>
                  </div>
                </div>
              </div>
              <div className="min-w-full md:min-w-[376px]">
                <Recommended title={"SIMILAR"} data={similarMovies && similarMovies.length > 0 ? similarMovies.slice(0, 10) : []} movieId={movieId} mediaType={mediaType === 'movie' ? 'Movie' : 'TV'} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
