import React from 'react'
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import labels from 'util/RatingLabels';

export default function RatingPopUp() {
    const [value, setValue] = React.useState<number | null>(2);
    const [hover, setHover] = React.useState(-1);

    function getLabelText(value: number) {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
    }
    return (
        <section className="bg-white/10 rounded-lg text-center p-2 px-4 flex flex-col justify-center items-center gap-2">
            <span className="flex gap-1">          
                <Rating
                    name="hover-feedback"
                    value={value}
                    precision={0.5}
                    getLabelText={getLabelText}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                        setHover(newHover);
                    }}
                    emptyIcon={<StarIcon style={{ fontSize: 28, opacity: 0.55 }} />}
                    icon={<StarIcon style={{ fontSize: 28 }} className="text-amber-500" />}
                />
           
            </span>
                 {value !== null && (
                    <div className='text-white'> {labels[hover !== -1 ? hover : value]}
                    </div>
                )}
            <p className="text-white/50 text-sm">
                <b className="text-sm">8.56</b> of{" "}
                <b className="text-sm">10</b> (723 reviews)
            </p>
        </section>
    )
}
