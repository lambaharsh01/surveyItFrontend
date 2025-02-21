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

export interface QuestionTypeStructure{
  id: number;
  questionType: string
  questionTypeLabel: string
}

export interface FileTypeStructure{
  id: number;
  fileType: string
  fileTypeLabel: string
}

export interface QuestionStructure {
  text: string;
  questionTypeId: number | null;
  questionType: string | null;
  fileTypeId: number | null;
  fileType: string | null;
  options: string[];
  required: boolean;
}

