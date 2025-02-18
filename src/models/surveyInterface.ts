export interface Question {
    id: number;
    text: string;
    optional: boolean;
}

export interface RespondentDetail {
    name: string;
    email: string;
    department: string;
    position: string;
}

export interface SurveyProps {
  questions: Question[];
  onSubmit: (responses: { question: string; rating: number }[]) => void;
}

export interface RespondentProp {
  onSubmit: (responses: { question: string; rating: number }[]) => void;
}

export interface QuestionTypeStructure{
  id: number;
  questionAcceptedAs: string
  questionTypeLabel: string
}

export interface FileTypeStructure{
  id: number;
  fileType: string
  fileTypeLabel: string
}

export interface QuestionStructure {
  text: string;
  type: QuestionTypeStructure | null;
  fileType: FileTypeStructure | null;
  options: string[];
  required: boolean;
}

