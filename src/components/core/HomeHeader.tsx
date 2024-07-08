import { HiMenuAlt1 } from "react-icons/hi";
import HomeSearchbar from "../HomeSearchbar";
import { FaUserCircle } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Header() {
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
                            <Link href="/home" className="w-[170px] block m-auto"><img className="max-w-full" src="/assets/images/logo.png" alt="logo" /></Link>
                        </section>
                        <HomeSearchbar />
                        {/* <section className="flex justify-end w-[216px]">
                        <button className="mr-4 text-white font-semibold p-2 px-6 rounded-full border border-2 border-white transition hover:bg-white hover:text-black">Login</button>
                        <button className="text-white font-semibold p-2 px-6 rounded-full border border-2 border-white transition hover:bg-white hover:text-black">Signup</button>
                    </section> */}
                        <section className="flex justify-end w-[216px]">
                            <div className="relative">
                                <button className="mr-4 text-white font-semibold p-2 rounded-full border border-2 border-white transition hover:bg-white hover:text-black"><IoIosNotifications /></button>
                                <div className="openNotifications"></div>
                            </div>
                            <div className="relative">
                                <button className="text-white font-semibold p-2 rounded-full border border-2 border-white transition hover:bg-white hover:text-black"><FaUserCircle /></button>
                                <div className="openNotifications"></div>
                            </div>
                        </section>
                    </div>
                </div >
            </div >
        </>
    );
}