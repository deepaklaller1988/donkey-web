"use client"
import Card from '@components/core/Card';
import Loader from '@components/core/Loader';
import Pagination from '@components/core/Pagination';
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation';

const fetchLatestList = async (mediaType: string) => {
    try {
        const response = await fetch(`https://vidsrc.to/vapi/${mediaType}/new/1`, { method: "GET", });
        const data = await response.json();
        if (data.status === 200 && data.result) {
            return data.result.items;
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
        return [];
    }
};

const fetchRecentlyTvUpdated = async () => {
    try {
        const response = await fetch(`https://vidsrc.to/vapi/tv/add/1`);
        const data = await response.json();
        return data.result || [];
    } catch (error) {
        console.log(error);
        return [];
    }
};

const fetchRecentlyMovieUpdated = async () => {
    try {
        const response = await fetch(`https://vidsrc.to/vapi/movie/add/1`);
        const data = await response.json();
        return data.result || [];
    } catch (error) {
        console.log(error);
        return [];
    }
};

export default function RecentlyUploaded() {
    const searchParams = useSearchParams();
    const type = searchParams.get('type');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const {
        isLoading: tvLoading,
        data: latestTVList,
    } = useQuery({
        queryKey: ['latest-tv'],
        queryFn: () => fetchLatestList("tv"),
    });

    const {
        isLoading: movieLoading,
        data: latestMovieList,
    } = useQuery({
        queryKey: ['latest-movie'],
        queryFn: () => fetchLatestList("movie"),
    });

    const {
        isLoading: isRecentMovieLoaded,
        data: recentMovieData,
    } = useQuery({
        queryKey: ['recently-movies'],
        queryFn: fetchRecentlyMovieUpdated,
        enabled: type === "recently",
    });

    const {
        isLoading: isRecentTvLoaded,
        data: recentTvData,
    } = useQuery({
        queryKey: ['recently-tv'],
        queryFn: fetchRecentlyTvUpdated,
        enabled: type === "recently",
    });

    useEffect(() => {
        if (latestTVList) {
            setTotalPages(Math.ceil(latestTVList.length / 12)); // Assuming 12 items per page
        }
    }, [latestTVList]);

    useEffect(() => {
        if (latestMovieList) {
            setTotalPages(Math.ceil(latestMovieList.length / 12));
        }
    }, [latestMovieList]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    if (movieLoading || tvLoading || isRecentMovieLoaded || isRecentTvLoaded) {
        return <Loader />;
    }
    console.log(recentTvData, recentMovieData)
    return (
        <div className="w-full">
            <div className="w-full mt-40">
                <div className="homewrapper">
                    <div className="containerHub flex gap-5 flex-col lg:flex-row">
                        <div className="w-full">
                            <div className="w-full">
                                <div className="flex items-center gap-4">
                                    <h3 className="text-white text-[25px] font-semibold">
                                        {type === "tv" ? "TV Shows" : type === "movie" ? "Movies" : ""}
                                    </h3>
                                </div>
                                <div className="w-full py-2">
                                    <ul className="w-full flex flex-wrap gap-y-5 md:gap-y-10">
                                        {type === "movie" && latestMovieList ? (
                                            latestMovieList.slice((currentPage - 1) * 12, currentPage * 12).map((item: any) => (
                                                <Card key={item.tmdb_id} movieId={item.tmdb_id} mediaType={"Movie"} />
                                            ))
                                        ) : type === "tv" && latestTVList ? (
                                            latestTVList.slice((currentPage - 1) * 12, currentPage * 12).map((item: any) => (
                                                <Card key={item.tmdb_id} movieId={item.tmdb_id} mediaType={"TV"} />
                                            ))
                                        ) : type === "recently" ? (
                                            <div className='flex flex-col '>
                                                    <h3 className="text-white text-[25px] font-semibold mb-4">Recently Uploaded Movies</h3>
                                                <div className='flex flex-row flex-wrap'>
                                                    {recentMovieData && recentMovieData.items.length > 0 && recentMovieData.items.slice(0, 12).map((item: any) => {
                                                        return (
                                                            <Card key={item.tmdb_id} movieId={item.tmdb_id} mediaType="Movie" />
                                                        );
                                                    })}

                                                </div >
                                               
                                                    <h3 className="text-white text-[25px] font-semibold mb-4">Recently Uploaded TVs</h3>
                                                    <div className='flex flex-row flex-wrap'>
                                                    {recentTvData && recentTvData.items.length > 0 && recentTvData.items.slice(0, 12).map((item: any) => (
                                                        <Card key={item.tmdb_id} movieId={item.tmdb_id} mediaType={"TV"} />
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <p>No results found.</p>
                                        )}
                                    </ul>
                                </div>
                            </div>
                            {/* <Pagination
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                                currentPage={currentPage}
                            /> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
