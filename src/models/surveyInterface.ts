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

export interface QuestionTypeStructure {
  id: number;
  questionType: string;
  questionTypeLabel: string;
}

export interface FileTypeStructure {
  id: number;
  fileType: string;
  fileTypeLabel: string;
}

export interface QuestionStructure {
  id?: number;
  text: string;
  questionTypeId: number | null;
  questionType: string | null;
  fileTypeId: number | null;
  fileType: string | null;
  options: string[];
  required: boolean;
  validation: boolean;
  min: number;
  max: number;
}

export interface surveyDetailsStructure {
  id?: number;
  surveyCode?: string;
  surveyName: string;
  surveyDescription: string;
  surveyTargetAudience: string;
  surveyAlignment: string;
  surveyColorTheme: string;
  allowMultipleSubmissions: boolean;
  activeFrom: string;
  activeTo: string;
  createdAt?: string;
  active?: boolean;
  responses?: number;
}

export interface updateQuestionaryPayloadStructure {
  surveyId: number;
  questionary: QuestionStructure[];
  deletedQuestionIds: number[];
}

export interface QuestionWithResponseStructure {
  id: number;
  text: string;
  questionTypeId: number | null;
  questionType: string | null;
  fileTypeId: number | null;
  fileType: string | null;
  options: string[];
  required: boolean;
  validation: boolean;
  min: number;
  max: number;
  response?: string;
}

export interface SurveyResponseStructure {
  questionId: number;
  response?: string;
}

export interface GetResponseStructure {
  responseSno: number;
  respondentEmail: string;
  question: string;
  response: string | null;
  submittedAt: string;
}
