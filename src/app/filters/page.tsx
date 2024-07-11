"use client"
import { FaPlayCircle } from "react-icons/fa";
import { FaRegCirclePlay } from "react-icons/fa6";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import Sidebar from "@components/Sidebar";
import Filters from "@components/Filters";
import FetchApi from "@lib/FetchApi";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Card from "@components/core/Card";
import Recommended from "@components/Recommended";
import useTitle from "@hooks/useTitle";
import Loader from "@components/core/Loader";

const fetchFilteredData = async (selectedOptions: any) => {
    try {
        const response = await FetchApi.get(`https://api.themoviedb.org/3/discover/${selectedOptions.selectedMedia}?include_adult=false&include_video=false&language=en-US&page=1&sort_by=${selectedOptions.selectedFilter}&${selectedOptions.selectedMedia === 'movie' ? "primary_release_year=" + selectedOptions.selectedYear : "first_air_date_year=" + selectedOptions.selectedYear}&with_origin_country=${selectedOptions.selectedCountry}&with_genres=${selectedOptions.selectedGenres}`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.log(error)
    }
    };

const fetchSearchedData = async (selectedOptions: any, searched:string) => {
    try {
        const response = await FetchApi.get(`https://api.themoviedb.org/3/search/${selectedOptions.selectedMedia}?query=${searched}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=${selectedOptions.selectedFilter}&${selectedOptions.selectedMedia === 'movie' ? "primary_release_year=" + selectedOptions.selectedYear : "first_air_date_year=" + selectedOptions.selectedYear}&region=${selectedOptions.selectedCountry}&with_genres=${selectedOptions.selectedGenres}`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.log(error)
    }
    };


    const fetchRecentlyUpdated = async (mediaType: any) => {
        try {
            const response = await fetch(`https://vidsrc.xyz/${mediaType === 'movie' ? 'movies' : 'tvshows'}/latest/page-1.json`);
            const data = await response.json();
            return data.result;
        } catch (error) {
            console.log(error)
        }
        };

export default function FiltersPage() {
    useTitle("Filter, Search Movies & TV Shows");
    const searchParams = useSearchParams();
    const genreId: any = searchParams.get("genre");
    const countryCode: any = searchParams.get("country");
    const mediaType: any = searchParams.get("mediaType");

    let genre = genreId ? genreId : "";
    let media = mediaType ? mediaType : "movie";
    let country = countryCode ? countryCode : "";

    const [selectedOptions, setSelectedOptions] =  useState<any>({
        selectedMedia: media,
        selectedYear:"",
        selectedCountry: "",
        selectedGenres:"",
        selectedFilter:"popularity.desc"
    });
    const [searchQuery, setSearchQuery] =  useState<any>("");

    const {
        isLoading,
        error,
        data: filteredData,
    } = useQuery<any>({
        queryKey: ['filtered-data', selectedOptions.selectedMedia, selectedOptions.selectedYear, selectedOptions.selectedCountry, selectedOptions.selectedGenres,selectedOptions.selectedFilter],
        queryFn: () =>fetchFilteredData(selectedOptions),
        enabled: !!selectedOptions,
    });

    const {
        isLoading: isRecentLoaded,
        data: recentData,
    } = useQuery<any>({
        queryKey: ['recently-updated', selectedOptions.selectedMedia],
        queryFn: () =>fetchRecentlyUpdated(selectedOptions.selectedMedia),
        enabled: !!selectedOptions.selectedMedia,
    });

    const {
        isLoading: isSearchLoading,
        data: searchedData,
    } = useQuery<any>({
        queryKey: ['searched-data', searchQuery],
        queryFn: () =>fetchSearchedData(selectedOptions, searchQuery),
        enabled: !!searchQuery,
    });

    useEffect(() => {
        if (genre || country || media) {
            setSelectedOptions((prevOptions: any) => ({
                ...prevOptions,
                selectedMedia: media,
                selectedCountry: country,
                selectedGenres: genre,
            }));
        }
    }, [genre, media, country]);
    console.log(selectedOptions)


    const handleFilters = (selectedOptions: any, search:string) =>{
        setSelectedOptions({
            selectedMedia: selectedOptions.selectedType,
            selectedYear:selectedOptions.selectedYear,
            selectedCountry:selectedOptions.selectedCountry,
            selectedGenres:selectedOptions.selectedGenre,
            selectedFilter:selectedOptions.selectedFilter  
        })
        setSearchQuery(search)
    }

    if(isLoading || isRecentLoaded || isSearchLoading){
        return(
            <div>
            <Loader />
          </div> 
        )
    }

    return (
        <div className="w-full">
            <div className="w-full">
                {/* <div className="bg-white/10 h-[80px]"><Header /></div> */}
                <div className="w-full mt-40">
                    <div className="homewrapper">
                    <div className="containerHub flex gap-5 flex-col lg:flex-row">
                            <div className="w-full">
                                <div className="w-full">
                                    <div className="flex items-center gap-4">
                                        <h3 className="text-white text-[25px] font-semibold">FILTER</h3>
                                    </div>
                                <Filters handleFilters={handleFilters} initiallySelected={selectedOptions} />
                                    <div className="w-full py-2">
                                        {searchQuery ? (
                                            <ul className="w-full flex flex-wrap gap-y-5 md:gap-y-10">
                                            {
                                                searchedData && searchedData.length > 0 ? searchedData.map((item: any) =>(<Card movieId={item.id} mediaType={selectedOptions.selectedMedia === 'movie' ? 'Movie' : 'TV'} />)) : ""
                                            } 
                                        </ul>
                                        ) : (
                                            <ul className="w-full flex flex-wrap gap-y-5 md:gap-y-10">
                                            {
                                                filteredData && filteredData.length > 0 ? filteredData.map((item: any) =>(<Card movieId={item.id} mediaType={selectedOptions.selectedMedia === 'movie' ? 'Movie' : 'TV'} />)) : ""
                                            } 
                                        </ul>
                                        )}
                                    
                                    </div>

                                </div>
                            </div>
                            <div className="min-w-full md:min-w-[376px]">
                                {/* <Sidebar /> */}
                                <Recommended title={"RECENTLY UPDATED"} data={recentData && recentData.length > 0 ? recentData.slice(0,10) : []}  mediaType={selectedOptions.selectedMedia === 'movie' ? 'Movie' : 'TV'} />
                            </div>
                        </div>
                    </div>
                </div>
                {/* <Footer /> */}
            </div>
        </div>
    )
}