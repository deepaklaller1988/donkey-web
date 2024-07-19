"use client"
import React, { useState } from 'react'

import ProfileTab from '@components/core/ProfileTab';
import API from '@lib/Api';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useRole from '@hooks/useRole';
import User from '@lib/User';
import Loader from '@components/core/Loader';
import Card from '@components/core/Card';
import CustomPagination from '@components/CustomPagination';

const fetchBookmarkList = async (userId: number, selectedFolder: string, page: number, limit: number) => {
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
    console.log(response);
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
    queryFn: () => fetchBookmarkList(roleData ? roleData.id : User.id, activeFolder, currentPage, 10),
    enabled: !!(roleData || activeFolder),
  });
  const totalPages = bookmarkList?.count || 1;


  if (roleLoading) {
    return (
      <div>
        <Loader />
      </div>
    )
  }


  return (
    <>
      <ProfileTab activeTab="bookmark" />
      <div className="w-full mt-28">
        <div className="w-full flex items-center gap-4 text-white/50">
          <div
            className={`${activeFolder === 'all' ? 'text-white' : ''} text-sm py-3 hover:text-white transition`}
            onClick={() => setActiveFolder('all')}
          >
            All
          </div>{" "}
          /
          <div
            className={`${activeFolder === 'watching' ? 'text-white' : ''} text-sm py-3 hover:text-white transition`}
            onClick={() => setActiveFolder('watching')}
          >
            Watching
          </div>{" "}
          /
          <div
            className={`${activeFolder === 'planning-to-watch' ? 'text-white' : ''} text-sm py-3 hover:text-white transition`}
            onClick={() => setActiveFolder('planning-to-watch')}
          >
            Plan to Watch
          </div>{" "}
          /
          <div
            className={`${activeFolder === 'completed' ? 'text-white' : ''} text-sm py-3 hover:text-white transition`}
            onClick={() => setActiveFolder('completed')}
          >
            Completed
          </div>{" "}
          {/* /
            <div>
              <FaRegFolderOpen className="text-white/60 hover:text-white transition" />
            </div> */}
        </div>
        {
          isLoading ? (<>
            <Loader />
          </>) : (<ul className="w-full flex flex-wrap gap-y-5 md:gap-y-10">
            {/* <li className="w-1/6 cardSet relative">
                        <span className="relative">
                            <FaPlayCircle className="opacity-0 transition absolute text-black -mt-5 top-1/2 text-[35px] -ml-5 left-1/2" />
                            <img className="rounded-xl w-full" src="/assets/images/album1.jpg" alt="album" /><label className="absolute z-0 pbgColor top-5 left-0 font-bold px-2 rounded-r-xl">HD</label></span>
                        <section className="py-2">
                            <div className="w-full flex items-center justify-between mb-2">
                                <ul className="text-white/50 flex gap-1 items-center justify-between w-full">
                                    <li className="text-[12px] font-semibold text-white">2023</li>
                                    <li className="text-[12px] rounded-full border border-white/50 border-1 px-2">EP1</li>
                                    <li className="text-[12px]">SS1</li>
                                </ul>
                            </div>
                            <b className="text-white font-semibold">Faraway Downs 100</b>
                        </section>
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
                    </li> */}
            {bookmarkList && bookmarkList.data.length > 0
              ? bookmarkList.data?.map((item: any) => (
                <Card
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

      </div>


      <CustomPagination
        currentPage={currentPage}
        totalItems={totalPages}
        totalPages={totalPages / 10}
        itemsPerPage={10}
        onPageChange={(page: number) => setCurrentPage(page)}

      />
    </>
  );
}
