"use client";
import { IoMdArrowDroprightCircle } from "react-icons/io";
import "./homeEnter.css";
import Searchbar from "@components/Searchbar";
import useTitle from "@hooks/useTitle";
import SocialButton from "@components/SocialButton";
export default function Home() {
    useTitle("Dashboard");
    return (<>
        <div className="enterHome h-full w-full p-0 py-4 md:p-6 md:py-10">
            <div className="wrapper">
                <div className="enterHomeInner bg-zinc-900 rounded-[30px]">
                    <div className="w-full p-4 md:p-10">
                        <div className="enterHeader">
                            <a href="" className="w-[120px] md:w-[150px] block m-auto"><img className="max-w-full" src="/assets/images/logo.png" alt="logo" /></a>
                        </div>
                        <h1 className="text-[18px] md:text-[26px] font-medium text-center py-5 text-white/40">Watch HD Movies & TV Shows online for Free!</h1>
                        <Searchbar />
                        <div className="w-full text-center">
                            <a href="/home" className="transition text-lg font-medium p-2 px-6 rounded-lg inline-flex items-center pbgColor m-auto mt-5">Go to Homepage <IoMdArrowDroprightCircle className="ml-1 text-xl" /></a>
                        </div>
                    </div>
                    <div className="w-full py-6 px-2 md:py-6 md:px-2 bg-black/50">
                        <div className="wrapper">
                            <h3 className="text-white/30 text-center">Share Donkey with your Friends!</h3>
                            <div className="w-full mt-2 text-white text-center">
                              <SocialButton/>
                            </div>
                        </div>
                    </div>
                    <div className="w-full p-2 py-6 md:p-6 md:py-10">
                        <div className="wrapper">
                            <h2 className="text-white/80 text-lg md:text-xl mb-1 font-regular drop-shadow-[1px_1px_0_rgb(255,0,0)]">100% Free - No Registeration Required</h2>
                            <p className="text-white/50 py-2">Welcome to Donkey – the ultimate destination for global entertainment! Enjoy a diverse collection of movies and TV shows from various genres, with regular updates and compatibility on any device. Experience high-quality, buffer-free streaming with multiple language subtitles. For added convenience, create a free account to bookmark favorites and keep a 'Continue Watching' list. Join our vibrant community and explore a world of cinematic wonders today!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}