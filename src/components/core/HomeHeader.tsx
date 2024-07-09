import { HiMenuAlt1 } from "react-icons/hi";
import HomeSearchbar from "../HomeSearchbar";
import { FaRegUser, FaUserCircle } from "react-icons/fa";
import { GoVideo } from "react-icons/go";
import { FaRegBookmark } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";
import { usePathname, useSearchParams } from "next/navigation";
import AuthForm from "./AuthForm";
import { useState } from "react";
import { getToken } from '@lib/userToken';


export default function Header() {

    const [isOpen, isClose] = useState(false)

    const handleClose = () => {
        isClose(false);
    };
    const path = usePathname();
    const searchParams: any = useSearchParams();
    const route = path.split("/");

    const isHome = () => {
        return route.includes("home")
            ? true
            : false
    };


    return (
        <>
            <div className={`header ${isHome() ? "" : "bg-white/10 h-[80px]"} p-2 absolute z-10 w-full top-0 right-0`}>
                <div className="homewrapper">
                    <div className="headerInner flex items-center justify-between">
                        <section className="flex items-center">
                            <a href="" className="mr-4"><HiMenuAlt1 className="text-[30px] text-white" /></a>
                            <a href="" className="w-[150px] block m-auto"><img className="max-w-full" src="/assets/images/logo.png" alt="logo" /></a>
                        </section>
                        <HomeSearchbar />
                        {/* <section className="flex justify-end w-[216px]">
                        <button className="mr-4 text-white font-semibold p-2 px-6 rounded-full border border-2 border-white transition hover:bg-white hover:text-black">Login</button>
                        <button className="text-white font-semibold p-2 px-6 rounded-full border border-2 border-white transition hover:bg-white hover:text-black">Signup</button>
                    </section> */}



                        <section className="flex justify-end w-[216px]">
                            {getToken ? (
                                <>
                                    {/* <button className="mr-4 text-white font-semibold p-2 px-6 rounded-full border border-2 border-white transition hover:bg-white hover:text-black"><IoIosNotifications /></button>
                                     <div className="openNotifications"></div> */}
                                    <div className="relative">
                                        <button className="text-white font-semibold p-2 rounded-full border border-2 border-white transition hover:bg-white hover:text-black"><FaUserCircle /></button>
                                        <div className="openNotifications"></div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {/* <button className="mr-4 text-white font-semibold p-2 px-6 rounded-full border border-2 border-white transition hover:bg-white hover:text-black" onClick={() => isClose(true)}>Login</button> */}
                                    <div className="relative">
                                        <button className="text-white"><FaRegUser className="w-5 h-5 hover:text-amber-500 transition" /></button>
                                        <div className="openProfileLinks profileLinks absolute bg-zinc-800 rounded-lg right-0 min-w-[200px]">
                                            <a href="/profile" className="p-2 px-3 text-white/50 transition hover:text-white flex items-center gap-2"><FaRegUser/> Profile</a>
                                            <a href="" className="p-2 px-3 text-white/50 transition hover:text-white flex items-center gap-2"><GoVideo /> Continue Watching </a>
                                            <a href="" className="p-2 px-3 text-white/50 transition hover:text-white flex items-center gap-2"><FaRegBookmark /> Bookmark </a>
                                            <a href="" className="p-2 px-3 text-white/50 transition hover:text-white flex items-center gap-2"><IoSettingsOutline /> Settings</a>
                                            <a href="" className="border-t border-1 border-white/10 p-3 text-white transition hover:text-amber-500 flex items-center gap-2"><IoLogOutOutline /> Logout</a>
                                        </div>
                                    </div>
                                </>
                            )}


                        </section>
                    </div>
                </div >
            </div >

            {isOpen ?
                <AuthForm isOpen={isOpen} handleClose={handleClose} />
                : null}

        </>
    );
}

