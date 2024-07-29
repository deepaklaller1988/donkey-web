
import WatchingCard from "@components/core/WatchingCard";
import API from "@lib/Api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import User from "@lib/User";
import { toasterError, toasterSuccess } from "@components/core/Toaster";
import Loader from "@components/core/Loader";
import CustomPagination from "@components/CustomPagination";
import { useState } from "react";


const fetchMovie = async (userId: any, page: number, limit: number) => {
    try {
        const response = await API.get(`mediaprogress?user_id=${userId}&page=${page}&limit=${limit}&pagination=${true}`);
        const data = await response.data
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
export default function WatchingPage() {
    const UserId = User.id
    const queryClient: any = useQueryClient()
    const [currentPage, setCurrentPage] = useState(1);
    const {
        isLoading: isMediaLoading,
        data: mediaData,
    } = useQuery<any>({
        queryKey: ["watch-movies", UserId, currentPage],
        queryFn: () => fetchMovie(UserId, currentPage, 10),
    });
    const totalPages = mediaData?.count

    const handleDelete = async (id: any) => {
        try {
            await deleteMovies(id);
            toasterSuccess("Delete Successfully from Continue Watching.", 3000, "id");
            queryClient.invalidateQueries(["watch-movies", UserId]);
        } catch (error) {
            toasterError("Failed to delete movie.", 3000, "id");
        }
    };

    if (isMediaLoading) {
        <Loader />
    }

    return (
        <>

            <div className="w-full py-2 mt-10 ml-2">
                <ul className="w-full flex flex-wrap gap-y-5 md:gap-y-10">
                    {mediaData && mediaData?.length > 0 ? (
                        mediaData?.map((item: any) => (
                            <WatchingCard
                                key={item?.id}
                                movieId={item?.media_id}
                                mediaType={item?.media_type}
                                id={item?.id}
                                handleDelete={handleDelete}
                            />
                        ))
                    ) : (
                        <p className="text-white text-sm font-semibold ml-2">No Continue Watching Yet !</p>
                    )}

                </ul>

                <CustomPagination
                    currentPage={currentPage}
                    totalItems={totalPages}
                    totalPages={totalPages}
                    itemsPerPage={10}
                    onPageChange={(page: number) => setCurrentPage(page)}
                />
            </div>


        </>

    )
}
