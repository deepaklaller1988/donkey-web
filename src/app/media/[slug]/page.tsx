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
        }else if(option === 'recent'){
            const pageNumber = Math.min(page, 500);
            const response = await FetchApi.get(`https://api.themoviedb.org/3/trending/all/day?language=en-US&page=${pageNumber}`);
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
        if(selectedOptions.selectedMedia){
            const response = await FetchApi.get(`https://api.themoviedb.org/3/search/${selectedOptions.selectedMedia}?query=${searched}&include_adult=false&include_video=false&language=en-US&page=${pageNumber}&sort_by=${selectedOptions.selectedFilter}&${selectedOptions.selectedMedia === 'movie' ? "primary_release_year=" + selectedOptions.selectedYear : "first_air_date_year=" + selectedOptions.selectedYear}&region=${selectedOptions.selectedCountry}&with_genres=${selectedOptions.selectedGenres}`);
            const data = await response.json();
            return data;
        }else{
            const response = await FetchApi.get(`https://api.themoviedb.org/3/search/multi?query=${searched}&include_adult=false&language=en-US&page=${pageNumber}`);
            const data = await response.json();
            return data;
        }

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

const fetchFilteredData = async (selectedOptions: any, page: number) => {
    try {
        const pageNumber = Math.min(page, 500);
        const response = await FetchApi.get(`https://api.themoviedb.org/3/discover/${selectedOptions.selectedMedia}?include_adult=false&include_video=false&language=en-US&page=${pageNumber}&sort_by=${selectedOptions.selectedFilter}&${selectedOptions.selectedMedia === 'movie' ? "primary_release_year=" + selectedOptions.selectedYear : "first_air_date_year=" + selectedOptions.selectedYear}&with_origin_country=${selectedOptions.selectedCountry}&with_genres=${selectedOptions.selectedGenres}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};


export default function MediaPage({ params }: { params: { slug: string } }) {
    const {slug} = params
    useTitle(slug === 'search' ? "Results"  : slug === 'recent' ? "Recently Updated" :`Latest ${slug === 'movie' ? "Movies" : "TV Shows"}`);
    const searchParams = useSearchParams();
    const searchQuery: any = searchParams.get("query");
    const countryCode: any = searchParams.get("country");
    const mediaType: any = searchParams.get("mediaType");

    const [selectedOptions, setSelectedOptions] = useState<any>({
        selectedMedia: "",
        selectedYear: "",
        selectedCountry: "",
        selectedGenres: "",
        selectedFilter: ""
    });
    const [search, setSearch] = useState<any>("");
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
        queryKey: ['searched-data', search, currentPage, selectedOptions.selectedMedia, selectedOptions.selectedYear, selectedOptions.selectedCountry, selectedOptions.selectedGenres, selectedOptions.selectedFilter],
        queryFn: () => (slug === 'search' && search ?  fetchSearchedData(selectedOptions, search, currentPage) : fetchFilteredData(selectedOptions, currentPage)),
        enabled: !!(search || selectedOptions),
    });

    useEffect(() => {
        setSearch(searchQuery)
    }, [searchQuery]);

    useEffect(() => {
        if (latestData && slug != 'search') {
            if(slug == 'recent'){
                setTotalPages(latestData.total_pages);
            }else{
                setTotalPages(latestData.pages);
            }
        }

        if (searchedData && slug == 'search') {
            setTotalPages(searchedData.total_pages);
        }
    }, [latestData, searchedData]);

    const handleFilters = (selectedOptions: any, search: string) => {
        setSelectedOptions({
            selectedMedia: selectedOptions.selectedType,
            selectedYear: selectedOptions.selectedYear,
            selectedCountry: selectedOptions.selectedCountry,
            selectedGenres: selectedOptions.selectedGenre,
            selectedFilter: selectedOptions.selectedFilter
        });
        setSearch(search);
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
                                        <h3 className="text-white text-[25px] font-semibold">{slug === 'movie' ? "LATEST MOVIES" : slug === 'tv' ? "LATEST TV SHOWS" : slug === 'recent' ? 'RECENTLY UPDATED' : 'RESULTS'}</h3>
                                    </div>
                                    {slug === 'search' && (<><Filters handleFilters={handleFilters} initiallySelected={selectedOptions} initiallySearch={search} /> </>)}
                                    {/* <Filters handleFilters={handleFilters} initiallySelected={selectedOptions} /> */}
                                    <div className="w-full py-2">
                                        {slug === 'search' ? (
                                            <ul className="w-full flex flex-wrap gap-y-5 md:gap-y-10">
                                                {searchedData && searchedData.results?.length > 0 ? (
                                                    searchedData.results.map((item: any) => (
                                                        <Card key={item.id} movieId={item.id} mediaType={selectedOptions.selectedMedia === 'movie' || item.media_type==='movie' ? 'Movie' : 'TV'} />
                                                    ))
                                                ) : (
                                                    <p className="text-white text-[20px]">No results found.</p>
                                                )}
                                            </ul>
                                        ) : slug === 'recent' ? (
                                            <ul className="w-full flex flex-wrap gap-y-5 md:gap-y-10">
                                                {latestData && latestData.results?.length > 0 ? (
                                                    latestData.results.map((item: any) => (
                                                        <Card key={item.id} movieId={item.id} mediaType={item.media_type === 'movie' ? 'Movie' : 'TV'} />
                                                    ))
                                                ) : (
                                                    <p className="text-white text-[20px]">No results found.</p>
                                                )}
                                            </ul>
                                        ) : (
                                            <ul className="w-full flex flex-wrap gap-y-5 md:gap-y-10">
                                                {latestData && latestData.result?.length > 0 ? (
                                                    latestData.result.map((item: any) => (
                                                        <Card key={item.tmdb_id} movieId={item.tmdb_id} mediaType={slug === 'movie' ? 'Movie' : 'TV'} quality={item.quality === '1080p' ? 'HD' : item.quality === '720p' ? 'CAM' : item.quality} />
                                                    ))
                                                ) : (
                                                    <p className="text-white text-[20px]">No results found.</p>
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
                                <Recommended title={slug != 'recent' ? "RECENTLY UPDATED" : 'NEWLY ADDED'} data={recentData && recentData?.items.length > 0 ? recentData?.items.slice(0, 10) : []} mediaType={slug === 'tv' ? 'TV' : 'Movie'} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
