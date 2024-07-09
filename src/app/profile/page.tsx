"use client";
import "./profile.css";
import { FaRegUser, FaUserCircle } from "react-icons/fa";
import { GoVideo } from "react-icons/go";
import { FaRegBookmark } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { FaPlayCircle } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { FaRegCirclePlay } from "react-icons/fa6";
import { FaRegFolderOpen } from "react-icons/fa";
import Filters from "@components/Filters";
export default function Profile() {
    return (
        <div className="w-full">
            <div className="w-full">
                <div className="homewrapper">
                    <div className="w-full mt-20 pt-20 flex items-center text-white/50 gap-2">
                        <h2 className="text-white pr-2 text-[30px]">Hi <b className="text-[30px] font-semibold">Ambros Marcos</b></h2>
                        <a href="" className="profileActive px-2 gap-2 py-1 text-white/50 transition hover:text-white border border-1 border-white/10 hover:border-white rounded-lg flex items-center"><FaRegUser /> Profile</a>
                        <a href="" className="px-2 gap-2 py-1 text-white/50 transition hover:text-white border border-1 border-white/10 hover:border-white rounded-lg flex items-center"><GoVideo /> Continue Watching </a>
                        <a href="" className="px-2 gap-2 py-1 text-white/50 transition hover:text-white border border-1 border-white/10 hover:border-white rounded-lg flex items-center"><FaRegBookmark /> Bookmark </a>
                        <a href="" className="px-2 gap-2 py-1 text-white/50 transition hover:text-white border border-1 border-white/10 hover:border-white rounded-lg flex items-center"><IoSettingsOutline /> Settings</a>
                    </div>
                </div>
            </div>
            <div className="w-full">
                <div className="homewrapper">
                    {/* Profile */}
                    <div className="w-full mt-10">
                        <p className="text-white">Put Login Form here for profile tab</p>
                    </div>
                    {/* Continue Watching */}
                    <div className="w-full mt-10">
                        <ul className="w-full flex flex-wrap gap-y-10">
                            <li className="w-1/6 cardSet relative">
                                <span className="relative">
                                    <FaPlayCircle className="opacity-0 transition absolute text-black -mt-5 top-1/2 text-[35px] -ml-5 left-1/2" />
                                    <img className="rounded-xl w-full" src="/assets/images/album1.jpg" alt="album" /><label className="absolute z-10 pbgColor top-5 left-0 font-bold px-2 rounded-r-xl">HD</label></span>
                                <section className="py-2">
                                    <div className="w-full flex items-center justify-between">
                                        <ul className="text-white/50 flex gap-1">
                                            <li className="text-[12px]">EP1</li>
                                            <li className="text-[12px]">/ SS1</li>
                                        </ul>
                                        <ul className="text-white/50 flex gap-1">
                                            <li className="text-[12px] text-amber-500">01:20</li>
                                            <li className="text-[12px] text-white/50">/ 20:00</li>
                                        </ul>
                                    </div>
                                    <div className="w-full p-[1px] bg-white/50 rounded-full relative my-1">
                                        <span className="loader bg-amber-500 w-1/4 absolute w-full h-full rounded-full top-0 left-0"></span>
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
                            </li>
                            <li className="w-1/6 cardSet relative">
                                <span className="relative">
                                    <FaPlayCircle className="opacity-0 transition absolute text-black -mt-5 top-1/2 text-[35px] -ml-5 left-1/2" />
                                    <img className="rounded-xl w-full" src="/assets/images/album1.jpg" alt="album" /><label className="absolute z-10 pbgColor top-5 left-0 font-bold px-2 rounded-r-xl">HD</label></span>
                                <section className="py-2">
                                    <div className="w-full flex items-center justify-between">
                                        <ul className="text-white/50 flex gap-1">
                                            <li className="text-[12px]">EP1</li>
                                            <li className="text-[12px]">/ SS1</li>
                                        </ul>
                                        <ul className="text-white/50 flex gap-1">
                                            <li className="text-[12px] text-amber-500">21:20</li>
                                            <li className="text-[12px] text-white/50">/ 32:03</li>
                                        </ul>
                                    </div>
                                    <div className="w-full p-[1px] bg-white/50 rounded-full relative my-1">
                                        <span className="loader bg-amber-500 w-1/2 absolute w-full h-full rounded-full top-0 left-0"></span>
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
                            </li>
                        </ul>
                    </div>
                    {/* Bookmark */}
                    <div className="w-full mt-10">
                        <div className="w-full flex items-center gap-4 text-white/50">
                            <a href="" className="text-white text-sm py-3 hover:text-white transition">All</a> /
                            <a href="" className="text-sm py-3 hover:text-white transition">Watching</a> /
                            <a href="" className="text-sm py-3 hover:text-white transition">Plan to Watch</a> /
                            <a href="" className="text-sm py-3 hover:text-white transition">Completed</a> /
                            <a href=""><FaRegFolderOpen className="text-white/60 hover:text-white transition" /></a>
                        </div>
                        <Filters />
                        <ul className="w-full flex flex-wrap gap-y-10">
                            <li className="w-1/6 cardSet relative">
                                <span className="relative">
                                    <FaPlayCircle className="opacity-0 transition absolute text-black -mt-5 top-1/2 text-[35px] -ml-5 left-1/2" />
                                    <img className="rounded-xl w-full" src="/assets/images/album1.jpg" alt="album" /><label className="absolute z-10 pbgColor top-5 left-0 font-bold px-2 rounded-r-xl">HD</label></span>
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
                            </li>
                        </ul>
                    </div>
                    {/* Settings */}
                    <div className="w-full mt-10">
                        <div className="w-full max-w-[500px] rounded-lg bg-black/50 m-auto p-10">
                            <h2 className="text-white/50 text-[30px] mb-4">Settings</h2>
                            <div className="full flex items-center justify-between py-2">
                                <label className="text-white/50 text-sm">Show Continue Watching in Home page</label>
                                <input
                                    className="relative mr-2 mt-[0.3rem] h-[28px] w-[48px] appearance-none rounded-full bg-white before:pointer-events-none before:absolute before:h-[28px] before:w-[48px] before:rounded-full before:bg-transparent before:content-[''] after:absolute after:right-[20px] after:z-[2] after:m-1 after:h-[20px] after:w-[20px] after:rounded-full after:border-none after:bg-black after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-amber-500 checked:after:absolute checked:after:right-0 checked:after:z-[2] checked:after:m-1 checked:after:h-[20px] checked:after:w-[20px] checked:after:rounded-full checked:after:border-none checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:after:absolute focus:after:z-[1] focus:after:block"
                                    type="checkbox"
                                    role="switch"
                                    id="flexSwitchCheckDefault" />
                            </div>
                            <div className="full flex items-center justify-between py-2">
                                <label className="text-white/50 text-sm">Auto Play</label>
                                <input
                                    className="relative mr-2 mt-[0.3rem] h-[28px] w-[48px] appearance-none rounded-full bg-white before:pointer-events-none before:absolute before:h-[28px] before:w-[48px] before:rounded-full before:bg-transparent before:content-[''] after:absolute after:right-[20px] after:z-[2] after:m-1 after:h-[20px] after:w-[20px] after:rounded-full after:border-none after:bg-black after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-amber-500 checked:after:absolute checked:after:right-0 checked:after:z-[2] checked:after:m-1 checked:after:h-[20px] checked:after:w-[20px] checked:after:rounded-full checked:after:border-none checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:after:absolute focus:after:z-[1] focus:after:block"
                                    type="checkbox"
                                    role="switch"
                                    id="flexSwitchCheckDefault" />
                            </div>
                            <div className="full flex items-center justify-between py-2">
                                <label className="text-white/50 text-sm">Auto Next</label>
                                <input
                                    className="relative mr-2 mt-[0.3rem] h-[28px] w-[48px] appearance-none rounded-full bg-white before:pointer-events-none before:absolute before:h-[28px] before:w-[48px] before:rounded-full before:bg-transparent before:content-[''] after:absolute after:right-[20px] after:z-[2] after:m-1 after:h-[20px] after:w-[20px] after:rounded-full after:border-none after:bg-black after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-amber-500 checked:after:absolute checked:after:right-0 checked:after:z-[2] checked:after:m-1 checked:after:h-[20px] checked:after:w-[20px] checked:after:rounded-full checked:after:border-none checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:after:absolute focus:after:z-[1] focus:after:block"
                                    type="checkbox"
                                    role="switch"
                                    id="flexSwitchCheckDefault" />
                            </div>
                            <div className="full py-2">
                                <div className="w-full flex items-center justify-between">
                                    <label className="text-white/50 text-sm">Auto Skip Intro</label>
                                    <input
                                    className="relative mr-2 mt-[0.3rem] h-[28px] w-[48px] appearance-none rounded-full bg-white before:pointer-events-none before:absolute before:h-[28px] before:w-[48px] before:rounded-full before:bg-transparent before:content-[''] after:absolute after:right-[20px] after:z-[2] after:m-1 after:h-[20px] after:w-[20px] after:rounded-full after:border-none after:bg-black after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-amber-500 checked:after:absolute checked:after:right-0 checked:after:z-[2] checked:after:m-1 checked:after:h-[20px] checked:after:w-[20px] checked:after:rounded-full checked:after:border-none checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:after:absolute focus:after:z-[1] focus:after:block"
                                    type="checkbox"
                                    role="switch"
                                    id="flexSwitchCheckDefault" />
                                    </div>
                                <p className="font-light text-white/50 text-[14px] pt-2">The skip time is contributed by the community so it may not available in all episodes and may be wrong sometimes.
                                    Please help us by improving it if possible.</p>
                            </div>
                            <div className="full py-3">
                                <div className="w-full flex items-center justify-between">
                                    <label className="text-white/50 text-sm">Auto Next</label>
                                    <input type="number" value="10" className="text-[14px] rounded-md p-2 bg-zinc-800 transition text-white" />
                                </div>
                                <p className="font-light text-white/50 text-[14px] pt-2">Number of seconds to skip backward/forward when pressing J or L button on watch page.</p>
                            </div>
                            <div className="full py-3">
                                <button className="p-3 rounded-lg pbgColor text-black w-full text-lg">Save Settings</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}