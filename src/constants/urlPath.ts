export const client = {
  signIn: "/",
  signUp: "/sign-up",
  forgotPassword: "/forgot-password",

  dashboard: "/dashboard",
  surveyCreation: "/survey-creation",
  questionaryCreation: "/questionary-creation",
};

export const params  = {
  surveyCode:"surveyCode" 
}

export const server = {
  signIn: { url: "/auth/sign-in", method: "post" },
  forgotPassword: { url: "/auth/forgot-password", method: "post" },
  initSignup: { url: "/auth/initial-sign-up", method: "post" },
  checkOtp: { url: "/auth/check-otp", method: "post" },
  setPassword: { url: "/auth/set-password", method: "post" },

  getQuestionTypes: { url: "/fetch/get-question-types", method: "get" },
  getFileTypes: { url: "/fetch/get-file-types", method: "get" },
  addSurvey: { url: "/fetch/add-survey", method: "post" },
  updateSurvey: { url: "/fetch/update-survey", method: "put" },
  getSurveys: { url: "/fetch/get-surveys", method: "post" },
  getSurvey: { url: "/fetch/get-survey", method: "get" },
  deleteSurvey: { url: "/fetch/delete-survey", method: "delete" },
};

const endpoints = { client };

export default endpoints;
