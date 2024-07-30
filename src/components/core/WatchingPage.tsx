"use client"
import WatchingCard from "@components/core/WatchingCard";
import API from "@lib/Api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import User from "@lib/User";
import { toasterError, toasterSuccess } from "@components/core/Toaster";
import Loader from "@components/core/Loader";
import CustomPagination from "@components/CustomPagination";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useProfileTab } from "context/ProfileTabContext";


const fetchMovie = async (userId: any, page: number, limit: number) => {
    try {
        const response = await API.get(`mediaprogress?user_id=${userId}&page=${page}&limit=${limit}&pagination=${true}`);
        const data = response
        return data;
    } catch (error) {
        console.error('Failed to fetch data from the primary API:', error);
    }
};

const deleteMovies = async (id: any) => {
    try {
        const response = await API.delete("mediaprogress", { id });
        return response.data;
    } catch (error) {
        console.error('Failed to delete movie:', error);
        throw error;
    }
};

export default function WatchingPage({ type }: any) {
    const UserId = User.id
    const queryClient: any = useQueryClient()
    const router=useRouter()
    const {  setActiveTab } = useProfileTab();

    const [currentPage, setCurrentPage] = useState(1);
    const {
        isLoading: isMediaLoading,
        data: mediaData,
    } = useQuery<any>({
        queryKey: ["watch-movies", UserId, currentPage],
        queryFn: () => fetchMovie(UserId, currentPage, 10),
        enabled: !!(UserId && currentPage),


    });
    const totalPages = mediaData?.count
    const handleDelete = async (id: any) => {
        try {
            await deleteMovies(id);
            toasterSuccess("Delete Successfully from Continue Watching.", 3000, "id");
            if (mediaData?.data?.length === 1 && currentPage > 1) {
                setCurrentPage((prevPage) => prevPage - 1);
            }
            queryClient.invalidateQueries(["watch-movies", UserId, currentPage]);
        } catch (error) {
            toasterError("Failed to delete movie.", 3000, "id");
        }
    };

    if (isMediaLoading) {
        <Loader />
    }

    return (
        <>
            {type == "home" && mediaData && mediaData?.data?.length > 0 &&
                <h3 className="text-white text-[25px] font-semibold">CONTINUE WATCHING</h3>
            }
                <ul className="w-full flex flex-wrap gap-y-5 md:gap-y-10">
                    {mediaData && mediaData?.data?.length > 0 ? (
                        mediaData?.data?.map((item: any) => (
                            <WatchingCard
                                key={item?.id}
                                movieId={item?.media_id}
                                mediaType={item?.media_type}
                                id={item?.id}
                                handleDelete={handleDelete}
                                queryClient={queryClient}
                            />
                        ))
                    ) : (
                        <>
                            <div className="flex justify-center items-center h-full">
                                {type == "profile" && (
                                    <h3 className="text-white text-[20px] font-semibold mb-6">No Continue Watching Yet !</h3>
                                )}
                            </div>
                        </>
                    )}

                </ul>

            {type == "profile" && <CustomPagination
                currentPage={currentPage}
                totalItems={totalPages}
                totalPages={totalPages}
                itemsPerPage={10}
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
