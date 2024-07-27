import { CiFilter } from "react-icons/ci";
import { IoSearch } from "react-icons/io5";
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import Link from "next/link";
import FetchApi from "@lib/FetchApi";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import moment from "moment";
import { useRouter } from "next/navigation";

const fetchSearched = async (searchQuery:string) => {
    try {
      const response = await FetchApi.get(`https://api.themoviedb.org/3/search/multi?query=${searchQuery}&include_adult=false&language=en-US&page=1`);
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.log(error)
    }
  };

export default function Searchbar() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const {
        data: searchedResult,
    } = useQuery<any>({
        queryKey: ['search-bar', searchQuery],
        queryFn: () =>fetchSearched(searchQuery),
    });

    return (
        <div className="searchBar relative z-10">
            <form>
                <section className="flex justify-between gap-1 bg-zinc-800 rounded-full max-w-[700px] m-auto">
                    <span className="p-2">
                        <Link href="/filters" className="rounded-full p-1 px-2 text-sm bg-black/30 transition text-white/60 hover:text-white flex items-center">
                            <CiFilter className="mr-1" /> Filter
                        </Link>
                    </span>
                    <input className="text-white w-full bg-white/0 text-center" placeholder="Search..." type="text" value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} />

                    <button className="pColor mr-1 p-3">
                        <IoSearch className="text-xl" />
                    </button>

                </section>
                {searchQuery && searchedResult && searchedResult.length > 0 && (<>
                <div className="intellesenseOpen intellesense w-full absolute mt-[1px] top-full left-0 overflow-hidden z-[999999]">
                    <div className="w-full max-w-[700px] m-auto bg-zinc-800 rounded-lg">
                    {searchedResult.slice(0,5).map((item:any) => (
                        <div key={item?.id} className="w-full border-b border-b-white/5">
                            <div onClick={()=>{
                                router.push(`/watch-now?type=${item?.media_type?.toLowerCase()}&id=${item?.id}`);
                                setSearchQuery("")
                            }} className="flex gap-2 p-3 transition hover:bg-black/20">
                                <span className="rounded-lg overflow-hidden max-w-[50px] max-h-[50px]">
                                    <img className="w-full block" src={`${item?.poster_path ? "https://image.tmdb.org/t/p/original" + item?.poster_path : "/assets/images/miss.jpg"}`} alt="album" />
                                </span>
                                <span>
                                    <b className="text-white font-semibold">{(item?.title && item.title.length > 40) ? item?.title?.slice(0,40) + "..." : (item?.name && item?.name.length > 40 ) ? item?.name?.slice(0,40) + "..." : item?.name ? item?.name : item?.title}</b>
                                    <section className="text-white/50 flex items-center gap-2">
                                        <p className="text-sm font-light font-light">{item?.media_type === 'movie' ? "Movie" : "TV"} <b>.</b></p>
                                        <p className="text-sm font-light">{item?.media_type === 'movie' ? moment(item?.release_date).year() : moment(item?.first_air_date).year()} <b>.</b></p>
                                        <p className="flex items-center gap-1 text-sm font-light pColor"><FaStar />{item?.vote_average?.toFixed(1)}</p>
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
                             className="transition text-lg font-medium p-2 px-6 rounded-lg inline-flex items-center justify-center pbgColor block w-full">View All Results <BsArrowUpRightCircleFill className="ml-1 text-lg" /></div>
                        </div>
                    </div>
                </div>
                </>)}
            </form>
        </div>
    );
}