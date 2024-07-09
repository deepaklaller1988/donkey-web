"use client"
import '../../node_modules/react-slideshow-image/dist/styles.css';
import { FaRegCirclePlay } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import React, { useEffect, useState } from 'react';
import { Slide } from 'react-slideshow-image';
import {useQuery, useQueries} from '@tanstack/react-query';
import moment from 'moment';
import Link from 'next/link';

import FetchApi from '@lib/FetchApi';
import Loader from './core/Loader';
import { useRouter } from 'next/navigation';

const fetchTopAll = async () => {
  try {
    const response = await FetchApi.get('https://api.themoviedb.org/3/trending/all/day?language=en-US');
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log(error)
  }
};

const getDetail = async (item : any) => {
  try {
    const response = await FetchApi.get(`https://api.themoviedb.org/3/${item.media_type}/${item.id}?language=en-US`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error)
  }
};


export default function HomeSlider() {
  const router = useRouter();
  // const [combinedList,setCombinedList] =useState([])
  const {
    isLoading,
    error,
    data: products,
} = useQuery({
    queryKey: ['products'],
    queryFn: fetchTopAll,
});

const movieDetail = useQueries({
  queries: products
    ? products.map((item: any) => {
        return {
          queryKey: ['movie-detail', item.id],
          queryFn: () => getDetail(item),
          enabled: !!products,
        };
      })
  : [], // if users is undefined, an empty array will be returned
});

let combinedList =[];

if(products && products.length > 0 && movieDetail){
   combinedList = products.map((product: any, index: number) => {
   const detailData: any = movieDetail[index].data;
   return { ...product, genres: detailData?.genres ? detailData?.genres : [], runtime: detailData?.runtime ? detailData?.runtime : null, release_date: product.media_type === 'tv' ? detailData?.first_air_date  : product.release_date };
  });

}

const indicators = (index:any) => (
  <div className="indicator">
    <div className='transition p-1 bg-white rounded-full mx-1 cursor-pointer'></div>
  </div>
);


  if(isLoading){
    return(
      <div>
      <Loader />
    </div>
    )
  }


  return (
    <>
      <div className="w-full relative">
        <Slide indicators={indicators}>
          {combinedList && combinedList.length > 0 && combinedList.map((item: any, index: number) => (
            <div key={item.id} className="each-slide-effect slideMain">
            <img src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`} alt="slide" />
            <div className='sliderSet'>
              <div className='sliderContent relative z-10'>
                <div className='homewrapper'>
                  <div className='sliderContentSet'>
                    <span className='text-white/70 flex items-center'>
                    <img src="/assets/images/slides/hot.png" alt="trending" className='mr-1 w-[14px]'/> Trending</span>
                    <h2 className='text-[50px] font-bold text-white'>{item.title ? item.title : item.name}</h2>
                    <ul className='py-1 flex items-center text-white gap-4 font-light'>
                      <li><b className='font-bold'>{item.release_date ? moment(item.release_date).year() : ""}</b></li>
                      {item.runtime && (<li>{item.runtime} min</li>)}
                      {item.genres && item.genres.length > 0 ? item.genres.map((gen:any) => (<li key={gen.id}>{gen.name}</li>)) : ""}
                      <li><span className='flex items-center gap-2 text-white text-sm font-semibold'><FaStar />{item?.vote_average.toFixed(1)}</span></li>
                      <li><label className='rounded-full pbgColor text-black font-bold px-2'>HD</label></li>
                      </ul>
                      <p className='text-lg text-white font-light'>{item?.overview && item?.overview.length > 250 ? item?.overview.slice(0,250) + "..." : item?.overview}</p>
                  <section className='flex mt-4 gap-4'>
                    <button className='flex items-center gap-2 pbgColor px-6 py-2 rounded-full transition'>Watch Now <FaRegCirclePlay className='text-xl'/></button>
                    <button className='flex items-center gap-2 transition text-white hover:text-amber-500 px-6 py-2 font-semibold'><FaRegBookmark className='w-5 h-5'/> Bookmark</button>
                    </section>
                  </div>
                </div>
              </div>
              <div className='absolute w-full z-0 left-0 bottom-0'>
          <img className='w-full h-[280px]' src="/assets/images/slides/shadow.png" alt="shadow"/>
        </div>
            </div>
          </div>
          ))}
        </Slide>
      </div>
    </>
  );
}