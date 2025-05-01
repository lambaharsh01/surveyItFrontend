export const client = {
  signIn: "/",
  signUp: "/sign-up",
  forgotPassword: "/forgot-password",

  dashboard: "/dashboard",
  surveyCreation: "/survey-creation",
  questionaryCreation: "/questionary-creation",
  viewSurveyResponses: "/vie-survey-responses",
};

export const params = {
  surveyCode: "surveyCode",
};

export const server = {
  signIn: { url: "/auth/sign-in", method: "post" },
  forgotPassword: { url: "/auth/forgot-password", method: "post" },
  initSignup: { url: "/auth/initial-sign-up", method: "post" },
  checkOtp: { url: "/auth/check-otp", method: "post" },
  setPassword: { url: "/auth/set-password", method: "post" },

  getQuestionTypes: {
    url: "/survey-creation/get-question-types",
    method: "get",
  },
  getFileTypes: { url: "/survey-creation/get-file-types", method: "get" },
  addSurvey: { url: "/survey-creation/add-survey", method: "post" },
  updateSurvey: { url: "/survey-creation/update-survey", method: "put" },
  getSurveys: { url: "/survey-creation/get-surveys", method: "post" },
  getSurveyAndQuestionary: {
    url: "/survey-creation/get-survey-and-questionary",
    method: "get",
  },
  deleteSurvey: { url: "/survey-creation/delete-survey", method: "delete" },

  updateQuestionary: {
    url: "/survey-creation/update-questionary",
    method: "post",
  },
  fetchSurveyAndQuestionary: {
    url: "/survey-response/fetch-survey-and-questionary",
    method: "get",
  },

  surveySubmission: {
    url: "/survey-response/survey-submission",
    method: "post",
  },
  getResponseData: {
    url: "/survey-creation/get-response-data",
    method: "get",
  },
};

const endpoints = { client };

export default endpoints;
