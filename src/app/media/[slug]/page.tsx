"use client"

import Filters from "@components/Filters";
import FetchApi from "@lib/FetchApi";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Card from "@components/core/Card";
import Recommended from "@components/Recommended";
import useTitle from "@hooks/useTitle";
import Loader from "@components/core/Loader";
import Pagination from "@components/core/Pagination";

const fetchLatestData = async (option: any, page: number=1) => {
    try {
        if(option==='movie' || option==='tv'){
            const pageNumber = Math.min(page, 500);
            const response = await fetch(`https://vidsrc.xyz/${option=== 'movie' ? "movies" : "tvshows"}/latest/page-${pageNumber}.json`);
            const data = await response.json();
            return data;
        }else{
            return [];
        }
    } catch (error) {
        console.log(error);
    }
};

const fetchSearchedData = async (selectedOptions: any, searched: string, page: number) => {
    try {
        const pageNumber = Math.min(page, 500);
        const response = await FetchApi.get(`https://api.themoviedb.org/3/search/${selectedOptions.selectedMedia}?query=${searched}&include_adult=false&include_video=false&language=en-US&page=${pageNumber}&sort_by=${selectedOptions.selectedFilter}&${selectedOptions.selectedMedia === 'movie' ? "primary_release_year=" + selectedOptions.selectedYear : "first_air_date_year=" + selectedOptions.selectedYear}&region=${selectedOptions.selectedCountry}&with_genres=${selectedOptions.selectedGenres}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

const fetchRecentlyUpdated = async (mediaType: any) => {
    try {
        const response = await fetch(`https://vidsrc.to/vapi/${mediaType}/add/1`);
        const data = await response.json();
        return data.result
    } catch (error) {
        console.log(error);
    }
};

export default function MediaPage({ params }: { params: { slug: string } }) {
    const {slug} = params
    useTitle(slug === 'search' ? "View Results"  :`Latest ${slug === 'movie' ? "Movies" : "TV Shows"}`);
    const searchParams = useSearchParams();
    const genreId: any = searchParams.get("genre");
    const countryCode: any = searchParams.get("country");
    const mediaType: any = searchParams.get("mediaType");

    let genre = genreId ? genreId : "";
    let media = mediaType ? mediaType : "movie";
    let country = countryCode ? countryCode : "";

    const [selectedOptions, setSelectedOptions] = useState<any>({
        selectedMedia: media,
        selectedYear: "",
        selectedCountry: "",
        selectedGenres: "",
        selectedFilter: "popularity.desc"
    });
    const [searchQuery, setSearchQuery] = useState<any>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const {
        isLoading,
        error,
        data: latestData,
    } = useQuery<any>({
        queryKey: ['latest', slug , currentPage],
        queryFn: () => fetchLatestData(slug, currentPage),
        enabled: !!slug,
    });

    const {
        isLoading: isRecentLoaded,
        data: recentData,
    } = useQuery<any>({
        queryKey: ['recently', slug],
        queryFn: () => fetchRecentlyUpdated(slug === 'tv' ? 'tv' : 'movie'),
        enabled: !!slug,
    });

    const {
        isLoading: isSearchLoading,
        data: searchedData,
    } = useQuery<any>({
        queryKey: ['searched-data', searchQuery, currentPage],
        queryFn: () => fetchSearchedData(selectedOptions, searchQuery, currentPage),
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

    useEffect(() => {
        if (latestData) {
            setTotalPages(latestData.pages);
        }
    }, [latestData]);

    useEffect(() => {
        if (searchedData) {
            setTotalPages(searchedData.total_pages);
        }
    }, [searchedData]);

    const handleFilters = (selectedOptions: any, search: string) => {
        setSelectedOptions({
            selectedMedia: selectedOptions.selectedType,
            selectedYear: selectedOptions.selectedYear,
            selectedCountry: selectedOptions.selectedCountry,
            selectedGenres: selectedOptions.selectedGenre,
            selectedFilter: selectedOptions.selectedFilter
        });
        setSearchQuery(search);
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

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
                <div className="w-full mt-40">
                    <div className="homewrapper">
                        <div className="containerHub flex gap-5 flex-col lg:flex-row">
                            <div className="w-full">
                                <div className="w-full">
                                    <div className="flex items-center gap-4">
                                        <h3 className="text-white text-[25px] font-semibold">{slug === 'movie' ? "LATEST MOVIES" : slug === 'tv' ? "LATEST TV SHOWS" : 'VIEW RESULTS'}</h3>
                                    </div>
                                    {/* <Filters handleFilters={handleFilters} initiallySelected={selectedOptions} /> */}
                                    <div className="w-full py-2">
                                        {searchQuery ? (
                                            <ul className="w-full flex flex-wrap gap-y-5 md:gap-y-10">
                                                {searchedData && searchedData.results?.length > 0 ? (
                                                    searchedData.results.map((item: any) => (
                                                        <Card key={item.id} movieId={item.id} mediaType={selectedOptions.selectedMedia === 'movie' ? 'Movie' : 'TV'} />
                                                    ))
                                                ) : (
                                                    <p>No results found.</p>
                                                )}
                                            </ul>
                                        ) : (
                                            <ul className="w-full flex flex-wrap gap-y-5 md:gap-y-10">
                                                {latestData && latestData.result?.length > 0 ? (
                                                    latestData.result.map((item: any) => (
                                                        <Card key={item.tmdb_id} movieId={item.tmdb_id} mediaType={slug === 'movie' ? 'Movie' : 'TV'} quality={item.quality === '1080p' ? 'HD' : item.quality === '720p' ? 'CAM' : item.quality} />
                                                    ))
                                                ) : (
                                                    <p>No results found.</p>
                                                )}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                                <Pagination
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                    currentPage={currentPage}
                                />
                            </div>
                            <div className="min-w-full md:min-w-[376px]">
                                {/* Sidebar */}
                                <Recommended title={"RECENTLY UPDATED"} data={recentData && recentData?.items.length > 0 ? recentData?.items.slice(0, 10) : []} mediaType={slug === 'tv' ? 'TV' : 'Movie'} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
