import Link from "next/link";
import React from "react";
import FetchApi from "@lib/FetchApi";
import { useQuery } from "@tanstack/react-query";
import { FaMasksTheater } from "react-icons/fa6";
import { TiHome } from "react-icons/ti";
import { HiTrendingUp } from "react-icons/hi";
import { FaRankingStar } from "react-icons/fa6";

const fetchGenre = async (mediaType: string) => {
  try {
    const response = await FetchApi.get(
      `https://api.themoviedb.org/3/genre/${mediaType.toLowerCase()}/list?language=en-US`
    );
    const data = await response.json();
    return data.genres;
  } catch (error) {
    console.log(error);
  }
};

const fetchCountries = async () => {
  try {
    const response = await FetchApi.get(
      `https://api.themoviedb.org/3/configuration/countries?language=en-US`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default function NavBar({ openSideBar, toggleSidebar }: any) {
  const { data: movieGenre } = useQuery<any>({
    queryKey: ["nav-genres", "movie"],
    queryFn: () => fetchGenre("movie"),
  });

  // const {
  //     data: tvGenre,
  // } = useQuery<any>({
  //     queryKey: ['get-genre', 'tv'],
  //     queryFn: () =>fetchGenre('tv'),
  // });

  const { data: countries } = useQuery<any>({
    queryKey: ["nav-country"],
    queryFn: fetchCountries,
  });

  const handleOnCLick = (e: any) => {
    if (e.target.dataset.key !== undefined) {
      toggleSidebar();
    }
  };

  return (
    // <div className={`navSet ${openSideBar ?"navSetOpen" :""} fixed top-0 left-0 z-20 w-full h-screen bg-black/70`}>
    <div
      className={`navSet ${
        openSideBar ? "navSetOpen" : ""
      } absolute top-0 left-0 w-full h-screen`}
      data-key="toggle"
      onClick={handleOnCLick}
    >
      <section className="closeMenu" data-key="close"></section>
      <div className="w-full relative h-0">
        <div className="homewrapper h-0">
          <div className="navSetInner relative top-[80px] left-0 w-[150px] bg-amber-500 flex flex-col rounded-lg py-4 ">
            <Link
              href="/home"
              data-key="home"
              className=" p-2 px-4 hover:bg-[#272727] hover:text-amber-500 font-bold text-black transition bg-amber-500 flex gap-4"
            >
              <TiHome className="w-5 h-5" />
              Home
            </Link>
            <div className="navInners w-full">
              <Link
                href=""
                className="p-2 px-4 hover:bg-[#272727] hover:text-amber-500 font-bold text-black transition flex gap-4 "
              >
                <FaMasksTheater className="w-5 h-5" />
                Genre
              </Link>
              <section className="absolute p-2 flex flex-wrap rounded-lg !bg-[#272727]">
                {movieGenre && movieGenre?.length > 0
                  ? movieGenre?.map((item: any) => (
                      <div key={item.id}>
                        <Link
                          href={`/filters?genre=${item.id}`}
                          data-key="genre"
                          className="rounded-lg p-2 px-4 hover:bg-amber-500 transition text-white/50 hover:text-black"
                        >
                          {item.name}
                        </Link>
                      </div>
                    ))
                  : ""}
              </section>
            </div>
            {/* <div className="navInners w-full">
          <Link
            href=""
            className="p-2 px-4 hover:bg-[#272727] hover:text-amber-500 font-bold text-black transition flex gap-1"
          >
            <TbWorld className="w-5 h-5" />
            Country
          </Link>
          <section className="absolute p-2 flex flex-wrap rounded-lg !bg-[#272727]">
            {countries && countries?.length > 0
              ? countries?.map((item: any) => (
                <div key={item.iso_3166_1}>
                  <Link
                    href={`/filters?country=${item.iso_3166_1}`}
                    data-key="country"
                    className="rounded-lg p-2 px-4 hover:bg-amber-500 transition text-white/50 hover:text-black"
                  >
                    {item.english_name}
                  </Link>
                </div>
              ))
              : ""}
          </section>
        </div> */}
            <Link
              href="/featured"
              data-key="popular"
              className=" p-2 px-4 hover:bg-[#272727] hover:text-amber-500 font-bold text-black transition flex gap-4"
            >
              <FaRankingStar className="w-5 h-5" />
              Hot
            </Link>
            <Link
              href={`/featured?mediaType=movie`}
              data-key="movie"
              className=" p-2 px-4 hover:bg-[#272727] hover:text-amber-500 font-bold text-black transition flex gap-4"
            >
              <HiTrendingUp className="w-5 h-5" />
              Movies
            </Link>
            <Link
              href={`/featured?mediaType=tv`}
              data-key="tv"
              className=" p-2 px-4 hover:bg-[#272727] hover:text-amber-500 font-bold text-black transition flex gap-4"
            >
              <HiTrendingUp className="w-5 h-5" />
              TV Shows
            </Link>
            {/* <Link href="" className="rounded-lg p-2 px-4 hover:bg-amber-500 transition text-white/50 hover:text-black">Top 10 Movies</Link>
                <Link href="" className="rounded-lg p-2 px-4 hover:bg-amber-500 transition text-white/50 hover:text-black">Top 10 TV Episodes</Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}
