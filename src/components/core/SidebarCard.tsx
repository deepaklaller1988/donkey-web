import FetchApi from "@lib/FetchApi";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SidebarSkeleton from "@components/SidebarSkeleton";

const fetchDetails = async (movieId: number, mediaType: string) => {
  try {
    const response = await FetchApi.get(
      `https://api.themoviedb.org/3/${mediaType.toLowerCase()}/${movieId}?language=en-US`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

function SidebarCard({ movieId, mediaType, index,isPopular }: any) {
  const mediatype = mediaType.replace(/s$/, "");
  const capitalizedMediaType =
    mediatype === "tv"
      ? mediatype.toUpperCase()
      : mediatype.charAt(0).toUpperCase() + mediatype.slice(1);
  const router = useRouter();
  const {
    isLoading,
    error,
    data: cardDetials,
  } = useQuery<any>({
    queryKey: ["side-card-detials", movieId, capitalizedMediaType],
    queryFn: () => fetchDetails(movieId, capitalizedMediaType),
  });

  if (isLoading || isPopular) {
    return <SidebarSkeleton index={index} />;
  }

  return (
    <>
      <li
        key={movieId}
        className={`cursor-pointer ${index ? "pl-[15px]" : ""}`}
        onClick={() =>
          router.push(
            `/watch-now?type=${
              capitalizedMediaType?.toLowerCase() == "movie" ? "movie" : "tv"
            }&id=${movieId}`
          )
        }
      >
        <section className="flex items-center relative listTop10 bg-white/5  hover:bg-white/10 transition rounded-md">
          <span className="relative min-w-[50px] w-[50px]">
            <Image
              height={1000}
              width={1000}
              quality={100}
              className="rounded-md w-full"
              src={`${
                cardDetials?.poster_path
                  ? "https://image.tmdb.org/t/p/original" +
                    cardDetials?.poster_path
                  : "/assets/images/miss.jpg"
              }`}
              alt="album"
            />
          </span>
          {index && (
            <b className="transition -left-[15px] absolute rounded-full w-[30px] h-[30px] flex items-center justify-center">
              {index}
            </b>
          )}
          <div className="w-full relative pr-16 pl-4">
            <h4 className="text-sm md:text-[16px] text-white uppercase font-semibold transition">
              {cardDetials?.title && cardDetials.title.length > 20
                ? cardDetials?.title?.slice(0, 20) + "..."
                : cardDetials?.name && cardDetials?.name.length > 20
                ? cardDetials?.name?.slice(0, 20) + "..."
                : cardDetials?.name
                ? cardDetials?.name
                : cardDetials?.title}
            </h4>
            <ul className="text-white/40 flex gap-2">
              <li className="text-sm">{capitalizedMediaType}</li>
              {capitalizedMediaType === "Movie" ? (
                <>
                  .<li className="text-sm">{cardDetials?.runtime} min</li>
                </>
              ) : (
                <>
                  .
                  <li className="text-sm">
                    EP{cardDetials?.last_episode_to_air?.episode_number}
                  </li>{" "}
                  .
                  <li className="text-sm">
                    SS{cardDetials?.last_episode_to_air?.season_number}
                  </li>
                </>
              )}
            </ul>
            <label className="absolute right-3 top-1/2 -mt-[10px] rounded-full px-2 text-sm transition">
              {capitalizedMediaType === "Movie"
                ? moment(cardDetials?.release_date).year()
                : cardDetials?.last_air_date
                ? new Date(cardDetials.last_air_date).getFullYear()
                : ""}
            </label>
          </div>
        </section>
      </li>
    </>
  );
}

export default SidebarCard;
