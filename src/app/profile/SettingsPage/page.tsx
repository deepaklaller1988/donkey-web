import React from "react";

export default function SettingsPage() {
  return (
    <div>
      <div className="w-full mt-28">
      <div className='homewrapper'>
        <div className="w-full max-w-[500px] rounded-lg bg-black/50 m-auto p-10">
          <h2 className="text-white/50 text-[30px] mb-4">Settings</h2>
          <div className="full flex items-center justify-between py-2">
            <label className="text-white/50 text-sm">
              Show Continue Watching in Home page
            </label>
            <input
              className="relative mr-2 mt-[0.3rem] h-[28px] w-[48px] appearance-none rounded-full bg-white before:pointer-events-none before:absolute before:h-[28px] before:w-[48px] before:rounded-full before:bg-transparent before:content-[''] after:absolute after:right-[20px] after:z-[2] after:m-1 after:h-[20px] after:w-[20px] after:rounded-full after:border-none after:bg-black after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-amber-500 checked:after:absolute checked:after:right-0 checked:after:z-[2] checked:after:m-1 checked:after:h-[20px] checked:after:w-[20px] checked:after:rounded-full checked:after:border-none checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:after:absolute focus:after:z-[1] focus:after:block"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
            />
          </div>
          <div className="full flex items-center justify-between py-2">
            <label className="text-white/50 text-sm">Auto Play</label>
            <input
              className="relative mr-2 mt-[0.3rem] h-[28px] w-[48px] appearance-none rounded-full bg-white before:pointer-events-none before:absolute before:h-[28px] before:w-[48px] before:rounded-full before:bg-transparent before:content-[''] after:absolute after:right-[20px] after:z-[2] after:m-1 after:h-[20px] after:w-[20px] after:rounded-full after:border-none after:bg-black after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-amber-500 checked:after:absolute checked:after:right-0 checked:after:z-[2] checked:after:m-1 checked:after:h-[20px] checked:after:w-[20px] checked:after:rounded-full checked:after:border-none checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:after:absolute focus:after:z-[1] focus:after:block"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
            />
          </div>
          <div className="full flex items-center justify-between py-2">
            <label className="text-white/50 text-sm">Auto Next</label>
            <input
              className="relative mr-2 mt-[0.3rem] h-[28px] w-[48px] appearance-none rounded-full bg-white before:pointer-events-none before:absolute before:h-[28px] before:w-[48px] before:rounded-full before:bg-transparent before:content-[''] after:absolute after:right-[20px] after:z-[2] after:m-1 after:h-[20px] after:w-[20px] after:rounded-full after:border-none after:bg-black after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-amber-500 checked:after:absolute checked:after:right-0 checked:after:z-[2] checked:after:m-1 checked:after:h-[20px] checked:after:w-[20px] checked:after:rounded-full checked:after:border-none checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:after:absolute focus:after:z-[1] focus:after:block"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
            />
          </div>
          <div className="full py-2">
            <div className="w-full flex items-center justify-between">
              <label className="text-white/50 text-sm">Auto Skip Intro</label>
              <input
                className="relative mr-2 mt-[0.3rem] h-[28px] w-[48px] appearance-none rounded-full bg-white before:pointer-events-none before:absolute before:h-[28px] before:w-[48px] before:rounded-full before:bg-transparent before:content-[''] after:absolute after:right-[20px] after:z-[2] after:m-1 after:h-[20px] after:w-[20px] after:rounded-full after:border-none after:bg-black after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-amber-500 checked:after:absolute checked:after:right-0 checked:after:z-[2] checked:after:m-1 checked:after:h-[20px] checked:after:w-[20px] checked:after:rounded-full checked:after:border-none checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:after:absolute focus:after:z-[1] focus:after:block"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
              />
            </div>
            <p className="font-light text-white/50 text-[14px] pt-2">
              The skip time is contributed by the community so it may not
              available in all episodes and may be wrong sometimes. Please help
              us by improving it if possible.
            </p>
          </div>
          <div className="full py-3">
            <div className="w-full flex items-center justify-between">
              <label className="text-white/50 text-sm">Auto Next</label>
              <input
                type="number"
                value="10"
                className="text-[14px] rounded-md p-2 bg-zinc-800 transition text-white"
              />
            </div>
            <p className="font-light text-white/50 text-[14px] pt-2">
              Number of seconds to skip backward/forward when pressing J or L
              button on watch page.
            </p>
          </div>
          <div className="full py-3">
            <button className="p-3 rounded-lg pbgColor text-black w-full text-lg">
              Save Settings
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
