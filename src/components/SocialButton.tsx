"use client"
import React from 'react';
import Image from 'next/image';
import Loader from './core/Loader';
import API from '@lib/Api';

import { FaFacebook } from "react-icons/fa";
import { PiXLogoBold } from "react-icons/pi";
import {
    FacebookShareButton,
    TwitterShareButton,
    RedditShareButton,
    WhatsappShareButton,
    TelegramShareButton,
    FacebookMessengerShareButton
} from "react-share";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const fetchCounts = async () => {
    try {
        const response = await API.get('socialcount');
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const formatCount = (count:any) => {
    if (count >= 1000) {
        return `${(count / 1000).toFixed(1)}k`;
    }
    return count;
};


export default function SocialButton() {
 const queryClient: any = useQueryClient();

    const {
        isLoading,
        data: counts,
    } = useQuery({
        queryKey: ["counts"],
        queryFn: fetchCounts
    });

    const mutation = useMutation({
        mutationFn: async (platform: any) => {
            if (!platform) {
                console.log("Platform is Required");
                return;
            }
            try {
                const response = await API.post(`socialcount?platform=${platform}`, { platform });
                return response?.data;
            } catch (error: any) {
                console.error("Error submitting rating:", error);
            }
        },
        onSuccess: (data) => {
            if (data) {
                queryClient.invalidateQueries(['counts']);
            }
        },
        onError: (error: any) => {
            console.error("Error submitting rating:", error);

        },
    });

    const handleCounts = (platform: any) => {
        mutation.mutate(platform);
    };

    if(isLoading){
        <Loader/>
    }

    const url = "url"
    return (
        <div className="share-container max-w-screen-lg mx-auto">
            <div className="flex justify-center gap-2 md:gap-4 mt-4">

                <FacebookShareButton url={`https://www.donkey.to/`}>
                    <div className="bg-zinc-500/20 rounded-md p-2 md:px-4 py-2 flex items-center justify-center text-white" onClick={() => handleCounts("facebook_count")}>
                        <FaFacebook className="w-5 h-5 text-sky-600" />
                        <span className="hidden md:block ml-2 text-[15px]">{formatCount(counts?.facebook_count)}</span>
                    </div>
                </FacebookShareButton>

                <TwitterShareButton url={`https://www.donkey.to/`}>
                    <div className="bg-zinc-500/20 rounded-md p-2 md:px-4 py-2 flex items-center justify-center text-white" onClick={() => handleCounts("twitter_count")}>
                        <PiXLogoBold className="w-5 h-5 text-sky-500" />
                        <span className="hidden md:block ml-2 text-[15px]" >{formatCount(counts?.twitter_count)}</span>
                    </div>
                </TwitterShareButton>

                <FacebookMessengerShareButton url={`https://www.donkey.to/`} appId="">
                    <div className="bg-zinc-500/20 rounded-md p-2 md:px-4 py-2 flex items-center justify-center text-white" onClick={() => handleCounts("messager_count")}>
                        <Image 
                         quality={10}
                        src="/images/messager.png" alt="Messenger" width={20} height={20} />
                        <span className="hidden md:block ml-2 text-[15px]" >{formatCount(counts?.messager_count)}</span>
                    </div>
                </FacebookMessengerShareButton>

                <RedditShareButton url={`https://www.donkey.to/`}>
                    <div className=" bg-zinc-500/20 rounded-md p-2 md:px-4 py-2 flex items-center justify-center text-white" onClick={() => handleCounts("reddit_count")}>
                        <Image 
                         quality={10}
                        src="/images/reddit.png" alt="Reddit" width={20} height={20} />
                        <span className="hidden md:block ml-2 text-[15px]">{formatCount(counts?.reddit_count)}</span>
                    </div>
                </RedditShareButton>

                <WhatsappShareButton url={`https://www.donkey.to/`}>
                    <div className="bg-zinc-500/20 rounded-md p-2 md:px-4 py-2 flex items-center justify-center text-white" onClick={() => handleCounts("whatsapp_count")}>
                        <Image
                         quality={10}
                        src="/images/whatsapp.png" alt="WhatsApp" width={20} height={20} />
                        <span className="hidden md:block ml-2 text-[15px]" >{formatCount(counts?.whatsapp_count)}</span>
                    </div>
                </WhatsappShareButton>

                <TelegramShareButton url={`https://www.donkey.to/`}>
                    <div className="bg-zinc-500/20 rounded-md p-2 md:px-4 py-2 flex items-center justify-center text-white" onClick={() => handleCounts("telegram_count")}>
                        <Image 
                         quality={10}
                        src="/images/telegram.png" alt="Telegram" width={20} height={20} />
                        <span className="hidden md:block ml-2 text-[15px]" >{formatCount(counts?.telegram_count)}</span>
                    </div>
                </TelegramShareButton>
            </div>
        </div>
    );
}
