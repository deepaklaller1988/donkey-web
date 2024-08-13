import { CiFilter } from "react-icons/ci";
import { IoSearch } from "react-icons/io5";
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import Link from "next/link";
import FetchApi from "@lib/FetchApi";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import moment from "moment";
import { useRouter } from "next/navigation";
import Image from "next/image";

const apiKey =process.env.NEXT_PUBLIC_MDBKEY;

const fetchSearched = async (searchQuery: string) => {
    try {
      const response = await FetchApi.get(`https://api.themoviedb.org/3/search/multi?query=${searchQuery}&include_adult=false&language=en-US&page=1`);
      const data = await response.json();
  
      if (data.results && data.results.length > 0) {
        const ndata = await Promise.all(
          data.results.map(async (item: any) => {
            let certificate = null;
            // let imdbRating = null;
  
            // const certificateResponse = await fetch(`https://mdblist.com/api/?apikey=${apiKey}&tm=${item?.id}&m=${item?.media_type === 'movie' ? 'movie' : 'show'}`);
            // const certificateData = await certificateResponse.json();
            // certificate = certificateData.certification || null;
  
            // if (certificateData) {
            //   if (certificateData.ratings && certificateData.ratings.length > 0) {
            //     const imdbRatingObj = certificateData.ratings.find((rating: any) => rating.source === "imdb");
            //     imdbRating = imdbRatingObj ? imdbRatingObj.value : null;
            //   }
            // }
  
            return {
              ...item,
              certificate,
              // imdb_rating: imdbRating,
            };
          })
        );
  
        return ndata;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  };
  

export default function HomeSearchbar({path}:any) {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [showResult, setShowResults] = useState<any>();
    const {
        data: searchedResult,
    } = useQuery<any>({
        queryKey: ['search-bar', searchQuery],
        queryFn: () =>fetchSearched(searchQuery),
    });

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
          router.push(`/media/search?query=${encodeURIComponent(searchQuery)}`);
          setSearchQuery('');  // Clear the input field after search
        }
      };

      const handleClickOutside = (event:any) => {
        const element = document.getElementById('search-area-id');
        const element1 = document.getElementById('search-id');
        const element2 = document.getElementById('search-area');

        if (element && element1 && element2 && !element.contains(event.target) && !element1.contains(event.target) && !element2.contains(event.target)) {
          setShowResults(false);
        }
      };

      useEffect(() => {
        if(searchedResult && searchedResult?.length > 0){
          setShowResults(true);
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [searchedResult]);

    return (
        <div className="searchBar w-full px-4 relative z-10">
                <section className={`flex justify-between ${path=="/home"?"bg-[#1C1C1C]/50":"bg-[#1C1C1C]"} rounded-full max-w-[520px] m-auto`}>
                    <span className="p-2">
                        <Link href="/filters" className="rounded-full p-1 px-2 text-sm bg-[#121212] transition text-white/60 hover:text-white flex items-center">
                            <CiFilter className="mr-1" /> Filter
                        </Link>
                    </span>
                    <input id="search-id" className="text-white w-full bg-white/0 text-center" autoComplete="off" placeholder="Search..." type="text" value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} onKeyDown={handleKeyDown} />
                    <button  className="pColor mr-1 p-3">
                        <IoSearch className="text-xl" id="search-area" onClick={()=>{
                          if (searchQuery){
                            router.push(`/media/search?query=${searchQuery}`);
                            setSearchQuery("")
                          }
                            }}/>
                    </button>
                </section>
                {searchQuery && searchedResult && searchedResult.length > 0 && showResult && (<>
               <div className="intellesenseOpen intellesense w-full absolute mt-[1px] top-full left-0 overflow-hidden z-[999999]">
                    <div className="w-full max-w-full md:max-w-[520px] m-auto bg-zinc-800 rounded-lg"  id="search-area-id">
                        {searchedResult.slice(0,5).map((item:any) => (
                        <div key={item?.id} className="w-full border-b border-b-white/5">
                            <div onClick={()=>{
                                router.push(`/watch-now?type=${item?.media_type?.toLowerCase()}&id=${item?.id}`);
                                setSearchQuery("")
                            }} className="flex gap-2 p-3 transition hover:bg-black/20">
                                <span className="rounded-lg overflow-hidden max-w-[50px] max-h-[50px]">
                                   <Image className="w-full block" width={100} height={40} src={`${item?.poster_path ? "https://image.tmdb.org/t/p/original" + item?.poster_path : "/assets/images/miss.jpg"}`} alt="album" />
                                </span>
                                <span>
                                    <b className="text-white font-semibold">{(item?.title && item.title.length > 40) ? item?.title?.slice(0,40) + "..." : (item?.name && item?.name.length > 40 ) ? item?.name?.slice(0,40) + "..." : item?.name ? item?.name : item?.title}</b>
                                    <section className="text-white/50 flex items-center gap-2">
                                        <p className="text-sm font-light">{item?.media_type === 'movie' ? "Movie" : "TV"} <b>.</b></p>
                                        <p className="text-sm font-light">{item?.media_type === 'movie' ? moment(item?.release_date).year() : moment(item?.first_air_date).year()} </p>
                                        {/* <p className="flex items-center gap-1 text-sm font-light pColor"><FaStar />{item?.imdb_rating ? item?.imdb_rating?.toFixed(1) : item?.vote_average?.toFixed(1)}</p> */}
                                    </section>
                                </span>
                            </div>
                        </div>
                        ))}
                        <div className="w-full text-center p-3">
                            <div onClick={()=>{
                                router.push(`/media/search?query=${searchQuery}`);
                                setSearchQuery("")
                            }}
                             className="transition text-lg font-medium p-2 px-6 rounded-lg inline-flex items-center justify-center pbgColor w-full">View All Results <BsArrowUpRightCircleFill className="ml-1 text-lg" /></div>
                        </div>
                    </div>
                </div> 
                </>)}
        </div>
    );
}