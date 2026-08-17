import { HiMenuAlt1 } from "react-icons/hi";
import HomeSearchbar from "../HomeSearchbar";
import { FaRegUser } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { usePathname, useRouter } from "next/navigation";
import AuthForm from "./AuthForm";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { logOut } from "@lib/userToken";
import { IoSearch } from "react-icons/io5";
import NavBar from "./NavBar";
import { toasterSuccess } from "./Toaster";
import { useProfileTab } from "context/ProfileTabContext";
import Image from "next/image";
import { useAuth } from "context/AuthContext";
import { GoVideo } from "react-icons/go";
import SignInButton from "@components/buttons/SignInButton";
import { useQueryClient } from "@tanstack/react-query";
import { VscSettings } from "react-icons/vsc";
import { useAdStatus } from "context/AdStatusContext";

export default function Header() {
  const router = useRouter();
  const path = usePathname();
  const route = path.split("/");
  const { setActiveTab } = useProfileTab();
  const { token, setToken }: any = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [OpenProfile, setOpenProfile] = useState(false);
  const [OpenSearch, setOpenSearch] = useState(false);
  const [openSideBar, setOpenSidebar] = useState(false);
  const profileRef: any = useRef(null);
  const statusRef:any = useRef(null);
  const queryClient = useQueryClient();
  const { adStatus, toggleAdStatus } = useAdStatus();

  const isHome = () => {
    return route.includes("home") ? true : false;
  };

  const toggleProfile = () => {
    setOpenProfile(!OpenProfile);
    setOpenSettings(false);
  };

  const toggleSettings = () => {
    setOpenSettings((prev) => !prev);
    setOpenProfile(false);
  };

  const handleClickOutside = (event: any) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setOpenProfile(false);
    }
  };

  const handleStatusRefOutside = (event: any) => {
    if (statusRef.current && !statusRef.current.contains(event.target)) {
      setOpenSettings(false);
    }
  };

  const toggleSearch = () => {
    setOpenSearch(!OpenSearch);
  };

  const toggleSidebar = () => {
    setOpenSidebar(!openSideBar);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleLogOut = () => {
    setOpenProfile(false);
    logOut(), setToken(null);
    router.push("/");
    toasterSuccess("Signed out Successfully.", 3000, "id");
  };



  const handleProfile = (type: any) => {
    console.log(type, path, "=========")
    if (type === "Bookmark") {
      queryClient.invalidateQueries({ queryKey: ['bookmark'] });
    }

    // if (type === "watching") {
    //   queryClient.invalidateQueries({ queryKey: ['mediaprogress'] });
    // }

    if (path.includes("profile")) {
      setActiveTab(type);
      setOpenProfile(!OpenProfile)

    }

    else {
      router.push("/profile");
      setOpenProfile(!OpenProfile);
      setActiveTab(type);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(()=> {
    document.addEventListener("mousedown", handleStatusRefOutside);
    return () => {
      document.removeEventListener("mousedown", handleStatusRefOutside);
    };
  },[])


  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div
        className={`header ${isHome() ? "" : ""
          } p-2 py-3 absolute z-10 w-full top-0 right-0`}
      >
        <div className="homewrapper">
          <div className="headerInner flex items-center justify-between relative">
            <section className="flex items-center">
              <button onClick={toggleSidebar} className="mr-4">
                <HiMenuAlt1 className="text-[30px] text-white" />
              </button>
              <Link
                href="/"
                className="w-[120px] md:w-[150px] block m-auto"
              >
                <Image
                  quality={30}
                  width={150}
                  height={57}
                  className="max-w-full"
                  src="/assets/images/logo.png"
                  priority={true}
                  alt="logo"
                />
              </Link>
            </section>
            <div
              className={`mobileSearch w-full ${OpenSearch ? "openMobileSearch" : ""
                }`}
            >
              {OpenSearch && <HomeSearchbar path={path} />}
            </div>
            <section
              ref={profileRef}
              className="flex justify-end min-w-auto md:min-w-[196px]"
            >
              {token ? (
                <>
                  <div className="flex gap-4">
                    <div className="relative"
                    ref={statusRef}>
                      <button
                        id="setting-button"
                        type="button"
                        onClick={toggleSettings}
                        className="text-white pt-2"
                      >
                        <VscSettings className="w-6 h-6 hover:text-amber-500 transition" />
                      </button>

                      {openSettings && (
                        <div className="absolute top-[42px] right-0 z-50">
                          <div className="absolute -top-[6px] right-[6px] w-3 h-3 rotate-45 bg-zinc-900 border-l border-t border-white/10" />
                          <div className="relative min-w-[225px] rounded-lg border border-white/10 bg-zinc-900 px-4 py-3 shadow-xl">
                            <div className="flex items-center justify-between gap-6">
                              <span className="text-sm font-medium text-white">
                                Ad Status
                              </span>

                              <button
                                type="button"
                                onClick={toggleAdStatus}
                                aria-label="Toggle Ad Status"
                                className={`relative flex h-7 w-[76px] items-center rounded-full border transition-all duration-200 ${
                                  adStatus
                                    ? "border-amber-500 bg-amber-500/20"
                                    : "border-white/20 bg-zinc-800"
                                }`}
                              >
                                <span
                                  className={`absolute h-6 w-6 rounded-full border transition-all duration-200 ${
                                    adStatus
                                      ? "left-[48px] border-amber-400 bg-amber-400"
                                      : "left-[2px] border-white/30 bg-zinc-500"
                                  }`}
                                />

                                <span
                                  className={`absolute text-[10px] font-medium ${
                                    adStatus
                                      ? "left-[10px] text-amber-400"
                                      : "right-[9px] text-white/70"
                                  }`}
                                >
                                  {adStatus ? "ON" : "OFF"}
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <button
                      id="search-button"
                      type="button"
                      onClick={toggleSearch}
                      className="text-white"
                    >
                      <IoSearch className="w-6 h-6 hover:text-amber-500 transition" />
                    </button>
                    <button
                      id="profile-button"
                      type="button"
                      onClick={toggleProfile}
                      className="text-white"
                    >
                      <FaRegUser className="w-5 h-5 hover:text-amber-500 transition" />
                    </button>
                    <div
                      className={`profileLinks top-[70px] absolute bg-zinc-800 rounded-lg right-0 min-w-[200px] ${
                        OpenProfile ? "openProfileLinks" : ""
                      }`}
                    >
                      <button
                        id="profile-button"
                        className="p-2 px-3 text-white/50 transition hover:text-white flex items-center gap-2"
                        onClick={() => handleProfile("profile")}
                      >
                        <FaRegUser /> Profile{" "}
                      </button>
                      <button
                        id="profile-button"
                        className="p-2 px-3 text-white/50 transition hover:text-white flex items-center gap-2"
                        onClick={() => handleProfile("watching")}
                      >
                        <GoVideo /> Continue Watching{" "}
                      </button>
                      <button
                        id="profile-button"
                        className="p-2 px-3 text-white/50 transition hover:text-white flex items-center gap-2"
                        onClick={() => handleProfile("Bookmark")}
                      >
                        <FaPlus /> My List{" "}
                      </button>
                      <button
                        id="profile-button"
                        type="button"
                        className="w-full border-t border-1 border-white/10 p-3 text-white transition hover:!text-amber-500 flex items-center gap-2"
                        onClick={handleLogOut}
                      >
                        <IoLogOutOutline /> Sign out
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex gap-4">
                    <div className="relative"
                    ref={statusRef}>
                      <button
                        id="setting-button"
                        type="button"
                        onClick={toggleSettings}
                        className="text-white pt-2"
                      >
                        <VscSettings className="w-6 h-6 hover:text-amber-500 transition" />
                      </button>

                      {openSettings && (
                        <div className="absolute top-[42px] right-0 z-50">
                          <div className="absolute -top-[6px] right-[6px] w-3 h-3 rotate-45 bg-zinc-900 border-l border-t border-white/10" />
                          <div className="relative min-w-[225px] rounded-lg border border-white/10 bg-zinc-900 px-4 py-3 shadow-xl">
                            <div className="flex items-center justify-between gap-6">
                              <span className="text-sm font-medium text-white">
                                Ad Status
                              </span>

                              <button
                                type="button"
                                onClick={toggleAdStatus}
                                aria-label="Toggle Ad Status"
                                className={`relative flex h-7 w-[76px] items-center rounded-full border transition-all duration-200 ${
                                  adStatus
                                    ? "border-amber-500 bg-amber-500/20"
                                    : "border-white/20 bg-zinc-800"
                                }`}
                              >
                                <span
                                  className={`absolute h-6 w-6 rounded-full border transition-all duration-200 ${
                                    adStatus
                                      ? "left-[48px] border-amber-400 bg-amber-400"
                                      : "left-[2px] border-white/30 bg-zinc-500"
                                  }`}
                                />

                                <span
                                  className={`absolute text-[10px] font-medium ${
                                    adStatus
                                      ? "left-[10px] text-amber-400"
                                      : "right-[9px] text-white/70"
                                  }`}
                                >
                                  {adStatus ? "ON" : "OFF"}
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <button
                      id="search-button"
                      onClick={toggleSearch}
                      className="text-white"
                    >
                      {
                        <IoSearch className="w-6 h-6 hover:text-amber-500 transition" />
                      }
                    </button>
                    <SignInButton id="login-button" onClick={handleClick} />
                  </div>
                </>
              )}
            </section>
          </div>
        </div>
      </div>
      {isOpen ? (
        <AuthForm
          isOpen={isOpen}
          handleClose={handleClose}
          ProfileType="profile"
        />
      ) : null}
      <NavBar openSideBar={openSideBar} toggleSidebar={toggleSidebar} />
    </>
  );
}
