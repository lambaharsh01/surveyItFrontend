import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { flushSync } from "react-dom";
import { MdAddToPhotos } from "react-icons/md";

import { IoMdInformationCircle } from "react-icons/io";

import { FiEdit3 } from "react-icons/fi";
import { FaDeleteLeft } from "react-icons/fa6";

import DropdownSearch from "../../components/dropdownSearch";
import QuestionSection from "../../components/questionSection";
import Switch from "../../components/switch";

import { toast } from "react-toastify";
import { server } from "../../constants/urlPath";

import convertArrayIntoSearchStream from "../../utils/convertArrayIntoSearchStream";
import axiosInterceptor from "../../utils/axiosInterceptor";

import {
  QuestionTypeStructure,
  FileTypeStructure,
  QuestionStructure,
  surveyDetailsStructure,
  updateQuestionaryPayloadStructure,
} from "../../models/surveyInterface";
import { optionsKeywords, validationKeywords } from "../../constants/survey";

const QuestionaryCreation: React.FC = () => {
  const [showInfo, setShowInfo] = useState<boolean>(true);
  const { surveyCode } = useParams();

  const emptyQuestionStructure: QuestionStructure = {
    text: "",
    questionTypeId: 0,
    questionType: "",
    fileTypeId: null,
    fileType: "",
    options: [],
    required: true,
    validation: false,
    min: 0,
    max: 0,
  };

  const [survey, setSurvey] = useState<surveyDetailsStructure | null>(null);
  const [questions, setQuestions] = useState<QuestionStructure[]>([]);
  const [question, setQuestion] = useState<QuestionStructure>(
    structuredClone(emptyQuestionStructure)
  );
  const [disabled, setDisabled] = useState<boolean>(false);

  const [questionTypes, setQuestionTypes] = useState<QuestionTypeStructure[]>(
    []
  );
  const [selectedQuestionType, setSelectedQuestionType] =
    useState<QuestionTypeStructure | null>(null);

  const [fileTypes, setFileTypes] = useState<FileTypeStructure[]>([]);
  const [selectedFileType, setSelectedFileType] =
    useState<FileTypeStructure | null>(null);

  const [renderDropdown, setRenderDropdown] = useState<number>(0);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [actionIndex, setActionIndex] = useState<number>(-1);
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [deletedQuestionIds, setDeletedQuestionIds] = useState<number[]>([]);

  useEffect(() => {
    setTimeout(() => setShowInfo(false), 5000);

    axiosInterceptor({
      method: server.getSurveyAndQuestionary.method,
      url: server.getSurveyAndQuestionary.url + `/${surveyCode}`,
    })
      .then((res) => {
        setSurvey(res?.survey ?? null);
        setQuestions(res?.questionary ?? []);
      })
      .catch((err) => {
        toast.error(err.message);
      });

    axiosInterceptor({
      method: server.getQuestionTypes.method,
      url: server.getQuestionTypes.url,
    })
      .then((res) => {
        setQuestionTypes(res?.questionType ?? []);
      })
      .catch((err) => {
        toast.error(err.message);
      });

    axiosInterceptor({
      method: server.getFileTypes.method,
      url: server.getFileTypes.url,
    })
      .then((res) => {
        setFileTypes(res?.fileType ?? []);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, []);

  const handleSidebarClosure = (): void => {
    setSelectedQuestionType(null);
    setSelectedFileType(null);
    setQuestion(structuredClone(emptyQuestionStructure));
    setSidebarOpen(false);
    setActionIndex(-1);
    setRenderDropdown((prev) => prev + 1);
  };

  const handleQuestionRequiredChange = (checked: boolean): void => {
    setQuestion((prev) => {
      return { ...prev, required: checked };
    });
  };

  const handleQuestionTextChange = (
    e: ChangeEvent<HTMLTextAreaElement>
  ): void => {
    const questionText = e.currentTarget.value;
    setQuestion((prev) => {
      return { ...prev, text: questionText };
    });
  };

  const handleQuestionTypeSelection = (selected: {
    label: string;
    value: QuestionTypeStructure;
  }) => {
    setSelectedQuestionType(selected.value);
    setQuestion((prev) => {
      const { id, questionType } = selected.value;
      return { ...prev, questionTypeId: id, questionType: questionType };
    });
  };

  const handleFileTypeSelection = (selected: {
    label: string;
    value: FileTypeStructure;
  }) => {
    setSelectedFileType(selected.value);
    setQuestion((prev) => {
      const { id, fileType } = selected.value;
      return { ...prev, fileTypeId: id, fileType: fileType };
    });
  };

  const handleAddOption = (): void => {
    setQuestion((prev) => {
      return { ...prev, options: [...prev.options, ""] };
    });
  };

  const handleAddOptionChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    var inputText = e.currentTarget.value;
    setQuestion((prev) => {
      prev.options[index] = inputText;
      return { ...prev };
    });
  };

  const handleQuestionValidationChange = (checked: boolean): void => {
    setQuestion((prev) => {
      console.log(typeof checked);
      return { ...prev, validation: checked };
    });
  };

  const handleAddMinValueChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const input: string = e.currentTarget.value;
    setQuestion((prev) => {
      return { ...prev, min: Number(input) };
    });
  };

  const handleAddMaxValueChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const input: string = e.currentTarget.value;
    setQuestion((prev) => {
      return { ...prev, max: Number(input) };
    });
  };

  const handleRemoveOptionChange = (index: number): void => {
    setQuestion((prev) => {
      prev.options.splice(index, 1);
      return { ...prev };
    });
  };

  const validateQuestionSave = (): void => {
    if (question.text.trim().length < 3) {
      toast.warning("make sure to add more than 3 characters to the question");
      return;
    }

    if (!selectedQuestionType) {
      toast.warning("make sure select the question type");
      return;
    }

    if (
      selectedQuestionType?.questionType === "file" &&
      !selectedFileType?.fileType
    ) {
      toast.warning("make sure select the file type");
      return;
    }

    if (optionsKeywords.includes(selectedQuestionType?.questionType ?? "")) {
      if (!question?.options.length) {
        toast.warning("make sure you add the options to select");
        return;
      }

      const emptyOptions = question?.options.filter((elem) =>
        Boolean(!elem.trim())
      );
      if (emptyOptions.length) {
        toast.warning(`${emptyOptions.length} option field require input`);
        return;
      }
    }

    if (question.validation && (question.min === 0 || question.max === 0)) {
      toast.warning("minimum / maximum can not be 0");
      return;
    }

    // CLEANING REDUNDANCY
    flushSync(() => {
      if (selectedQuestionType?.questionType === "file") {
        setQuestion((prev) => {
          return { ...prev, options: [] };
        });
      } else if (
        optionsKeywords.includes(selectedQuestionType?.questionType ?? "")
      ) {
        setQuestion((prev) => {
          return { ...prev, fileTypeId: null };
        });
        setSelectedFileType(null);
      } else {
        setQuestion((prev) => {
          return { ...prev, options: [], fileTypeId: null };
        });
        setSelectedFileType(null);
      }
    });

    setQuestions((prev) => {
      if (actionIndex >= 0) {
        prev[actionIndex] = question;
        return [...prev];
      }
      return [...prev, question];
    });

    setQuestion(structuredClone(emptyQuestionStructure));
    setSelectedQuestionType(null);
    setSelectedFileType(null);
    setRenderDropdown((prev) => prev + 1);
    setSidebarOpen(false);
    setActionIndex(-1);
  };

  const stageQuestionEdit = (
    selectedQuestion: QuestionStructure,
    index: number
  ): void => {
    flushSync(() => {
      setSelectedQuestionType(
        questionTypes.filter(
          (elem) => elem.id === selectedQuestion.questionTypeId
        )?.[0] ?? null
      );
      setSelectedFileType(
        fileTypes.filter(
          (elem) => elem.id === selectedQuestion.fileTypeId
        )?.[0] ?? null
      );
      setQuestion(selectedQuestion);
      setActionIndex(index);
      setSidebarOpen(true);
    });
    setRenderDropdown((prev) => prev + 1);
  };

  useEffect(() => {
    console.log(question);
  }, [question]);

  const stageQuestionDelete = (index: number): void => {
    setActionIndex(index);
    setDeleteConfirmation(true);
  };

  const questionDelete = (): void => {
    setQuestions((prev) => {
      var questionId = prev.splice(actionIndex, 1)?.[0].id ?? 0;
      if (questionId) {
        setDeletedQuestionIds((prevDeleted) => [...prevDeleted, questionId]);
      }
      return [...prev];
    });
    setDeleteConfirmation(false);
  };

  // deleteConfirmation

  const handleQuestionaryFinalSave = (): void => {
    setDisabled(true);

    const updateQuestionaryPayload: updateQuestionaryPayloadStructure = {
      surveyId: survey?.id ?? 0,
      questionary: questions,
      deletedQuestionIds,
    };

    axiosInterceptor({
      method: server.updateQuestionary.method,
      url: server.updateQuestionary.url,
      data: updateQuestionaryPayload,
    })
      .then(() => {
        toast.success("Questionary Saved");
        setDisabled(false);
      })
      .catch((err) => {
        toast.error(err.message);
        setDisabled(false);
      });
  };

  return (
    <div className="min-h-screen creamBackground relative">
      <div className="w-full p-4 max-h-screen overflow-y-auto">
        {showInfo ? (
          <>
            {survey?.active && (
              <div className="alert w-100 alert-warning rounded-0" role="alert">
                Changing the Survey Mid Way Could lead to discrepancies
              </div>
            )}

            <div className="alert w-100 alert-primary rounded-0" role="alert">
              The respondent's email will always be included as a required field
              in the survey form. As the survey creator, you don’t need to
              manually add it—it will automatically be present when respondents
              fill out the form.
            </div>
          </>
        ) : (
          <div className="w-full flex justify-end pb-3">
            <IoMdInformationCircle
              className="text-3xl"
              onClick={() => setShowInfo(true)}
            />
          </div>
        )}

        <div className="w-full flex items-end justify-end">
          <button
            className="appBackgroundColor p-1.5 pb-2 font-medium text-white flex mb-2.5"
            onClick={() => setSidebarOpen(true)}
          >
            <MdAddToPhotos className="mt-1.5 me-1" />
            <span>Add Question</span>
          </button>
        </div>

        <div className="min-h-screen bg-slate-100 p-4">
          <div className="max-w-6xl mx-auto">
            <div className="z-20 w-full">
              <div className="max-w-6xl mx-auto">
                <header className="bg-white shadow p-4 mb-6">
                  <div className="flex flex-col sm:flex-row justify-between items-center">
                    <h1 className="text-xl font-bold appTextColor mb-4 sm:mb-0">
                      {survey?.surveyName ? `${survey.surveyName}` : ""}
                    </h1>
                    <div className="flex space-x-3"></div>
                  </div>
                </header>
              </div>
            </div>

            <div className="bg-white shadow overflow-hidden mb-6">
              <div className="px-4 py-5 sm:px-6">
                <div className="mb-4">
                  <label className="block text-lg font-medium appTextColor">
                    Respondent Email
                    <span className="text-red-500"> *</span>
                  </label>
                  <input
                    type="text"
                    className="mt-2 w-full px-6 py-3 bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white shadow overflow-hidden mb-6">
              <div className="px-4 py-5 sm:px-6">
                <h2 className="text-lg font-medium appTextColor">
                  Survey Questions
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Please answer all required questions.
                </p>
              </div>
              <div className="divide-y divide-gray-200">
                {questions.map((elem, index) => (
                  <QuestionSection
                    key={"question" + index}
                    index={index}
                    text={elem.text}
                    questionType={elem?.questionType || ""}
                    fileType={elem?.fileType || ""}
                    options={elem.options}
                    required={elem.required}
                    onChange={(res: string) => {
                      console.log(res);
                    }}
                    questionAlignment={survey?.surveyAlignment ?? ""}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* <div className="w-100 pt-3 ps-3">
          {questions.map((elem, index) => (
            <>
              <div className="w-full flex justify-end pe-2">
                <FiEdit3 
                  className="text-xl text-blue-500 me-3"
                  onClick={()=>{stageQuestionEdit(elem, index)}}
                />
                <FaDeleteLeft 
                  className="text-xl text-red-500"
                  onClick={()=>{stageQuestionDelete(index)}}
                />
              </div>
              <QuestionSection
                index={index}
                text={elem.text}
                questionType={elem?.questionType || ""}
                fileType={elem?.fileType || ""}
                options={elem.options}
                required={elem.required}
                onChange={(str: string) => {console.log(str)}}
                questionAlignment={survey?.surveyAlignment ?? ""}
              />
            </>
          ))}
        </div> */}
        <div className="h-14" />
      </div>

      <div className="absolute bottom-0 w-full px-4 pb-4 creamBackground">
        {!sidebarOpen && questions.length > 0 && (
          <button
            disabled={disabled}
            className="bg-slate-950 text-white text-lg px-md-12 px-8 py-3 w-full"
            onClick={handleQuestionaryFinalSave}
          >
            {disabled ? (
              <div className="spinner-border spinner-border-sm text-white"></div>
            ) : (
              <span>Save Questionary</span>
            )}
          </button>
        )}
      </div>

      {/* ADD QUESTION */}
      <div
        className={`fixed top-0 right-0 h-full bg-white transition-all duration-300 ease-in-out 
            ${sidebarOpen ? "w-11/12" : "w-0"} z-50 flex flex-col`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 flex-grow overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl ps-2">Add Question</h2>
              <button
                onClick={handleSidebarClosure}
                className="text-4xl font-bold mb-3"
              >
                {" "}
                ×{" "}
              </button>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="mt-1 w-full px-2">
                <div className="flex justify-between">
                  <span className="text-lg font-medium">
                    Question
                    <span className="text-sm">
                      {" "}
                      ({question.required ? "required" : "not required"})
                    </span>
                  </span>

                  <span>
                    <Switch
                      key={"switchFor" + actionIndex}
                      checked={question.required}
                      onChange={handleQuestionRequiredChange}
                    />
                  </span>
                </div>
                <textarea
                  className="px-3 py-3 w-100 border-1 pr-10 bg-slate-100 hover:bg-gray-200"
                  rows={5}
                  placeholder="Enter"
                  value={question.text}
                  onChange={handleQuestionTextChange}
                />
              </div>

              <div className="w-full px-2">
                <span className="text-lg font-medium">
                  Select Question Type
                </span>
                <div>
                  <DropdownSearch
                    key={"questionTypeLabel" + renderDropdown}
                    options={convertArrayIntoSearchStream(
                      questionTypes,
                      "questionTypeLabel"
                    )}
                    placeholder={
                      selectedQuestionType?.questionTypeLabel ||
                      "Select Question Type"
                    }
                    onSelect={handleQuestionTypeSelection}
                  />
                </div>
              </div>

              {/* IF FILE */}
              {selectedQuestionType?.questionType === "file" && (
                <div className="w-full px-2">
                  <span className="text-lg font-medium">Select File Type</span>
                  <div>
                    <DropdownSearch
                      key={"fileTypeLabel" + renderDropdown}
                      options={convertArrayIntoSearchStream(
                        fileTypes,
                        "fileTypeLabel"
                      )}
                      placeholder={
                        selectedFileType?.fileTypeLabel || "Select File Type"
                      }
                      onSelect={handleFileTypeSelection}
                    />
                  </div>
                </div>
              )}

              {/* IF DROPDOWN OR CHECKBOX */}
              {optionsKeywords.includes(
                selectedQuestionType?.questionType ?? ""
              ) && (
                <div className="mt-2 w-full px-2">
                  <button
                    className="appBackgroundColor p-1.5 pb-2 font-medium text-white flex mb-3"
                    onClick={handleAddOption}
                  >
                    <MdAddToPhotos className="mt-1.5 me-1" />
                    <span>Add Options</span>
                  </button>

                  {question.options.map((elem, index) => (
                    <div className="flex" key={"option" + index}>
                      <input
                        type="text"
                        className="px-3 py-2 mb-3 mt-2 w-100 border-1 bg-slate-100 hover:bg-gray-200"
                        placeholder="Enter Option Label"
                        value={elem}
                        onChange={(e) => handleAddOptionChange(e, index)}
                      />
                      <button
                        onClick={() => handleRemoveOptionChange(index)}
                        className="text-4xl font-bold ms-2 -mt-10"
                      >
                        {" "}
                        ×{" "}
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {validationKeywords.includes(
                selectedQuestionType?.questionType ?? ""
              ) && (
                <div className="w-full px-2">
                  <div className="flex justify-between">
                    <span className="text-lg font-medium">
                      Input Validation
                    </span>
                    <Switch
                      checked={question.validation}
                      onChange={handleQuestionValidationChange}
                    />
                  </div>
                </div>
              )}

              {question.validation && (
                <>
                  <div className="w-full flex justify-around">
                    <div className="w-1/2 px-2">
                      <span className="text-lg font-medium">Minimum</span>
                      <div>
                        <input
                          type="number"
                          className="px-3 py-3 mb-3 w-100 border-1 bg-slate-100"
                          placeholder="Enter Option Label"
                          value={question.min}
                          onChange={handleAddMinValueChange}
                        />
                      </div>
                    </div>

                    <div className="w-1/2 px-2">
                      <span className="text-lg font-medium">Maximum</span>
                      <div>
                        <input
                          type="number"
                          className="px-3 py-3 mb-3w-100 border-1 bg-slate-100"
                          placeholder="Enter Option Label"
                          value={question.max}
                          onChange={handleAddMaxValueChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-slate-400 ps-2 -mt-8">
                    {" "}
                    minimum/ maximum refers to the numerical value when number
                    else length of the input text{" "}
                  </div>
                </>
              )}
            </div>
            <div className="h-20"></div>
          </div>

          <div className="w-full px-4 py-3 bg-white shadow-md absolute bottom-0 left-0 right-0">
            <div className="w-full px-2">
              <button
                className="bg-slate-950 text-white text-lg px-md-12 px-8 py-3 w-100"
                onClick={validateQuestionSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

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
                onClick={questionDelete}
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

export default QuestionaryCreation;
