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
  const [reviewCount, setReviewCount] = useState<any>({ totalReviews: 0, average_rating: "0" });
  const [hasRated, setHasRated] = useState(false);

  const searchParams = useSearchParams();
  const movieId = searchParams.get("id");
  const mediaType: any = searchParams.get("type");
  const userId: any = User.id ?? null;
  const apiUrl = "rating";

  useEffect(() => {
    if(userId || ip){
    fetchRatingData();}
  }, [userId, ip]);


  useEffect(() => {
    const fetchIp = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        setIp(data?.ip);
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }
    };

    fetchIp();
  }, []);

  const fetchRatingData = async () => {
    if (movieId && mediaType &&(userId || ip)) {
      try {
        const response = await API.get(
          `rating?movieId=${movieId}&mediaType=${mediaType}&id=${userId}&ip=${ip}`
        );
        const userRating = response.data?.rating.value;
        setRating(userRating ? userRating  : 0);
        setReviewCount({
          totalReviews: parseInt(response.data?.ratingCount.total),
          average_rating: parseFloat(response.data?.ratingCount.rating).toFixed(2),
        });
        setHasRated(userRating > 0)
        return response?.data;
      } catch (error) {
        return {}
      }
    }
  };

  const {
    isLoading,
    error,
    refetch,
  } = useQuery<any>({
    queryKey: ["latest", movieId,mediaType],
    queryFn: fetchRatingData,
    enabled: () => !!movieId &&  (userId || ip),
  });

  const mutation = useMutation({
    mutationFn: async () => {
      if (!rating || (!userId && !ip)) {
        console.log("Validation failed: rating, userId or ip is missing.");
        return;
      }

      const payload = {
        movieId,
        mediaType,
        value: rating,
        userId: userId ? userId.toString() : null,
        ip: ip ? ip : null,
      };

      try {
        const response = await API.post(apiUrl, payload);
        return response?.data;
      } catch (error: any) {
        console.error("Error submitting rating:", error);
      }
    },
    onSuccess: (data) => {
      if (data && data?.value) {
        setRating(parseInt(data?.value));
        // localStorage.setItem(`${movieId}`, data.value)
        setHasRated(true);
        toasterSuccess("Thanks for Rating!", 3000, "id")
        refetch();
      }
    },
    onError: (error: any) => {
      console.error("Error submitting rating:", error);

    },
  });

  const handleRating = (rate: number) => {
    console.log(rate,"rate===")
    if (hasRated) {
      return;
    }
    
    setRating(rate);
    mutation.mutate();
  };

  const handleHover = (rate: any) => {
    if (!hasRated) {
      setHoverValue(rate);
    }
  };

  const handleMouseLeave = () => {
    if (!hasRated) {
      setHoverValue(0);
    }
  };
  const getLabel = (ratingValue: number) => {
    if (hasRated) {
      return labels[Math.round(rating)] || ''; 
    }
    const roundedRating = Math.round(ratingValue * 2) / 2;
    return labels[roundedRating] || '';
  };
  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="bg-[#272727] rounded-lg text-center p-2 px-4 flex flex-col justify-center items-center gap-2">
      <span className="flex gap-1">
        <Rating
          onClick={handleRating}
          onPointerEnter={handleHover}
          onPointerMove={handleHover}
          onPointerLeave={handleMouseLeave}
          SVGstyle={{ display: "inline" }}
          initialValue={rating??0}
          size={30}
          transition
          allowHover={!hasRated}
          fillColor="orange"
          allowFraction
          emptyColor="white"
          readonly={hasRated}
          style={{ transition: "transform 0.3s" }}
        />
      </span>
      <div
        className="text-white"
        style={{ width: "100px", textAlign: "center" }}
      >
        {(hoverValue !== 0 || rating !== 0) && getLabel(hoverValue || rating)}
      </div>
      <p className="text-white text-sm">
        <b className="text-sm">{reviewCount.average_rating}</b> of <b className="text-sm">10</b> ( {reviewCount.totalReviews} reviews)
      </p>

    </section>
  );
};

export default RatingPopUp;
