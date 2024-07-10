import { HiMenuAlt1 } from "react-icons/hi";
import HomeSearchbar from "../HomeSearchbar";
import { FaRegUser, FaUserCircle } from "react-icons/fa";
import { GoVideo } from "react-icons/go";
import { FaRegBookmark } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import AuthForm from "./AuthForm";
import { useState } from "react";
import { useAuth } from "context/AuthContext";
import Link from "next/link";
import { logOut } from "@lib/userToken";
import Sidebar from "@components/core/Sidebar";

export default function Header() {
    const router = useRouter()
    const { token }: any = useAuth();
    const [isOpen, isClose] = useState(false)
    const [OpenProfile, setOpenProfile] = useState(false)
    const [openSideBar, setOpenSidebar] = useState(false)

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

    const toggleProfile = () => {
        setOpenProfile(!OpenProfile)
    }
    const toggleSidebar = () => {
        setOpenSidebar(!openSideBar)
    }
    const handleLogOut = () => {
        logOut(),
            router.push("/dashboard")
    }

    return (
        <>
            <div className={`header ${isHome() ? "" : "bg-white/10 h-[80px]"} p-2 pt-3 absolute z-10 w-full top-0 right-0`}>
                <div className="homewrapper">
                    <div className="headerInner flex items-center justify-between">
                        <section className="flex items-center">
                            <button onClick={toggleSidebar} className="mr-4"><HiMenuAlt1 className="text-[30px] text-white" /></button>
                            <a href="" className="w-[150px] block m-auto"><img className="max-w-full" src="/assets/images/logo.png" alt="logo" /></a>
                        </section>
                        <HomeSearchbar />

                        <section className="flex justify-end w-[216px]">
                            {token ? (
                                <>
                                    <div className="relative">
                                        <button onClick={toggleProfile} className="text-white"><FaRegUser className="w-5 h-5 hover:text-amber-500 transition" /></button>
                                        <div className={`profileLinks absolute bg-zinc-800 rounded-lg right-0 min-w-[200px] ${OpenProfile ? 'openProfileLinks' : ''}`}>
                                            <Link href="" className="p-2 px-3 text-white/50 transition hover:text-white flex items-center gap-2"><GoVideo /> Continue Watching </Link>
                                            <Link href="" className="p-2 px-3 text-white/50 transition hover:text-white flex items-center gap-2"><FaRegBookmark /> Bookmark </Link>
                                            <Link href="" className="p-2 px-3 text-white/50 transition hover:text-white flex items-center gap-2"><IoSettingsOutline /> Settings</Link>
                                            <button type="button" className="border-t border-1 border-white/10 p-3 text-white transition hover:text-amber-500 flex items-center gap-2 " onClick={handleLogOut}><IoLogOutOutline /> Logout</button>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <button className="mr-4 text-white font-semibold p-2 px-6 rounded-full border border-2 border-white transition hover:bg-white hover:text-black" onClick={() => isClose(true)}>Login</button>

                                </>
                            )}
                        </section>
                    </div>
                </div >
            </div >
            {isOpen ?
                <AuthForm isOpen={isOpen} handleClose={handleClose} />
                : null}

            <Sidebar openSideBar={openSideBar} toggleSidebar={toggleSidebar}/>
        </>
    );
}

