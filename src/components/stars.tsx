import { useState } from "react";
import { motion } from "framer-motion";
import { StarsPropInterface } from "../models/propInterfaces";

const starsCount: number[] = [1, 2, 3, 4, 5];

const Stars: React.FC<StarsPropInterface> = ({ questionAlignment="start", onChange }) =>{
  const [rating, setRating] = useState<number>(0);

  const handleRating = ( rating: number) => {
    setRating(rating)
    onChange(rating.toString())
  };


  return (
    <div className={`flex gap-3 mt-4 mb-9 items-center justify-${questionAlignment}`}>
    {starsCount.map((value) => (
        <motion.svg
        key={value}
        className={`cursor-pointer focus:outline-none transition-all ${
          rating >= value 
            ? "w-8 h-8 fill-yellow-400 stroke-yellow-500 drop-shadow-md"
            : "w-7 h-7 fill-none stroke-gray-400 hover:stroke-yellow-500"
        }`}
        viewBox="0 0 24 24"
        onClick={() => handleRating(value)}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        tabIndex={-1} 
        style={{ outline: "none" }}
    >
    
        <polygon
            strokeWidth="1.5"
            strokeLinejoin="miter"
            points="12,2 15,9 22,9 16.5,14 18,22 12,18 6,22 7.5,14 2,9 9,9"
        />
        </motion.svg>
    ))}
    </div>
  );
}

export default Stars
