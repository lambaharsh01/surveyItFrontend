import { Question } from "./surveyInterface";

export interface SwitchProps {
  onChange: (checked: boolean) => void;
  checked: boolean;
}

export interface SurveyPropsInterface {
  questions: Question[];
  onSubmit: (responses: { question: string; rating: number }[]) => void;
}
  
export type CheckboxPropInterface = {
  options: string[];
  identifier: number;
  type?: "checkbox" | "radio";
  onChange: (selected: string) => void;
};


export interface QuestionSectionPropInterface {
  identifier: number; // index
  text: string;
  questionTypeId: number;
  questionType: string;
  fileTypeId: number;
  fileType: string;
  options: string[];
  required: boolean;
  questionAlignment? : string;
}



