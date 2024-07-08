import { BiSolidRightArrowSquare } from "react-icons/bi";
import { PiXLogoBold } from "react-icons/pi";
import { FaRedditAlien } from "react-icons/fa6";
export default function Footer() {
    return (
        <div className="w-full mt-40 footerSet flex flex-col justify-end">
            <div className="w-full flex items-end justify-between px-4">
                <section>
                    <ul className="flex text-white/60 font-light f-Links">
                        <li>
                            <b className="text-white font-semibold">Links:</b>
                        </li>
                        <li>
                            <a href="" className="transition flex items-center gap-2 px-4">Movies <BiSolidRightArrowSquare className="pColor" /></a>
                        </li>|
                        <li>
                            <a href="" className="flex items-center gap-2 px-4">TV Shows <BiSolidRightArrowSquare className="pColor" /></a>
                        </li>|
                        <li>
                            <a href="" className="flex items-center gap-2 px-4">Recently Updated <BiSolidRightArrowSquare className="pColor" /></a>
                        </li>
                    </ul>
                </section>
                <section>
                    <a href="" className="w-[150px] block mb-4"><img className="max-w-full" src="/assets/images/logo.png" alt="logo" /></a>
                    <div className="w-full flex items-center justify-end gap-4">
                        <a href="" className="text-white hover:text-yellow-500 transition" title="twitter"><PiXLogoBold className="w-6 h-6"/></a>
                        <a href="" className="text-white hover:text-yellow-500 transition" title="Reddit"><FaRedditAlien className="w-6 h-6"/></a>
                    </div>
                </section>
            </div>
            <div className="w-full text-center px-4 pb-4 borderSet">
                <p className="text-white font-light text-sm text-white/50 pb-2">We do not store any files on our server, media files are hosted via third-party services.</p>
                {/* <b className="pColor font-semibold text-sm">We do not store any files on our server, media files are hosted via third-party services.</b> */}
            </div>
        </div>
    );
}