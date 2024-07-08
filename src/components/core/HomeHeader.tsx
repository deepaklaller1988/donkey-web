import { HiMenuAlt1 } from "react-icons/hi";
import HomeSearchbar from "../HomeSearchbar";
import { FaUserCircle } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";
export default function Header() {
    return (
        <>
            <div className="header p-2 absolute z-10 w-full top-0 right-0">
                <div className="homewrapper">
                    <div className="headerInner flex items-center justify-between">
                        <section className="flex items-center">
                            <a href="" className="mr-4"><HiMenuAlt1 className="text-[30px] text-white" /></a>
                            <a href="" className="w-[170px] block m-auto"><img className="max-w-full" src="/assets/images/logo.png" alt="logo" /></a>
                        </section>
                        <HomeSearchbar />
                        {/* <section className="flex justify-end w-[216px]">
                        <button className="mr-4 text-white font-semibold p-2 px-6 rounded-full border border-2 border-white transition hover:bg-white hover:text-black">Login</button>
                        <button className="text-white font-semibold p-2 px-6 rounded-full border border-2 border-white transition hover:bg-white hover:text-black">Signup</button>
                    </section> */}
                        <section className="flex justify-end w-[216px]">
                            <div className="relative">
                                <button className="mr-4 text-white font-semibold p-2 rounded-full border border-2 border-white transition hover:bg-white hover:text-black"><IoIosNotifications /></button>
                                <div className="openNotifications"></div>
                            </div>
                            <div className="relative">
                                <button className="text-white font-semibold p-2 rounded-full border border-2 border-white transition hover:bg-white hover:text-black"><FaUserCircle /></button>
                                <div className="openNotifications"></div>
                            </div>
                        </section>
                    </div>
                </div >
            </div >

            <div className="navSet fixed top-0 left-0 z-20 w-full h-screen bg-black/70">
                {/* navSetOpen */}
                <div className="fixed top-0 w-[300px] h-screen bg-white flex flex-col">
                    <section className="p-2 flex items-center justify-between">
                        <a href="" className="w-[170px] block"><img className="max-w-full" src="/assets/images/logo.png" alt="logo" /></a>
                        <IoMdClose className="text-black w-6 h-6 cursor-pointer transition hover:text-amber-500" />
                    </section>
                    <a href="" className="pbgColor p-2 px-4 hover:bg-amber-500 transition">Home</a>
                    <a href="" className="p-2 px-4 hover:bg-amber-500 transition">Genre</a>
                    <a href="" className="p-2 px-4 hover:bg-amber-500 transition">Country</a>
                    <a href="" className="p-2 px-4 hover:bg-amber-500 transition">Movies</a>
                    <a href="" className="p-2 px-4 hover:bg-amber-500 transition">TV Shows</a>
                    <a href="" className="p-2 px-4 hover:bg-amber-500 transition">Trending</a>
                    <a href="" className="p-2 px-4 hover:bg-amber-500 transition">Top 10 Movies</a>
                    <a href="" className="p-2 px-4 hover:bg-amber-500 transition">Top 10 TV Episodes</a>
                </div>
            </div>
            <div className="loginRegisterForgotForm hidden items-center justify-center fixed top-0 left-0 z-20 w-full h-screen bg-black/70">
                <section className="max-h-[90vh] overflow-auto p-6 w-full max-w-[400px] bg-zinc-800 rounded-lg">
                    <h2 className="text-white text-[30px] pb-2 flex items-center justify-between">Welcome Back! <IoMdClose className="text-white w-6 h-6 cursor-pointer transition hover:text-amber-500" /></h2>
                    <form className="flex flex-col gap-2">
                        <div className="w-full flex flex-col gap-1">
                            <label className="text-white/50">Account</label>
                            <input className="p-2 px-4 rounded-lg bg-white/5 text-white" type="text" placeholder="Username or Email" />
                        </div>
                        <div className="w-full flex flex-col gap-1">
                            <label className="text-white/50">Password</label>
                            <input className="p-2 px-4 rounded-lg bg-white/5 text-white" type="text" placeholder="Your Password or Email" />
                        </div>
                        <div className="w-full text-white py-3">
                            Captcha comes here
                        </div>
                        <div className="w-full text-center pbgColor px-6 py-2 rounded-full transition">
                            <button>Sign in</button>
                        </div>
                        <div className="w-full mt-4">
                            <a href="" className="pColor flex gap-2 items-center">Forgot your Password <IoIosArrowRoundForward className="w-6 h-6" /></a>
                        </div>
                        <div className="w-full mb-4">
                            <a href="" className="pColor flex gap-2 items-center">Sign up for a new account <IoIosArrowRoundForward className="w-6 h-6" /></a>
                        </div>
                    </form>
                </section>
            </div>
            <div className="loginRegisterForgotForm hidden items-center justify-center fixed top-0 left-0 z-20 w-full h-screen bg-black/70">
                <section className="max-h-[90vh] overflow-auto p-6 w-full max-w-[400px] bg-zinc-800 rounded-lg">
                    <h2 className="text-white text-[30px] pb-2 flex items-center justify-between">Forgot Password <IoMdClose className="text-white w-6 h-6 cursor-pointer transition hover:text-amber-500" /></h2>
                    <p className="text-sm text-white/50 pb-4">We will send an email to your box, just follow that link to set your new password.</p>
                    <form className="flex flex-col gap-2">
                        <div className="w-full flex flex-col gap-1">
                            <label className="text-white/50">Account</label>
                            <input className="p-2 px-4 rounded-lg bg-white/5 text-white" type="text" placeholder="Username or Email" />
                        </div>
                        <div className="w-full text-white py-3">
                            Captcha comes here
                        </div>
                        <div className="w-full text-center pbgColor px-6 py-2 rounded-full transition">
                            <button>Forgot</button>
                        </div>
                        <div className="w-full mb-4">
                            <a href="" className="pColor flex gap-2 items-center">Back to sign in <IoIosArrowRoundForward className="w-6 h-6" /></a>
                        </div>
                    </form>
                </section>
            </div>
            <div className="loginRegisterForgotForm hidden items-center justify-center fixed top-0 left-0 z-20 w-full h-screen bg-black/70">
                <section className="max-h-[90vh] overflow-auto p-6 w-full max-w-[400px] bg-zinc-800 rounded-lg">
                    <h2 className="text-white text-[30px] pb-2 flex items-center justify-between">Account Sign up <IoMdClose className="text-white w-6 h-6 cursor-pointer transition hover:text-amber-500" /></h2>
                    <form className="flex flex-col gap-2">
                        <div className="w-full flex flex-col gap-1">
                            <label className="text-white/50">Username <sup>*</sup></label>
                            <input className="p-2 px-4 rounded-lg bg-white/5 text-white" type="text" placeholder="Username" />
                        </div>
                        <div className="w-full flex flex-col gap-1">
                            <label className="text-white/50">Email <sup>*</sup></label>
                            <input className="p-2 px-4 rounded-lg bg-white/5 text-white" type="text" placeholder="Email" />
                        </div>
                        <div className="w-full flex flex-col gap-1">
                            <label className="text-white/50">Password <sup>*</sup></label>
                            <input className="p-2 px-4 rounded-lg bg-white/5 text-white" type="text" placeholder="Password" />
                        </div>
                        <div className="w-full flex flex-col gap-1">
                            <label className="text-white/50">Repeat Password <sup>*</sup></label>
                            <input className="p-2 px-4 rounded-lg bg-white/5 text-white" type="text" placeholder="Password" />
                        </div>
                        <div className="w-full text-white py-3">
                            Captcha comes here
                        </div>
                        <div className="w-full text-center pbgColor px-6 py-2 rounded-full transition">
                            <button>Sign up</button>
                        </div>
                        <div className="w-full mt-4 flex items-center gap-2 text-white">
                            Already have account? <a href="" className="pColor flex gap-2 items-center">Login Here <IoIosArrowRoundForward className="w-6 h-6" /></a>
                        </div>
                    </form>
                </section>
            </div>
        </>
    );
}