"use client"
import React, { useState } from 'react'

import API from '@lib/Api';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useRole from '@hooks/useRole';
import User from '@lib/User';
import Loader from '@components/core/Loader';
import Card from '@components/core/Card';
import CustomPagination from '@components/CustomPagination';

const fetchBookmarkList = async (userId: number, selectedFolder: string, page: number, limit: number) => {

  if (!userId) {
    // console.error('User ID is required');
    return null;
  }

  let url = `bookmark?userId=${userId}`;
  switch (selectedFolder) {
    case "all":
      url = `bookmark?userId=${userId}&page=${page}&limit=${limit}&pagination=${true}`;
      break;
    case "watching":
    case "planning-to-watch":
    case "completed":
      url = `bookmark?userId=${userId}&bookmarkType=${selectedFolder}`;
      break;
    default:
      url = `bookmark?userId=${userId}`;
      break;
  }

  try {
    const response = await API.get(url);
    return response;
  } catch (error) {
    console.log(error)
  }
};

export default function BookmarkPage() {
  const [roleLoading, roleData] = useRole();
  const [activeFolder, setActiveFolder] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient()

  const {
    isLoading,
    error,
    data: bookmarkList,
    refetch
  } = useQuery({
    queryKey: ['bookmark', roleData, activeFolder, currentPage],
    queryFn: () => fetchBookmarkList(roleData ? roleData.id : User.id, activeFolder, currentPage, 12),
    enabled: !!(roleData?.id || User.id) && !!activeFolder,
  });
  const totalPages = bookmarkList?.count


  if (roleLoading) {
    return (
      <div>
        <Loader />
      </div>
    )
  }


  return (
    <>
      <div className="w-full mt-28">
        <div className='homewrapper'>
       
        {
          isLoading ? (<>
            <Loader />
          </>) : (<ul className="w-full flex flex-wrap gap-y-5 md:gap-y-10">
            {bookmarkList && bookmarkList.data.length > 0
              ? bookmarkList.data?.map((item: any) => (
                <Card
                  key={item.id}
                  movieId={item.media_id}
                  mediaType={item.media_type === "movie" ? "Movie" : "TV"}
                  bookmark_type={item.bookmark_type}
                  isBookmarked={true}
                  queryClient={queryClient}
                />
              ))
              : ""}
          </ul>)
        }
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
