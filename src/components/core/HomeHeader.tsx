import { HiMenuAlt1 } from "react-icons/hi";
import HomeSearchbar from "../HomeSearchbar";
import { FaRegUser } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
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

export default function Header() {
  const router = useRouter();
  const path = usePathname();
  const route = path.split("/");
  const { setActiveTab } = useProfileTab();
  const {token,setToken}:any=useAuth()
  const [isOpen, isClose] = useState(false);
  const [OpenProfile, setOpenProfile] = useState(false);
  const [OpenSearch, setOpenSearch] = useState(false);
  const [openSideBar, setOpenSidebar] = useState(false);

  const profileRef: any = useRef(null);

  const isHome = () => {
    return route.includes("home") ? true : false;
  };

  const toggleProfile = () => {
    setOpenProfile(!OpenProfile);
  };

  const handleClickOutside = (event: any) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setOpenProfile(false);
    }
  };

  const toggleSearch = () => {
    setOpenSearch(!OpenSearch);
  };
  const toggleSidebar = () => {
    setOpenSidebar(!openSideBar);
  };
  const handleClose = () => {
    isClose(false);
  };
  const handleLogOut = () => {
    setOpenProfile(false);
    logOut(), 
    setToken(null)
    router.push("/home");
    toasterSuccess("LogOut Successfully !", 3000, "id");
  };

  const handleProfile = (type: any) => {
    if (path.includes("profile")) {
      setActiveTab(type);
      setOpenProfile(!OpenProfile);
    } else {
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

  return (
    <>
      <div
        className={`header ${
          isHome() ? "" : "bg-white/10"
        } p-2 py-3 absolute z-10 w-full top-0 right-0`}
      >
        <div className="homewrapper">
          <div className="headerInner flex items-center justify-between relative">
            <section className="flex items-center">
              <button onClick={toggleSidebar} className="mr-4">
                <HiMenuAlt1 className="text-[30px] text-white" />
              </button>
              <Link
                href="/home"
                className="w-[120px] md:w-[150px] block m-auto"
              >
                <Image
                  width={150}
                  height={57}
                  className="max-w-full"
                  src="/assets/images/logo.png"
                  alt="logo"
                />
              </Link>
            </section>
            <div
              className={`mobileSearch w-full ${
                OpenSearch ? "openMobileSearch" : ""
              }`}
            >
              <HomeSearchbar path={path} />
            </div>
            <section
              ref={profileRef}
              className="flex justify-end min-w-auto md:min-w-[196px]"
            >
              {token ? (
                <>
                  <div className="relative flex gap-4">
                    <button
                      onClick={toggleSearch}
                      className="text-white block md:hidden"
                    >
                      <IoSearch className="w-6 h-6 hover:text-amber-500 transition" />
                    </button>
                    <button onClick={toggleProfile} className="text-white">
                      <VscAccount className="w-5 h-5 hover:text-amber-500 transition" />
                    </button>
                    <div
                      className={`profileLinks top-[70px] absolute bg-zinc-800 rounded-lg right-0 min-w-[200px] ${
                        OpenProfile ? "openProfileLinks" : ""
                      }`}
                    >
                      <button
                        className="p-2 px-3 text-white/50 transition hover:text-white flex items-center gap-2"
                        onClick={() => handleProfile("profile")}
                      >
                        <FaRegUser /> Profile{" "}
                      </button>
                      {/* <button
                        className="p-2 px-3 text-white/50 transition hover:text-white flex items-center gap-2"
                        onClick={() => handleProfile("watching")}
                      >
                        <GoVideo /> Continue Watching{" "}
                      </button> */}
                      <button
                        className="p-2 px-3 text-white/50 transition hover:text-white flex items-center gap-2"
                        onClick={() => {
                          handleProfile("Bookmark");
                        }}
                      >
                        <FaPlus /> My List{" "}
                      </button>
                      {/* <button
                        className="p-2 px-3 text-white/50 transition hover:text-white flex items-center gap-2"
                        onClick={() => handleProfile("settings") }
                      >
                        <IoSettingsOutline /> Settings
                      </button> */}
                      <button
                        type="button"
                        className="w-full border-t border-1 border-white/10 p-3 text-white transition hover:text-amber-500 flex items-center gap-2 "
                        onClick={handleLogOut}
                      >
                        <IoLogOutOutline /> Logout
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex gap-4">
                    <button
                      onClick={toggleSearch}
                      className="text-white block md:hidden"
                    >
                      <IoSearch className="w-6 h-6 hover:text-amber-500 transition" />
                    </button>
                    <button
                      className="text-white font-semibold p-2 px-6 rounded-full border-2 border-white transition hover:bg-white hover:text-black"
                      onClick={() => isClose(true)}
                    >
                      Log in
                    </button>
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
