import { FaPlayCircle } from "react-icons/fa";
import { FaRegCirclePlay } from "react-icons/fa6";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaStar } from "react-icons/fa";

function Card() {
  return (
    <>
      <li className="w-1/5 cardSet relative">
        <span className="relative">
          <FaPlayCircle className="opacity-0 transition absolute text-black -mt-5 top-1/2 text-[35px] -ml-5 left-1/2" />
          <img
            className="rounded-xl w-full"
            src="/assets/images/album1.jpg"
            alt="album"
          />
          <label className="absolute z-10 pbgColor top-5 left-0 font-bold px-2 rounded-r-xl">
            HD
          </label>
        </span>
        <section className="py-2">
          <b className="text-white font-semibold">Faraway Downs 100</b>
          <ul className="text-gray-500 flex gap-2">
            <li className="text-sm">TV</li>.<li className="text-sm">EP1</li>.
            <li className="text-sm">SS1</li>
          </ul>
        </section>
        <div className="albumDetail absolute bg-zinc-900 rounded-lg top-10 left-10 z-50 w-[350px]">
          <div className="w-full p-5 relative">
            <section className="pr-12">
              <h2 className="text-white text-lg">Presumed Innocent</h2>
              <ul className="py-1 flex items-center text-white gap-4 font-light">
                <li>
                  <b className="font-bold text-sm">2024</b>
                </li>
                <li className=" text-sm">102min</li>
                <li>
                  <label className="flex items-center gap-2 pColor font-semibold text-sm">
                    <FaStar /> 4.4
                  </label>
                </li>
                <li>
                  <label className=" text-sm rounded-full pbgColor text-black font-bold px-2">
                    HD
                  </label>
                </li>
              </ul>
            </section>
            <label className="absolute right-5 top-1/2">
              <IoIosAddCircleOutline className="text-white w-6 h-6 -mt-3" />
            </label>
          </div>
          <div className="w-full p-5 border-t border-1 border-white/5 text-white/50">
            <p>
              Country:{" "}
              <label className="text-white font-light">United States</label>
            </p>
            <p>
              Genre:{" "}
              <label className="text-white font-light">United States</label>
            </p>
            <p>
              Scores:{" "}
              <label className="text-white font-light">
                8.38 by 740 reviews
              </label>
            </p>
            <p className="text-white/50 font-light pt-2">
              A group of high-end professional thieves start to feel the heat
              from the LAPD when they unknowingly leave a verbal clue at their
              latest heist.
            </p>
            <button className="text-black flex items-center gap-2 pbgColor px-6 py-2 rounded-full transition m-auto mt-4 mb-2">
              Watch Now <FaRegCirclePlay className="text-xl" />
            </button>
          </div>
        </div>
      </li>
    </>
  );
}

export default Card;