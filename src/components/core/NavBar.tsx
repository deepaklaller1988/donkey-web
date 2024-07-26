import Link from 'next/link';
import React from 'react'
import { IoMdClose } from "react-icons/io";
import FetchApi from "@lib/FetchApi";
import { useQuery } from '@tanstack/react-query';

const fetchGenre = async (mediaType:string) => {
    try {
      const response = await FetchApi.get(`https://api.themoviedb.org/3/genre/${mediaType.toLowerCase()}/list?language=en-US`);
      const data = await response.json();
      return data.genres;
    } catch (error) {
      console.log(error)
    }
  };


  const fetchCountries = async () => {
    try {
      const response = await FetchApi.get(`https://api.themoviedb.org/3/configuration/countries?language=en-US`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error)
    }
  };


export default function NavBar({ openSideBar ,toggleSidebar}: any) {
    const {
        data: movieGenre,
    } = useQuery<any>({
        queryKey: ['nav-genres', 'movie'],
        queryFn: () =>fetchGenre('movie'),
    });

    // const {
    //     data: tvGenre,
    // } = useQuery<any>({
    //     queryKey: ['get-genre', 'tv'],
    //     queryFn: () =>fetchGenre('tv'),
    // });

    const {
        data: countries,
    } = useQuery<any>({
        queryKey: ['nav-country'],
        queryFn: fetchCountries,
    });


    return (
        // <div className={`navSet ${openSideBar ?"navSetOpen" :""} fixed top-0 left-0 z-20 w-full h-screen bg-black/70`}>
        <div className={`navSet ${openSideBar ?"navSetOpen" :""} fixed top-0 left-0 w-full h-screen`}>
            <section className='closeMenu'  onClick={toggleSidebar}></section>
            <div className="navSetInner fixed top-[80px] left-[20px] w-[200px] bg-zinc-800 flex flex-col rounded-lg">
                <Link href="/home" className="rounded-lg p-2 px-4 hover:bg-amber-500 transition text-black bg-amber-500">Home</Link>
                <div className='navInners w-full'>
                <Link href="" className="rounded-lg block p-2 px-4 hover:bg-amber-500 transition text-white/50 hover:text-black">Genre</Link>
                <section className='absolute p-2 flex flex-wrap rounded-lg'>
                    {movieGenre && movieGenre?.length > 0 ? movieGenre?.map((item: any) =>(
                        <div key={item.id}>
                            <Link href={`/filters?genre=${item.id}`} className="rounded-lg p-2 px-4 hover:bg-amber-500 transition text-white/50 hover:text-black">{item.name}</Link>
                        </div>
                    )) : ""}
                </section>
                </div>
                <div className='navInners w-full'>
                <Link href="" className="rounded-lg block p-2 px-4 hover:bg-amber-500 transition text-white/50 hover:text-black">Country</Link>
                <section className='absolute p-2 flex flex-wrap rounded-lg'>
                {countries && countries?.length > 0 ? countries?.map((item: any) =>(
                        <div key={item.iso_3166_1}>
                            <Link href={`/filters?country=${item.iso_3166_1}`} className="rounded-lg p-2 px-4 hover:bg-amber-500 transition text-white/50 hover:text-black">{item.english_name}</Link>
                        </div>
                    )) : ""}
                
                </section>
                </div>
                <Link href={`/filters?mediaType=movie`} className="rounded-lg p-2 px-4 hover:bg-amber-500 transition text-white/50 hover:text-black">Movies</Link>
                <Link href={`/filters?mediaType=tv`} className="rounded-lg p-2 px-4 hover:bg-amber-500 transition text-white/50 hover:text-black">TV Shows</Link>
                <Link href="/filters" className="rounded-lg p-2 px-4 hover:bg-amber-500 transition text-white/50 hover:text-black">Popular</Link>
                {/* <Link href="" className="rounded-lg p-2 px-4 hover:bg-amber-500 transition text-white/50 hover:text-black">Top 10 Movies</Link>
                <Link href="" className="rounded-lg p-2 px-4 hover:bg-amber-500 transition text-white/50 hover:text-black">Top 10 TV Episodes</Link> */}
            </div>
        </div>
    )
}
