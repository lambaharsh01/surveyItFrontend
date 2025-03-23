import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { client, params } from "./constants/urlPath";

// import Index from "./screens/index";
import Dashboard from "./screens/dashboard";

import SignIn from "./screens/auth/signIn";
import SignUp from "./screens/auth/signUp";
import ForgotPassword from "./screens/auth/forgotPassword";
import SurveyCreation from "./screens/survey/surveyCreation";
import QuestionaryCreation from "./screens/survey/questionaryCreation";
import SurveyResponse from "./screens/response/surveyResponse";

import ViewSurveyResponses from "./screens/response/responseView";

function Routing() {
  return (
    <div>
      <ToastContainer
        autoClose={800}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss
        draggable
        draggablePercent={20}
        pauseOnHover
      />
      <BrowserRouter>
        <Routes>
          <Route path={client.dashboard} element={<Dashboard />} />
          <Route path={client.signIn} element={<SignIn />} />
          <Route path={client.signUp} element={<SignUp />} />
          <Route path={client.forgotPassword} element={<ForgotPassword />} />
          <Route path={client.surveyCreation} element={<SurveyCreation />} />
          <Route
            path={client.questionaryCreation + "/:" + params.surveyCode}
            element={<QuestionaryCreation />}
          />
          <Route path={":" + params.surveyCode} element={<SurveyResponse />} />
          <Route
            path={client.viewSurveyResponses + "/:" + params.surveyCode}
            element={<ViewSurveyResponses />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Routing;
