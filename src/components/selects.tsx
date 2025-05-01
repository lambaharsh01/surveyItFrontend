import { useState } from "react";
import { SelectsPropInterface } from "../models/propInterfaces";

const Selects: React.FC<SelectsPropInterface> = ({
  index,
  options,
  onChange,
  value,
}) => {
  const [selected, setSelected] = useState<string>(value ?? "");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    var selectedValue: string = event.target.value;
    setSelected(selectedValue);
    onChange(selectedValue);
  };

  return (
    <select
      key={"selectInput" + index}
      className="px-3 py-3 mb-4 w-100 bg-slate-100 text-gray-700 border hover:bg-gray-200 focus:ring-gray-700"
      value={selected}
      onChange={handleChange}
    >
      <option value="" disabled className="text-gray-400">
        Select Response...
      </option>

      {options.map((option, index2) => (
        <option
          key={index2}
          value={option}
          className="bg-white text-gray-700 hover:bg-gray-100"
        >
          {option}
        </option>
      ))}
    </select>
  );
};

export default Selects;
