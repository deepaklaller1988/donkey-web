"use client"
import { FaPlayCircle, FaFolder } from "react-icons/fa";
import { FaRegCirclePlay } from "react-icons/fa6";
import { IoIosAddCircleOutline } from "react-icons/io";
import { TiDelete } from "react-icons/ti";
import { useQuery } from '@tanstack/react-query';
import { FaStar } from "react-icons/fa";
import FetchApi from "@lib/FetchApi";
import moment from "moment";
import { useRouter } from "next/navigation";
import CardSkeleton from "./CardSkeleton";
import User from "@lib/User";
import API from "@lib/Api";
import { toasterError, toasterSuccess } from "./Toaster";
import { useState } from "react";
const apiKey = process.env.NEXT_PUBLIC_MDBKEY

// const fetchDetails = async (movieId: number, mediaType: string) => {
//   try {
//     const response = await FetchApi.get(`https://api.themoviedb.org/3/${mediaType.toLowerCase()}/${movieId}?language=en-US`);
//     const data = await response.json();
//     const certificateResponse = await fetch(`https://mdblist.com/api/?apikey=${apiKey}&tm=${movieId}`);
//     const certificateData = await certificateResponse.json();

//     const combinedResult = {
//       ...data,
//       certificate: certificateData.certification || null,
//     };

//     return combinedResult;
//   } catch (error) {
//     console.log(error)
//   }
// };

const fetchDetails = async (movieId: number, mediaType: string) => {
  try {
    const response = await FetchApi.get(`https://api.themoviedb.org/3/${mediaType.toLowerCase()}/${movieId}?language=en-US`);
    const data = await response.json();

    let certificate = null;

    try {
      const certificateResponse = await fetch(`https://mdblist.com/api/?apikey=${apiKey}&tm=${movieId}`);
      const certificateData = await certificateResponse.json();
      certificate = certificateData.certification || null;
    } catch (certificateError) {
      console.error(`Failed to fetch certificate for movie ID ${movieId}:`, certificateError);
    }

    const combinedResult = {
      ...data,
      certificate
    };

    return combinedResult;
  } catch (error) {
    console.error('Failed to fetch data from the primary API:', error);
  }
};



