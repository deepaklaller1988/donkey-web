// "use client"
// import React, { useState } from "react";
// import { FaPlayCircle } from "react-icons/fa";
// import { FaRegCirclePlay } from "react-icons/fa6";
// import { IoIosAddCircleOutline } from "react-icons/io";
// import { FaStar } from "react-icons/fa";
// import { IoIosArrowRoundBack } from "react-icons/io";
// import { IoIosArrowRoundForward } from "react-icons/io";
// import Recommended from "@components/Recommended";
// // import "./album-detail.css";
// import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
// interface Season {
//     name: string;
//     code: string;
// }
// export default function FiltersPage() {
//     const [selectedSeason, setSelectedSeason] = useState<Season | null>(null);
//     const seasons: Season[] = [
//         { name: 'Season 1', code: '1' },
//         { name: 'Season 2', code: '2' },
//         { name: 'Season 3', code: '3' },
//         { name: 'Season 4', code: '4' },
//         { name: 'Season 5', code: '5' },
//     ];
//     return (
//         <div className="w-full">
//             <div className="w-full pt-20">
//                 <section className="relative">
//                     <img className="bgAlbumDetail" src="assets/images/slides/1.jpg" alt="Video" />
//                     <div className="w-full h-full absolute top-0 left-0">
//                         <div className="homewrapper relative z-10">
//                             <div className="w-full">
//                                 <iframe className="w-full h-[700px] mt-5 rounded-lg" src="https://www.youtube.com/embed/a12DMAs5U_c?si=PF8d0y9qS_63Qvss" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
//                             </div>
//                         </div>
//                         <div className="absolute w-full z-0 left-0 bottom-0"><img src="/assets/images/slides/shadow.png" alt="shadow" /></div>
//                     </div>
//                 </section>
//             </div>
//             <div className="w-full">
//                 <div className="homewrapper">
//                     <div className="w-full flex flex-col lg:flex-row gap-5">
//                         <div className="w-full flex flex-col md-flex-row gap-5">
//                             <section className="min-w-[270px]">
//                                 <img className="w-full rounded-lg" src="assets/images/album1.jpg" alt="album" />
//                             </section>
//                             <section>
//                                 <div className="w-full flex gap-5 justify-between">
//                                     <section>
//                                         <h3 className="text-white text-[25px] font-semibold">Craig of the Creek</h3>
//                                         <ul className="py-1 flex flex-wrap text-white gap-4 font-light"><li><b className="font-bold">2024</b></li><li>118 min</li><li>Action</li><li>Comedy</li><li>Crime</li><li><span className="flex items-center gap-2 text-white font-semibold pColor"><FaStar /> 7.2</span></li><li><label className="rounded-full pbgColor text-black font-bold px-2">HD</label></li></ul>
//                                     </section>
//                                     <section className="bg-[#272727] rounded-lg text-center p-2 px-4 flex flex-col justify-center items-center gap-2">
//                                         <span className="flex gap-1">
//                                             <FaStar className="text-amber-500 w-5 h-5" />
//                                             <FaStar className="text-amber-500 w-5 h-5" />
//                                             <FaStar className="text-amber-500 w-5 h-5" />
//                                             <FaStar className="text-amber-500 w-5 h-5" />
//                                             <FaStar className="text-white/20 w-5 h-5" />
//                                         </span>
//                                         <p className="text-white/50 text-sm"><b className="text-sm">8.56</b> of <b className="text-sm">10</b> (723 reviews)</p>
//                                     </section>
//                                 </div>
//                                 <div className="w-full">
//                                     <p className="text-white/50 mt-3 font-light">Craig of the Creek follows a young boy, Craig, and his two friends, Kelsey and JP, as they go on adventures within a world of untamed, kid-dominated wilderness in the creek.</p>
//                                 </div>
//                                 <div className="w-full">
//                                     <div className="w-full p-5 pl-0 mt-5 border-t border-1 border-white/5 text-white/50">
//                                         <p>Type: <label className="text-white font-light">
//                                             <a href="" className="transition hover:text-amber-500">TV</a></label></p>
//                                         <p>Country: <label className="text-white font-light">
//                                             <a href="" className="transition hover:text-amber-500">
//                                                 United States</a>,
//                                             <a href="" className="transition hover:text-amber-500">
//                                                 Spain</a></label></p>
//                                         <p>Genre: <label className="text-white font-light">
//                                             <a href="" className="transition hover:text-amber-500">Animation</a>, <a href="" className="transition hover:text-amber-500">Comedy</a></label></p>
//                                         <p>Release: <label className="text-white font-light">Mar 30, 2018</label></p>
//                                         <p>Director: <label className="text-white font-light">N/A</label></p>
//                                         <p>Production: <label className="text-white font-light">
//                                             <a href="" className="transition hover:text-amber-500">
//                                                 Cartoon Network Studios</a>, <a href="" className="transition hover:text-amber-500">
//                                                 Network Studios</a></label></p>
//                                         <p>Cast: <label className="text-white font-light">
//                                             <a href="" className="transition hover:text-amber-500">Philip Solomon</a>,
//                                             <a href="" className="transition hover:text-amber-500">
//                                                 Noël Wells</a>
//                                         </label></p>
//                                         <p>Tags: <label className="text-white font-light">
//                                             <a href="" className="transition hover:text-amber-500">N/A</a></label></p>
//                                         <p className="text-white/50 font-light pt-2">A group of high-end professional thieves start to feel the heat from the LAPD when they unknowingly leave a verbal clue at their latest heist. Ccraig of the creek online tv download, watch craig of the creek online, craig of the creek watch online, craig of the creek free download, craig of the creek online streaming, craig of the creek download free</p>
//                                     </div>
//                                 </div>
//                             </section>
//                         </div>
//                         <div className="min-w-full md:min-w-[376px]">
//                             <div className="w-full bg-[#272727] rounded-lg">
//                                 <section className="episodeSelectionMain flex items-center justify-center text-white">
//                                     <Dropdown value={selectedSeason} onChange={(e: DropdownChangeEvent) => setSelectedSeason(e.value)} options={seasons} optionLabel="name"
//                                         placeholder="Season 1" className="episodeSelection p-3 px-20" />
//                                 </section>
//                                 <section className="episodeLists bg-neutral-950 max-h-[500px] overflow-auto">
//                                     <ul className="text-white/50">
//                                         <li><a className="text-[14px] py-3 px-4 block" href="">Episode 1: Itch To Explore</a><span>12/04/2024</span></li>
//                                         {/* <li><a className="text-[14px] py-3 px-4 block" href="">Episode 2: You're It</a><span>12/04/2024</span></li> */}
//                                         <li>
//                                             <a className="text-[14px] py-3 px-4 block" href="">Episode 2: You&apos;re It</a>
//                                             <span>12/04/2024</span>
//                                         </li>

