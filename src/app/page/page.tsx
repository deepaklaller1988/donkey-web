"use client"
import Card from '@components/core/Card';
import Loader from '@components/core/Loader';
import Pagination from '@components/core/Pagination';
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation';


const fetchLatestList = async (mediaType: string,page?:any) => {
    try {
        const pageNumber = Math.min(page, 500);
      let response = await fetch(`https://vidsrc.to/vapi/${mediaType}/new/1`,{method: "GET",});
      const data = await response.json();
      if(data.status === 200){
        if(data.result) return data.result.items;
      }else{
        return [];
      }
    } catch (error) {
      console.log(error)
    }
  };

export default function RecentlyUploaded() {
    const searchParams = useSearchParams();
    const type = searchParams.get('type');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const {
        isLoading : tvLoading,
        data: latestTVList,
    } = useQuery({
        queryKey: ['latest-movies', "tv"],
        queryFn: () => fetchLatestList("tv"),
    });

    const {
        isLoading : movieLoading,
        data: latestMovieList,
    } = useQuery({
        queryKey: ['latest-movies', "movie"],
        queryFn: () => fetchLatestList("movie"),
    });

    useEffect(() => {
        if (latestTVList) {
            setTotalPages(latestTVList.total_pages);
        }
    }, [latestTVList]);
    
    useEffect(() => {
        if (latestMovieList) {
            setTotalPages(latestMovieList.total_pages);
        }
    }, [latestMovieList]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    if( movieLoading || tvLoading){
        return(
            <div>
            <Loader />
          </div> 
        )
    }

    const combinedList = [...(latestMovieList || []), ...(latestTVList || [])];
    return (
        <div className="w-full">
            <div className="w-full">
                <div className="w-full mt-40">
                    <div className="homewrapper">
                        <div className="containerHub flex gap-5 flex-col lg:flex-row">
                            <div className="w-full">
                                <div className="w-full">
                                    <div className="flex items-center gap-4">
                                        <h3 className="text-white text-[25px] font-semibold">{type==="tv"?"TV Shows":"Movies"}</h3>
                                    </div>
                                    <div className="w-full py-2">
                                    <ul className="w-full flex flex-wrap gap-y-5 md:gap-y-10">
                                            {type === "movie" && latestMovieList && latestMovieList.length > 0 ? (
                                                latestMovieList.slice(0, 12).map((item: any) => (
                                                    <Card key={item.tmdb_id} movieId={item.tmdb_id} mediaType={"Movie"} />
                                                ))
                                            ) : type === "tv" && latestTVList && latestTVList.length > 0 ? (
                                                latestTVList.slice(0, 12).map((item: any) => (
                                                    <Card key={item.tmdb_id} movieId={item.tmdb_id} mediaType={"TV"} />
                                                ))
                                            ) : type === "all" ? (
                                                // Handle the 'all' case here
                                                <>
                                                    {latestMovieList && latestMovieList.length > 0 && latestMovieList.slice(0, 6).map((item: any) => (
                                                        <Card key={item.tmdb_id} movieId={item.tmdb_id} mediaType={"Movie"} />
                                                    ))}
                                                    {latestTVList && latestTVList.length > 0 && latestTVList.slice(0, 6).map((item: any) => (
                                                        <Card key={item.tmdb_id} movieId={item.tmdb_id} mediaType={"TV"} />
                                                    ))}
                                                </>
                                            ) : (
                                                <p>No results found.</p>
                                            )}
                                        </ul>

                                    </div>
                                </div>
                                <Pagination
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                    currentPage={currentPage}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
