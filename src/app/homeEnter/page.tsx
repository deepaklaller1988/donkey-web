import { IoMdArrowDroprightCircle } from "react-icons/io";
import "./homeEnter.css";
import Searchbar from "@/components/Searchbar";
export default function Home() {
    return (<>
        <div className="enterHome h-full w-full p-6 py-10">
            <div className="wrapper">
                <div className="enterHomeInner bg-zinc-900 rounded-xl">
                    <div className="w-full p-10">
                        <div className="enterHeader">
                            <a href="" className="w-[170px] block m-auto"><img className="max-w-full" src="/assets/images/logo.png" alt="logo" /></a>
                        </div>
                        <h1 className="text-[26px] font-medium text-center py-5 text-white/40">Watch HD Movies & TV Shows online for Free!</h1>
                        <Searchbar />
                        <div className="w-full text-center">
                            <a href="/home" className="transition text-lg font-medium p-2 px-6 rounded-full inline-flex items-center pbgColor m-auto mt-5">Go to Homepage <IoMdArrowDroprightCircle className="ml-1 text-xl" /></a>
                        </div>
                    </div>
                    <div className="w-full p-6 bg-black/50">
                        <div className="wrapper">
                            <h3 className="text-white/30 text-center">Share Donkey with your Friends!</h3>
                            <div className="w-full mt-2 text-white text-center">
                                Put All Social Here
                            </div>
                        </div>
                    </div>
                    <div className="w-full p-6 py-10">
                        <div className="wrapper">
                            <h2 className="text-white/80 text-xl mb-1">Watch HD Movies & TV Shows online for Free!</h2>
                            <p className="text-white/50 py-2">Welcome to Donkey – your ultimate destination for global entertainment! Immerse yourself in a diverse collection of movies and TV shows spanning numerous genres and countries, from Hollywood blockbusters to international hidden gems.</p>
                            <p className="text-white/50 py-1">Our library is updated regularly with the latest releases and is compatible with any device, ensuring there's something for everyone!</p>
                            <p className="text-white/50 py-1">Experience seamless, high-quality streaming with crisp audio and subtitles available in multiple languages. Our advanced algorithm ensures that content tailored to your tastes takes the spotlight, making your viewing experience truly personalized. Plus, even without an account, our platform remembers where you left off, ensuring uninterrupted enjoyment every time you return.</p>
                            <p className="text-white/50 py-1">For added convenience and customization, we offer the option to create a free account, where you can bookmark your favorite flicks, and curate your 'Continue Watching' list.</p>
                            <p className="text-white/50 py-1">We're dedicated to revolutionizing your streaming experience. We don't just offer entertainment; we provide a gateway to a world of cinematic wonders. Whether you're seeking the latest blockbuster or an indie masterpiece, we've got you covered. Explore, indulge, and join us in celebrating the magic of storytelling from around the globe.</p>
                            <p className="text-white/50 py-1">Join our vibrant community of fellow enthusiasts today and embark on an endless journey of cinematic discovery, where entertainment knows no bounds! The world of entertainment awaits!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}