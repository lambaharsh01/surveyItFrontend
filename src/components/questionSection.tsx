import { useState } from "react";
import { motion } from "framer-motion";
import { QuestionSectionPropInterface } from "../models/propInterfaces";

const QuestionSection: React.FC<QuestionSectionPropInterface> = ({ 
  identifier,
  text,
  questionTypeId,
  questionType,
  fileTypeId,
  fileType,
  options,
  required,
  questionAlignment="start"
}) => {

  return ( 
    <motion.div 
    key={identifier} 
    className="mb-6 border-b-2 pb-4"
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 1, delay: identifier * 0.2 }}
  >
    <p className="text-lg font-medium bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent text-start">
      {text}
    </p>

   
  </motion.div>
  );
};

export default QuestionSection;
