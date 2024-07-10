import Link from 'next/link';
import React from 'react'
import { IoMdClose } from "react-icons/io";


export default function NavBar({ openSideBar ,toggleSidebar}: any) {
    return (
        // <div className={`navSet ${openSideBar ?"navSetOpen" :""} fixed top-0 left-0 z-20 w-full h-screen bg-black/70`}>
        <div className={`navSet ${openSideBar ?"navSetOpen" :""} fixed top-0 left-0 w-full h-screen`}>
            <section className='closeMenu'  onClick={toggleSidebar}></section>
            <div className="navSetInner fixed top-[80px] left-[20px] w-[200px] bg-zinc-800 flex flex-col rounded-lg">
                <Link href="/home" className="rounded-lg p-2 px-4 hover:bg-amber-500 transition text-black bg-amber-500">Home</Link>
                <div className='navInners w-full'>
                <Link href="" className="rounded-lg block p-2 px-4 hover:bg-amber-500 transition text-white/50 hover:text-black">Genre</Link>
                <section className='absolute p-2 flex flex-wrap rounded-lg'>
                <Link href="" className="rounded-lg p-2 px-4 hover:bg-amber-500 transition text-white/50 hover:text-black">Genre</Link>
                <Link href="" className="rounded-lg p-2 px-4 hover:bg-amber-500 transition text-white/50 hover:text-black">Genre</Link>
                <Link href="" className="rounded-lg p-2 px-4 hover:bg-amber-500 transition text-white/50 hover:text-black">Genre</Link>
                <Link href="" className="rounded-lg p-2 px-4 hover:bg-amber-500 transition text-white/50 hover:text-black">Genre</Link>
                <Link href="" className="rounded-lg p-2 px-4 hover:bg-amber-500 transition text-white/50 hover:text-black">Genre</Link>
                <Link href="" className="rounded-lg p-2 px-4 hover:bg-amber-500 transition text-white/50 hover:text-black">Genre</Link>
                <Link href="" className="rounded-lg p-2 px-4 hover:bg-amber-500 transition text-white/50 hover:text-black">Genre</Link>
                <Link href="" className="rounded-lg p-2 px-4 hover:bg-amber-500 transition text-white/50 hover:text-black">Genre</Link>
                </section>
                </div>
                <div className='navInners w-full'>
                <Link href="" className="rounded-lg block p-2 px-4 hover:bg-amber-500 transition text-white/50 hover:text-black">Country</Link>
                <section className='absolute p-2 flex flex-wrap rounded-lg'>
                <Link href="" className="rounded-lg p-2 px-4 hover:bg-amber-500 transition text-white/50 hover:text-black">Country</Link>
                <Link href="" className="rounded-lg p-2 px-4 hover:bg-amber-500 transition text-white/50 hover:text-black">Country</Link>
                <Link href="" className="rounded-lg p-2 px-4 hover:bg-amber-500 transition text-white/50 hover:text-black">Country</Link>
                <Link href="" className="rounded-lg p-2 px-4 hover:bg-amber-500 transition text-white/50 hover:text-black">Country</Link>
                <Link href="" className="rounded-lg p-2 px-4 hover:bg-amber-500 transition text-white/50 hover:text-black">Country</Link>
                <Link href="" className="rounded-lg p-2 px-4 hover:bg-amber-500 transition text-white/50 hover:text-black">Country</Link>
                <Link href="" className="rounded-lg p-2 px-4 hover:bg-amber-500 transition text-white/50 hover:text-black">Country</Link>
                <Link href="" className="rounded-lg p-2 px-4 hover:bg-amber-500 transition text-white/50 hover:text-black">Country</Link>
                </section>
                </div>
                <Link href="" className="rounded-lg p-2 px-4 hover:bg-amber-500 transition text-white/50 hover:text-black">Movies</Link>
                <Link href="" className="rounded-lg p-2 px-4 hover:bg-amber-500 transition text-white/50 hover:text-black">TV Shows</Link>
                <Link href="" className="rounded-lg p-2 px-4 hover:bg-amber-500 transition text-white/50 hover:text-black">Trending</Link>
                <Link href="" className="rounded-lg p-2 px-4 hover:bg-amber-500 transition text-white/50 hover:text-black">Top 10 Movies</Link>
                <Link href="" className="rounded-lg p-2 px-4 hover:bg-amber-500 transition text-white/50 hover:text-black">Top 10 TV Episodes</Link>
            </div>
        </div>
    )
}
