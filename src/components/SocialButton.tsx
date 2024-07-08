"use client"
import React from 'react';
import Image from 'next/image';
import { FaFacebook } from "react-icons/fa";
import { PiXLogoBold } from "react-icons/pi";
import {
    FacebookShareButton,
    InstapaperShareButton,
    TwitterShareButton,
    RedditShareButton,
    WhatsappShareButton,
    TelegramShareButton,
    FacebookMessengerShareButton
} from "react-share";

export default function SocialButton() {
    const url = "url"
    return (
        <div className="share-container max-w-screen-lg mx-auto mb-20">
            <p className="text-center text-white">If you enjoy the website, please consider sharing it with your friends. Thank you!</p>
            <div className="flex justify-center gap-4 mt-4">

                <FacebookShareButton url={`${process.env.NEXT_PUBLIC_API_URL}`}>
                    <div className="bg-zinc-500/20 rounded-md px-4 py-2 flex items-center justify-center text-white">
                        <FaFacebook className="w-5 h-5 text-sky-600"/>
                        <span className="ml-2 text-[15px]">11.4k</span>
                    </div>
                </FacebookShareButton>

                <TwitterShareButton url={`${process.env.NEXT_PUBLIC_API_URL}`}>
                    <div className="bg-zinc-500/20 rounded-md px-4 py-2 flex items-center justify-center text-white">
                    <PiXLogoBold className="w-5 h-5 text-sky-500" />
                        <span className="ml-2 text-[15px]">7.4k</span>
                    </div>
                </TwitterShareButton>

               <FacebookMessengerShareButton url={`${process.env.NEXT_PUBLIC_API_URL}`} appId="">
                <div className="bg-zinc-500/20 rounded-md px-4 py-2 flex items-center justify-center text-white">
                    <Image src="/images/messager.png" alt="Messenger" width={20} height={20} />
                    <span className="ml-2 text-[15px]">2k</span>
                </div>
                </FacebookMessengerShareButton> 

                <RedditShareButton url={`${process.env.NEXT_PUBLIC_API_URL}`}>
                    <div className=" bg-zinc-500/20 rounded-md px-4 py-2 flex items-center justify-center text-white">
                        <Image src="/images/reddit.png" alt="Reddit" width={20} height={20} />
                        <span className="ml-2 text-[15px]">116k</span>
                    </div>
                </RedditShareButton>

                <WhatsappShareButton url={`${process.env.NEXT_PUBLIC_API_URL}`}>
                <div className="bg-zinc-500/20 rounded-md px-4 py-2 flex items-center justify-center text-white">
                    <Image src="/images/whatsapp.png" alt="WhatsApp" width={20} height={20} />
                    <span className="ml-2 text-[15px]">1.8k</span>
                </div>
                </WhatsappShareButton>

                <TelegramShareButton url={`${process.env.NEXT_PUBLIC_API_URL}`}>
                <div className="bg-zinc-500/20 rounded-md px-4 py-2 flex items-center justify-center text-white">
                    <Image src="/images/telegram.png" alt="Telegram" width={20} height={20} />
                    <span className="ml-2 text-[15px]">345k</span>
                </div>
                </TelegramShareButton>
            </div>
        </div>
    );
}
