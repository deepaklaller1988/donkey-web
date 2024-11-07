"use client";
import React, { useState } from "react";

import API from "@lib/Api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useRole from "@hooks/useRole";
import User from "@lib/User";
import Loader from "@components/core/Loader";
import Card from "@components/core/Card";
import CustomPagination from "@components/CustomPagination";

const fetchBookmarkList = async (
  userId: number,
  page: number,
  limit: number,
  folder: string = "all"  
) => {
  if (!userId) {
    return null;
  }

  let url = `bookmark?userId=${userId}`;
  if (folder === "all") {
    url += `&page=${page}&limit=${limit}&pagination=true`;
  } else if (["watching", "planning-to-watch", "completed"].includes(folder)) {
    url += `&bookmarkType=${folder}`;
  }

  try {
    const response = await API.get(url);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default function BookmarkPage() {
  const [roleLoading, roleData] = useRole();
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();

  const { isLoading, data: bookmarkList } = useQuery({
    queryKey: ["bookmark", roleData, currentPage, "all"], 
    queryFn: () =>
      fetchBookmarkList(
        roleData ? roleData.id : User.id,
        currentPage,
        12,
        "all"  
      ),
    enabled: !!(roleData?.id || User.id),
    staleTime: 60 * 1000,
  });
  const totalPages = bookmarkList?.count;

  if (roleLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="w-full mt-28">
        <div className="homewrapper">
          {isLoading ? (
            <>
              <Loader />
            </>
          ) : (
            <ul className="w-full flex flex-wrap gap-y-5 md:gap-y-10">
              {bookmarkList && bookmarkList.data.length > 0 ? (
                bookmarkList.data?.map((item: any, index: number) => (
                  <Card
                    index={index}
                    key={item.id}
                    movieId={item.media_id}
                    mediaType={item.media_type === "movie" ? "Movie" : "TV"}
                    bookmark_type={item.bookmark_type}
                    isBookmarked={true}
                    queryClient={queryClient}
                  />
                ))
              ) : (
                <>
                  <div className="flex justify-center items-center h-full w-full">
                    <h3 className="text-white/70 text-[20px] font-semibold mb-6">
                      Empty..
                    </h3>
                  </div>
                </>
              )}
            </ul>
          )}
          <CustomPagination
            currentPage={currentPage}
            totalItems={totalPages}
            totalPages={totalPages}
            itemsPerPage={12}
            onPageChange={(page: number) => setCurrentPage(page)}
          />
        </div>
      </div>
    </>
  );
}
