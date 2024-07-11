import { CiFilter } from "react-icons/ci";
import { IoSearch } from "react-icons/io5";
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import Link from "next/link";
export default function HomeSearchbar() {
    return (
        <div className="searchBar w-full px-4 relative z-10">
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
                <div className="intellesenseOpen intellesense w-full absolute mt-[1px] top-full left-0 overflow-hidden z-50">
                    <div className="w-full max-w-full md:max-w-[520px] m-auto bg-zinc-800 rounded-lg">
                        <div className="w-full border-b border-b-white/5">
                            <Link href="" className="flex gap-2 p-3 transition hover:bg-black/20">
                                <span className="rounded-lg overflow-hidden max-w-[50px] max-h-[50px]">
                                    <img className="w-full block" src="/assets/images/album1.jpg" alt="album" />
                                </span>
                                <span>
                                    <b className="text-white font-semibold">100 Vaginas</b>
                                    <section className="text-white/50 flex items-center gap-2">
                                        <p className="text-sm font-light font-light">Movie <b>.</b></p>
                                        <p className="text-sm font-light">2019 <b>.</b></p>
                                        <p className="text-sm font-light">5.9 <b>.</b></p>
                                        <p className="text-sm font-light">47 min</p>
                                    </section>
                                </span>
                            </Link>
                        </div>
                        <div className="w-full border-b border-b-white/5">
                            <Link href="" className="flex gap-2 p-3 transition hover:bg-black/20">
                                <span className="rounded-lg overflow-hidden max-w-[50px] max-h-[50px]">
                                    <img className="w-full block" src="/assets/images/album1.jpg" alt="album" />
                                </span>
                                <span>
                                    <b className="text-white font-semibold">100 Vaginas</b>
                                    <section className="text-white/50 flex items-center gap-2">
                                        <p className="text-sm font-light font-light">Movie <b>.</b></p>
                                        <p className="text-sm font-light">2019 <b>.</b></p>
                                        <p className="text-sm font-light">5.9 <b>.</b></p>
                                        <p className="text-sm font-light">47 min</p>
                                    </section>
                                </span>
                            </Link>
                        </div>
                        <div className="w-full border-b border-b-white/5">
                            <Link href="" className="flex gap-2 p-3 transition hover:bg-black/20">
                                <span className="rounded-lg overflow-hidden max-w-[50px] max-h-[50px]">
                                    <img className="w-full block" src="/assets/images/album1.jpg" alt="album" />
                                </span>
                                <span>
                                    <b className="text-white font-semibold">100 Vaginas</b>
                                    <section className="text-white/50 flex items-center gap-2">
                                        <p className="text-sm font-light font-light">Movie <b>.</b></p>
                                        <p className="text-sm font-light">2019 <b>.</b></p>
                                        <p className="text-sm font-light">5.9 <b>.</b></p>
                                        <p className="text-sm font-light">47 min</p>
                                    </section>
                                </span>
                            </Link>
                        </div>
                        <div className="w-full text-center p-3">
                            <Link href="/home" className="transition text-lg font-medium p-2 px-6 rounded-lg inline-flex items-center justify-center pbgColor block w-full">View All Results <BsArrowUpRightCircleFill className="ml-1 text-lg" /></Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}