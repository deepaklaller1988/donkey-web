import { HiMenuAlt1 } from "react-icons/hi";
import HomeSearchbar from "./HomeSearchbar";
import { FaUserCircle } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
export default function Header() {
    return (
        <>
            <div className="header p-2 absolute z-10 w-full top-0 right-0">
                <div className="homewrapper">
                    <div className="headerInner flex items-center justify-between">
                        <section className="flex items-center">
                            <a href="" className="mr-4"><HiMenuAlt1 className="text-[30px] text-white" /></a>
                            <a href="" className="w-[170px] block m-auto"><img className="max-w-full" src="/assets/images/logo.png" alt="logo" /></a>
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