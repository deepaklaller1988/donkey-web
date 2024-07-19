import React, { useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import labels from '@lib/RatingLabels';

export default function RatingPopUp() {
    const [rating, setRating] = useState(0);
    const [hoverValue, setHoverValue] = useState(0);

    const handleRating = (rate: number) => {
        setRating(rate);
    };

    const handleHover = (rate: any) => {
        setHoverValue(rate);
    };

    const handleMouseLeave = () => {
        setHoverValue(0);
    };

    return (
        <section className="bg-[#272727] rounded-lg text-center p-2 px-4 flex flex-col justify-center items-center gap-2">
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
                    allowHover
                    fillColor="orange"
                    emptyColor="gray"
                    style={{ transition: 'transform 0.3s' }}
                />
            </span>
            <div className="text-white" style={{ width: '100px', textAlign: 'center' }}>
                {(hoverValue !== 0 || rating !== 0) && (
                    labels[(hoverValue || rating) / 20]
                )}
            </div>
            <p className="text-white/50 text-sm">
                <b className="text-sm">8.56</b> of{" "}
                <b className="text-sm">10</b> (723 reviews)
            </p>
        </section>
    );
}
