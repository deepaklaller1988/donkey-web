"use client";
import API from "@lib/Api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import User from "@lib/User";
import Loader from "@components/core/Loader";
import CustomPagination from "@components/CustomPagination";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useProfileTab } from "context/ProfileTabContext";
import Card from "./Card";


const fetchMovie = async (userId: any, page: number, limit: number) => {
    try {
        const response = await API.get(`mediaprogress?user_id=${userId}&page=${page}&limit=${limit}&pagination=${true}`);
        const data = response
        return data;
    } catch (error) {
        console.error('Failed to fetch data from the primary API:', error);
    }
};

export default function WatchingPage({ type }: any) {
    const queryClient: any = useQueryClient()
    const router=useRouter()
    const {  setActiveTab } = useProfileTab();
    const UserId = User.id;

    const [currentPage, setCurrentPage] = useState(1);
    const {
        isLoading: isMediaLoading,
        data: mediaData,
        refetch 
    } = useQuery<any>({
        queryKey: ["watch-movies", UserId, currentPage],
        queryFn: () => fetchMovie(UserId, currentPage, 12),
        enabled: !!(UserId && currentPage),
        refetchOnWindowFocus: true,
    });

    useEffect(() => {
        refetch();
    }, [refetch]);


    if (isMediaLoading) {
        <Loader />
    }

    return (
        <>
            {/* {type == "home" && mediaData && mediaData?.data?.length > 0 &&
                <h3 className="text-white text-[25px] font-semibold">CONTINUE WATCHING</h3>
            } */}
                <ul className="w-full flex flex-wrap gap-y-5 md:gap-y-10">
                    {mediaData && mediaData?.data?.length > 0 ? (
                        mediaData?.data?.map((item: any) => (
                            <Card
                                key={item?.id}
                                movieId={item?.media_id}
                                mediaType={item.media_type === 'movie' ? 'Movie' : 'TV'}
                                isMyList={true}
                                queryClient={queryClient}
                            />
                        ))
                    ) : (
                        <>
                            <div className="flex justify-center items-center h-full w-full">
                                {type == "profile" && (
                                    <h3 className="text-white/70 text-[20px] font-semibold mb-6">There is no result...</h3>
                                )}
                            </div>
                        </>
                    )}

                </ul>

            {type == "profile" && <CustomPagination
                currentPage={currentPage}
                totalItems={mediaData?.count}
                totalPages={mediaData?.count}
                itemsPerPage={12}
                onPageChange={(page: number) => setCurrentPage(page)}
            />
            }
            {type == "home" && mediaData && mediaData?.data?.length > 0 &&
                <section className="flex justify-center pt-10 mb-10">
                    <button className="border border-1 rounded-full text-white px-2 hover:bg-white hover:text-black transition" onClick={() =>{ setActiveTab("watching"),router.push(`/profile`)}}>View More</button>
                </section>
            }
        </>

    )
}
