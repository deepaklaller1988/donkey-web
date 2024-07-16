import React from 'react'

function SidebarSkeleton({ index }: any) {
  return (
    <li className={`cursor-pointer ${index ? "pl-[15px]" : ""}`}>
    <section className="flex items-center relative listTop10 bg-gray-300/10 animate-pulse transition rounded-md">
      <span className="relative min-w-[50px] w-[50px]">
        <div className="rounded-md w-full bg-gray-300 h-20"></div>
      </span>
      {index && (
        <b className="transition -left-[15px] absolute rounded-full w-[30px] h-[30px] flex items-center justify-center bg-gray-300">
          {index}
        </b>
      )}
      <div className="w-full relative pr-16 pl-4">
        <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse mb-2"></div>
        <ul className="text-white/40 flex gap-2">
          <li className="h-4 bg-gray-300 rounded w-1/4 animate-pulse"></li>.
          <li className="h-4 bg-gray-300 rounded w-1/4 animate-pulse"></li>.
          <li className="h-4 bg-gray-300 rounded w-1/4 animate-pulse"></li>
        </ul>
        <label className="absolute right-3 top-1/2 -mt-[10px] rounded-full px-2 text-sm bg-gray-300 h-4 w-12 animate-pulse"></label>
      </div>
    </section>
  </li>
  )
}

export default SidebarSkeleton
