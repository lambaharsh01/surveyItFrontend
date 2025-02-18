import React, { useEffect, useState } from "react";
import { DropdownSearchOption } from "../models/utilityInterface";


interface searchProp {
  options: DropdownSearchOption[];
  placeholder?: string;
  onSelect: (parameter: DropdownSearchOption) => void;
  src?: string;
}

const DropdownSearch: React.FC<searchProp> = ({
  options = [],
  placeholder = "Select",
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<DropdownSearchOption | null>({
    value: {},
    label: placeholder,
  });
  const selectOptions: DropdownSearchOption[] = options;


  const [searchTerm, setSearchTerm] = useState<string>("");

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectionActivate = (option: DropdownSearchOption) => {
    setSelectedOption(option);
    setIsOpen(false);

    setSearchTerm("");
    onSelect(option);
  };

  const filteredOptions = selectOptions.filter(
    (selectOptions) => selectOptions.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest(".dropdown-select")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="dropdownsearch flex items-center justify-center font-ubuntu">
      <div className="options w-full">
        <div
          className="dropdown-select w-full px-3 py-2.5 border cursor-pointer bg-slate-100"
          onClick={toggleDropdown}
        >
          <span className="font-medium text-slate-500 ">
            {selectedOption?.label}
          </span>
        </div>
        <div className="relative">
          {isOpen && (
            <div className="dropdown-select opacity-100 absolute px-2 left-0 top-0 w-full bg-white border z-10 transition-all scrolMaxHeight300">
              <div className="flex items-center justify-center m-2">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full p-2 border mt-1 border-gray-400 focus:border-teal-500 bg-slate-100"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <ul className="ps-2.5">
                {filteredOptions.map((option, index) => (
                  <li
                    key={option.label + index}
                    className={`py-1.5 hover:bg-gray-100 pointers font-medium ${
                      selectedOption?.value === option.value
                        ? "dropdownSelected font-semibold"
                        : "text-gray-700"
                    }`}
                    onClick={() => selectionActivate(option)}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DropdownSearch;