import { useState, useEffect } from "react";
import { FiDownload, FiSearch } from "react-icons/fi";
import { MdClear } from "react-icons/md";
import * as XLSX from "xlsx";
import { useParams } from "react-router-dom";
import axiosInterceptor from "../../utils/axiosInterceptor";
import { server } from "../../constants/urlPath";
import { toast } from "react-toastify";
import { GetResponseStructure } from "../../models/surveyInterface";

const ViewSurveyResponses = () => {
  const { surveyCode } = useParams();
  const [responses, setResponses] = useState<GetResponseStructure[]>([]);
  const [filteredResponse, setFilteredResponse] = useState<
    GetResponseStructure[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [emailFilter, setEmailFilter] = useState("");
  const [questionFilter, setQuestionFilter] = useState("");

  useEffect(() => {
    axiosInterceptor({
      method: server.getResponseData.method,
      url: server.getResponseData.url + `/${surveyCode}`,
    })
      .then((res) => {
        setResponses(res?.data ?? []);
        setFilteredResponse(res?.data ?? []);
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [surveyCode]);

  // Filter responses based on email and question filters

  useEffect(() => {
    console.log([
      ...responses.filter((res) =>
        res.respondentEmail.toLowerCase().includes(emailFilter.toLowerCase())
      ),
    ]);
    setFilteredResponse([
      ...responses.filter((res) =>
        res.respondentEmail.toLowerCase().includes(emailFilter.toLowerCase())
      ),
    ]);
  }, [emailFilter]);

  useEffect(() => {
    setFilteredResponse([
      ...responses.filter((elem) =>
        elem.question.toLowerCase().includes(questionFilter.toLowerCase())
      ),
    ]);
  }, [questionFilter]);

  const downloadExcel = () => {
    // Use filtered data for export
    const worksheet = XLSX.utils.json_to_sheet(filteredResponse);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Responses");

    // Generate a filename with the current date
    const fileName = `survey-responses-${
      new Date().toISOString().split("T")[0]
    }.xlsx`;

    // Create and trigger download
    XLSX.writeFile(workbook, fileName);
  };

  const clearFilters = () => {
    setEmailFilter("");
    setQuestionFilter("");
  };

  return (
    <div className="bg-white shadow overflow-hidden mt-6">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium appTextColor">Survey Responses</h2>
          <p className="mt-1 text-sm text-gray-500">
            Detailed responses submitted by respondents.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {(emailFilter || questionFilter) && (
            <button
              onClick={clearFilters}
              className="flex items-center px-3 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-md"
            >
              <MdClear className="mr-1" />
              Clear Filters
            </button>
          )}
          <button
            onClick={downloadExcel}
            className="flex items-center px-4 py-2 bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-md"
          >
            <FiDownload className="mr-2" />
            Export to Excel
          </button>
        </div>
      </div>

      {/* Filter inputs */}
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="emailFilter"
            className="block text-xs font-medium text-gray-500 mb-1"
          >
            Filter by Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              id="emailFilter"
              value={emailFilter}
              onChange={(e) => setEmailFilter(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search by email..."
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="questionFilter"
            className="block text-xs font-medium text-gray-500 mb-1"
          >
            Filter by Question
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              id="questionFilter"
              value={questionFilter}
              onChange={(e) => setQuestionFilter(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search by question content..."
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <div className="w-full text-center p-6">
            <div className="spinner-border spinner-border text-slate-400"></div>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  S.No
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Respondent Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Question
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Response
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Submitted At
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredResponse.length > 0 ? (
                filteredResponse.map((elem, index) => (
                  <tr key={"QuestionResRow" + index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {elem.responseSno}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium appTextColor">
                        {elem.respondentEmail}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">
                        {elem.question}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-700">
                        {elem.response || "No response"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {elem.submittedAt}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    {filteredResponse.length === 0 && "No Data"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ViewSurveyResponses;
