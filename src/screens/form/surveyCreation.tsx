import { useEffect, useState } from "react";

import { MdAddToPhotos } from "react-icons/md";

import Header from "../../components/header";

import { toast } from "react-toastify";

import axiosInterceptor from "../../utils/axiosInterceptor";

import { FiEdit3 } from "react-icons/fi";
import { FaDeleteLeft } from "react-icons/fa6";

import { surveyDetailsStructure } from "../../models/surveyInterface";
import Selects from "../../components/selects";

const FormCreation: React.FC = () => {
  
  const emptySurveyDetailsStructure: surveyDetailsStructure = {
    surveyName:"",
    surveyDescription:"",
    surveyTargetAudience:"",
    surveyAlignment:"",
    surveyColorTheme:"#FFC61B",
    activeFrom:"",
    activeTo:"",
  }

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const [survey, setSurvey] = useState<surveyDetailsStructure>(structuredClone(emptySurveyDetailsStructure))
  const [surveys, setSurveys] = useState<surveyDetailsStructure[]>([])


  useEffect(()=>{

    axiosInterceptor({
      method: "get",
      url: "/fetch/get-question-types",
    }).then((res) => {
      // setQuestionTypes(res?.questionType ?? [])
    }).catch((err) => {
      toast.error(err.message);
    });
    
  },[])

 
  const validateSurveySave = ():void =>{

    const { surveyName, surveyDescription, surveyTargetAudience, surveyAlignment, surveyColorTheme, activeFrom, activeTo } = survey

    if(!surveyName){
      toast.warning("make sure to add Survey Name")
      return
    }
    if(!surveyDescription){
      toast.warning("make sure to add Survey Description")
      return
    }
    if(!surveyTargetAudience){
      toast.warning("make sure to add Survey Target Audience")
      return
    }
    if(!surveyAlignment){
      toast.warning("make sure to add Survey Question Alignment")
      return
    }
    if(!surveyColorTheme){
      toast.warning("make sure to add Survey Color Theme")
      return
    }
    if(!activeFrom){
      toast.warning("make sure to add Active From Date")
      return
    }
    if(!activeTo){
      toast.warning("make sure to add Active To Date")
      return
    }

    axiosInterceptor({
      method: "get",
      url: "/fetch/get-question-types",
    }).then((res) => {
      // setQuestionTypes(res?.questionType ?? [])
    }).catch((err) => {
      toast.error(err.message);
    });
    

    toast.success("Question Added")
  }
  
  return (
      <div className="min-h-screen creamBackground relative">
        <Header />
        <div className="h-14"></div>

        <div className="w-full p-4">
          <div className="w-full flex items-end justify-between">
            <h1 className="mainFont ps-2">
              <span className="appTextColor me-1 text-4xl">Surveys</span>
            </h1>
              
            <button 
              className="appBackgroundColor p-1.5 pb-2 font-medium text-white flex mb-2.5"
              onClick={()=>setSidebarOpen(true)}
            >
              <MdAddToPhotos className="mt-1.5 me-1"/>
              <span>Add Survey</span>
            </button>
          </div>

          {/* <div className="w-100 pt-3 ps-3">
            {questions.map((elem, index)=>(
              <QuestionSection
                index = {index}
                text = {elem.text}
                questionType = {elem?.questionType || ""}
                fileType = {elem?.fileType || ""}
                options = {elem.options}
                required = {elem.required}
                onChange={(str:string)=>{console.log(str)}}
              />
            ))}
          </div> */}
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
                  <span className="text-lg font-medium">Survey Name</span>

                  <input
                    className="px-3 py-3 w-100 border-1 pr-10 bg-slate-100 hover:bg-gray-200"
                    placeholder="Enter"
                    value={survey.surveyName}
                    onChange={(e)=>{
                      const input:string = e.currentTarget.value
                      setSurvey(prev=>{
                        return {...prev, surveyName: input}
                      })
                    }}
                  />
                </div>

                <div className="mt-1 w-full px-2">
                  <span className="text-lg font-medium">Survey Description</span>

                  <textarea
                    className="px-3 py-3 w-100 border-1 pr-10 bg-slate-100 hover:bg-gray-200"
                    rows={5}
                    placeholder="Enter"
                    value={survey.surveyDescription}
                    onChange={(e)=>{
                      const input:string = e.currentTarget.value
                      setSurvey(prev=>{
                        return {...prev, surveyDescription:input}
                      })
                    }}
                  />
                </div>

                <div className="mt-1 w-full px-2">
                  <span className="text-lg font-medium">Survey Target Audience</span>

                  <textarea
                    className="px-3 py-3 w-100 border-1 pr-10 bg-slate-100 hover:bg-gray-200"
                    rows={2}
                    placeholder="Enter"
                    value={survey.surveyTargetAudience}
                    onChange={(e)=>{
                      const input:string = e.currentTarget.value
                      setSurvey(prev=>{
                        return {...prev, surveyTargetAudience:input}
                      })
                    }}
                  />
                </div>

                <div className="mt-1 w-full px-2">
                  <span className="text-lg font-medium">Survey Question Alignment</span>

                  <Selects
                    index={-1}
                    options={["start", "center", "end"]}
                    onChange={(e)=>{
                      const input:string = e
                      setSurvey(prev=>{
                        return {...prev, surveyAlignment:input}
                      })
                    }}
                  />
                </div>

                <div className="mt-1 w-full px-2">
                  <span className="text-lg font-medium">Survey Color Theme</span>

                  <div className="w-full flex">

                    <input
                      className="px-3 py-3 w-11/12 border-1 pr-10 bg-slate-100 hover:bg-gray-200"
                      placeholder="Enter"
                      value={survey.surveyColorTheme}
                      onChange={(e)=>{
                        const input:string = e.currentTarget.value
                        setSurvey(prev=>{
                          return {...prev, surveyColorTheme: input}
                        })
                      }}
                      />

                    <div className="w-1/12 h-13 p-2" style={{backgroundColor:survey.surveyColorTheme}}></div>
                    
                  </div>
                </div>

                <div className="w-full flex justify-around">
                  <div className="w-1/2 px-2">
                    <span className="text-lg font-medium">Active From</span>
                    <div>
                      <input
                        type="date"
                        className="px-3 py-3 mb-3 w-100 border-1 bg-slate-100"
                        placeholder="Enter Option Label"
                        value={survey.activeFrom}
                        onChange={(e) => {
                          const input = e.currentTarget.value
                          setSurvey(prev=>{
                            return {...prev, activeFrom:input}
                          })
                        }}
                      />
                    </div>
                  </div>

                  <div className="w-1/2 px-2">
                    <span className="text-lg font-medium">Active To</span>
                    <div>
                      <input
                        type="date"
                        className="px-3 py-3 mb-3 w-100 border-1 bg-slate-100"
                        placeholder="Enter Option Label"
                        value={survey.activeTo}
                        onChange={(e) => {
                          const input = e.currentTarget.value
                          setSurvey(prev=>{
                            return {...prev, activeTo:input}
                          })
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-20"></div>
            </div>
            
            <div className="w-full px-4 py-3 bg-white shadow-md absolute bottom-0 left-0 right-0">
              <div className="w-full px-2">
                <button
                  className="bg-slate-950 rounded-md text-white text-lg px-md-12 px-8 py-3 w-100"
                  onClick={validateSurveySave}
                >Save</button>
              </div>
            </div>
          </div>
        </div>

    </div>
  );
}

export default FormCreation;
