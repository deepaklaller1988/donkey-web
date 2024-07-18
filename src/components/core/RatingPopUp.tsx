import React, { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import labels from "@lib/RatingLabels";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import API from "@lib/Api";
import Loader from "./Loader";
import User from "@lib/User";

const RatingPopUp = () => {
  const [rating, setRating] = useState(0);
  const [hoverValue, setHoverValue] = useState(0);
  const [ip, setIp] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const searchParams = useSearchParams();
  const movieId = searchParams.get("id");
  const userId: any = User.id ?? null;
  const apiUrl = "rating";

  useEffect(() => {
    fetchRatingData();
  }, [userId, ip]);

  useEffect(() => {
    if (!userId) {
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
    }
  }, [userId]);

  const fetchRatingData = async () => {
    if (movieId && (userId || ip)) {
      try {
        const response = await API.get(
          `rating/${movieId}/${userId ? userId : ip}`
        );
        setRating(response.data.rating.value);

        setSubmitted(true);
        return response.data;
      } catch (error) {
        setSubmitted(false);

        console.error("Error fetching rating:", error);
        throw new Error("Failed to fetch rating data");
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
    enabled: () => !!movieId && (userId || ip), // Use a function to evaluate the condition
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
        userId: userId ? userId : null,
        ip: ip ? ip : null,
      };

      try {
        const response = await API.post(apiUrl, payload);
        return response.data; // Assuming your backend sends back the updated rating data
      } catch (error: any) {
        console.log(error);
        throw new Error("Failed to submit rating");
      }
    },
    onSuccess: (data) => {
      if (data && data.value) {
        setRating(parseInt(data.value));
        setSubmitted(true);
      }

      // Optionally trigger a refetch to update ratingData immediately
      refetch();
    },
    onError: (error: any) => {
      // Handle error, e.g., display an error message
    },
  });

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const handleHover = (rate: any) => {
    setHoverValue(rate);
  };

  const handleMouseLeave = () => {
    setHoverValue(0);
  };

  const handleSubmitRating = () => {
    mutation.mutate();
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
        <b className="text-sm">21</b> of <b className="text-sm">10</b> (12
        reviews)
      </p>
      <button
        onClick={handleSubmitRating}
        disabled={submitted}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit Rating
      </button>
    </section>
  );
};

export default RatingPopUp;
