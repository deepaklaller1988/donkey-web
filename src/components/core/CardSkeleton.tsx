import React from 'react'

function CardSkeleton() {
  return (
    <li className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 cursor-pointer cardSet relative">
    <div className="relative bg-gray-300 animate-pulse h-64 rounded-xl"></div>
    <section className="py-2">
      <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse mb-2"></div>
      <ul className="text-gray-500 flex gap-2">
        <li className="h-4 bg-gray-300 rounded w-1/4 animate-pulse"></li>.
        <li className="h-4 bg-gray-300 rounded w-1/4 animate-pulse"></li>
      </ul>
    </section>
    <div className="albumDetail absolute bg-gray-800 rounded-xl top-20 left-full z-50 w-[350px]">
      <div className="w-full p-5 relative">
        <section className="pr-12">
          <div className="h-6 bg-gray-300 rounded w-1/2 animate-pulse mb-2"></div>
          <ul className="py-1 flex items-center text-white gap-4 font-light">
            <li className="h-4 bg-gray-300 rounded w-1/4 animate-pulse"></li>
            <li className="h-4 bg-gray-300 rounded w-1/4 animate-pulse"></li>
            <li className="h-4 bg-gray-300 rounded w-1/4 animate-pulse"></li>
            <li className="h-4 bg-gray-300 rounded w-1/4 animate-pulse"></li>
          </ul>
        </section>
        <label className="absolute right-5 top-1/2">
          <div className="h-6 bg-gray-300 rounded-full w-6 animate-pulse"></div>
        </label>
      </div>
      <div className="w-full p-5 border-t border-1 border-white/5 text-white/50">
        <p className="h-4 bg-gray-300 rounded w-1/2 animate-pulse mb-2"></p>
        <p className="h-4 bg-gray-300 rounded w-1/2 animate-pulse mb-2"></p>
        <p className="h-4 bg-gray-300 rounded w-1/2 animate-pulse mb-2"></p>
        <p className="h-4 bg-gray-300 rounded w-full animate-pulse mb-2"></p>
        <button className="h-10 bg-gray-300 rounded-full animate-pulse mt-4 mb-2 w-full"></button>
      </div>
    </div>
  </li>
  )
}

export default CardSkeleton