function Card({ movieId, mediaType, quality, isBookmarked = false, bookmark_type, queryClient}: any) {

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false)
  const {
    isLoading,
    error,
    data: movieDetials,
  } = useQuery<any>({
    queryKey: ['card-detials', movieId, mediaType],
    queryFn: () => fetchDetails(movieId, mediaType),
  });

  const handleWatchPopup = () => {
    if (!User.isUserLoggedIn) {
      toasterError("Please login or signup to use this feature.",3000,"id")
    } else {
      setIsOpen(true);
    }
  }

  const handleBookmark = async (mediaID: any, mediaType: string, bookmarkType: string) => {
    try {
      let data = {
        userId: User.id,
        mediaId: mediaID,
        mediaType: mediaType,
        bookmarkType: bookmarkType
      }

      const result = await API.post("bookmark", data);
      if (result.success) {
        toasterSuccess("Media added successfully to bookmarks.", 3000, mediaID)
        queryClient.invalidateQueries({ queryKey: ['bookmark'] })
      } else {
        toasterError(result?.error?.code, 3000, mediaID);
      }
    } catch (error: any) {
      toasterError(error?.error?.code, 3000, mediaID);
    }
    setIsOpen(false);
  }

  const handleUpdateBookmark = async (mediaID: any, mediaType: string, bookmarkType: string) => {
    try {
      let data = {
        userId: User.id,
        mediaId: mediaID,
        mediaType: mediaType,
        bookmarkType: bookmarkType
      }

      const result = await API.put("bookmark", data);
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ['bookmark'] })

        toasterSuccess(`Media added successfully to ${bookmarkType === 'watching' ? 'Watching' : bookmarkType === 'completed' ? 'Completed' : 'Plan to Watch'} Folder.`, 3000, mediaID)
      } else {
        toasterError(result?.error?.code, 3000, mediaID);
      }
    } catch (error: any) {
      toasterError(error?.error?.code, 3000, mediaID);
    }
    setIsOpen(false);
  }

  const handleDeleteBookmark = async (mediaID: any, mediaType: string) => {
    try {
      let data = {
        userId: User.id,
        mediaId: mediaID,
        mediaType: mediaType,
      }

      const result = await API.delete("bookmark", data);
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ['bookmark'] })
        toasterSuccess(`Media removed successfully from bookmarks.`, 3000, mediaID)
      } else {
        toasterError(result?.error?.code, 3000, mediaID);
      }
    } catch (error: any) {
      console.log(error,"errr");
      toasterError(error?.error?.code, 3000, mediaID);
    }
    setIsOpen(false);
  }

  if (isLoading) {
    return (
      <CardSkeleton />
    )
  }

  return (
    <>
      {movieDetials && (<>
        <li key={movieId} className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 cursor-pointer cardSet relative" >
          <div className="relative w-full">
            <span className="relative folderOpened" onClick={() => router.push(`/watch-now?type=${mediaType?.toLowerCase()}&id=${movieId}`)}>
              <FaPlayCircle className="opacity-0 transition absolute text-black -mt-5 top-1/2 text-[30px] -ml-5 left-1/2" />
              <img
                className="rounded-xl w-full"
                src={`${movieDetials?.poster_path ? "https://image.tmdb.org/t/p/original" + movieDetials?.poster_path : "/assets/images/miss.jpg"}`}
                alt="album"
              />
              <label className="absolute z-0 pbgColor top-5 left-0 font-bold px-2 rounded-r-xl">
                {quality ? quality : "HD"}
              </label>
            </span>
            {isBookmarked && (
              <label className="absolute z-0 pbgColor top-5 right-0 font-bold px-2 rounded-l-xl" onClick={handleWatchPopup}>
                <div className="relative flex gap-4">
                  <FaFolder className="w-4 h-4 m-1 " />
                  <div className={`profileLinks top-[20px] absolute bg-zinc-950 rounded-lg right-0 min-w-[200px] ${isOpen ? 'openProfileLinks' : ''}`}>
                    <div className={`${bookmark_type == "watching" ? "pbgColor transition !text-black m-2 rounded" : ""} p-2 px-3 text-white/50 transition hover:text-white flex items-center gap-2`} onClick={() => handleUpdateBookmark(movieDetials?.id, mediaType === 'Movie' ? 'movie' : 'tv', 'watching')} >Watching </div>
                    <div className={`${bookmark_type == "planning-to-watch" ? "pbgColor transition !text-black m-2 rounded" : ""} p-2 px-3 text-white/50 transition hover:text-white flex items-center gap-2`} onClick={() => handleUpdateBookmark(movieDetials?.id, mediaType === 'Movie' ? 'movie' : 'tv', 'planning-to-watch')} >Plan to Watch</div>
                    <div className={`${bookmark_type == "completed" ? "pbgColor  transition !text-black m-2 rounded" : ""} p-2 px-3 text-white/50 transition hover:text-white flex items-center gap-2`} onClick={() => handleUpdateBookmark(movieDetials?.id, mediaType === 'Movie' ? 'movie' : 'tv', 'completed')} >Completed </div>
                    <div className={`p-2 px-3 text-white/50 transition hover:text-white flex items-center gap-2`} onClick={() => handleDeleteBookmark(movieDetials?.id, mediaType === 'Movie' ? 'movie' : 'tv')} ><TiDelete className="w-6 h-6" /> Remove</div>
                  </div>
                </div>
              </label>
            )}
            <section className="py-2">
              <b className="text-white font-semibold">{(movieDetials?.title && movieDetials.title.length > 40) ? movieDetials?.title?.slice(0, 40) + "..." : (movieDetials?.name && movieDetials?.name.length > 40) ? movieDetials?.name?.slice(0, 40) + "..." : movieDetials?.name ? movieDetials?.name : movieDetials?.title}</b>
              <ul className="text-gray-500 flex gap-2">
                <li className="text-sm">{mediaType}</li>.<li className="text-sm">{mediaType === 'Movie' ? moment(movieDetials?.release_date).year() : "SS" + movieDetials?.last_episode_to_air?.season_number}</li>
                {/* . <li className="text-sm">{mediaType === 'Movie' ? movieDetials?.runtime + " min" : "EP" + movieDetials?.last_episode_to_air?.episode_number}</li> */}
              </ul>
            </section>
            <div className="albumDetail absolute bg-zinc-800 rounded-xl top-20 left-full z-50 w-[350px]" onMouseLeave={() => setIsOpen(false)}>
              <div className="w-full p-5 relative">
                <section className="pr-12">
                  <h2 className="text-white text-lg">{movieDetials?.title || movieDetials?.name}</h2>
                  <ul className="py-1 flex flex-wrap items-center text-white gap-4 font-light">
                    <li>
                      <b className="font-bold text-sm">{mediaType === 'Movie' ? moment(movieDetials?.release_date).year() : moment(movieDetials?.first_air_date).year()}</b>
                    </li>
                    <li className=" text-sm">{mediaType === 'Movie' ? movieDetials?.runtime + " min" : "EP" + movieDetials?.last_episode_to_air?.episode_number}</li>
                    <li>
                      <label className="flex items-center gap-2 text-white text-sm font-semibold">
                        <FaStar /> {movieDetials?.vote_average?.toFixed(1)}
                      </label>
                    </li>
                    <li>
                      <label className=" text-sm rounded-full pbgColor text-black font-bold px-2">
                        {quality ? quality : "HD"}
                      </label>
                    </li>
                    {movieDetials.certificate &&
                      <li>
                        <label className='text-white'>
                          {movieDetials.certificate}
                          </label>
                      </li>
                    }

                  </ul>
                </section>
                {
                  !isBookmarked && (
                    <label className="absolute cursor-pointer right-5 top-1/2" onClick={handleWatchPopup}>
                      <div className="relative flex gap-4">
                        <IoIosAddCircleOutline className="text-white hover:text-amber-500 w-6 h-6 -mt-3" />
                        <div className={`profileLinks top-[20px] absolute bg-zinc-950 rounded-lg right-0 min-w-[200px] ${isOpen ? 'openProfileLinks' : ''}`}>
                          <div className="p-2 px-3 text-white/50 transition hover:text-white flex items-center gap-2" onClick={() => handleBookmark(movieDetials?.id, mediaType === 'Movie' ? 'movie' : 'tv', 'watching')} >Watching </div>
                          <div className="p-2 px-3 text-white/50 transition hover:text-white flex items-center gap-2" onClick={() => handleBookmark(movieDetials?.id, mediaType === 'Movie' ? 'movie' : 'tv', 'planning-to-watch')} >Plan to Watch</div>
                          <div className="p-2 px-3 text-white/50 transition hover:text-white flex items-center gap-2" onClick={() => handleBookmark(movieDetials?.id, mediaType === 'Movie' ? 'movie' : 'tv', 'completed')} >Completed </div>
                        </div>
                      </div>
                    </label>
                  )
                }

              </div>
              <div className="w-full p-5 border-t border-1 border-white/5 text-white/50">
                <p>
                  Country:{" "}
                  <label className="text-white font-light">{movieDetials?.production_countries && movieDetials?.production_countries?.length > 0 ? movieDetials?.production_countries?.map((gen: any) => gen?.name).join(", ") : ""}</label>
                </p>
                <p>
                  Genre:{" "}
                  <label className="text-white font-light">{movieDetials?.genres && movieDetials?.genres?.length > 0 ? movieDetials?.genres?.map((gen: any) => gen?.name)?.join(", ") : ""}</label>
                </p>
                <p>
                  Scores:{" "}
                  <label className="text-white font-light">
                    {movieDetials?.vote_average?.toFixed(2)} by {movieDetials?.vote_count} reviews
                  </label>
                </p>
                <p className="text-white/50 font-light pt-2">
                  {movieDetials?.overview && movieDetials?.overview.length > 150 ? movieDetials?.overview.slice(0, 150) + "..." : movieDetials?.overview}
                </p>
                <button className="text-black flex items-center gap-2 pbgColor px-6 py-2 rounded-full transition m-auto mt-4 mb-2" onClick={() => router.push(`/watch-now?type=${mediaType?.toLowerCase()}&id=${movieId}`)}>
                  Watch Now <FaRegCirclePlay className="text-xl" />
                </button>
              </div>
            </div>
          </div>
        </li>
      </>)}
    </>
  );
}

export default Card;