//                                         <li className="episodeActive"><a className="text-[14px] py-3 px-4 block" href="">Episode 3: Jessica Goes to the Creek</a><span>12/04/2024</span></li>
//                                         <li><a className="text-[14px] py-3 px-4 block" href="">Episode 4: The Final Book</a><span>12/04/2024</span></li>
//                                         <li><a className="text-[14px] py-3 px-4 block" href="">Episode 5: Too Many Treasures</a><span>12/04/2024</span></li>
//                                         <li><a className="text-[14px] py-3 px-4 block" href="">Episode 6: Wildernessa</a><span>12/04/2024</span></li>
//                                         <li><a className="text-[14px] py-3 px-4 block" href="">Episode 7: Sunday Clothes</a><span>12/04/2024</span></li>
//                                         <li><a className="text-[14px] py-3 px-4 block" href="">Episode 1: Itch To Explore</a><span>12/04/2024</span></li>
//                                         <li>
//                                             <a className="text-[14px] py-3 px-4 block" href="">Episode 2: You&apos;re It</a>
//                                             <span>12/04/2024</span>
//                                         </li>

//                                         {/* <li><a className="text-[14px] py-3 px-4 block" href="">Episode 2: You're It</a><span>12/04/2024</span></li> */}
//                                         <li><a className="text-[14px] py-3 px-4 block" href="">Episode 3: Jessica Goes to the Creek</a><span>12/04/2024</span></li>
//                                         <li><a className="text-[14px] py-3 px-4 block" href="">Episode 4: The Final Book</a><span>12/04/2024</span></li>
//                                         <li><a className="text-[14px] py-3 px-4 block" href="">Episode 5: Too Many Treasures</a><span>12/04/2024</span></li>
//                                         <li><a className="text-[14px] py-3 px-4 block" href="">Episode 6: Wildernessa</a><span>12/04/2024</span></li>
//                                         <li><a className="text-[14px] py-3 px-4 block" href="">Episode 7: Sunday Clothes</a><span>12/04/2024</span></li>
//                                     </ul>
//                                 </section>
//                                 <section className="flex text-white gap-5 justify-between items-center p-2 px-4">
//                                     <label>Go to episode</label>
//                                     <div className="nextPrev flex gap-3 items-center text-white/50">
//                                         <a href=""><IoIosArrowRoundBack className="w-8 h-8" /></a>
//                                         <a href="">1</a>
//                                         <a href="">2</a>
//                                         <a href=""><IoIosArrowRoundForward className="w-8 h-8 text-amber-500" /></a>
//                                     </div>
//                                 </section>

