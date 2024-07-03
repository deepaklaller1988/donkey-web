export default function Sidebar() {
    return (
        <div className="w-full">
            <div className="flex items-center gap-4">
                <h3 className="text-white text-[35px] font-semibold">TOP 10</h3>
                <section className="flex gap-2">
                    <button className="pbgColor rounded-full text-black px-2">Day</button>
                    <button className="border border-1 rounded-full text-white px-2 hover:bg-white hover:text-black transition">Week</button>
                    <button className="border border-1 rounded-full text-white px-2 hover:bg-white hover:text-black transition">Month</button>
                </section>
            </div>
            <ul className="flex flex-col gap-3 py-2 mt-[10px]">
                <li className="pl-[15px]">
                    <section className="flex items-center relative listTop10 bg-white/5  hover:bg-white/10 transition rounded-md">
                        <span className="relative min-w-[50px] w-[50px]">
                            <img className="rounded-md w-full" src="/assets/images/album1.jpg" alt="album" />
                        </span>
                        <b className="transition -left-[15px] absolute rounded-full w-[30px] h-[30px] flex items-center justify-center">1</b>
                        <div className="w-full relative pr-16 pl-4">
                            <h4 className="text-white uppercase font-semibold transition">Day out match</h4>
                            <ul className="text-white/40 flex gap-2">
                                <li className="text-sm">TV</li>.
                                <li className="text-sm">EP1</li>.
                                <li className="text-sm">SS1</li>
                            </ul>
                            <label className="absolute right-3 top-1/2 -mt-[10px] rounded-full px-2 text-sm transition">2024</label>
                        </div>
                    </section>
                </li>
                <li className="pl-[15px]">
                    <section className="flex items-center relative listTop10 bg-white/5 hover:bg-white/10 transition rounded-md">
                        <span className="relative min-w-[50px] w-[50px]">
                            <img className="rounded-md w-full" src="/assets/images/album1.jpg" alt="album" />
                        </span>
                        <b className="transition -left-[15px] absolute rounded-full w-[30px] h-[30px] flex items-center justify-center">1</b>
                        <div className="w-full relative pr-16 pl-4">
                            <h4 className="text-white uppercase font-semibold transition">100 Days</h4>
                            <ul className="text-white/40 flex gap-2">
                                <li className="text-sm">Movie</li>
                            </ul>
                            <label className="absolute right-3 top-1/2 -mt-[10px] rounded-full px-2 text-sm transition">2024</label>
                        </div>
                    </section>
                </li>
                <li className="pl-[15px]">
                    <section className="flex items-center relative listTop10 bg-white/5 hover:bg-white/10 transition rounded-md">
                        <span className="relative min-w-[50px] w-[50px]">
                            <img className="rounded-md w-full" src="/assets/images/album1.jpg" alt="album" />
                        </span>
                        <b className="transition -left-[15px] absolute rounded-full w-[30px] h-[30px] flex items-center justify-center">1</b>
                        <div className="w-full relative pr-16 pl-4">
                            <h4 className="text-white uppercase font-semibold transition">Wealth Health is mine</h4>
                            <ul className="text-white/40 flex gap-2">
                                <li className="text-sm">TV</li>.
                                <li className="text-sm">EP1</li>.
                                <li className="text-sm">SS1</li>
                            </ul>
                            <label className="absolute right-3 top-1/2 -mt-[10px] rounded-full px-2 text-sm transition">2024</label>
                        </div>
                    </section>
                </li>
                <li className="pl-[15px]">
                    <section className="flex items-center relative listTop10 bg-white/5 hover:bg-white/10 transition rounded-md">
                        <span className="relative min-w-[50px] w-[50px]">
                            <img className="rounded-md w-full" src="/assets/images/album1.jpg" alt="album" />
                        </span>
                        <b className="transition -left-[15px] absolute rounded-full w-[30px] h-[30px] flex items-center justify-center">1</b>
                        <div className="w-full relative pr-16 pl-4">
                            <h4 className="text-white uppercase font-semibold transition">Wealth Health is mine</h4>
                            <ul className="text-white/40 flex gap-2">
                                <li className="text-sm">TV</li>.
                                <li className="text-sm">EP1</li>.
                                <li className="text-sm">SS1</li>
                            </ul>
                            <label className="absolute right-3 top-1/2 -mt-[10px] rounded-full px-2 text-sm transition">2024</label>
                        </div>
                    </section>
                </li>
                <li className="pl-[15px]">
                    <section className="flex items-center relative listTop10 bg-white/5 hover:bg-white/10 transition rounded-md">
                        <span className="relative min-w-[50px] w-[50px]">
                            <img className="rounded-md w-full" src="/assets/images/album1.jpg" alt="album" />
                        </span>
                        <b className="transition -left-[15px] absolute rounded-full w-[30px] h-[30px] flex items-center justify-center">1</b>
                        <div className="w-full relative pr-16 pl-4">
                            <h4 className="text-white uppercase font-semibold transition">Wealth Health is mine</h4>
                            <ul className="text-white/40 flex gap-2">
                                <li className="text-sm">TV</li>.
                                <li className="text-sm">EP1</li>.
                                <li className="text-sm">SS1</li>
                            </ul>
                            <label className="absolute right-3 top-1/2 -mt-[10px] rounded-full px-2 text-sm transition">2024</label>
                        </div>
                    </section>
                </li>
                <li className="pl-[15px]">
                    <section className="flex items-center relative listTop10 bg-white/5 hover:bg-white/10 transition rounded-md">
                        <span className="relative min-w-[50px] w-[50px]">
                            <img className="rounded-md w-full" src="/assets/images/album1.jpg" alt="album" />
                        </span>
                        <b className="transition -left-[15px] absolute rounded-full w-[30px] h-[30px] flex items-center justify-center">1</b>
                        <div className="w-full relative pr-16 pl-4">
                            <h4 className="text-white uppercase font-semibold transition">Wealth Health is mine</h4>
                            <ul className="text-white/40 flex gap-2">
                                <li className="text-sm">TV</li>.
                                <li className="text-sm">EP1</li>.
                                <li className="text-sm">SS1</li>
                            </ul>
                            <label className="absolute right-3 top-1/2 -mt-[10px] rounded-full px-2 text-sm transition">2024</label>
                        </div>
                    </section>
                </li>
                <li className="pl-[15px]">
                    <section className="flex items-center relative listTop10 bg-white/5 hover:bg-white/10 transition rounded-md">
                        <span className="relative min-w-[50px] w-[50px]">
                            <img className="rounded-md w-full" src="/assets/images/album1.jpg" alt="album" />
                        </span>
                        <b className="transition -left-[15px] absolute rounded-full w-[30px] h-[30px] flex items-center justify-center">1</b>
                        <div className="w-full relative pr-16 pl-4">
                            <h4 className="text-white uppercase font-semibold transition">Wealth Health is mine</h4>
                            <ul className="text-white/40 flex gap-2">
                                <li className="text-sm">TV</li>.
                                <li className="text-sm">EP1</li>.
                                <li className="text-sm">SS1</li>
                            </ul>
                            <label className="absolute right-3 top-1/2 -mt-[10px] rounded-full px-2 text-sm transition">2024</label>
                        </div>
                    </section>
                </li>
                <li className="pl-[15px]">
                    <section className="flex items-center relative listTop10 bg-white/5 hover:bg-white/10 transition rounded-md">
                        <span className="relative min-w-[50px] w-[50px]">
                            <img className="rounded-md w-full" src="/assets/images/album1.jpg" alt="album" />
                        </span>
                        <b className="transition -left-[15px] absolute rounded-full w-[30px] h-[30px] flex items-center justify-center">1</b>
                        <div className="w-full relative pr-16 pl-4">
                            <h4 className="text-white uppercase font-semibold transition">Wealth Health is mine</h4>
                            <ul className="text-white/40 flex gap-2">
                                <li className="text-sm">TV</li>.
                                <li className="text-sm">EP1</li>.
                                <li className="text-sm">SS1</li>
                            </ul>
                            <label className="absolute right-3 top-1/2 -mt-[10px] rounded-full px-2 text-sm transition">2024</label>
                        </div>
                    </section>
                </li>
                <li className="pl-[15px]">
                    <section className="flex items-center relative listTop10 bg-white/5 hover:bg-white/10 transition rounded-md">
                        <span className="relative min-w-[50px] w-[50px]">
                            <img className="rounded-md w-full" src="/assets/images/album1.jpg" alt="album" />
                        </span>
                        <b className="transition -left-[15px] absolute rounded-full w-[30px] h-[30px] flex items-center justify-center">1</b>
                        <div className="w-full relative pr-16 pl-4">
                            <h4 className="text-white uppercase font-semibold transition">Wealth Health is mine</h4>
                            <ul className="text-white/40 flex gap-2">
                                <li className="text-sm">TV</li>.
                                <li className="text-sm">EP1</li>.
                                <li className="text-sm">SS1</li>
                            </ul>
                            <label className="absolute right-3 top-1/2 -mt-[10px] rounded-full px-2 text-sm transition">2024</label>
                        </div>
                    </section>
                </li>
                <li className="pl-[15px]">
                    <section className="flex items-center relative listTop10 bg-white/5 hover:bg-white/10 transition rounded-md">
                        <span className="relative min-w-[50px] w-[50px]">
                            <img className="rounded-md w-full" src="/assets/images/album1.jpg" alt="album" />
                        </span>
                        <b className="transition -left-[15px] absolute rounded-full w-[30px] h-[30px] flex items-center justify-center">1</b>
                        <div className="w-full relative pr-16 pl-4">
                            <h4 className="text-white uppercase font-semibold transition">Wealth Health is mine</h4>
                            <ul className="text-white/40 flex gap-2">
                                <li className="text-sm">TV</li>.
                                <li className="text-sm">EP1</li>.
                                <li className="text-sm">SS1</li>
                            </ul>
                            <label className="absolute right-3 top-1/2 -mt-[10px] rounded-full px-2 text-sm transition">2024</label>
                        </div>
                    </section>
                </li>
            </ul>
        </div>
    );
}