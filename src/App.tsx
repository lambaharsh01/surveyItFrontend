import { useState } from "react";
import Survey from "./components/surveyProp";
import { Question } from "./models/feedbackFormInterface";
import RespondentDetails from "./components/respondentDetails";

const questionsMain :Question[] = [
  {id: 1, text : "How well do I collaborate with the team?" , optional: false},
  {id: 1, text : "How well do I collaborate with the team? well do I collaborate with the team?" , optional: false},
  {id: 1, text : "How well do I collaborate with the team?" , optional: false},
  {id: 1, text : "How well do I collaborate with the team?" , optional: false},
  {id: 1, text : "How well do I collaborate with the team? well do I collaborate with the team? well do I collaborate with the team? well do I collaborate with the team?" , optional: false},
  {id: 1, text : "How well do I collaborate with the team?" , optional: false},
  {id: 1, text : "How well do I collaborate with the team?" , optional: false},
  {id: 1, text : "How well do I collaborate with the team? well do I collaborate with the team? " , optional: false},
  {id: 1, text : "How well do I collaborate with the team?" , optional: false},
  {id: 1, text : "How well do I collaborate with the team?" , optional: false},
  {id: 1, text : "How well do I collaborate with the team? well do I collaborate with the team?" , optional: false},
  {id: 1, text : "How well do I collaborate with the team? well do I collaborate with the team?" , optional: false},
  {id: 1, text : "How well do I collaborate with the team?" , optional: false},
  {id: 1, text : "How well do I collaborate with the team?" , optional: false},
];

export default function App() {

  const [questions, setQuestions] = useState<Question[]>(questionsMain)

  const handleSurveySubmit = (responses: { question: string; rating: number }[]) => {
    console.log("User Responses:", responses);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-700 ">
      <Survey questions={questions} onSubmit={handleSurveySubmit} />
      {/* <RespondentDetails/> */}
    </div>
  );
}
