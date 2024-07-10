"use client"
import { FaPlayCircle } from "react-icons/fa";
import { FaRegCirclePlay } from "react-icons/fa6";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import Sidebar from "@components/Sidebar";
import Filters from "@components/Filters";
import FetchApi from "@lib/FetchApi";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Card from "@components/core/Card";

const fetchFilteredData = async (selectedOptions: any) => {
    try {
        const response = await FetchApi.get(`https://api.themoviedb.org/3/discover/${selectedOptions.selectedMedia}?include_adult=false&include_video=false&language=en-US&page=1&sort_by=${selectedOptions.selectedFilter}&${selectedOptions.selectedMedia === 'movie' ? "primary_release_year=" + selectedOptions.selectedYear : "first_air_date_year=" + selectedOptions.selectedYear}&with_origin_country=${selectedOptions.selectedCountry}&with_genres=${selectedOptions.selectedGenres}`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.log(error)
    }
    };

export default function FiltersPage() {
    const [selectedOptions, setSelectedOptions] =  useState<any>({
        selectedMedia: "movie",
        selectedYear:"",
        selectedCountry:"",
        selectedGenres:"",
        selectedFilter:"popularity.desc"
    })

    const {
        isLoading,
        error,
        data: filteredData,
    } = useQuery<any>({
        queryKey: ['filtered-data', selectedOptions.selectedMedia, selectedOptions.selectedYear, selectedOptions.selectedCountry, selectedOptions.selectedGenres,selectedOptions.selectedFilter],
        queryFn: () =>fetchFilteredData(selectedOptions),
        enabled: !!selectedOptions,
    });

    const handleFilters = (selectedOptions: any) =>{
        setSelectedOptions({
            selectedMedia: selectedOptions.selectedType,
            selectedYear:selectedOptions.selectedYear,
            selectedCountry:selectedOptions.selectedCountry,
            selectedGenres:selectedOptions.selectedGenre,
            selectedFilter:selectedOptions.selectedFilter  
        })
    }

    console.log(filteredData)

    return (
        <div className="w-full">
            <div className="w-full">
                {/* <div className="bg-white/10 h-[80px]"><Header /></div> */}
                <div className="w-full mt-40">
                    <div className="homewrapper">
                        <div className="containerHub flex gap-5">
                            <div className="w-full">
                                <div className="w-full">
                                    <div className="flex items-center gap-4">
                                        <h3 className="text-white text-[25px] font-semibold">FILTER</h3>
                                    </div>
                                <Filters handleFilters={handleFilters} />
                                    <div className="w-full py-2">
                                    <ul className="w-full flex flex-wrap gap-y-5 md:gap-y-10">
                                            {
                                                filteredData && filteredData.length > 0 ? filteredData.map((item: any) =>(<Card movieId={item.id} mediaType={selectedOptions.selectedMedia === 'movie' ? 'Movie' : 'TV'} />)) : ""
                                            } 
                                        </ul>
                                                            {/* <ul className="w-full flex flex-wrap gap-y-10">

                                            <li className="w-1/5 cardSet relative">
                                                <a href="/album-detail"><span className="relative">
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
                                                </a>
                                                <div className="albumDetail absolute bg-zinc-800 rounded-xl top-20 left-full z-50 w-[350px]">
                                                    <div className="w-full p-5 relative">
                                                        <section className="pr-12">
                                                            <h2 className="text-white text-lg">Presumed Innocent</h2>
                                                            <ul className='py-1 flex items-center text-white gap-4 font-light'>
                                                                <li><b className='font-bold text-sm'>2024</b></li>
                                                                <li className=" text-sm">102min</li>
                                                                <li><label className='flex items-center gap-2 text-white text-sm font-semibold'><FaStar /> 4.4</label></li>
                                                                <li><label className=' text-sm rounded-full pbgColor text-black font-bold px-2'>HD</label></li>
                                                            </ul>
                                                        </section>
                                                        <label className="absolute right-5 top-1/2">
                                                            <IoIosAddCircleOutline className="text-white w-6 h-6 -mt-3" />
                                                        </label>
                                                    </div>
                                                    <div className="w-full p-5 border-t border-1 border-white/5 text-white/50">
                                                        <p>Country: <label className="text-white font-light">United States</label></p>
                                                        <p>Genre: <label className="text-white font-light">United States</label></p>
                                                        <p>Scores: <label className="text-white font-light">8.38 by 740 reviews</label></p>
                                                        <p className='text-white/50 font-light pt-2'>A group of high-end professional thieves start to feel the heat from the LAPD when they unknowingly leave a verbal clue at their latest heist.</p>
                                                        <button className='text-black flex items-center gap-2 pbgColor px-6 py-2 rounded-full transition m-auto mt-4 mb-2'>Watch Now <FaRegCirclePlay className='text-xl' /></button>
                                                    </div>
                                                </div>
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
                                        </ul> */}
                                    </div>
                                </div>
                            </div>
                            <div className="min-w-full md:min-w-[376px]">
                                {/* <Sidebar /> */}
                            </div>
                        </div>
                    </div>
                </div>
                {/* <Footer /> */}
            </div>
        </div>
    )
}