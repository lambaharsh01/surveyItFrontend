export const client = {
  signIn: "/",
  signUp: "/sign-up",
  forgotPassword: "/forgot-password",

  dashboard: "/dashboard",
  formCreation: "/form-creation",
};

export const server = {
  signIn: "/auth/sign-in",
  forgotPassword: "/auth/forgot-password",
  initSignup: "/auth/initial-sign-up",
  checkOtp: "/auth/check-otp",
  setPassword: "/auth/set-password",

  getQuestionTypes: "/fetch/get-question-types",
  getFileTypes: "/fetch/get-file-types",
};

const endpoints = { client };

export default endpoints;
