import { FaPlayCircle } from "react-icons/fa";
import { FaRegCirclePlay } from "react-icons/fa6";
import { IoIosAddCircleOutline } from "react-icons/io";
import {useQuery} from '@tanstack/react-query';
import { FaStar } from "react-icons/fa";
import FetchApi from "@lib/FetchApi";
import Loader from "./Loader";
import moment from "moment";

const fetchDetails = async (movieId: number, mediaType:string) => {
  try {
    const response = await FetchApi.get(`https://api.themoviedb.org/3/${mediaType.toLowerCase()}/${movieId}?language=en-US`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error)
  }
};

function Card({movieId, mediaType}: any) {
  const {
    isLoading,
    error,
    data: movieDetials,
} = useQuery<any>({
    queryKey: ['card-detials', movieId, mediaType],
    queryFn: () =>fetchDetails(movieId, mediaType),
});

if(isLoading){
  return(
    <>
  </>
  )
}


  return (
    <>
    {movieDetials && (<>
      <li key={movieId} className="w-1/5 cardSet relative">
        <span className="relative">
          <FaPlayCircle className="opacity-0 transition absolute text-black -mt-5 top-1/2 text-[35px] -ml-5 left-1/2" />
          <img
            className="rounded-xl w-full"
            src={`https://image.tmdb.org/t/p/original${movieDetials?.poster_path}`}
            alt="album"
          />
          <label className="absolute z-10 pbgColor top-5 left-0 font-bold px-2 rounded-r-xl">
            HD
          </label>
        </span>
        <section className="py-2">
          <b className="text-white font-semibold">{(movieDetials?.title && movieDetials.title.length > 40) ? movieDetials?.title?.slice(0,40) + "..." : (movieDetials?.name && movieDetials?.name.length > 40 ) ? movieDetials?.name?.slice(0,40) + "..." : movieDetials?.name ? movieDetials?.name : movieDetials?.title}</b>
          <ul className="text-gray-500 flex gap-2">
            <li className="text-sm">{mediaType}</li>.<li className="text-sm">{mediaType === 'Movie' ? moment(movieDetials?.release_date).year() : "SS" + movieDetials?.last_episode_to_air?.season_number}</li>.
            <li className="text-sm">{mediaType === 'Movie' ? movieDetials?.runtime + " min" : "EP" + movieDetials?.last_episode_to_air?.episode_number}</li>
          </ul>
        </section>
        <div className="albumDetail absolute bg-zinc-900 rounded-lg top-10 left-10 z-50 w-[350px]">
          <div className="w-full p-5 relative">
            <section className="pr-12">
              <h2 className="text-white text-lg">{movieDetials?.title || movieDetials?.name }</h2>
              <ul className="py-1 flex items-center text-white gap-4 font-light">
                <li>
                  <b className="font-bold text-sm">{mediaType === 'Movie' ? moment(movieDetials?.release_date).year() : moment(movieDetials?.first_air_date).year()}</b>
                </li>
                <li className=" text-sm">{mediaType === 'Movie' ? movieDetials?.runtime + " min" : "EP1"}</li>
                <li>
                  <label className="flex items-center gap-2 pColor font-semibold text-sm">
                    <FaStar /> {movieDetials?.vote_average.toFixed(1)}
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
              <label className="text-white font-light">{movieDetials.production_countries && movieDetials.production_countries.length > 0 ? movieDetials.production_countries.map((gen:any) => gen.name).join(", ") : ""}</label>
            </p>
            <p>
              Genre:{" "}
              <label className="text-white font-light">{movieDetials.genres && movieDetials.genres.length > 0 ? movieDetials.genres.map((gen:any) => gen.name).join(", ") : ""}</label>
            </p>
            <p>
              Scores:{" "}
              <label className="text-white font-light">
              {movieDetials?.vote_average.toFixed(2)} by {movieDetials?.vote_count} reviews
              </label>
            </p>
            <p className="text-white/50 font-light pt-2">
              {movieDetials?.overview && movieDetials?.overview.length > 150 ? movieDetials?.overview.slice(0,150) + "..." : movieDetials?.overview}
            </p>
            <button className="text-black flex items-center gap-2 pbgColor px-6 py-2 rounded-full transition m-auto mt-4 mb-2">
              Watch Now <FaRegCirclePlay className="text-xl" />
            </button>
          </div>
        </div>
      </li>
    </>)}
    </>
  );
}

export default Card;
