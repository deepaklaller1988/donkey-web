import React, { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import labels from "@lib/RatingLabels";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import API from "@lib/Api";
import Loader from "./Loader";
import User from "@lib/User";
import { toasterSuccess } from "./Toaster";

const RatingPopUp = () => {
  const [rating, setRating] = useState(0);
  const [hoverValue, setHoverValue] = useState(0);
  const [ip, setIp] = useState<string | null>(null);
  const [reviewCount, setReviewCount] = useState<any>({ totalReviews: 0, average_rating: "0" ,outOf:"0"});
  const [submitted, setSubmitted] = useState(false);
  const searchParams = useSearchParams();
  const movieId = searchParams.get("id");
  const userId: any = User.id ?? null;
  const apiUrl = "rating";

  useEffect(() => {
    fetchRatingData();
  }, [userId, ip]);


  useEffect(() => {
      const fetchIp = async () => {
        try {
          const response = await fetch("https://api.ipify.org?format=json");
          const data = await response.json();
          setIp(data.ip);
        } catch (error) {
          console.error("Error fetching IP address:", error);
        }
      };

      fetchIp();
  }, []);

  const fetchRatingData = async () => {
    if (movieId && (userId || ip)) {
      try {
        const response = await API.get(
          `rating?movieId=${movieId}&id=${userId}&ip=${ip}`
        );
        setRating(response.data.rating.value);
        setReviewCount({
          totalReviews: parseInt(response.data.ratingCount.total),
          average_rating: parseFloat(response.data.ratingCount.rating).toFixed(2),
          outOf: (reviewCount.totalReviews * 5)
        });
        setSubmitted(true);
        return response.data;

      } catch (error) {
        setSubmitted(false);
        return {};
      }
    } else {
      setSubmitted(false);

      return {};
    }
  };

  const {
    isLoading,
    error,
    data: ratingData,
    refetch,
  } = useQuery<any>({
    queryKey: ["latest", movieId],
    queryFn: fetchRatingData,
    enabled: () => !!movieId && (userId || ip), 
  });

  const mutation = useMutation({
    mutationFn: async () => {
      if (!rating || (!userId && !ip)) {
        console.log("Validation failed: rating, userId or ip is missing.");
        return;
      }

      const payload = {
        movieId,
        value: rating,
        userId: userId ? userId.toString() : null,
        ip: ip ? ip : null,
      };

      try {
        const response = await API.post(apiUrl, payload);
        return response.data; 
      } catch (error: any) {
        throw new Error("Failed to submit rating");
      }
    },
    onSuccess: (data) => {
      if (data && data.value) {
        setRating(parseInt(data.value));
        localStorage.setItem(`${movieId}`,data.value)
        setSubmitted(true);
        toasterSuccess("Ratig Submitted !",3000,"id")

      }

      refetch();
    },
    onError: (error: any) => {
    },
  });

  const handleRating = (rate: number) => {
    setRating(rate);
    mutation.mutate();
  };

  const handleHover = (rate: any) => {
    setHoverValue(rate);
  };

  const handleMouseLeave = () => {
    setHoverValue(0);
  };



  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <section className="bg-white/10 rounded-lg text-center p-2 px-4 flex flex-col justify-center items-center gap-2">
      <span className="flex gap-1">
        <Rating
          onClick={handleRating}
          onPointerEnter={handleHover}
          onPointerMove={handleHover}
          onPointerLeave={handleMouseLeave}
          SVGstyle={{
            display: "inline",
          }}
          initialValue={rating}
          size={30}
          transition
          allowHover={false}
          fillColor="orange"
          emptyColor="gray"
          style={{ transition: "transform 0.3s" }}
        />
      </span>
      <div
        className="text-white"
        style={{ width: "100px", textAlign: "center" }}
      >
        {(hoverValue !== 0 || rating !== 0) &&
          labels[(hoverValue || rating) / 20]}
      </div>
      <p className="text-white/50 text-sm">
        <b className="text-sm">{reviewCount.average_rating}</b> of <b className="text-sm">{reviewCount?.outOf}</b> ( {reviewCount.totalReviews} reviews)
      </p>
      {/* <button
        onClick={handleSubmitRating}
        disabled={submitted}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit Rating
      </button> */}
    </section>
  );
};

export default RatingPopUp;
