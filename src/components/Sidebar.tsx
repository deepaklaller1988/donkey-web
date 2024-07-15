"use client";
import {useQuery, useQueries} from '@tanstack/react-query';
import FetchApi from "@lib/FetchApi";
import SidebarCard from "./core/SidebarCard";
import { useState } from 'react';
import { HiTrendingUp } from "react-icons/hi";

const fetchTop10List = async (mediaType: string, interval:string = "day") => {
    try {
      const response = await FetchApi.get(`https://api.themoviedb.org/3/trending/${mediaType.toLowerCase()}/${interval}?language=en-US`);
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.log(error)
    }
  };


export default function Sidebar({mediaType}: any) {
    const [interval,setInterval] = useState<string>("day")
    const {
        isLoading,
        data: topList,
    } = useQuery({
        queryKey: ['top-10', mediaType, interval],
        queryFn: () => fetchTop10List(mediaType, interval),
    });
    return (
        <div className="w-full">
            <div className="flex items-center gap-4 justify-between">
                <h3 className="text-white text-[25px] font-semibold flex items-center gap-1"><HiTrendingUp className='mr-1 text-amber-500 w-8 h-8'/>{mediaType === 'Movie' ? 'MOVIES' : 'TV SHOWS'}</h3>
                <section className="flex gap-2">
                    <button className={`${interval === 'day' ? "pbgColor rounded-full text-black px-2" : "border border-1 rounded-full text-white px-2 hover:bg-white hover:text-black transition"}`} onClick={()=>setInterval("day")} >Day</button>
                    <button className={`${interval === 'week' ? "pbgColor rounded-full text-black px-2" : "border border-1 rounded-full text-white px-2 hover:bg-white hover:text-black transition"}`} onClick={()=>setInterval("week")} >Week</button>
                    {/* <button className="border border-1 rounded-full text-white px-2 hover:bg-white hover:text-black transition">Month</button> */}
                </section>
            </div>
            <ul className="flex flex-col gap-3 py-2 mt-[10px]">
                {topList && topList.length > 0 ? topList.slice(0,10).map((item: any, index:number) => (
                    <>
                    <SidebarCard movieId={item.id} mediaType={mediaType} index={index+1} />
                    </>
                )) : ""}
            </ul>
        </div>
    );
}