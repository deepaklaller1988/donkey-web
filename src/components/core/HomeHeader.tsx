import { HiMenuAlt1 } from "react-icons/hi";
import HomeSearchbar from "../HomeSearchbar";
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
                    <HomeSearchbar/>
                    <section className="flex justify-end">
                        <button className="mr-4 text-white font-semibold p-2 px-6 rounded-full border border-2 border-white transition hover:bg-white hover:text-black">Login</button>
                        <button className="text-white font-semibold p-2 px-6 rounded-full border border-2 border-white transition hover:bg-white hover:text-black">Signup</button>
                    </section>
                </div>
            </div>
        </div>
        </>
    );
  }