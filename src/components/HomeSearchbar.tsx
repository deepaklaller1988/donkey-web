import Link from "next/link";
import { CiFilter } from "react-icons/ci";
import { IoSearch } from "react-icons/io5";
export default function HomeSearchbar() {
    return (
        <div className="searchBar w-full px-4">
        <form>
        <section className="flex justify-between bg-neutral-800 md:bg-black/30 rounded-full max-w-[520px] m-auto">
            <span className="p-2">
                <Link href="/filters" className="rounded-full p-1 px-2 text-sm bg-black/30 transition text-white/60 hover:text-white flex items-center">
                    <CiFilter className="mr-1" /> Filter
                </Link>
            </span>
            <input className="text-white w-full bg-white/0 text-center" placeholder="Search..." type="text" />
            
            <button className="pColor mr-1 p-3">
                <IoSearch className="text-xl" />
            </button>
            
        </section>
            </form>
    </div>
    );
  }