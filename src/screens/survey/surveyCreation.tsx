import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { toast } from "react-toastify";
import { client, server } from "../../constants/urlPath";

import axiosInterceptor from "../../utils/axiosInterceptor";

import { surveyDetailsStructure } from "../../models/surveyInterface";
import Selects from "../../components/selects";

const SurveyCreation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const surveyDetailsRaw: surveyDetailsStructure | null = location.state;

  const emptySurveyDetailsStructure: surveyDetailsStructure = {
    surveyName: "",
    surveyDescription: "",
    surveyTargetAudience: "",
    surveyAlignment: "center",
    surveyColorTheme: "#FFC61B",
    allowMultipleSubmissions: true,
    activeFrom: "",
    activeTo: "",
  };

  const [survey, setSurvey] = useState<surveyDetailsStructure>(
    surveyDetailsRaw || structuredClone(emptySurveyDetailsStructure)
  );

  useEffect(() => {
    console.log(survey);
  }, [survey]);
  // const [actionIndex, setActionIndex] = useState<number>(-1);

  const validateSurveySave = (): void => {
    if (!survey.surveyName) {
      toast.warning("make sure to add Survey Name");
      return;
    }
    if (!survey.surveyDescription) {
      toast.warning("make sure to add Survey Description");
      return;
    }
    if (!survey.surveyTargetAudience) {
      toast.warning("make sure to add Survey Target Audience");
      return;
    }
    if (!survey.surveyAlignment) {
      toast.warning("make sure to add Survey Question Alignment");
      return;
    }
    if (!survey.surveyColorTheme) {
      toast.warning("make sure to add Survey Color Theme");
      return;
    }
    if (!survey.activeFrom) {
      toast.warning("make sure to add Active From Date");
      return;
    }
    if (!survey.activeTo) {
      toast.warning("make sure to add Active To Date");
      return;
    }

    if (!survey?.id) {
      axiosInterceptor({
        method: server.addSurvey.method,
        url: server.addSurvey.url,
        data: survey,
      })
        .then(() => {
          toast.success("Survey Added");
          navigate(client.dashboard);
        })
        .catch(() => {
          toast.error("Something Went Wrong");
        });
      return;
    }

    const surveyIdParams: string = `/${survey?.id ?? 0}`;

    axiosInterceptor({
      method: server.updateSurvey.method,
      url: server.updateSurvey.url + surveyIdParams,
      data: survey,
    })
      .then(() => {
        toast.success("Survey Updated");
        navigate(client.dashboard);
      })
      .catch(() => {
        toast.error("Something Went Wrong");
      });
  };

  return (
    <div className="min-h-screen creamBackground relative">
      <div className="bg-white shadow-lg">
        <div className="flex flex-col h-full">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold appTextColor">Add Survey</h2>
            </div>

            <div className="space-y-6">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Survey Name
                </label>
                <input
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:bg-gray-100 transition-colors"
                  placeholder="Enter survey name"
                  value={survey.surveyName}
                  onChange={(e) => {
                    const input: string = e.currentTarget.value;
                    setSurvey((prev) => ({ ...prev, surveyName: input }));
                  }}
                />
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Survey Description (participant visibility)
                </label>
                <textarea
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:bg-gray-100 transition-colors"
                  rows={5}
                  placeholder="Enter description"
                  value={survey.surveyDescription}
                  onChange={(e) => {
                    const input: string = e.currentTarget.value;
                    setSurvey((prev) => ({
                      ...prev,
                      surveyDescription: input,
                    }));
                  }}
                />
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Survey Target Audience
                </label>
                <textarea
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:bg-gray-100 transition-colors"
                  rows={2}
                  placeholder="Enter target audience"
                  value={survey.surveyTargetAudience}
                  onChange={(e) => {
                    const input: string = e.currentTarget.value;
                    setSurvey((prev) => ({
                      ...prev,
                      surveyTargetAudience: input,
                    }));
                  }}
                />
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Survey Question Alignment
                </label>
                <Selects
                  // key={"Select" + renderDropdown}
                  value={survey.surveyAlignment}
                  index={-1}
                  options={["start", "center"]}
                  onChange={(e) => {
                    setSurvey((prev) => ({ ...prev, surveyAlignment: e }));
                  }}
                />
              </div>

              {/* <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Survey Color Theme
                </label>
                <div className="flex gap-2">
                  <input
                    className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:bg-gray-100 transition-colors"
                    placeholder="Enter color code"
                    value={survey.surveyColorTheme}
                    onChange={(e) => {
                      setSurvey((prev) => ({
                        ...prev,
                        surveyColorTheme: e.target.value,
                      }));
                    }}
                  />
                  <div
                    className="w-12 border border-gray-200"
                    style={{ backgroundColor: survey.surveyColorTheme }}
                  ></div>
                </div>
              </div> */}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Active From
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:bg-gray-100 transition-colors"
                    value={survey.activeFrom}
                    onChange={(e) => {
                      setSurvey((prev) => ({
                        ...prev,
                        activeFrom: e.target.value,
                      }));
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Active To
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:bg-gray-100 transition-colors"
                    value={survey.activeTo}
                    onChange={(e) => {
                      setSurvey((prev) => ({
                        ...prev,
                        activeTo: e.target.value,
                      }));
                    }}
                  />
                </div>
              </div>

              <br />

              <div className="w-full">
                <button
                  className="bg-slate-950 text-white text-lg px-md-12 px-8 py-3 w-100"
                  onClick={validateSurveySave}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyCreation;
