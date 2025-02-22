import { ChangeEvent, useState } from "react";
import { motion } from "framer-motion";
import { QuestionSectionPropInterface } from "../models/propInterfaces";
import Checkboxes from "./checkboxes";
import Stars from "./stars";
import Selects from "./selects";
import Files from "./files";

import { textInputsKeywords, checkboxKeywords } from "../utils/constants";

const QuestionSection: React.FC<QuestionSectionPropInterface> = ({ 
  index,
  text,
  questionType,
  fileType,
  options,
  required,
  questionAlignment="start",
  onChange
}) => {

  const [value, setValue] = useState<string>("")

  const setTextInputValue = (e: ChangeEvent<HTMLInputElement> ):void =>{
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
    className="mb-4 border-b-2"
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 1, delay: index * 0.2 }}
  >
    <p className={`text-lg font-medium bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent text-${questionAlignment}`}>
      {(index+1)+". "}{text}
    </p>

    {textInputsKeywords.includes(questionType) && (
      <div className="w-full px-2">
        <input
          type="text"
          className="px-3 py-3 mb-4 w-100 bg-slate-100 hover:bg-gray-200"
          placeholder="Enter"
          value={value}
          onChange={setTextInputValue}
        />
      </div>
    )}

    {questionType==="textarea" && (
      <div className="w-full px-2">
        <textarea
          rows={3}
          className="px-3 py-3 mb-4 w-100 bg-slate-100 hover:bg-gray-200"
          placeholder="Enter"
          value={value}
          onChange={setTextareaInputValue}
        />
      </div>
    )}

    {questionType==="number" && (
      <div className="w-full px-2">
        <input
          type="number"
          className="px-3 py-3 mb-4 w-100 bg-slate-100 hover:bg-gray-200"
          placeholder="Enter"
          value={value}
          onChange={setTextInputValue}
        />
      </div>
    )}

    {questionType==="date" && (
      <div className="w-full px-2">
        <input
          type="date"
          className="px-3 py-3 mb-4 w-100 bg-slate-100 hover:bg-gray-200"
          value={value}
          onChange={setTextInputValue}
        />
      </div>
    )}

    {questionType==="star" && (
      <div className="w-full px-2">
        <Stars
          questionAlignment={questionAlignment}
          onChange={handleStringedResponseAfterChange}
        />
      </div>
    )}
    
    {checkboxKeywords.includes(questionType) && (
      <div className="w-full px-2">
        <Checkboxes
          index={index}
          options={options}
          type={questionType === "checkbox" ? "checkbox" : "radio"}
          onChange={handleStringedResponseAfterChange}
        />
      </div>
    )}

    {questionType==="select" && (
      <div className="w-full px-2">
        <Selects
          index={index}
          options={options}
          onChange={handleStringedResponseAfterChange}
        />
      </div>
    )}
    
    {questionType==="file" && (
      <div className="w-full px-2">
        <Files
          fileType={fileType}
          onChange={handleStringedResponseAfterChange}
        />
      </div>
    )}


  </motion.div>
  );
};

export default QuestionSection;
