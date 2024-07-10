import React from 'react'
import { IoMdClose } from "react-icons/io";


export default function Sidebar({ openSideBar ,toggleSidebar}: any) {
    return (
        <div className={`navSet ${openSideBar ?"navSetOpen" :""} fixed top-0 left-0 z-20 w-full h-screen bg-black/70`}>
            <div className="fixed top-0 w-[300px] h-screen bg-white flex flex-col">
                <section className="p-2 flex items-center justify-between">
                    <a href="" className="w-[170px] block"><img className="max-w-full" src="/assets/images/logo.png" alt="logo" /></a>
                    <IoMdClose className="text-black w-6 h-6 cursor-pointer transition hover:text-amber-500" onClick={toggleSidebar}/>
                </section>
                <button className="pbgColor p-2 px-4 hover:bg-amber-500 transition">Home</button>
                <button className="p-2 px-4 hover:bg-amber-500 transition">Genre</button>
                <button className="p-2 px-4 hover:bg-amber-500 transition">Country</button>
                <button className="p-2 px-4 hover:bg-amber-500 transition">Movies</button>
                <button className="p-2 px-4 hover:bg-amber-500 transition">TV Shows</button>
                <button className="p-2 px-4 hover:bg-amber-500 transition">Trending</button>
                <button className="p-2 px-4 hover:bg-amber-500 transition">Top 10 Movies</button>
                <button className="p-2 px-4 hover:bg-amber-500 transition">Top 10 TV Episodes</button>
            </div>
        </div>
    )
}
