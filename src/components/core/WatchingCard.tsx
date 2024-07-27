"use client"
import { FaPlayCircle, FaFolder } from "react-icons/fa";
import { FaRegCirclePlay } from "react-icons/fa6";
import { TiDelete } from "react-icons/ti";
import { useQuery } from '@tanstack/react-query';
import { FaStar } from "react-icons/fa";
import moment from "moment";
import { useRouter } from "next/navigation";
import CardSkeleton from "./CardSkeleton";
import FetchApi from "@lib/FetchApi";
const apiKey = process.env.NEXT_PUBLIC_MDBKEY

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

function WatchingCard({ movieId, mediaType, quality, handleDelete,id, queryClient }: any) {
    const router = useRouter(); 

    const {
        isLoading,
        error,
        data: data,
    } =  useQuery<any>({
        queryKey: ["movie-details", movieId, mediaType],
        queryFn: () => fetchDetails(movieId,mediaType)
    });

    if (isLoading) {
        return (
            <CardSkeleton />
        )
    }
    return (
        <>
            {data && (<>
                <li key={movieId} className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 cursor-pointer cardSet relative" >
                    <div className="relative w-full"
                    //  onMouseLeave={() => setIsOpen(false)}
                     >
                        <span className="relative folderOpened" onClick={() => router.push(`/watch-now?type=${mediaType?.toLowerCase()}&id=${movieId}`)}>
                            {/* <FaPlayCircle className="opacity-0 transition absolute text-black -mt-5 top-1/2 text-[30px] -ml-5 left-1/2" /> */}
                            <img
                                className="rounded-xl w-full"
                                src={`${data?.poster_path ? "https://image.tmdb.org/t/p/original" + data?.poster_path : "/assets/images/miss.jpg"}`}
                                alt="album"
                            />
                            <label className="absolute z-0 pbgColor top-5 left-0 font-bold px-2 rounded-r-xl">
                                {quality ? quality : "HD"}
                            </label>
                        </span>
                        <label className="absolute z-0 pbgColor top-5 right-0 font-bold px-2 rounded-l-xl" >
                            <div className="relative flex gap-4" >
                                <TiDelete className="w-5 h-5 m-1 "  onClick={() => handleDelete(id)} />
        
                            </div>
                        </label>
                        <section className="py-2">
                            <b className="text-white font-semibold">{(data?.title && data.title.length > 40) ? data?.title?.slice(0, 40) + "..." : (data?.name && data?.name.length > 40) ? data?.name?.slice(0, 40) + "..." : data?.name ? data?.name : data?.title}</b>
                            <ul className="text-gray-500 flex gap-2">
                                <li className="text-sm">{mediaType}</li>.<li className="text-sm">{mediaType === 'Movie' ? moment(data?.release_date).year() : "SS" + data?.last_episode_to_air?.season_number}</li>
                            </ul>
                        </section>

                        <div className="albumDetail absolute bg-zinc-800 rounded-xl top-20 left-full z-50 w-[350px]">
                            <div className="w-full p-5 relative">
                                <section className="pr-12">
                                    <h2 className="text-white text-lg">{data?.title || data?.name}</h2>
                                    <ul className="py-1 flex flex-wrap items-center text-white gap-4 font-light">
                                        <li>
                                            <b className="font-bold text-sm">{mediaType === 'Movie' ? moment(data?.release_date).year() : moment(data?.first_air_date).year()}</b>
                                        </li>
                                        <li className=" text-sm">{mediaType === 'Movie' ? data?.runtime + " min" : "EP" + data?.last_episode_to_air?.episode_number}</li>
                                        <li>
                                            <label className="flex items-center gap-2 pColor text-sm font-semibold">
                                                <FaStar /> {data?.vote_average?.toFixed(1)}
                                            </label>
                                        </li>
                                        <li>
                                            <label className=" text-sm rounded-full pbgColor text-black font-bold px-2">
                                                {quality ? quality : "HD"}
                                            </label>
                                        </li>
                                        {data.certificate &&
                                            <li>
                                                <label className='text-white'>
                                                    {data.certificate}
                                                </label>
                                            </li>
                                        }

                                    </ul>
                                </section>
                                <label className="absolute cursor-pointer right-5 top-1/2" >
                                    {/* <div className="relative flex gap-4">
                                                <IoIosAddCircleOutline className="text-white hover:text-amber-500 w-6 h-6 -mt-3" />
                                                <div className={`profileLinks top-[20px] absolute bg-zinc-950 rounded-lg right-0 min-w-[200px] ${isOpen ? 'openProfileLinks' : ''}`}>
                                                    <div className="p-2 px-3 text-white/50 transition hover:text-white flex items-center gap-2" onClick={() => handleBookmark(movieDetials?.id, mediaType === 'Movie' ? 'movie' : 'tv', 'watching')} >Watching </div>
                                                    <div className="p-2 px-3 text-white/50 transition hover:text-white flex items-center gap-2" onClick={() => handleBookmark(movieDetials?.id, mediaType === 'Movie' ? 'movie' : 'tv', 'planning-to-watch')} >Plan to Watch</div>
                                                    <div className="p-2 px-3 text-white/50 transition hover:text-white flex items-center gap-2" onClick={() => handleBookmark(movieDetials?.id, mediaType === 'Movie' ? 'movie' : 'tv', 'completed')} >Completed </div>
                                                </div>
                                            </div> */}
                                </label>

                            </div>
                            <div className="w-full p-5 border-t border-1 border-white/5 text-white/50">
                                <p>
                                    Country:{" "}
                                    <label className="text-white font-light">{data?.production_countries && data?.production_countries?.length > 0 ? data?.production_countries?.map((gen: any) => gen?.name).join(", ") : ""}</label>
                                </p>
                                <p>
                                    Genre:{" "}
                                    <label className="text-white font-light">{data?.genres && data?.genres?.length > 0 ? data?.genres?.map((gen: any) => gen?.name)?.join(", ") : ""}</label>
                                </p>
                                <p>
                                    Scores:{" "}
                                    <label className="text-white font-light">
                                        {data?.vote_average?.toFixed(2)} by {data?.vote_count} reviews
                                    </label>
                                </p>
                                <p className="text-white/50 font-light pt-2">
                                    {data?.overview && data?.overview.length > 150 ? data?.overview.slice(0, 150) + "..." : data?.overview}
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

export default WatchingCard;
