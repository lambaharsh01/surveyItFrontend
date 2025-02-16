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

