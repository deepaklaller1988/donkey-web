import { CiFilter } from "react-icons/ci";
import { IoSearch } from "react-icons/io5";
export default function Searchbar() {
    return (
        <div className="searchBar">
        <form>
        <section className="flex justify-between bg-black/70 rounded-full max-w-[700px] m-auto">
            <span className="p-2">
                <a href="/filters" className="rounded-full p-1 px-2 text-sm bg-white/30 hover:bg-white/40 transition text-white/60 flex items-center">
                    <CiFilter className="mr-1" /> Filter
                </a>
            </span>
            <input className="text-white w-full bg-white/0 text-center pr-10" placeholder="Search..." type="text" />
            
            <button className="pColor mr-1 p-3">
                <IoSearch className="text-xl" />
            </button>
            
        </section>
            </form>
    </div>
    );
  }