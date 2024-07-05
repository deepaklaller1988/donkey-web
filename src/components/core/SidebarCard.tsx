import FetchApi from '@lib/FetchApi';
import React from 'react';
import {useQuery} from '@tanstack/react-query';
import moment from 'moment';

const fetchDetails = async (movieId: number, mediaType:string) => {
    try {
      const response = await FetchApi.get(`https://api.themoviedb.org/3/${mediaType.toLowerCase()}/${movieId}?language=en-US`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error)
    }
  };

function SidebarCard({movieId,mediaType,index}: any) {
    const {
        isLoading,
        error,
        data: cardDetials,
    } = useQuery<any>({
        queryKey: ['side-card-detials', movieId, mediaType],
        queryFn: () =>fetchDetails(movieId, mediaType),
    });

  return (
    <>
      <li key={movieId} className="pl-[15px]">
        <section className="flex items-center relative listTop10 bg-white/5  hover:bg-white/10 transition rounded-md">
          <span className="relative min-w-[50px] w-[50px]">
            <img
              className="rounded-md w-full"
              src={`https://image.tmdb.org/t/p/original${cardDetials?.poster_path}`}
              alt="album"
            />
          </span>
          <b className="transition -left-[15px] absolute rounded-full w-[30px] h-[30px] flex items-center justify-center">
            {index}
          </b>
          <div className="w-full relative pr-16 pl-4">
            <h4 className="text-white uppercase font-semibold transition">
                {(cardDetials?.title && cardDetials.title.length > 20) ? cardDetials?.title?.slice(0,20) + "..." : (cardDetials?.name && cardDetials?.name.length > 20 ) ? cardDetials?.name?.slice(0,20) + "..." : cardDetials?.name ? cardDetials?.name : cardDetials?.title}
            </h4>
            <ul className="text-white/40 flex gap-2">
              <li className="text-sm">{mediaType}</li>{mediaType === 'Movie' ? (<>.<li className="text-sm">{cardDetials?.runtime} min</li></>) :(<>.<li className="text-sm">EP{cardDetials?.last_episode_to_air?.episode_number}</li>{" "}
                .<li className="text-sm">SS{cardDetials?.last_episode_to_air?.season_number}</li></>)} 
            </ul>
            <label className="absolute right-3 top-1/2 -mt-[10px] rounded-full px-2 text-sm transition">
            {mediaType === 'Movie' ? moment(cardDetials?.release_date).year() : moment(cardDetials?.last_air_date).year()}
            </label>
          </div>
        </section>
      </li>
    </>
  );
}

export default SidebarCard