//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="w-full">
//                 {/* <div className="bg-white/10 h-[80px]"><Header /></div> */}
//                 <div className="w-full mt-20">
//                     <div className="homewrapper">
//                         <div className="containerHub flex gap-5 flex-col lg:flex-row">
//                             <div className="w-full">
//                                 <div className="w-full">
//                                     <div className="flex items-center gap-4">
//                                         <h3 className="text-white text-[25px] font-semibold">LATEST MOVIES</h3>
//                                     </div>
//                                     <div className="w-full py-2">
//                                         <ul className="w-full flex flex-wrap gap-y-5 md:gap-y-10">

//                                             <li className="w-1/5 cardSet relative">
//                                                 <span className="relative">
//                                                     {/* <FaPlayCircle className="opacity-0 transition absolute text-black -mt-5 top-1/2 text-[35px] -ml-5 left-1/2" /> */}
//                                                     <img className="rounded-xl w-full" src="/assets/images/album1.jpg" alt="album" /><label className="absolute z-0 pbgColor top-5 left-0 font-bold px-2 rounded-r-xl">HD</label></span>
//                                                 <section className="py-2">
//                                                     <b className="text-white font-semibold">Faraway Downs 100</b>
//                                                     <ul className="text-gray-500 flex gap-2">
//                                                         <li className="text-sm">TV</li>.
//                                                         <li className="text-sm">EP1</li>.
//                                                         <li className="text-sm">SS1</li>
//                                                     </ul>
//                                                 </section>
//                                                 <div className="albumDetail absolute bg-zinc-800 rounded-xl top-20 left-full z-50 w-[350px]">
//                                                     <div className="w-full p-5 relative">
//                                                         <section className="pr-12">
//                                                             <h2 className="text-white text-lg">Presumed Innocent</h2>
//                                                             <ul className='py-1 flex items-center text-white gap-4 font-light'>
//                                                                 <li><b className='font-bold text-sm'>2024</b></li>
//                                                                 <li className=" text-sm">102min</li>
//                                                                 <li><label className='flex items-center gap-2 text-white text-sm font-semibold'><FaStar /> 4.4</label></li>
//                                                                 <li><label className=' text-sm rounded-full pbgColor text-black font-bold px-2'>HD</label></li>
//                                                             </ul>
//                                                         </section>
//                                                         <label className="absolute right-5 top-1/2">
//                                                             <IoIosAddCircleOutline className="text-white w-6 h-6 -mt-3" />
//                                                         </label>
//                                                     </div>
//                                                     <div className="w-full p-5 border-t border-1 border-white/5 text-white/50">
//                                                         <p>Country: <label className="text-white font-light">United States</label></p>
//                                                         <p>Genre: <label className="text-white font-light">United States</label></p>
//                                                         <p>Scores: <label className="text-white font-light">8.38 by 740 reviews</label></p>
//                                                         <p className='text-white/50 font-light pt-2'>A group of high-end professional thieves start to feel the heat from the LAPD when they unknowingly leave a verbal clue at their latest heist.</p>
//                                                         <button className='text-black flex items-center gap-2 pbgColor px-6 py-2 rounded-full transition m-auto mt-4 mb-2 font-bold'>Play <FaRegCirclePlay className='text-xl' /></button>
//                                                     </div>
//                                                 </div>
//                                             </li>
//                                             <li className="w-1/5 cardSet">
//                                                 <span className="relative">
//                                                     {/* <FaPlayCircle className="opacity-0 transition absolute text-black -mt-5 top-1/2 text-[35px] -ml-5 left-1/2" /> */}
//                                                     <img className="rounded-xl w-full" src="/assets/images/album1.jpg" alt="album" /><label className="absolute z-0 pbgColor top-5 left-0 font-bold px-2 rounded-r-xl">HD</label></span>
//                                                 <section className="py-2">
//                                                     <b className="text-white font-semibold">Faraway Downs 100</b>
//                                                     <ul className="text-gray-500 flex gap-2">
//                                                         <li className="text-sm">TV</li>.
//                                                         <li className="text-sm">EP1</li>.
//                                                         <li className="text-sm">SS1</li>
//                                                     </ul>
//                                                 </section>
//                                             </li>
//                                             <li className="w-1/5 cardSet">
//                                                 <span className="relative">
//                                                     {/* <FaPlayCircle className="opacity-0 transition absolute text-black -mt-5 top-1/2 text-[35px] -ml-5 left-1/2" /> */}
//                                                     <img className="rounded-xl w-full" src="/assets/images/album1.jpg" alt="album" /><label className="absolute z-0 pbgColor top-5 left-0 font-bold px-2 rounded-r-xl">HD</label></span>
//                                                 <section className="py-2">
//                                                     <b className="text-white font-semibold">Faraway Downs 100</b>
//                                                     <ul className="text-gray-500 flex gap-2">
//                                                         <li className="text-sm">TV</li>.
//                                                         <li className="text-sm">EP1</li>.
//                                                         <li className="text-sm">SS1</li>
//                                                     </ul>
//                                                 </section>
//                                             </li>
//                                             <li className="w-1/5 cardSet">
//                                                 <span className="relative">
//                                                     <FaPlayCircle className="opacity-0 transition absolute text-black -mt-5 top-1/2 text-[35px] -ml-5 left-1/2" />
//                                                     <img className="rounded-xl w-full" src="/assets/images/album1.jpg" alt="album" /><label className="absolute z-0 pbgColor top-5 left-0 font-bold px-2 rounded-r-xl">HD</label></span>
//                                                 <section className="py-2">
//                                                     <b className="text-white font-semibold">Faraway Downs 100</b>
//                                                     <ul className="text-gray-500 flex gap-2">
//                                                         <li className="text-sm">TV</li>.
//                                                         <li className="text-sm">EP1</li>.
//                                                         <li className="text-sm">SS1</li>
//                                                     </ul>
//                                                 </section>
//                                             </li>
//                                             <li className="w-1/5 cardSet">
//                                                 <span className="relative">
//                                                     <FaPlayCircle className="opacity-0 transition absolute text-black -mt-5 top-1/2 text-[35px] -ml-5 left-1/2" />
//                                                     <img className="rounded-xl w-full" src="/assets/images/album1.jpg" alt="album" /><label className="absolute z-0 pbgColor top-5 left-0 font-bold px-2 rounded-r-xl">HD</label></span>
//                                                 <section className="py-2">
//                                                     <b className="text-white font-semibold">Faraway Downs 100</b>
//                                                     <ul className="text-gray-500 flex gap-2">
//                                                         <li className="text-sm">TV</li>.
//                                                         <li className="text-sm">EP1</li>.
//                                                         <li className="text-sm">SS1</li>
//                                                     </ul>
//                                                 </section>
//                                             </li>
//                                             <li className="w-1/5 cardSet">
//                                                 <span className="relative">
//                                                     <FaPlayCircle className="opacity-0 transition absolute text-black -mt-5 top-1/2 text-[35px] -ml-5 left-1/2" />
//                                                     <img className="rounded-xl w-full" src="/assets/images/album1.jpg" alt="album" /><label className="absolute z-0 pbgColor top-5 left-0 font-bold px-2 rounded-r-xl">HD</label></span>
//                                                 <section className="py-2">
//                                                     <b className="text-white font-semibold">Faraway Downs 100</b>
//                                                     <ul className="text-gray-500 flex gap-2">
//                                                         <li className="text-sm">TV</li>.
//                                                         <li className="text-sm">EP1</li>.
//                                                         <li className="text-sm">SS1</li>
//                                                     </ul>
//                                                 </section>
//                                             </li>
//                                             <li className="w-1/5 cardSet">
//                                                 <span className="relative">
//                                                     <FaPlayCircle className="opacity-0 transition absolute text-black -mt-5 top-1/2 text-[35px] -ml-5 left-1/2" />
//                                                     <img className="rounded-xl w-full" src="/assets/images/album1.jpg" alt="album" /><label className="absolute z-0 pbgColor top-5 left-0 font-bold px-2 rounded-r-xl">HD</label></span>
//                                                 <section className="py-2">
//                                                     <b className="text-white font-semibold">Faraway Downs 100</b>
//                                                     <ul className="text-gray-500 flex gap-2">
//                                                         <li className="text-sm">TV</li>.
//                                                         <li className="text-sm">EP1</li>.
//                                                         <li className="text-sm">SS1</li>
//                                                     </ul>
//                                                 </section>
//                                             </li>
//                                             <li className="w-1/5 cardSet">
//                                                 <span className="relative">
//                                                     <FaPlayCircle className="opacity-0 transition absolute text-black -mt-5 top-1/2 text-[35px] -ml-5 left-1/2" />
//                                                     <img className="rounded-xl w-full" src="/assets/images/album1.jpg" alt="album" /><label className="absolute z-0 pbgColor top-5 left-0 font-bold px-2 rounded-r-xl">HD</label></span>
//                                                 <section className="py-2">
//                                                     <b className="text-white font-semibold">Faraway Downs 100</b>
//                                                     <ul className="text-gray-500 flex gap-2">
//                                                         <li className="text-sm">TV</li>.
//                                                         <li className="text-sm">EP1</li>.
//                                                         <li className="text-sm">SS1</li>
//                                                     </ul>
//                                                 </section>
//                                             </li>
//                                             <li className="w-1/5 cardSet">
//                                                 <span className="relative">
//                                                     <FaPlayCircle className="opacity-0 transition absolute text-black -mt-5 top-1/2 text-[35px] -ml-5 left-1/2" />
//                                                     <img className="rounded-xl w-full" src="/assets/images/album1.jpg" alt="album" /><label className="absolute z-0 pbgColor top-5 left-0 font-bold px-2 rounded-r-xl">HD</label></span>
//                                                 <section className="py-2">
//                                                     <b className="text-white font-semibold">Faraway Downs 100</b>
//                                                     <ul className="text-gray-500 flex gap-2">
//                                                         <li className="text-sm">TV</li>.
//                                                         <li className="text-sm">EP1</li>.
//                                                         <li className="text-sm">SS1</li>
//                                                     </ul>
//                                                 </section>
//                                             </li>
//                                             <li className="w-1/5 cardSet">
//                                                 <span className="relative">
//                                                     <FaPlayCircle className="opacity-0 transition absolute text-black -mt-5 top-1/2 text-[35px] -ml-5 left-1/2" />
//                                                     <img className="rounded-xl w-full" src="/assets/images/album1.jpg" alt="album" /><label className="absolute z-0 pbgColor top-5 left-0 font-bold px-2 rounded-r-xl">HD</label></span>
//                                                 <section className="py-2">
//                                                     <b className="text-white font-semibold">Faraway Downs 100</b>
//                                                     <ul className="text-gray-500 flex gap-2">
//                                                         <li className="text-sm">TV</li>.
//                                                         <li className="text-sm">EP1</li>.
//                                                         <li className="text-sm">SS1</li>
//                                                     </ul>
//                                                 </section>
//                                             </li>
//                                         </ul>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="min-w-full md:min-w-[376px]">
//                                 <Recommended />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 {/* <Footer /> */}
//             </div>
//         </div>
//     )
// }

import React from 'react'

export default function page() {
  return (
    <div>page</div>
  )
}
