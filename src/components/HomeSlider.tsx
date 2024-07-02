"use client"
import '../../node_modules/react-slideshow-image/dist/styles.css';
import { FaRegCirclePlay } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa";
import { MdWhatshot } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import React from 'react';
import { Slide } from 'react-slideshow-image';
export default function HomeSlider() {
  return (
    <>
      <div className="w-full relative">
        <Slide>
          <div className="each-slide-effect slideMain">
            <img src='/assets/images/slides/1.jpg' alt="slide" />
            <div className='sliderSet'>
              <div className='sliderContent relative z-10'>
                <div className='homewrapper'>
                  <div className='sliderContentSet'>
                    <span className='text-gray-400 flex items-center'><MdWhatshot className='mr-1 text-lg'/> Trending</span>
                    <h2 className='text-[50px] font-bold text-white'>ROBBERY TEAM 1989</h2>
                    <ul className='py-1 flex items-center text-white gap-4 font-light'>
                      <li><b className='font-bold'>2024</b></li>
                      <li>102min</li>
                      <li>Thriller</li>
                      <li>Comedy</li>
                      <li><span className='flex items-center gap-2 pColor font-semibold'><FaStar /> 4.4</span></li>
                      <li><label className='rounded-full pbgColor text-black font-bold px-2'>HD</label></li>
                      </ul>
                      <p className='text-lg text-white font-light'>A group of high-end professional thieves start to feel the heat from the LAPD when they unknowingly leave a verbal clue at their latest heist. A group of high-end professional thieves start to feel the heat from the LAPD when they unknowingly leave a verbal clue at their latest heist.</p>
                  <section className='flex mt-4 gap-4'>
                    <button className='flex items-center gap-2 pbgColor px-6 py-2 rounded-full transition'>Watch Now <FaRegCirclePlay className='text-xl'/></button>
                    <button className='flex items-center gap-2 border borde-2 border-white hover:border-white/50 transition text-white px-6 py-2 rounded-full'><FaBookmark /> Bookmark</button>
                    </section>
                  </div>
                </div>
              </div>
              <div className='absolute w-full z-0 left-0 bottom-0'>
          <img src="/assets/images/slides/shadow.png" alt="shadow"/>
        </div>
            </div>
          </div>
          <div className="each-slide-effect slideMain">
            <img src='/assets/images/slides/2.jpg' alt="slide" />
            <div className='sliderSet'>
              <div className='sliderContent relative z-10'>
                <div className='homewrapper'>
                  <div className='sliderContentSet'>
                    <span className='text-gray-400 flex items-center'><MdWhatshot className='mr-1 text-lg'/> Trending</span>
                    <h2 className='text-[50px] font-bold text-white'>ROBBERY TEAM 1989</h2>
                    <ul className='py-1 flex items-center text-white gap-4 font-light'>
                      <li><b className='font-bold'>2024</b></li>
                      <li>102min</li>
                      <li>Thriller</li>
                      <li>Comedy</li>
                      <li><span className='flex items-center gap-2 pColor font-semibold'><FaStar /> 4.4</span></li>
                      <li><label className='rounded-full pbgColor text-black font-bold px-2'>HD</label></li>
                      </ul>
                      <p className='text-lg text-white font-light'>A group of high-end professional thieves start to feel the heat from the LAPD when they unknowingly leave a verbal clue at their latest heist. A group of high-end professional thieves start to feel the heat from the LAPD when they unknowingly leave a verbal clue at their latest heist.</p>
                  <section className='flex mt-4 gap-4'>
                    <button className='flex items-center gap-2 pbgColor px-6 py-2 rounded-full transition'>Watch Now <FaRegCirclePlay className='text-xl'/></button>
                    <button className='flex items-center gap-2 border borde-2 border-white hover:border-white/50 transition text-white px-6 py-2 rounded-full'><FaBookmark /> Bookmark</button>
                    </section>
                  </div>
                </div>
              </div>
        <div className='absolute w-full z-0 left-0 bottom-0'>
          <img src="/assets/images/slides/shadow.png" alt="shadow"/>
        </div>
            </div>
          </div>
        </Slide>
      </div>
    </>
  );
}