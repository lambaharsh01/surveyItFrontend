import { useState } from "react";
import { CheckboxPropInterface } from "../models/propInterfaces";
import "../styles/checkboxes.css";
import { shouldDisplayCheckboxesInColumn } from "../utils/screenWidth";

const Checkboxes: React.FC<CheckboxPropInterface> = ({ options, type, index, questionAlignment, onChange }) => {

  const inColumn:boolean = questionAlignment==="start" || shouldDisplayCheckboxesInColumn(options)

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleSelectionChange = (option: string) => {
    let updatedSelection: string[];

    if (type === "radio") {
      updatedSelection = [option];
    } else {
      updatedSelection = selectedOptions.includes(option) ? selectedOptions.filter(item => item !== option) : [...selectedOptions, option];
    }

    setSelectedOptions(updatedSelection);
    onChange(updatedSelection.join(","));
  };

  return ( 
    <div className={`checkbox-container mt-3 ${inColumn ? "" : "flex justify-around"}`}> {/* VIEW */}
      {options.map((option, index2) => (
        <div className="checkbox-wrapper-12 mb-2.5" key={`cbx-${index2}`}>

<div className={`flex items-center ${questionAlignment==="center" && inColumn ? "w-full justify-center":
                                      inColumn ? "w-full justify-start" : "flex-col"}`}>
  <div className="flex">
            <div className={`flex ${inColumn ? "justify-start ms-3" :"justify-center"} pe-2`}>
              <div className="cbx">
                <input 
                  id={`checkbox-${index + "_" + index2}`}
                  className={`${type==="radio" ? "circular":""}`}
                  type={type}
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleSelectionChange(option)}
                />
                <label 
                  htmlFor={`checkbox-${index.toString() + "_" + index2}`}
                  className={`${type==="radio" ? "circular":""}`}
                ></label>
                <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
                  <path d="M2 8.36364L6.23077 12L13 2"></path>
                </svg>
            </div>
            </div>
            <span className={`text-base font-medium w-full ${inColumn ? "ms-3" : "text-start"}`}>{option}</span>
  </div>          
            </div>

          <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
            <defs>
              <filter id={`goo-${ index + "_" + index2}`}>
                <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur"></feGaussianBlur>
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7" result={`goo-${index2}`}></feColorMatrix>
                <feBlend in="SourceGraphic" in2={`goo-${index2}`}></feBlend>
              </filter>
            </defs>
          </svg>
        </div>
      ))}
    </div>
  );
};

export default Checkboxes;
