import { ChangeEvent ,useEffect, useState } from "react";
import { flushSync } from "react-dom";
// import { useNavigate } from "react-router-dom";

import { MdAddToPhotos } from "react-icons/md";

import Header from "../../components/header";

import { toast } from "react-toastify";

import convertArrayIntoSearchStream from "../../utils/convertArrayIntoSearchStream";
import DropdownSearch from "../../components/dropdownSearch";

import axiosInterceptor from "../../utils/axiosInterceptor";

import { QuestionTypeStructure, FileTypeStructure, QuestionStructure } from "../../models/surveyInterface";

import QuestionSection from "../../components/questionSection";
import Switch from "../../components/switch";

import Checkboxes from "../../components/checkboxes";
import { div, span } from "framer-motion/client";



const FormCreation: React.FC = () => {

  // const navigate = useNavigate();

  const emptyQuestionStructure: QuestionStructure = {
    text:"",
    questionTypeId:0,
    questionType:"",
    fileTypeId:0,
    fileType:"",
    options:[],
    required:true
  }
  const optionsKeywords: string[] = ["checkbox", "select", "radio"]

  const [questions, setQuestions] = useState<QuestionStructure[]>([])
  const [question, setQuestion] = useState<QuestionStructure>(structuredClone(emptyQuestionStructure))

  const [questionTypes, setQuestionTypes] = useState<QuestionTypeStructure[]>([])
  const [selectedQuestionType, setSelectedQuestionType] = useState<QuestionTypeStructure | null>(null)

  const [fileTypes, setFileTypes] = useState<FileTypeStructure[]>([])
  const [selectedFileType, setSelectedFileType] = useState<FileTypeStructure | null>(null)

  const [renderDropdown, setRenderDropdown] = useState<number>(0)

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

  const handleQuestionRequiredChange = (checked: boolean):void => {
    setQuestion(prev=>{
      return {...prev, required: checked}
    })
  }

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
    setSelectedQuestionType(selected.value)
    setQuestion(prev => {
      const {id, questionType} = selected.value
      return {...prev, questionTypeId: id, questionType: questionType}
    })
  };

  const handleFileTypeSelection = (selected: {
    label: string;
    value: FileTypeStructure;
  }) => {
    setSelectedFileType(selected.value)
    setQuestion(prev => {
      const {id, fileType} = selected.value
      return {...prev, fileTypeId: id, fileType: fileType}
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
 
  const validateQuestionSave = ():void =>{

    if(question.text.trim().length < 5) {
      toast.warning("make sure to add more than 5 characters to the question")
      return
    }
    
    if(!selectedQuestionType){
      toast.warning("make sure select the question type")
      return
    }
    
    if(selectedQuestionType?.questionType === "file" && !selectedFileType?.fileType){
      toast.warning("make sure select the file type")
      return
    }

    if(optionsKeywords.includes(selectedQuestionType?.questionType ?? "")){

      if(!question?.options.length){
        toast.warning("make sure you add the options to select")
        return
      }
  
      const emptyOptions = question?.options.filter(elem=>Boolean(!elem.trim()))
      if(emptyOptions.length){
          toast.warning(`${emptyOptions.length} option field require input`)
          return
      }

    }


    // CLEANING REDUNDANCY
    flushSync(()=>{
      if(selectedQuestionType?.questionType === "file"){ 

        setQuestion(prev=>{
          return {...prev, options:[]}
        })

      }else if(optionsKeywords.includes(selectedQuestionType?.questionType ?? "")){

        setQuestion(prev=>{
          return {...prev, fileTypeId: null}
        })
        setSelectedFileType(null)
        
      }else{
        
        setQuestion(prev=>{
          return {...prev, options:[], fileTypeId: null}
        })
        setSelectedFileType(null)

      }
    })
    
    setQuestions(prev=>[...prev, question])
    setQuestion(structuredClone(emptyQuestionStructure)) 
    
    setSelectedQuestionType(null)
    setSelectedFileType(null)
    setRenderDropdown(prev => prev+1)
    setSidebarOpen(false)
    toast.success("Question Added")
  }
  
  return (
      <div className="min-h-screen creamBackground relative">
        <Header />
        <div className="h-14"></div>

        <div className="w-full p-4">
          <div className="w-full flex items-end justify-between">
            <h1 className="mainFont ps-2">
              <span className="appTextColor me-1 text-4xl">Create Survey</span>
            </h1>
              
            <button 
              className="appBackgroundColor p-1.5 pb-2 font-medium text-white flex mb-2.5"
              onClick={()=>setSidebarOpen(true)}
            >
              <MdAddToPhotos className="mt-1.5 me-1"/>
              <span>Add Question</span>
            </button>
          </div>

            <div className="w-100 pt-3 ps-3">

              {questions.map((elem, index)=>(
                <QuestionSection
                  identifier = {index}
                  text = {elem.text}
                  questionTypeId = {elem.questionTypeId || 0}
                  questionType = {elem.questionType || ""}
                  fileTypeId = {elem.fileTypeId || 0}
                  fileType = {elem.fileType || ""}
                  options = {elem.options}
                  required = {elem.required}
                />
              ))}
              
            </div>

          {/* </div> */}
        </div>
           












        {/* ADD QUESTION */}
        <div 
          className={`fixed top-0 right-0 h-full bg-white transition-all duration-300 ease-in-out 
            ${sidebarOpen ? 'w-2/3' : 'w-0'} z-50 flex flex-col`}
        >
          <div className="flex flex-col h-full">

            <div className="p-4 flex-grow overflow-y-auto">
              
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl ps-2">Add Question</h2>
                <button 
                  onClick={()=> setSidebarOpen(false)} 
                  className="text-4xl font-bold mb-3"
                  > × </button>
              </div>
              
              <div className="flex flex-wrap gap-4">

                <div className="mt-1 w-full px-2">
                  <div className="flex justify-between">
                    <span className="text-lg font-medium">Enter Question 
                      <span className="text-sm"> ({question.required ? "required": "not required"})</span>
                    </span>

                    <span> 
                      <Switch
                        checked={question.required}
                        onChange={handleQuestionRequiredChange}
                      />
                    </span>
                  </div>
                  <textarea
                    className="px-3 py-3 w-100 border-1 pr-10 bg-slate-100"
                    rows={5}
                    placeholder="Enter Question"
                    value={question.text}
                    onChange={handleQuestionTextChange}
                  />
                </div>

                <div className="w-full px-2">
                  <span className="text-lg font-medium">Select Question Type</span>
                  <div>
                    <DropdownSearch
                      key={"questionTypeLabel" + renderDropdown }
                      options={convertArrayIntoSearchStream(questionTypes, "questionTypeLabel")}
                      placeholder={selectedQuestionType?.questionTypeLabel || "Select Question Type"}
                      onSelect={handleQuestionTypeSelection}
                    />
                  </div>
                </div>

                {/* IF FILE */}
                {selectedQuestionType?.questionType === "file" && (
                  <div className="w-full px-2">
                    <span className="text-lg font-medium">Select File Type</span>
                    <div>
                      <DropdownSearch
                        key={"fileTypeLabel" + renderDropdown}
                        options={convertArrayIntoSearchStream(fileTypes, "fileTypeLabel")}
                        placeholder={selectedFileType?.fileTypeLabel || "Select File Type"}
                        onSelect={handleFileTypeSelection}
                      />
                    </div>
                  </div>
                )}

                {/* IF DROPDOWN OR CHECKBOX */}
                { optionsKeywords.includes(selectedQuestionType?.questionType ?? "") && (

                  <div className="mt-2 w-full px-2">
                    <button 
                      className="appBackgroundColor p-1.5 pb-2 font-medium text-white flex mb-3"
                      onClick={handleAddOption}
                    >
                      <MdAddToPhotos className="mt-1.5 me-1"/>
                      <span>Add Options</span>
                    </button>
                    
                    {question.options.map((elem, index)=>(
                      <div className="flex" key={"option" + index}>
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
              <div className="h-20"></div>
            </div>
            
            <div className="w-full px-4 py-3 bg-white shadow-md absolute bottom-0 left-0 right-0">
              <div className="w-full px-2">
                <button
                  className="bg-slate-950 rounded-md text-white text-lg px-md-12 px-8 py-3 w-100"
                  onClick={validateQuestionSave}
                >Save</button>
              </div>
            </div>
          </div>
        </div>





    </div>
  );
}

export default FormCreation;
