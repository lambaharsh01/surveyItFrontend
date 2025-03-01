import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { MdAddToPhotos } from "react-icons/md";

import QuestionSection from "../../components/questionSection";

import { toast } from "react-toastify";
import { server } from "../../constants/urlPath";

import axiosInterceptor from "../../utils/axiosInterceptor";

import {
  QuestionWithResponseStructure,
  surveyDetailsStructure,
} from "../../models/surveyInterface";

import { validateResponseSubmission } from "../../utils/validateion";

const SurveyResponse: React.FC = () => {

  const { surveyCode } = useParams()

  const [survey, setSurvey] = useState<surveyDetailsStructure|null>(null)
  const [questions, setQuestions] = useState<QuestionWithResponseStructure[]>([]);

  const [disabled, setDisabled] = useState<boolean>(false)

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);



  useEffect(() => {

    axiosInterceptor({
      method: server.fetchSurveyAndQuestionary.method,
      url: server.fetchSurveyAndQuestionary.url + `/${surveyCode}`,
    })
      .then((res) => {
        setSurvey(res?.survey ?? null)
        setQuestions(res?.questionary ?? [])
      })
      .catch((err) => {
        toast.error(err.message);
      });
 
  }, []);

  const handleSubmit = ():void =>{
    setDisabled(true)
    

    // const data:QuestionWithResponseStructure[] = validateResponseSubmission(questions)
  
    setDisabled(false)

    
  };

  const handleResponse = (res: string, index:number):void =>{
    const response:string = res
    setQuestions(prev=>{
      prev[index].response = response;
      return [...prev]
    })    
  }

  return (
    <div className="min-h-screen creamBackground relative">

      <div className="w-full p-4 max-h-screen overflow-y-auto">
        <div className={`w-full flex items-end justify-${survey?.surveyAlignment}`}>
          <h1 className="mainFont">
            <span className="me-1 text-4xl">Questionary <span className="text-2xl">({survey?.surveyName ?? ""})</span></span>
          </h1>
        </div>

        <div className="w-100 pt-3 ps-3">
          {questions.map((elem, index) => (
              <QuestionSection
                index={index}
                text={elem.text}
                questionType={elem?.questionType || ""}
                fileType={elem?.fileType || ""}
                options={elem.options}
                required={elem.required}
                onChange={(res: string) =>handleResponse(res, index)}
                questionAlignment={survey?.surveyAlignment ?? ""}
              />
          ))}
        </div>
      
      </div>

      
      <div className="w-full px-4 pb-4 creamBackground">  
        <button
          disabled={disabled}
          className="bg-slate-950 rounded-md text-white text-lg px-md-12 px-8 py-3 w-full"
          onClick={handleSubmit}
        >
          {disabled ? (
            <div className="spinner-border spinner-border-sm text-white"></div>
          ) : (
            <span>Submit Response</span>
          )}
        </button>
      </div>

    </div>
  );
};

export default SurveyResponse;
