import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { emailRegex } from "../../utils/regex";

import QuestionSection from "../../components/questionSection";

import { toast } from "react-toastify";
import { server } from "../../constants/urlPath";

import axiosInterceptor from "../../utils/axiosInterceptor";

import {
  QuestionWithResponseStructure,
  surveyDetailsStructure,
  SurveyResponseStructure,
} from "../../models/surveyInterface";

import { validateResponseSubmission } from "../../utils/validation";

const SurveyResponse: React.FC = () => {
  const { surveyCode } = useParams();

  const [survey, setSurvey] = useState<surveyDetailsStructure | null>(null);
  const [respondentEmail, setRespondentEmail] = useState<string>("");

  const [questions, setQuestions] = useState<QuestionWithResponseStructure[]>(
    []
  );

  const [disabled, setDisabled] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  useEffect(() => {
    axiosInterceptor({
      method: server.fetchSurveyAndQuestionary.method,
      url: server.fetchSurveyAndQuestionary.url + `/${surveyCode}`,
    })
      .then((res) => {
        setSurvey(res?.survey ?? null);
        setQuestions(res?.questionary ?? []);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, []);

  const handleSubmit = async (): Promise<void> => {
    const isValidEmail = emailRegex.test(respondentEmail);
    if (!isValidEmail) {
      toast.warning("Please enter a valid Respondent Email");
      return;
    }

    const validationPending: string = validateResponseSubmission(questions);

    if (validationPending) {
      toast.warning(validationPending);
      return;
    }

    const surveyResponse: SurveyResponseStructure[] = questions.map((elem) => ({
      questionId: elem.id,
      questionTypeId: elem.questionTypeId,
      response: elem.response,
    }));
    const surveyId = survey?.id;

    if (!surveyId) {
      toast.error("Process Can not be completed due to missing survey ID");
      return;
    }

    setDisabled(true);
    axiosInterceptor({
      method: server.surveySubmission.method,
      url: server.surveySubmission.url,
      data: {
        respondentEmail,
        surveyId,
        surveyResponse,
      },
    })
      .then(() => {
        setFormSubmitted(true);
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        setDisabled(false);
      });
  };

  const handleResponse = (res: string, index: number): void => {
    const response: string = res;
    setQuestions((prev) => {
      prev[index].response = response;
      return [...prev];
    });
  };

  return (
    !formSubmitted ? ( 

      <div className="min-h-screen bg-slate-100 p-4">    
        <div className="max-w-6xl mx-auto">

          <div className= "z-20 w-full">
            <div className="max-w-6xl mx-auto">
              <header className="bg-white shadow p-4 mb-6">
                <div className={`flex flex-col sm:flex-row items-${survey?.surveyAlignment ?? "start"}`}>
                  <h1 className="text-xl font-bold appTextColor mb-4 sm:mb-0">
                    {survey?.surveyName ? `${survey.surveyName}` : ""}
                  </h1>
                  <div className="flex space-x-3">
                    {/* Additional header actions can go here if needed */}
                  </div>
                </div>
              </header>
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden mb-6">
            <div className="px-4 py-5 sm:px-6">
              <div className="mb-4">
                <label className={`block text-lg font-medium appTextColor text-${survey?.surveyAlignment ?? "start"}`}>
                  Respondent Email
                  <span className="text-red-500"> *</span>
                </label>
                <input
                  type="text"
                  className="mt-2 w-full px-6 py-3 bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  value={respondentEmail}
                  onChange={(e)=>setRespondentEmail(e.currentTarget.value)}
                />
              </div>
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden mb-6">
          <div className="divide-y divide-gray-200">
            {questions.map((elem, index) => (
              <QuestionSection
                key={"question" + index}
                index={index}
                text={elem.text}
                questionType={elem?.questionType || ""}
                fileType={elem?.fileType || ""}
                options={elem.options}
                required={elem.required}
                onChange={(res: string) =>handleResponse(res, index)}
                questionAlignment={survey?.surveyAlignment ?? "start"}
              />
            ))}
          </div>
        </div>

        <div className="p-4 bg-white border-t shadow border-gray-200">
          <div className="max-w-6xl mx-auto">
            <button
              disabled={disabled}
              className="w-full px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
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
      </div>
    </div>
  ) : (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="max-w-md w-full bg-white shadow-lg p-6 text-center">
        <div className="flex justify-center">
          <svg
            className="h-16 w-16 text-green-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
        <h1 className="mt-4 text-2xl font-semibold text-gray-800">
          Thank You!
        </h1>
        <p className="mt-2 text-gray-600">
          Your response has been successfully submitted.
        </p>
        <p className="mt-1 text-gray-500 text-sm">
          Your feedback is appreciate.
        </p>
      </div>
    </div>
  );
};

export default SurveyResponse;
