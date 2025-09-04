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

export default function Header() {
  const router = useRouter();
  const path = usePathname();
  const route = path.split("/");
  const { setActiveTab } = useProfileTab();
  const { token, setToken }: any = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [OpenProfile, setOpenProfile] = useState(false);
  const [OpenSearch, setOpenSearch] = useState(false);
  const [openSideBar, setOpenSidebar] = useState(false);
  const profileRef: any = useRef(null);
  const queryClient = useQueryClient();

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
                  <div className="relative flex gap-4">
                    <button
                      id="search-button"
                      onClick={toggleSearch}
                      className="text-white"
                    >
                      {
                        <IoSearch className="w-6 h-6 hover:text-amber-500 transition" />
                      }
                    </button>
                    <button
                      id="profile-button"
                      onClick={toggleProfile}
                      className="text-white"
                    >
                      <FaRegUser className="w-5 h-5 hover:text-amber-500 transition" />
                    </button>
                    <div
                      className={`profileLinks top-[70px] absolute bg-zinc-800 rounded-lg right-0 min-w-[200px] ${OpenProfile ? "openProfileLinks" : ""
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
