import { ChangeEvent ,useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { MdAddToPhotos } from "react-icons/md";

import Header from "../../components/header";

import { client } from "../../constants/urlPath";
import { toast } from "react-toastify";

import convertArrayIntoSearchStream from "../../utils/convertArrayIntoSearchStream";
import DropdownSearch from "../../components/dropdownSearch";

import axiosInterceptor from "../../utils/axiosInterceptor";

import { QuestionTypeStructure, FileTypeStructure, QuestionStructure } from "../../models/surveyInterface";
// import { toast } from "react-toastify";





const FormCreation: React.FC = () => {

  const navigate = useNavigate();

  const emptyQuestionStructure: QuestionStructure = {
    text:"",
    type:null,
    fileType:null,
    options:[],
    required:true
  }

  const [questions, setQuestions] = useState<QuestionStructure[]>([])
  const [question, setQuestion] = useState<QuestionStructure>(structuredClone(emptyQuestionStructure))

  const [questionTypes, setQuestionTypes] = useState<QuestionTypeStructure[]>([])
  const [fileTypes, setFileTypes] = useState<FileTypeStructure[]>([])

  useEffect(()=>{

    axiosInterceptor({
      method: "get",
      url: "/fetch/get-question-types",
    }).then((res) => {
      setQuestionTypes(res?.questionType ?? [])
    }).catch((err) => {
      toast.error(err.message);
    });
    
    axiosInterceptor({
      method: "get",
      url: "/fetch/get-file-types",
    }).then((res) => {
      setFileTypes(res?.fileType ?? [])
    }).catch((err) => {
      toast.error(err.message);
    });

  },[])


  const handleQuestionTextChange = (e: ChangeEvent<HTMLTextAreaElement>):void => {
    const questionText = e.currentTarget.value
    setQuestion(prev=>{
      return {...prev, text: questionText}
    })
  }

  const handleQuestionTypeSelection = (selected: {
    label: string;
    value: QuestionTypeStructure;
  }) => {
    setQuestion(prev=>{
      return {...prev, type: selected.value}
    })
  };

  const handleFileTypeSelection = (selected: {
    label: string;
    value: FileTypeStructure;
  }) => {
    setQuestion(prev=>{
      return {...prev, fileType: selected.value}
    })
  };


  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)

  const handleAddOption = ():void => {
    setQuestion(prev => {
      return {...prev, options:[...prev.options, ""]}
    })
  }

  const handleAddOptionChange = (e: ChangeEvent<HTMLInputElement>, index:number):void =>{
    var inputText = e.currentTarget.value
    setQuestion(prev => {
      prev.options[index] = inputText
      return {...prev}
    })
  }

  const handleRemoveOptionChange = (index:number):void =>{
    setQuestion(prev=>{
      prev.options.splice(index,1)
      return {...prev}
    })
  }
 


  return (
      <div className="min-h-screen creamBackground relative">
        <Header />

        <div className="h-14"></div>

        <div className="ps-5 h-1/6 flex items-end">
          <h1 className="mainFont ps-2">
            <span className="appTextColor me-1 text-4xl">Create Survey</span>
          </h1>
        </div>

        <button 
          className="appBackgroundColor p-1.5 pb-2 font-medium text-white flex"
          onClick={()=>setSidebarOpen(true)}
        >
          <MdAddToPhotos className="mt-1.5 me-1"/>
          <span>Add Question</span>
        </button>

      <div 
        className={`fixed top-0 right-0 h-full bg-white transition-all duration-300 ease-in-out 
          ${sidebarOpen ? 'w-2/3' : 'w-0'} overflow-hidden z-50`}
      >
        <div className="p-4">
          <button 
            onClick={()=> setSidebarOpen(false)} 
            className="absolute top-4 right-4 text-5xl font-bold"
          > × </button>
          <h2 className="text-2xl mb-4 ps-2">Add Question</h2>
          
          <div className="flex flex-wrap gap-4">

              <div className="mt-1 w-full px-2">
              <span className="text-lg font-medium">Enter Question</span>
                <textarea
                  className="px-3 py-3 w-100 border-1 pr-10 bg-slate-100"
                  rows={5}
                  placeholder="Enter Question"
                  value ={question.text}
                  onChange={handleQuestionTextChange}
                />
              </div>


            <div className="w-full px-2">
              <span className="text-lg font-medium">Select Question Type</span>
              <div>
                <DropdownSearch
                  key="questionTypeLabel"
                  options={convertArrayIntoSearchStream(questionTypes, "questionTypeLabel")}
                  placeholder={question?.type?.questionTypeLabel || "Select Question Type"}
                  onSelect={handleQuestionTypeSelection}
                />
              </div>
            </div>

            {/* IF FILE */}
            {question?.type?.questionAcceptedAs === "file" && (
              <div className="w-full px-2">
                <span className="text-lg font-medium">Select File Type</span>
                <div>
                  <DropdownSearch
                    key="fileTypeLabel"
                    options={convertArrayIntoSearchStream(fileTypes, "fileTypeLabel")}
                    placeholder={question?.fileType?.fileTypeLabel || "Select File Type"}
                    onSelect={handleFileTypeSelection}
                  />
                </div>
              </div>
            )}

            {/* IF DROPDOWN OR CHECKBOX */}
            { Boolean(
              question?.type?.questionAcceptedAs === "checkbox" || 
              question?.type?.questionAcceptedAs === "select"   || 
              question?.type?.questionAcceptedAs === "radio" 
            ) && (
              <div className="mt-2 w-full px-2">
                
                <button 
                  className="appBackgroundColor p-1.5 pb-2 font-medium text-white flex mb-3"
                  onClick={handleAddOption}
                >
                  <MdAddToPhotos className="mt-1.5 me-1"/>
                  <span>Add Options</span>
                </button>
                
                {question.options.map((elem, index)=>(
                  <div className="flex">

                    <input
                      type="text"
                      className="px-3 py-2 mb-3 mt-2 w-100 border-1 bg-slate-100"
                      placeholder="Enter Option Label"
                      value={elem}
                      onChange={(e) => handleAddOptionChange(e, index)}
                    />
                    <button 
                      onClick={()=> handleRemoveOptionChange(index)} 
                      className="text-4xl font-bold ms-2 -mt-10"
                    > × </button>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </div>











































       

        <div className="w-100 px-3">
              <input
                type="email"
                className="px-8 py-3 mb-4 mt-5 w-100 bg-slate-100"
                placeholder="Enter Email"
                // value={userEmail}
                // onChange={(e) => setUserEmail(e.currentTarget.value)}
              />

              <div className="relative w-full">
                <input
                  // type={showPassword ? "text" : "password"}
                  className="px-8 py-3 mb-4 w-100 bg-slate-100 pr-10"
                  placeholder="Enter Password"
                  // value={password}
                  // onChange={(e) => setPassword(e.currentTarget.value)}
                />
              </div>
              <div className="-mt-2 appTextColor text-sm font-medium flex justify-between px-2">
                <span
                  className="pointers"
                  onClick={() => navigate(client.forgotPassword)}
                >
                  Forgot Password?
                </span>
                <span
                  className="pointers"
                  onClick={() => navigate(client.signUp)}
                >
                  Sign Up
                </span>
              </div>
            </div>
            {/* <div className="mb-14 px"> */}
              {/* <button
                // disabled={disabled}
                // className="bg-slate-950 text-white text-lg px-md-12 px-8 py-3 w-100"
                // onClick={authenticateUser}
              > */}
                {/* {disabled ? ( */}
                  {/* <div className="spinner-border spinner-border-sm text-white"></div>
                ) : (
                  )} */}
                  {/* <span>Sign In</span> */}
              {/* </button> */}
            {/* </div> */}
    </div>
  );
}

export default FormCreation;
