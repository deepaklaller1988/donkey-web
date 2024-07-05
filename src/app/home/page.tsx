"use client";
import "./home.css";
import { FaPlayCircle } from "react-icons/fa";
import { FaRegCirclePlay } from "react-icons/fa6";
import { IoIosAddCircleOutline } from "react-icons/io";

import {useQuery, useQueries} from '@tanstack/react-query';
import { FaStar } from "react-icons/fa";
import Header from "@components/core/HomeHeader";
import HomeSlider from "@components/HomeSlider";
import Sidebar from "@components/Sidebar";
import Footer from "@components/core/Footer";
import Card from "@components/core/Card";
import FetchApi from "@lib/FetchApi";
import { useState } from "react";

const fetchPopularLists = async (mediaType: string) => {
    try {
      const response = await FetchApi.get(`https://api.themoviedb.org/3/${mediaType.toLowerCase()}/top_rated?language=en-US&page=1`);
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.log(error)
    }
  };


  const fetchLatestList = async (mediaType: string) => {
    try {
      const response = await FetchApi.get(`https://vidsrc.to/vapi/tv/new/1`);
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.log(error)
    }
  };

export default function Home() {
    const [selectedMedia, setSelectedMedia] = useState<string>("Movie");
    const {
        isLoading,
        error,
        data: popularList,
    } = useQuery({
        queryKey: ['popular', selectedMedia],
        queryFn: () => fetchPopularLists(selectedMedia),
    });

    console.log(popularList)


    return (
        <div className="w-full">
            <HomeSlider />
            <div className="w-full">
                <div className="homewrapper">
                    <div className="containerHub flex gap-5">
                        <div className="w-full">
                            <div className="w-full">
                                <div className="flex items-center gap-4">
                                    <h3 className="text-white text-[35px] font-semibold">POPULAR</h3>
                                    <section className="flex gap-2">
                                        <button className={`${selectedMedia === 'Movie' ? "pbgColor rounded-full text-black px-2" : "border border-1 rounded-full text-white px-2 hover:bg-white hover:text-black transition" }`} onClick={()=> setSelectedMedia("Movie")}>Movies</button>
                                        <button className={`${selectedMedia === 'TV' ? "pbgColor rounded-full text-black px-2" : "border border-1 rounded-full text-white px-2 hover:bg-white hover:text-black transition" }`} onClick={()=> setSelectedMedia("TV")}>TV Shows</button>
                                    </section>
                                </div>
                                <div className="w-full py-2">
                                    <ul className="w-full flex flex-wrap gap-y-10">
                                        {
                                           popularList && popularList.length > 0 ? popularList.map((item: any) =>(<Card movieId={item.id} mediaType={selectedMedia} />)) : ""
                                        } 
                                    </ul>
                                </div>
                            </div>
                            <div className="w-full pt-10">
                                <div className="flex items-center gap-4">
                                    <h3 className="text-white text-[35px] font-semibold">LATEST MOVIES</h3>
                                </div>
                                <div className="w-full py-2">
                                    <ul className="w-full flex flex-wrap gap-y-10">

                                        <li className="w-1/5 cardSet">
                                            <span className="relative">
                                                <FaPlayCircle className="opacity-0 transition absolute text-black -mt-5 top-1/2 text-[35px] -ml-5 left-1/2" />
                                                <img className="rounded-xl w-full" src="/assets/images/album1.jpg" alt="album" /><label className="absolute z-10 pbgColor top-5 left-0 font-bold px-2 rounded-r-xl">HD</label></span>
                                            <section className="py-2">
                                                <b className="text-white font-semibold">Faraway Downs 100</b>
                                                <ul className="text-gray-500 flex gap-2">
                                                    <li className="text-sm">TV</li>.
                                                    <li className="text-sm">EP1</li>.
                                                    <li className="text-sm">SS1</li>
                                                </ul>
                                            </section>
                                        </li>
                                        <li className="w-1/5 cardSet">
                                            <span className="relative">
                                                <FaPlayCircle className="opacity-0 transition absolute text-black -mt-5 top-1/2 text-[35px] -ml-5 left-1/2" />
                                                <img className="rounded-xl w-full" src="/assets/images/album1.jpg" alt="album" /><label className="absolute z-10 pbgColor top-5 left-0 font-bold px-2 rounded-r-xl">HD</label></span>
                                            <section className="py-2">
                                                <b className="text-white font-semibold">Faraway Downs 100</b>
                                                <ul className="text-gray-500 flex gap-2">
                                                    <li className="text-sm">TV</li>.
                                                    <li className="text-sm">EP1</li>.
                                                    <li className="text-sm">SS1</li>
                                                </ul>
                                            </section>
                                        </li>
                                        <li className="w-1/5 cardSet">
                                            <span className="relative">
                                                <FaPlayCircle className="opacity-0 transition absolute text-black -mt-5 top-1/2 text-[35px] -ml-5 left-1/2" />
                                                <img className="rounded-xl w-full" src="/assets/images/album1.jpg" alt="album" /><label className="absolute z-10 pbgColor top-5 left-0 font-bold px-2 rounded-r-xl">HD</label></span>
                                            <section className="py-2">
                                                <b className="text-white font-semibold">Faraway Downs 100</b>
                                                <ul className="text-gray-500 flex gap-2">
                                                    <li className="text-sm">TV</li>.
                                                    <li className="text-sm">EP1</li>.
                                                    <li className="text-sm">SS1</li>
                                                </ul>
                                            </section>
                                        </li>
                                        <li className="w-1/5 cardSet">
                                            <span className="relative">
                                                <FaPlayCircle className="opacity-0 transition absolute text-black -mt-5 top-1/2 text-[35px] -ml-5 left-1/2" />
                                                <img className="rounded-xl w-full" src="/assets/images/album1.jpg" alt="album" /><label className="absolute z-10 pbgColor top-5 left-0 font-bold px-2 rounded-r-xl">HD</label></span>
                                            <section className="py-2">
                                                <b className="text-white font-semibold">Faraway Downs 100</b>
                                                <ul className="text-gray-500 flex gap-2">
                                                    <li className="text-sm">TV</li>.
                                                    <li className="text-sm">EP1</li>.
                                                    <li className="text-sm">SS1</li>
                                                </ul>
                                            </section>
                                        </li>
                                        <li className="w-1/5 cardSet">
                                            <span className="relative">
                                                <FaPlayCircle className="opacity-0 transition absolute text-black -mt-5 top-1/2 text-[35px] -ml-5 left-1/2" />
                                                <img className="rounded-xl w-full" src="/assets/images/album1.jpg" alt="album" /><label className="absolute z-10 pbgColor top-5 left-0 font-bold px-2 rounded-r-xl">HD</label></span>
                                            <section className="py-2">
                                                <b className="text-white font-semibold">Faraway Downs 100</b>
                                                <ul className="text-gray-500 flex gap-2">
                                                    <li className="text-sm">TV</li>.
                                                    <li className="text-sm">EP1</li>.
                                                    <li className="text-sm">SS1</li>
                                                </ul>
                                            </section>
                                        </li>
                                    </ul>
                                </div>

                                <section className="flex justify-center pt-10">
                                    <button className="border border-1 rounded-full text-white px-2 hover:bg-white hover:text-black transition">View More</button>
                                </section>
                            </div>
                            <div className="w-full pt-10">
                                <div className="flex items-center gap-4">
                                    <h3 className="text-white text-[35px] font-semibold">LATEST TV SHOWS</h3>
                                </div>
                                <div className="w-full py-2">
                                    <ul className="w-full flex flex-wrap gap-y-10">

                                        <li className="w-1/5 cardSet">
                                            <span className="relative">
                                                <FaPlayCircle className="opacity-0 transition absolute text-black -mt-5 top-1/2 text-[35px] -ml-5 left-1/2" />
                                                <img className="rounded-xl w-full" src="/assets/images/album1.jpg" alt="album" /><label className="absolute z-10 pbgColor top-5 left-0 font-bold px-2 rounded-r-xl">HD</label></span>
                                            <section className="py-2">
                                                <b className="text-white font-semibold">Faraway Downs 100</b>
                                                <ul className="text-gray-500 flex gap-2">
                                                    <li className="text-sm">TV</li>.
                                                    <li className="text-sm">EP1</li>.
                                                    <li className="text-sm">SS1</li>
                                                </ul>
                                            </section>
                                        </li>
                                        <li className="w-1/5 cardSet">
                                            <span className="relative">
                                                <FaPlayCircle className="opacity-0 transition absolute text-black -mt-5 top-1/2 text-[35px] -ml-5 left-1/2" />
                                                <img className="rounded-xl w-full" src="/assets/images/album1.jpg" alt="album" /><label className="absolute z-10 pbgColor top-5 left-0 font-bold px-2 rounded-r-xl">HD</label></span>
                                            <section className="py-2">
                                                <b className="text-white font-semibold">Faraway Downs 100</b>
                                                <ul className="text-gray-500 flex gap-2">
                                                    <li className="text-sm">TV</li>.
                                                    <li className="text-sm">EP1</li>.
                                                    <li className="text-sm">SS1</li>
                                                </ul>
                                            </section>
                                        </li>
                                        <li className="w-1/5 cardSet">
                                            <span className="relative">
                                                <FaPlayCircle className="opacity-0 transition absolute text-black -mt-5 top-1/2 text-[35px] -ml-5 left-1/2" />
                                                <img className="rounded-xl w-full" src="/assets/images/album1.jpg" alt="album" /><label className="absolute z-10 pbgColor top-5 left-0 font-bold px-2 rounded-r-xl">HD</label></span>
                                            <section className="py-2">
                                                <b className="text-white font-semibold">Faraway Downs 100</b>
                                                <ul className="text-gray-500 flex gap-2">
                                                    <li className="text-sm">TV</li>.
                                                    <li className="text-sm">EP1</li>.
                                                    <li className="text-sm">SS1</li>
                                                </ul>
                                            </section>
                                        </li>
                                        <li className="w-1/5 cardSet">
                                            <span className="relative">
                                                <FaPlayCircle className="opacity-0 transition absolute text-black -mt-5 top-1/2 text-[35px] -ml-5 left-1/2" />
                                                <img className="rounded-xl w-full" src="/assets/images/album1.jpg" alt="album" /><label className="absolute z-10 pbgColor top-5 left-0 font-bold px-2 rounded-r-xl">HD</label></span>
                                            <section className="py-2">
                                                <b className="text-white font-semibold">Faraway Downs 100</b>
                                                <ul className="text-gray-500 flex gap-2">
                                                    <li className="text-sm">TV</li>.
                                                    <li className="text-sm">EP1</li>.
                                                    <li className="text-sm">SS1</li>
                                                </ul>
                                            </section>
                                        </li>
                                        <li className="w-1/5 cardSet">
                                            <span className="relative">
                                                <FaPlayCircle className="opacity-0 transition absolute text-black -mt-5 top-1/2 text-[35px] -ml-5 left-1/2" />
                                                <img className="rounded-xl w-full" src="/assets/images/album1.jpg" alt="album" /><label className="absolute z-10 pbgColor top-5 left-0 font-bold px-2 rounded-r-xl">HD</label></span>
                                            <section className="py-2">
                                                <b className="text-white font-semibold">Faraway Downs 100</b>
                                                <ul className="text-gray-500 flex gap-2">
                                                    <li className="text-sm">TV</li>.
                                                    <li className="text-sm">EP1</li>.
                                                    <li className="text-sm">SS1</li>
                                                </ul>
                                            </section>
                                        </li>
                                    </ul>
                                </div>

                                <section className="flex justify-center pt-10">
                                    <button className="border border-1 rounded-full text-white px-2 hover:bg-white hover:text-black transition">View More</button>
                                </section>
                            </div>
                        </div>
                        <div className="min-w-[376px]">
                            <Sidebar />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}