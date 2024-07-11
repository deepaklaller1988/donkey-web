"use client"
import React from 'react'
import { FaPlayCircle } from "react-icons/fa";
import { IoIosAddCircleOutline, IoIosArrowRoundForward, IoMdClose } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { FaRegCirclePlay } from "react-icons/fa6";
import ProfileTab from '@components/core/ProfileTab';


export default function ContinueWatchingPage() {
    return (
        <>
            <ProfileTab activeTab="watching" />
            <div className="w-full mt-28">
                <ul className="w-full flex flex-wrap gap-y-10">
                    <li className="w-1/6 cardSet relative">
                        <span className="relative">
                            <FaPlayCircle className="opacity-0 transition absolute text-black -mt-5 top-1/2 text-[35px] -ml-5 left-1/2" />
                            <img className="rounded-xl w-full" src="/assets/images/album1.jpg" alt="album" /><label className="absolute z-0 pbgColor top-5 left-0 font-bold px-2 rounded-r-xl">HD</label></span>
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
                            <img className="rounded-xl w-full" src="/assets/images/album1.jpg" alt="album" /><label className="absolute z-0 pbgColor top-5 left-0 font-bold px-2 rounded-r-xl">HD</label></span>
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
        </>

    )
}
