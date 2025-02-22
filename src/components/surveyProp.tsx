import { useState } from "react";
import { motion } from "framer-motion";
import { SurveyPropsInterface } from "../models/propInterfaces";

const stars: number[] = [1, 2, 3, 4, 5];

export default function Survey({ questions, onSubmit, }: SurveyPropsInterface) {
  const [ratings, setRatings] = useState<number[]>(Array(questions.length).fill(0));

  const handleRating = (index: number, rating: number) => {
    const updatedRatings = [...ratings];
    updatedRatings[index] = rating;
    setRatings(updatedRatings);
  };

  const handleSubmit = () => {
    const responses = questions.map((question, index) => ({
      question: question.text,
      rating: ratings[index],
    }));
    onSubmit(responses);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={{ opacity: 1, scale: 1 }} 
      transition={{ duration: 0.4 }}
      className="w-full max-w-2xl 2xl:max-w-none mx-auto px-4 py-6 bg-gradient-to-br from-white to-gray-100 shadow-lg border border-gray-200"

      // className="w-full max-w-2xl 2xl:max-w-none sm:my-0 md:my-6 mx-auto px-2 py-6 bg-gradient-to-br from-white to-gray-100 shadow-lg border border-gray-200"
    >
     <h1 className="text-3xl font-bold text-center text-gray-900 border-b-4 border-gray-500 pb-3 mb-10">
      Feedback Survey
    </h1>
      {questions.map((question, index) => (
        <motion.div 
          key={index} 
          className="mb-6 border-b-2 pb-4"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: index * 0.2 }}
        >
          <p className="text-lg font-medium bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent text-center">
            {question.text}
          </p>

          <div className="flex gap-3 mt-4 mb-9 items-center justify-center">
            {stars.map((value) => (
              <motion.svg
              key={value}
              className={`cursor-pointer focus:outline-none transition-all ${
                ratings[index] >= value 
                  ? "w-8 h-8 fill-yellow-400 stroke-yellow-500 drop-shadow-md"
                  : "w-7 h-7 fill-none stroke-gray-400 hover:stroke-yellow-500"
              }`}
              viewBox="0 0 24 24"
              onClick={() => handleRating(index, value)}
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
        </motion.div>
      ))}

      <motion.button
        onClick={handleSubmit}
        className="mt-6 w-full bg-gradient-to-r from-gray-900 to-gray-700 text-white py-3 text-lg font-semibold hover:from-gray-800 hover:to-gray-600 transition-all shadow-md"
        whileHover={{ scale: 1.005 }}
        whileTap={{ scale: 0.95 }}
      >
        Submit Feedback
      </motion.button>
    </motion.div>
  );
}
