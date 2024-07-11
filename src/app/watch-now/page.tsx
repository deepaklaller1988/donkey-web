"use client";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";
import Recommended from "@components/Recommended";
import "./album-detail.css";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { useSearchParams } from "next/navigation";
import FetchApi from "@lib/FetchApi";
import { useQuery } from "@tanstack/react-query";
import Loader from "@components/core/Loader";
import moment from "moment";
import Card from "@components/core/Card";
import RatingPopUp from "@components/core/RatingPopUp";

const fetchDetails = async (movieId: number, mediaType:string) => {
    try {
      const response = await FetchApi.get(`https://api.themoviedb.org/3/${mediaType.toLowerCase()}/${movieId}?language=en-US`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error)
    }
  };

const fetchCredits = async (movieId: number, mediaType:string) => {
try {
    const response = await FetchApi.get(`https://api.themoviedb.org/3/${mediaType.toLowerCase()}/${movieId}/credits?language=en-US`);
    const data = await response.json();
    return data;
} catch (error) {
    console.log(error)
}
};

const fetchSimilarLists = async (movieId: number, mediaType:string) => {
    try {
        const response = await FetchApi.get(`https://api.themoviedb.org/3/${mediaType.toLowerCase()}/${movieId}/similar?language=en-US`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.log(error)
    }
    };


const fetchPopularLists = async (mediaType:string) => {
    try {
        const response = await FetchApi.get(`https://api.themoviedb.org/3/${mediaType.toLowerCase()}/popular?language=en-US&page=1`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.log(error)
    }
    };
    

  
interface Season {
  name: string;
  code: string;
}
export default function WatchNow() {
    const searchParams = useSearchParams();
    const movieId: any = searchParams.get("id");
    const mediaType: any = searchParams.get("type");
  const [selectedSeason, setSelectedSeason] = useState<Season | null>(null);
  const {
    isLoading,
    error,
    data: watchDetials,
} = useQuery<any>({
    queryKey: ['watch-detials', movieId, mediaType],
    queryFn: () =>fetchDetails(movieId, mediaType),
});

const {
    data: creditDetials,
} = useQuery<any>({
    queryKey: ['credit-detials', movieId, mediaType],
    queryFn: () =>fetchCredits(movieId, mediaType),
});

const {
    data: similarMovies,
} = useQuery<any>({
    queryKey: ['similar-lists', movieId, mediaType],
    queryFn: () =>fetchSimilarLists(movieId, mediaType),
});

const {
    data: popularList,
} = useQuery<any>({
    queryKey: ['popular-lists', mediaType],
    queryFn: () =>fetchPopularLists(mediaType),
});
  
  
   
  const seasons: Season[] = [
    { name: "Season 1", code: "1" },
    { name: "Season 2", code: "2" },
    { name: "Season 3", code: "3" },
    { name: "Season 4", code: "4" },
    { name: "Season 5", code: "5" },
  ];

  if(isLoading){
    return(<>
    <Loader /></>)
  }

  return (
    <div className="w-full">
        {watchDetials && (<>
            <div className="w-full pt-20">
        <section className="relative">
          <img
            className="bgAlbumDetail"
            src={`${watchDetials?.backdrop_path ? `https://image.tmdb.org/t/p/original${watchDetials?.backdrop_path}` : "assets/images/slides/1.jpg" }`}
            // "assets/images/slides/1.jpg"
            alt="Video"
          />
          <div className="w-full h-full absolute top-0 left-0">
            <div className="homewrapper relative z-10">
              <div className="w-full">
                {/* <iframe
                  className="w-full h-[700px] mt-5 rounded-lg"
                  src="https://www.youtube.com/embed/a12DMAs5U_c?si=PF8d0y9qS_63Qvss"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe> */}
                <iframe 
                    src={`https://vidsrc.me/embed/${mediaType}?${watchDetials.imdb_id ? "imdb=" + watchDetials.imdb_id : "tmdb=" + watchDetials.id}`} 
                    // style="width: 100%; height: 100%;" 
                    className="w-full h-[700px] mt-5 rounded-lg"
                    title="Vidsrc video player"
                    frameBorder="0" 
                    referrerPolicy="origin" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen>
                    </iframe>
              </div>
            </div>
            <div className="absolute w-full z-0 left-0 bottom-0">
              <img src="/assets/images/slides/shadow.png" alt="shadow" />
            </div>
          </div>
        </section>
      </div> 
      <div className="w-full">
        <div className="homewrapper">
          <div className="w-full flex gap-5">
            <div className="w-full flex gap-5">
              <section className="min-w-[270px] max-w-[270px]">
                <img
                  className="w-full rounded-lg"
                  src={`https://image.tmdb.org/t/p/original${watchDetials?.poster_path}`}
                  alt="album"
                />
              </section>
              <section>
                <div className="w-full flex gap-5 justify-between">
                  <section>
                    <h3 className="text-white text-[25px] font-semibold">
                      {watchDetials?.title || watchDetials?.name}
                    </h3>
                    <ul className="py-1 flex flex-wrap text-white gap-4 font-light">
                      <li>
                        <b className="font-bold">{mediaType === 'movie' ? moment(watchDetials?.release_date).year() : moment(watchDetials?.first_air_date).year()}</b>
                      </li>
                      <li>{mediaType === 'movie' ? watchDetials?.runtime + " min" : "EP" + watchDetials?.last_episode_to_air?.episode_number}</li>
                      {watchDetials.genres && watchDetials.genres.length > 0 ? watchDetials.genres.map((gen:any) => (<li key={gen.id}>{gen.name}</li>)) : ""}
                      <li>
                        <span className="flex items-center gap-2 pColor font-semibold">
                          <FaStar /> {watchDetials?.vote_average?.toFixed(1)}
                        </span>
                      </li>
                      <li>
                        <label className="rounded-full pbgColor text-black font-bold px-2">
                          HD
                        </label>
                      </li>
                    </ul>
                  </section>
                  {/* <section className="bg-white/10 rounded-lg text-center p-2 px-4 flex flex-col justify-center items-center gap-2">
                    <span className="flex gap-1">
                      <FaStar className="text-amber-500 w-5 h-5" />
                      <FaStar className="text-amber-500 w-5 h-5" />
                      <FaStar className="text-amber-500 w-5 h-5" />
                      <FaStar className="text-amber-500 w-5 h-5" />
                      <FaStar className="text-white/20 w-5 h-5" />
                    </span>
                    <p className="text-white/50 text-sm">
                      <b className="text-sm">8.56</b> of{" "}
                      <b className="text-sm">10</b> (723 reviews)
                    </p>
                  </section> */}
                  <RatingPopUp/>
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
                        <a href="" className="transition hover:text-amber-500">
                          {mediaType.toUpperCase()}
                        </a>
                      </label>
                    </p>
                    <p>
                      Country:{" "}
                      <label className="text-white font-light">
                        <a href="" className="transition hover:text-amber-500">
                        {watchDetials?.production_countries && watchDetials?.production_countries.length > 0 ? watchDetials?.production_countries.map((gen:any) => gen.name).join(", ") : ""}
                        </a>
                        {/* ,
                        <a href="" className="transition hover:text-amber-500">
                          Spain
                        </a> */}
                      </label>
                    </p>
                    <p>
                      Genre:{" "}
                      <label className="text-white font-light">
                        <a href="" className="transition hover:text-amber-500">
                        {watchDetials?.genres && watchDetials?.genres.length > 0 ? watchDetials?.genres.map((gen:any) => gen.name).join(", ") : ""}
                        </a>
                        {/* ,{" "}
                        <a href="" className="transition hover:text-amber-500">
                          Comedy
                        </a> */}
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
                        <a href="" className="transition hover:text-amber-500">
                        {watchDetials.production_companies && watchDetials.production_companies.length > 0 ? watchDetials.production_companies.map((gen:any) => gen.name).join(", ") : ""}
                        </a>
                      </label>
                    </p>
                    <p>
                      Cast:{" "}
                      <label className="text-white font-light">
                        <a href="" className="transition hover:text-amber-500">
                        {creditDetials?.cast && creditDetials?.cast.length > 0 ? creditDetials?.cast.slice(0,5).map((gen:any) => gen.name).join(", ") : ""}
                        </a>
                      </label>
                    </p>
                    <p>
                      Tagline:{" "}
                      <label className="text-white font-light">
                        <a href="" className="transition hover:text-amber-500">
                        {watchDetials.tagline ? watchDetials.tagline : "N/A"}
                        </a>
                      </label>
                    </p>
                    {/* <p className="text-white/50 font-light pt-2">
                      A group of high-end professional thieves start to feel the
                      heat from the LAPD when they unknowingly leave a verbal
                      clue at their latest heist. Ccraig of the creek online tv
                      download, watch craig of the creek online, craig of the
                      creek watch online, craig of the creek free download,
                      craig of the creek online streaming, craig of the creek
                      download free
                    </p> */}
                  </div>
                </div>
              </section>
            </div>
            <div className="min-w-full md:min-w-[376px]">
              <div className="w-full bg-white/10 rounded-lg">
                <section className="episodeSelectionMain flex items-center justify-center text-white">
                  <Dropdown
                    value={selectedSeason}
                    onChange={(e: DropdownChangeEvent) =>
                      setSelectedSeason(e.value)
                    }
                    options={seasons}
                    optionLabel="name"
                    placeholder="Season 1"
                    className="episodeSelection p-3 px-20"
                  />
                </section>
                <section className="episodeLists bg-neutral-950 max-h-[500px] overflow-auto">
                  <ul className="text-white/50">
                    <li>
                      <a className="text-[14px] py-3 px-4 block" href="">
                        Episode 1: Itch To Explore
                      </a>
                      <span>12/04/2024</span>
                    </li>
                    <li>
                      <a className="text-[14px] py-3 px-4 block" href="">
                        Episode 2: You're It
                      </a>
                      <span>12/04/2024</span>
                    </li>
                    <li className="episodeActive">
                      <a className="text-[14px] py-3 px-4 block" href="">
                        Episode 3: Jessica Goes to the Creek
                      </a>
                      <span>12/04/2024</span>
                    </li>
                    <li>
                      <a className="text-[14px] py-3 px-4 block" href="">
                        Episode 4: The Final Book
                      </a>
                      <span>12/04/2024</span>
                    </li>
                    <li>
                      <a className="text-[14px] py-3 px-4 block" href="">
                        Episode 5: Too Many Treasures
                      </a>
                      <span>12/04/2024</span>
                    </li>
                    <li>
                      <a className="text-[14px] py-3 px-4 block" href="">
                        Episode 6: Wildernessa
                      </a>
                      <span>12/04/2024</span>
                    </li>
                    <li>
                      <a className="text-[14px] py-3 px-4 block" href="">
                        Episode 7: Sunday Clothes
                      </a>
                      <span>12/04/2024</span>
                    </li>
                    <li>
                      <a className="text-[14px] py-3 px-4 block" href="">
                        Episode 1: Itch To Explore
                      </a>
                      <span>12/04/2024</span>
                    </li>
                    <li>
                      <a className="text-[14px] py-3 px-4 block" href="">
                        Episode 2: You're It
                      </a>
                      <span>12/04/2024</span>
                    </li>
                    <li>
                      <a className="text-[14px] py-3 px-4 block" href="">
                        Episode 3: Jessica Goes to the Creek
                      </a>
                      <span>12/04/2024</span>
                    </li>
                    <li>
                      <a className="text-[14px] py-3 px-4 block" href="">
                        Episode 4: The Final Book
                      </a>
                      <span>12/04/2024</span>
                    </li>
                    <li>
                      <a className="text-[14px] py-3 px-4 block" href="">
                        Episode 5: Too Many Treasures
                      </a>
                      <span>12/04/2024</span>
                    </li>
                    <li>
                      <a className="text-[14px] py-3 px-4 block" href="">
                        Episode 6: Wildernessa
                      </a>
                      <span>12/04/2024</span>
                    </li>
                    <li>
                      <a className="text-[14px] py-3 px-4 block" href="">
                        Episode 7: Sunday Clothes
                      </a>
                      <span>12/04/2024</span>
                    </li>
                  </ul>
                </section>
                <section className="flex text-white gap-5 justify-between items-center p-2 px-4">
                  <label>Go to episode</label>
                  <div className="nextPrev flex gap-3 items-center text-white/50">
                    <a href="">
                      <IoIosArrowRoundBack className="w-8 h-8" />
                    </a>
                    <a href="">1</a>
                    <a href="">2</a>
                    <a href="">
                      <IoIosArrowRoundForward className="w-8 h-8 text-amber-500" />
                    </a>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>)}
      <div className="w-full">
        {/* <div className="bg-white/10 h-[80px]"><Header /></div> */}
        <div className="w-full mt-20">
          <div className="homewrapper">
          <div className="containerHub flex gap-5 flex-col lg:flex-row">
              <div className="w-full">
                <div className="w-full">
                  <div className="flex items-center gap-4">
                    <h3 className="text-white text-[25px] font-semibold">
                      RECOMMENDED MOVIES
                    </h3>
                  </div>
                  <div className="w-full py-2">
                  <ul className="w-full flex flex-wrap gap-y-5 md:gap-y-10">
                        {
                            popularList && popularList.length > 0 ? popularList.map((item: any) =>(<Card movieId={item.id} mediaType={mediaType === 'movie' ? 'Movie' : 'TV'} />)) : ""
                        } 
                    </ul>
                  </div>
                </div>
              </div>
              <div className="min-w-full md:min-w-[376px]">
                <Recommended title={"SIMILAR"} data={similarMovies && similarMovies.length > 0 ? similarMovies.slice(0,10) : []} movieId={movieId} mediaType={mediaType === 'movie' ? 'Movie' : 'TV'} />
              </div>
            </div>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </div>
  );
}
