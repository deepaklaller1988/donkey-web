
import { FaRegUser, FaRegBookmark } from 'react-icons/fa';
import { GoVideo } from 'react-icons/go';
import { IoSettingsOutline } from 'react-icons/io5';
import Link from 'next/link';


export default function ProfileTab({activeTab}:any) {

    return (
        <div className="w-full">
            <div className="homewrapper">
                <div className="w-full mt-20 pt-20 flex items-center text-white/50 gap-2">
                    <h2 className="text-white pr-2 text-[30px]">Hi <b className="text-[30px] font-semibold">Ambros Marcos</b></h2>
                    <Link href="/profile/userProfile" className={`px-2 gap-2 py-1 text-white/50 transition hover:text-white border border-1 border-white/10 hover:border-white rounded-lg flex items-center ${activeTab === 'profile' ? 'profileActive' : ''}`} ><FaRegUser /> Profile</Link>
                    <Link href="/profile/watching" className={`px-2 gap-2 py-1 text-white/50 transition hover:text-white border border-1 border-white/10 hover:border-white rounded-lg flex items-center ${activeTab === 'watching' ? 'profileActive' : ''}`} ><GoVideo /> Continue Watching </Link>
                    <Link href="/profile/Bookmark" className={`px-2 gap-2 py-1 text-white/50 transition hover:text-white border border-1 border-white/10 hover:border-white rounded-lg flex items-center ${activeTab === 'bookmark' ? 'profileActive' : ''}`} ><FaRegBookmark /> Bookmark </Link>
                    <Link href="/profile/SettingsPage" className={`px-2 gap-2 py-1 text-white/50 transition hover:text-white border border-1 border-white/10 hover:border-white rounded-lg flex items-center ${activeTab === 'settings' ? 'profileActive' : ''}`} ><IoSettingsOutline /> Settings</Link>
                </div>
            </div>


        </div>
    );
}
