import { ChangeEvent, useState } from "react";
import { motion } from "framer-motion";
import { QuestionSectionPropInterface } from "../models/propInterfaces";
import Checkboxes from "./checkboxes";
import Stars from "./stars";
import Selects from "./selects";
import Files from "./files";

import { textInputsKeywords, checkboxKeywords } from "../constants/survey";

const QuestionSection: React.FC<QuestionSectionPropInterface> = ({ 
  index,
  text,
  questionType,
  fileType,
  options,
  questionAlignment,
  required,
  onChange
}) => {

  const [value, setValue] = useState<string>("")

  const setTextInputValue = (e: ChangeEvent<HTMLInputElement>):void =>{
    const newValue: string = e.currentTarget.value
    setValue(newValue)
    onChange(newValue)
  }

  const setTextareaInputValue = (e: ChangeEvent<HTMLTextAreaElement> ):void =>{
    const newValue: string = e.currentTarget.value
    setValue(newValue)
    onChange(newValue)
  }

  const handleStringedResponseAfterChange = (selected: string):void =>{
    onChange(selected)
  }

  return ( 
<motion.div 
  key={index} 
  className="px-4 py-5 sm:px-6"
  initial={{ opacity: 0, x: -10 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 1, delay: index * 0.2 }}
>
  <div className="mb-2">
    <h2 className={`text-lg font-medium appTextColor text-${questionAlignment}`}>
      {(index+1)+". "}{text}
      <span className="text-red-500">{required && " *"}</span>
    </h2>
  </div>

  <div className="w-full">
    {textInputsKeywords.includes(questionType) && (
      <input
        type="text"
        className="w-full px-6 py-3 bg-gray-50 border-b border-b-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter"
        value={value}
        onChange={setTextInputValue}
      />
    )}

    {questionType==="textarea" && (
      <textarea
        rows={3}
        className="w-full px-6 py-3 bg-gray-50 border-b border-b-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter"
        value={value}
        onChange={setTextareaInputValue}
      />
    )}

    {questionType==="number" && (
      <input
        type="number"
        className="w-full px-6 py-3 bg-gray-50 border-b border-b-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter"
        value={value}
        onChange={setTextInputValue}
      />
    )}

    {questionType==="date" && (
      <input
        type="date"
        className="w-full px-6 py-3 bg-gray-50 border-b border-b-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={value}
        onChange={setTextInputValue}
      />
    )}

    {questionType==="star" && (
      <Stars
        questionAlignment={questionAlignment}
        onChange={handleStringedResponseAfterChange}
      />
    )}
    
    {checkboxKeywords.includes(questionType) && (
      <Checkboxes
        index={index}
        options={options}
        type={questionType === "checkbox" ? "checkbox" : "radio"}
        questionAlignment={questionAlignment}
        onChange={handleStringedResponseAfterChange}
      />
    )}

    {questionType==="select" && (
      <Selects
        index={index}
        options={options}
        onChange={handleStringedResponseAfterChange}
      />
    )}
    
    {questionType==="file" && (
      <Files
        fileType={fileType}
        onChange={handleStringedResponseAfterChange}
      />
    )}
  </div>
</motion.div>

  );
};

export default QuestionSection;
