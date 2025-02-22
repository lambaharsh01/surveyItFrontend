import { useRef, useState } from "react";
import { FilesPropInterface } from "../models/propInterfaces";
import { toast } from "react-toastify";

const Files: React.FC<FilesPropInterface> = ({ onChange, fileType }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      setFileName("");
      onChange("");
      return;
    }

    if (fileType !== "*/*" && file.type !== fileType) {
      toast.error(`Invalid file type`);
      setTimeout(()=>{
        toast.warn(`Expected: ${fileType}, but got: ${file.type}`);
      }, 500)
      event.target.value = "";
      return;
    }

    setFileName(file.name);
    convertToBase64(file);
  };

  const convertToBase64 = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      onChange(reader.result as string);
    };
  };

  return (
    <div className="flex items-center w-full border-b border-gray-400 cursor-pointer">
      <div 
        className="px-3 py-3 w-1/2 bg-slate-200 text-gray-700 hover:bg-gray-300"
        onClick={() => fileInputRef.current?.click()}
      >
        Choose File
      </div>

      <div className="px-3 py-3 w-1/2 text-gray-500 bg-transparent">
        {fileName || "No file selected"}
      </div>

      <input
        type="file"
        accept={fileType}
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default Files;
