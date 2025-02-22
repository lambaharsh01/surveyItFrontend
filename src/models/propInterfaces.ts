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
  index: number;
  type?: "checkbox" | "radio";
  onChange: (selected: string) => void;
};

export type SelectsPropInterface = {
  options: string[];
  index: number;
  onChange: (selected: string) => void;
};

export interface QuestionSectionPropInterface {
  index: number; // index
  text: string;
  questionType: string;
  fileType: string;
  options: string[];
  required: boolean;
  questionAlignment? : string;
  onChange: (data:string) => void;
}

export interface StarsPropInterface {
  questionAlignment: string;
  onChange: (data:string) => void;
}


export interface FilesPropInterface {
    fileType:string;
    onChange: (base64: string) => void;
}



