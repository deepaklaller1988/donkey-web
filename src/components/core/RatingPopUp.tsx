import React, { useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import labels from '@lib/RatingLabels';

export default function RatingPopUp() {
    const [rating, setRating] = useState(0);

    const handleRating = (rate: number) => {
        setRating(rate);
    };

    return (
        <section className="bg-white/10 rounded-lg text-center p-2 px-4 flex flex-col justify-center items-center gap-2">
            <span className="flex gap-1">
                <Rating
                    onClick={handleRating}
                    initialValue={rating}
                    size={30}
                    transition
                    allowHover
                    fillColor="orange"
                    emptyColor="gray"
                    style={{ transition: 'transform 0.3s' }}
                />
            </span>
            {rating !== null && (
                <div className="text-white">
                    {labels[rating / 20]}
                </div>
            )}
            <p className="text-white/50 text-sm">
                <b className="text-sm">8.56</b> of{" "}
                <b className="text-sm">10</b> (723 reviews)
            </p>
        </section>
    );
}
