import SidebarCard from "./core/SidebarCard";

export default function Recommended({title, data, movieId,mediaType}: any) {
    return (
        <div className="w-full">
            <div className="flex items-center gap-4">
                <h3 className="text-white text-[25px] font-semibold">{title}</h3>
            </div>
            <ul className="flex flex-col gap-3 py-2 mt-[10px]">
                {data && data.length > 0 ? data.map((item: any)=>(
                    <div key={item.id ? item.id : item.tmdb_id}>
                    <SidebarCard movieId={item.id ? item.id : item.tmdb_id} mediaType={mediaType}  />
                    </div>
                )): (<div className="text-white">No data available...</div>)}
                {/* <li>
                    <section className="flex items-center relative listTop10 bg-white/5  hover:bg-white/10 transition rounded-md">
                        <span className="relative min-w-[50px] w-[50px]">
                            <img className="rounded-md w-full" src="/assets/images/album1.jpg" alt="album" />
                        </span>
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
                </li> */}
            </ul>
        </div>
    );
}