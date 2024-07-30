"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BookmarkPage from './Bookmark/page';
import UserProfile from './userProfile/page';
import ContinueWatchingPage from './watching/page';
import SettingsPage from './SettingsPage/page';
import { FaRegUser, FaPlus } from "react-icons/fa";
import { GoVideo } from "react-icons/go";
import { useProfileTab } from 'context/ProfileTabContext';
import useRole from '@hooks/useRole';
import Loader from '@components/core/Loader';

export default function Profile() {
  const { activeTab, setActiveTab, username } = useProfileTab();
  const [roleLoading, roleData] = useRole();
  const router = useRouter();

  useEffect(() => {
    if (roleLoading) return;

    if (!roleData || !roleData.id) {
      router.push('/dashboard');
    }
  }, [roleData, roleLoading, router]);

  const switchProcessorTab = (processorType: string) => {
    setActiveTab(processorType);
  };

  let content;

  if (roleLoading) {
    content = <Loader />;
  } else {
    switch (activeTab) {
      case "Bookmark":
        content = <BookmarkPage />;
        break;
      case "profile":
        content = <UserProfile />;
        break;
      case "watching":
        content = <ContinueWatchingPage />;
        break;
      case "settings":
        content = <SettingsPage />;
        break;
      default:
        content = <div>Invalid processor type</div>;
        break;
    }
  }
 

  if (!roleLoading && roleData && roleData.id) {
    return (
      <>
        <div className="w-full">
          <div className="homewrapper">
            <div className="w-full mt-20 pt-20 flex items-center text-white/50 gap-2">
              <h2 className="text-white pr-2 text-[30px]">
                Hi <b className="text-[30px] font-semibold">{roleData.username}</b>
              </h2>

              <button
                onClick={() => switchProcessorTab("profile")}
                className={`px-2 gap-2 py-1 text-white/50 transition hover:text-white border border-1 border-white/10 hover:border-white rounded-lg flex items-center ${activeTab === "profile" ? "profileActive" : ""
                  }`}
              >
                <FaRegUser /> Profile
              </button>
              <button
                onClick={() => switchProcessorTab("watching")}
                className={`px-2 gap-2 py-1 text-white/50 transition hover:text-white border border-1 border-white/10 hover:border-white rounded-lg flex items-center ${activeTab === "watching" ? "profileActive" : ""
                  }`}
              >
                <GoVideo /> Continue Watching
              </button>
              <button
                onClick={() => switchProcessorTab("Bookmark")}
                className={`px-2 gap-2 py-1 text-white/50 transition hover:text-white border border-1 border-white/10 hover:border-white rounded-lg flex items-center ${activeTab === "Bookmark" ? "profileActive" : ""
                  }`}
              >
                <FaPlus /> My List
              </button>
              {/* <button
                onClick={() => switchProcessorTab("settings")}
                className={`px-2 gap-2 py-1 text-white/50 transition hover:text-white border border-1 border-white/10 hover:border-white rounded-lg flex items-center ${activeTab === "settings" ? "profileActive" : ""
                  }`}
              >
                <IoSettingsOutline /> Settings
              </button> */}
            </div>
          </div>
        </div>
        {content}
      </>
    );
  }

  return  <Loader />;
}
