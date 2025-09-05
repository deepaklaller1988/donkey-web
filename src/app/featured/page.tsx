"use client";
import Card from "@components/core/Card";
import Loader from "@components/core/Loader";
import Pagination from "@components/core/Pagination";
import useRole from "@hooks/useRole";
import FetchApi from "@lib/FetchApi";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
const apiKey = process.env.NEXT_PUBLIC_MDBKEY;

export default function Featured() {
  const [roleLoading] = useRole();
  const searchParams = useSearchParams();
  const mediaType = searchParams.get("mediaType");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const itemsPerPage = 16;

  const fetchMovies = async (page: number) => {
    try {
      const pageNumber = Math.min(page, 500);
      const response = await FetchApi.get(
        `https://api.themoviedb.org/3/discover/${mediaType === "movie" ? "movie" : "tv"
        }?include_adult=false&include_video=false&language=en-US&page=${pageNumber}`
      );

      const data = await response.json();
      const limitedData = {
        ...data,
        results: data.results.slice(0, 16),
      };

      return limitedData;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPopularLists = async (page: number) => {
    try {
      const response = await fetch(
        // `https://mdblist.com/api/lists/14/items?apikey=${apiKey}&limit=400`
        `https://api.mdblist.com/lists/14/items/?apikey=${apiKey}&limit=450`
      );
      const data = await response.json();
      const movieIds = data?.movies?.map((item: any) => item.id);
      const allMovieData = await Promise.all(
        movieIds.map(async (id: any) => {
          try {
            const Response = await FetchApi.get(
              `https://api.themoviedb.org/3/movie/${id}?language=en-US`
            );
            return await Response.json();
          } catch (err) {
            console.error(`Error fetching data for ID ${id}:`, err);
            return null;
          }
        })
      );
      const filteredMovieData = allMovieData?.filter(
        (item: any) => item !== null
      );

      const totalItems = filteredMovieData?.length;
      const start = (page - 1) * itemsPerPage;
      const paginatedData = filteredMovieData?.slice(
        start,
        start + itemsPerPage
      );

      setTotalPages(Math.ceil(totalItems / itemsPerPage));

      return paginatedData;
    } catch (error) {
      console.log("Error fetching data from the first API:", error);
    }
  };

  const {
    isLoading,
    error,
    data: filteredData,
  } = useQuery<any>({
    queryKey: ["filtered-data", mediaType, currentPage],
    queryFn: () =>
      mediaType ? fetchMovies(currentPage) : fetchPopularLists(currentPage),
  });

  useEffect(() => {
    if (filteredData && mediaType) {
      setTotalPages(filteredData.total_pages);
    }
  }, [filteredData, mediaType]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [mediaType]);

  if (isLoading || roleLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="w-full mt-40">
        <div className="homewrapper">
          <div className="containerHub flex gap-5 flex-col lg:flex-row">
            <div className="w-full">
              <div className="flex items-center gap-4">
                <h3 className="text-white text-[25px] font-semibold">
                  {mediaType === "movie"
                    ? "Movies"
                    : mediaType
                      ? "Tv Shows"
                      : "Hot"}
                </h3>
              </div>
              {/* <div className="w-full"> */}
              <div className="w-full py-2">
                <ul className="w-full flex flex-wrap gap-y-5 md:gap-y-10">
                  {filteredData &&
                    ((mediaType && filteredData.results?.length > 0) ||
                      (!mediaType && filteredData.length > 0)) ? (
                    (mediaType ? filteredData.results : filteredData).map(
                      (item: any, index: number) => (
                        <Card
                          index={index}
                          key={item.id}
                          movieId={item.id}
                          mediaType={
                            !mediaType
                              ? "Movie"
                              : mediaType === "movie"
                                ? "Movie"
                                : "TV"
                          }
                        />
                      )
                    )
                  ) : (
                    <p className="text-white text-[25px] font-semibold">
                      No results found.
                    </p>
                  )}
                </ul>
              </div>
              {/* </div> */}

              <Pagination
                totalPages={totalPages}
                onPageChange={handlePageChange}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
