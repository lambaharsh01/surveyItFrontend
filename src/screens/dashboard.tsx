import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { localStorageItems } from "../constants/localStorageDataDictionary";
import { surveyDetailsStructure } from "../models/surveyInterface";

import InfiniteScroll from "react-infinite-scroll-component";
import axiosInterceptor from "../utils/axiosInterceptor";
import { client, server } from "../constants/urlPath";
import { toast } from "react-toastify";

import { flushSync } from "react-dom";

import { RiFileExcel2Fill } from "react-icons/ri";
import { MdAddToPhotos } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";
import { FaDeleteLeft } from "react-icons/fa6";
import { LuLogOut } from "react-icons/lu";


const Dashboard: React.FC = () => {
  
  const navigate = useNavigate();
  const [surveys, setSurveys] = useState<surveyDetailsStructure[]>([]);
  const [logoutIsActive, setLogoutIsActive] = useState<boolean>(false);

  const offset: number = 10;
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const [actionIndex, setActionIndex] = useState<number>(-1);
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);

  const logOut = () => {
    localStorage.setItem(localStorageItems.token, "");
    navigate(client.signIn, { replace: true });
  }

  useEffect(() => {
    fetchSurveys(true);
  }, []);
  
  const getBasePage= ():void=>{
    flushSync(()=>{
      setSurveys([])
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





  // const surveys: surveyDetailsStructure[] = [
  //   {
  //     id:1,
  //     surveyCode:"123",
  //     surveyName:"Name",
  //     surveyDescription:"discription",
  //     surveyTargetAudience:"target",
  //     surveyAlignment:"alignment",
  //     surveyColorTheme:"color",
  //     allowMultipleSubmissions:true,
  //     activeFrom:"from",
  //     activeTo:"to",
  //     createdAt:"21-03-2024",
  //     active:true,
  //     responses:5

  //   }

  // ];

  return (
    <div className="min-h-screen bg-slate-100 p-4">

      <div className="max-w-6xl mx-auto">
      <header className="mb-4 flex justify-end">
        <LuLogOut 
          className="text-2xl font-extrabold"
          onClick={()=>setLogoutIsActive(true)}
        />
      </header>
      </div>

      <div className="max-w-6xl mx-auto">
        <header className="bg-white shadow p-4 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <h1 className="text-xl font-bold appTextColor mb-4 sm:mb-0">Survey Dashboard</h1>
            <div className="flex space-x-3">
              <button 
                className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => navigate(client.surveyCreation)}
              >
                Create Survey
              </button>
            </div>
          </div>
        </header>

      <div className="overflow-x-auto">
        <InfiniteScroll
          dataLength={surveys.length}
          next={() => {fetchSurveys(false)}}
          hasMore={hasMore}
          loader={
            <div className="w-100 text-center mb-2">
              <div className="spinner-border spinner-border text-slate-400"></div>
            </div>
          }
        >
          <div className="bg-white shadow overflow-hidden">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg font-medium appTextColor">Survey Overview</h2>
              <p className="mt-1 text-sm text-gray-500">Overview of your surveys and their response counts.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Survey Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Responses
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {surveys.map((elem, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium appTextColor">{elem.surveyName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{elem.createdAt}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold ${elem.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800" }`}>
                          {elem.active ? "active":"inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {elem.responses}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-4">
                            
                          <RiFileExcel2Fill
                            className="text-xl text-green-600 hover:text-green-700 cursor-pointer"
                            // onClick={() => navigate(client.questionaryCreation + "/" + elem.surveyCode)}
                          />
                          <MdAddToPhotos
                            className="text-xl text-blue-600 hover:text-blue-700 cursor-pointer"
                            onClick={() => navigate(client.questionaryCreation + "/" + elem.surveyCode)}
                          />
                          <FiEdit3
                            className="text-xl text-blue-400 hover:text-blue-500 cursor-pointer"
                            // onClick={() => {
                            //   setActionIndex(index);
                            //   setSurvey(surveys[index]);
                            //   setSidebarOpen(true);
                            // }}
                          />
                          <FaDeleteLeft
                            className="text-xl text-red-600 hover:text-red-700 cursor-pointer"
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
          </div>
        </InfiniteScroll>
      </div> 
      </div>
      
      {logoutIsActive && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
          <div className="bg-white p-6 w-96 shadow-lg">
            <h2 className="text-lg text-center font-medium mb-4 text-gray-800">
              Are you sure you want to log out?
            </h2>
            <br />
            <div className="flex justify-around space-x-4">
              <button
                onClick={() => setLogoutIsActive(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={logOut}
                className="px-4 py-2 appBackgroundColor"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}


      {deleteConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
          <div className="bg-white p-6 w-96 shadow-lg">
            <h2 className="text-lg text-center font-medium mb-4 text-gray-800">
              Are you sure you want delete the survey?
            </h2>
            <br />
            <div className="flex justify-around space-x-4">
              <button
                onClick={() => setDeleteConfirmation(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={deleteSurvey}
                className="px-4 py-2 bg-red-500 text-white hover:bg-red-600"
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

export default Dashboard;