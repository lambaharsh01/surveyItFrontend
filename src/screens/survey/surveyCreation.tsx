import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { useNavigate } from "react-router-dom";


import { toast } from "react-toastify";
import { client, server } from "../../constants/urlPath";

import axiosInterceptor from "../../utils/axiosInterceptor";

import { MdAddToPhotos } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";
import { FaDeleteLeft } from "react-icons/fa6";

import { surveyDetailsStructure } from "../../models/surveyInterface";
import Selects from "../../components/selects";
import Switch from "../../components/switch";
import InfiniteScroll from "react-infinite-scroll-component";

const SurveyCreation: React.FC = () => {

  const navigate = useNavigate()

  const offset: number = 10;

  const emptySurveyDetailsStructure: surveyDetailsStructure = {
    surveyName: "",
    surveyDescription: "",
    surveyTargetAudience: "",
    surveyAlignment: "",
    surveyColorTheme: "#FFC61B",
    allowMultipleSubmissions: true,
    activeFrom: "",
    activeTo: "",
  };

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [survey, setSurvey] = useState<surveyDetailsStructure>(
    structuredClone(emptySurveyDetailsStructure)
  );
  const [surveys, setSurveys] = useState<surveyDetailsStructure[]>([]);
  const [renderDropdown, setRenderDropdown] = useState<number>(0);

  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [actionIndex, setActionIndex] = useState<number>(-1);
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);

  const getBasePage= ():void=>{

    flushSync(()=>{
      setSurveys([])
      setSurvey(structuredClone(emptySurveyDetailsStructure));
      setRenderDropdown((prev) => prev + 1);
      setSidebarOpen(false);
      setHasMore(true)
      setPage(0)
    })
    fetchSurveys(true);
  }

  const fetchSurveys = (omitEmpty: boolean): void => {

    const atPage = omitEmpty ? 0 : page

    axiosInterceptor({
      method: server.getSurveys.method,
      url: server.getSurveys.url,
      data: { offset, page: atPage },
    })
      .then((res) => {
        if (res.to >= res.total) {
          setHasMore(false);
        }

        if (omitEmpty) {
          setSurveys(res.data);
          setPage(1);
        } else {
          setPage((prev) => prev + 1);
          setSurveys((prev) => [...prev, ...res.data]);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    fetchSurveys(true);
  }, []);

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

    if (actionIndex < 0) {
      axiosInterceptor({
        method: server.addSurvey.method,
        url: server.addSurvey.url,
        data: survey,
      })
        .then(() => {
          toast.success("Survey Added");
          getBasePage()
        })
        .catch(() => {
          toast.error("Something Went Wrong");
        });
      return;
    }

    const surveyIdParams: string = `/${surveys?.[actionIndex]?.id ?? 0}`;

    axiosInterceptor({
      method: server.updateSurvey.method,
      url: server.updateSurvey.url + surveyIdParams,
      data: survey,
    })
      .then(() => {
        getBasePage()
        toast.success("Survey Updated")
      })
      .catch(() => {
        toast.error("Something Went Wrong");
      });
  };

  const deleteSurvey = (): void => {
    const surveyIdParams: string = `/${surveys?.[actionIndex]?.id ?? 0}`;
    axiosInterceptor({
      url: server.deleteSurvey.url + surveyIdParams,
      method: server.deleteSurvey.method,
    })
      .then(() => {
        getBasePage()
      })
      .catch(() => {
        toast.error("Something Went Wrong");
      });

    setActionIndex(-1);
    setDeleteConfirmation(false);
  };

  return (
    <div className="min-h-screen creamBackground relative">
      <div className="w-full p-2">
        <div className="w-full flex items-end justify-between">
          <h1 className="mainFont">
            <span className="me-1 text-4xl">Surveys</span>
          </h1>

          <button
            className="appBackgroundColor p-1.5 pb-2 font-medium text-white flex mb-2.5"
            onClick={() => setSidebarOpen(true)}
          >
            <MdAddToPhotos className="mt-1.5 me-1" />
            <span>Add Survey</span>
          </button>
        </div>

        <div className="w-full overflow-x-auto">
          <InfiniteScroll
            dataLength={surveys.length}
            next={() => {fetchSurveys(false)}}
            hasMore={hasMore}
            loader={
              <div className="w-100 text-center mb-2">
                <div className="spinner-border spinner-border text-slate-400"></div>
              </div>
            }
            // endMessage={<p style={{ textAlign: "center" }}>No more data to display</p>}
          >
            <div className="rounded-lg overflow-hidden border border-gray-600 min-w-max">
              <table className="w-full border-separate border-spacing-0 text-left">
                <thead className="bg-gray-200 text-gray-900 font-medium">
                  <tr>
                    <th className="border border-slate-900 px-4 py-3">
                      Active
                    </th>
                    <th className="border border-slate-900 px-4 py-3">
                      Survey Name
                    </th>
                    <th className="border border-slate-900 px-4 py-3">
                      Survey Description
                    </th>
                    <th className="border border-slate-900 px-4 py-3">
                      Responses
                    </th>
                    <th className="border border-slate-900 px-4 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {surveys.map((elem, index) => (
                    <tr key={"surveyRow" + index} className="hover:bg-gray-100">
                      <td className="border border-gray-400 px-4 py-3 text-center">
                        <span
                          className={`w-4 h-4 inline-block rounded-full ${
                            elem.active ? "bg-green-500" : "bg-red-500"
                          }`}
                        />
                      </td>
                      <td className="border border-gray-400 px-4 py-3">
                        {elem.surveyName}
                      </td>
                      <td className="border border-gray-400 px-4 py-3 break-words max-w-xs">
                        {elem.surveyDescription}
                      </td>
                      <td className="border border-gray-400 px-4 py-3 text-center">
                        {index}
                      </td>
                      <td className="border border-gray-400 px-4 py-3">
                        <div className="w-full flex justify-around">
                          <MdAddToPhotos
                            className="text-2xl text-green-500 me-3"
                            onClick={() => {
                              navigate(client.questionaryCreation + `/${elem.surveyCode}`)
                            }}
                          />
                          <FiEdit3
                            className="text-2xl text-blue-500 me-3"
                            onClick={() => {
                              setActionIndex(index);
                              setSurvey(surveys[index]);
                              setSidebarOpen(true);
                            }}
                          />
                          <FaDeleteLeft
                            className="text-2xl text-red-500"
                            onClick={() => {
                              setActionIndex(index);
                              setDeleteConfirmation(true);
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </InfiniteScroll>
        </div>
      </div>

      {/* ADD SURVEY */}
      <div
        className={`fixed top-0 right-0 h-full bg-white transition-all duration-300 ease-in-out 
            ${sidebarOpen ? "w-11/12" : "w-0"} z-50 flex flex-col`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 flex-grow overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl ps-2">Add Survey</h2>
              <button
                onClick={() => {
                  setSidebarOpen(false);
                  setActionIndex(-1);
                  setSurvey(structuredClone(emptySurveyDetailsStructure));
                }}
                className="text-4xl font-bold mb-3"
              >
                {" "}
                ×{" "}
              </button>
            </div>

            <div className="flex flex-wrap gap-4">

              <div className="mt-1 w-full px-2">
                <span className="text-lg font-medium">Survey Name</span>

                <input
                  className="px-3 py-3 w-100 border-1 pr-10 bg-slate-100 hover:bg-gray-200"
                  placeholder="Enter"
                  value={survey.surveyName}
                  onChange={(e) => {
                    const input: string = e.currentTarget.value;
                    setSurvey((prev) => {
                      return { ...prev, surveyName: input };
                    });
                  }}
                />
              </div>

              <div className="mt-1 w-full px-2">
                <span className="text-lg font-medium">Survey Description (participant visibility)</span>

                <textarea
                  className="px-3 py-3 w-100 border-1 pr-10 bg-slate-100 hover:bg-gray-200"
                  rows={5}
                  placeholder="Enter"
                  value={survey.surveyDescription}
                  onChange={(e) => {
                    const input: string = e.currentTarget.value;
                    setSurvey((prev) => {
                      return { ...prev, surveyDescription: input };
                    });
                  }}
                />
              </div>

              <div className="mt-1 w-full px-2">
                <span className="text-lg font-medium">
                  Survey Target Audience
                </span>

                <textarea
                  className="px-3 py-3 w-100 border-1 pr-10 bg-slate-100 hover:bg-gray-200"
                  rows={2}
                  placeholder="Enter"
                  value={survey.surveyTargetAudience}
                  onChange={(e) => {
                    const input: string = e.currentTarget.value;
                    setSurvey((prev) => {
                      return { ...prev, surveyTargetAudience: input };
                    });
                  }}
                />
              </div>

              <div className="mt-1 w-full px-2">
                <span className="text-lg font-medium">
                  Survey Question Alignment
                </span>

                <Selects
                  key={"Select" + renderDropdown}
                  index={-1}
                  options={["start", "center"]}
                  onChange={(e) => {
                    const input: string = e;
                    setSurvey((prev) => {
                      return { ...prev, surveyAlignment: input };
                    });
                  }}
                />
              </div>

              <div className="mt-1 w-full px-2">
                <span className="text-lg font-medium">Survey Color Theme</span>

                <div className="w-full flex">
                  <input
                    className="px-3 py-3 w-11/12 border-1 pr-10 bg-slate-100 hover:bg-gray-200"
                    placeholder="Enter"
                    value={survey.surveyColorTheme}
                    onChange={(e) => {
                      const input: string = e.currentTarget.value;
                      setSurvey((prev) => {
                        return { ...prev, surveyColorTheme: input };
                      });
                    }}
                  />

                  <div
                    className="w-1/12 h-13 p-2"
                    style={{ backgroundColor: survey.surveyColorTheme }}
                  ></div>
                </div>
              </div>

              <div className="w-full flex justify-around">
                <div className="w-1/2 px-2">
                  <span className="text-lg font-medium">Active From</span>
                  <div>
                    <input
                      type="date"
                      className="px-3 py-3 mb-3 w-100 border-1 bg-slate-100"
                      placeholder="Enter Option Label"
                      value={survey.activeFrom}
                      onChange={(e) => {
                        const input = e.currentTarget.value;
                        setSurvey((prev) => {
                          return { ...prev, activeFrom: input };
                        });
                      }}
                    />
                  </div>
                </div>

                <div className="w-1/2 px-2">
                  <span className="text-lg font-medium">Active To</span>
                  <div>
                    <input
                      type="date"
                      className="px-3 py-3 mb-3 w-100 border-1 bg-slate-100"
                      placeholder="Enter Option Label"
                      value={survey.activeTo}
                      onChange={(e) => {
                        const input = e.currentTarget.value;
                        setSurvey((prev) => {
                          return { ...prev, activeTo: input };
                        });
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-1 w-full px-2 flex justify-between">
                <span className="text-lg font-medium">Multiple Submissions From Single Device</span>
               
                  <Switch
                    checked={survey.allowMultipleSubmissions}
                    onChange={(checked)=>{
                      setSurvey((prev) => {
                        return { ...prev, allowMultipleSubmissions: checked };
                      });
                    }}
                  />
              </div>

            </div>
            <div className="h-20"></div>
          </div>

          <div className="w-full px-4 py-3 bg-white shadow-md absolute bottom-0 left-0 right-0">
            <div className="w-full px-2">
              <button
                className="bg-slate-950 rounded-md text-white text-lg px-md-12 px-8 py-3 w-100"
                onClick={validateSurveySave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {deleteConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-lg text-center font-medium mb-4 text-gray-800">
              Are you sure you want delete the survey?
            </h2>
            <br />
            <div className="flex justify-around space-x-4">
              <button
                onClick={() => setDeleteConfirmation(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={deleteSurvey}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SurveyCreation;
