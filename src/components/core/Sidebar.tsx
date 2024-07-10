import Link from 'next/link';
import React from 'react'
import { IoMdClose } from "react-icons/io";


export default function Sidebar({ openSideBar ,toggleSidebar}: any) {
    return (
        <div className={`navSet ${openSideBar ?"navSetOpen" :""} fixed top-0 left-0 z-20 w-full h-screen bg-black/70`}>
            <div className="fixed top-0 w-[300px] h-screen bg-zinc-800 flex flex-col">
                <section className="p-2 flex items-center justify-between">
                    <a href="" className="w-[150px] block"><img className="max-w-full" src="/assets/images/logo.png" alt="logo" /></a>
                    <IoMdClose className="text-white/50 w-6 h-6 cursor-pointer transition hover:text-amber-500" onClick={toggleSidebar}/>
                </section>
                <Link href="/home" className="p-2 px-4 hover:bg-amber-500 transition text-black bg-amber-500">Home</Link>
                <Link href="" className="p-2 px-4 hover:bg-amber-500 transition text-white/50 hover:text-black">Genre</Link>
                <Link href="" className="p-2 px-4 hover:bg-amber-500 transition text-white/50 hover:text-black">Country</Link>
                <Link href="" className="p-2 px-4 hover:bg-amber-500 transition text-white/50 hover:text-black">Movies</Link>
                <Link href="" className="p-2 px-4 hover:bg-amber-500 transition text-white/50 hover:text-black">TV Shows</Link>
                <Link href="" className="p-2 px-4 hover:bg-amber-500 transition text-white/50 hover:text-black">Trending</Link>
                <Link href="" className="p-2 px-4 hover:bg-amber-500 transition text-white/50 hover:text-black">Top 10 Movies</Link>
                <Link href="" className="p-2 px-4 hover:bg-amber-500 transition text-white/50 hover:text-black">Top 10 TV Episodes</Link>
            </div>
        </div>
    )
}
