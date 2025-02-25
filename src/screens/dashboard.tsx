import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { BsStack } from "react-icons/bs";
import { LiaRouteSolid } from "react-icons/lia";
import { LuLogOut } from "react-icons/lu";

import { MdOutlineCreateNewFolder } from "react-icons/md";

import { client } from "../constants/urlPath";

import { localStorageItems } from "../constants/localStorageDataDictionary";

export default function Dashboard() {
  const navigate = useNavigate();

  // LOGOUT

  const [logoutIsActive, setLogoutIsActive] = useState<boolean>(false);

  const logOut = () => {
    localStorage.setItem(localStorageItems.token, "");
    navigate(client.signIn, { replace: true });
  };

  return (
    <div>
      <div className="min-h-screen creamBackground relative">
        <div className="p-2 h-1/6 flex items-end">
          <h1 className="mainFont">
            <span className="me-1 text-4xl">Dashboard</span>
          </h1>
        </div>

        <div className="px-2 pt-0.5">
          <div className="mt-2 pt-2.5 rounded-md border bg-white flex justify-around overflow-visible">
            <div>
              <div className="w-20 h-20 p-2">
                <div
                  className="w-full h-full iconSectionBlue border shadow-sm flex justify-center items-center rounded-lg"
                  onClick={() => navigate(client.surveyCreation)}
                >
                  <MdOutlineCreateNewFolder className="text-4xl" />
                </div>
              </div>
              <div className="text-center">
                <h6 className="font-medium text-lg">Surveys</h6>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-1.5 w-full text-center">
                <span className="blink bg-red-500 text-white rounded-lg text-sm px-1.5 py-0.5">
                  New
                </span>
              </div>
              <div className="w-20 h-20 p-2">
                <div
                  className="w-full h-full iconSectionYellow border shadow-sm flex justify-center items-center rounded-lg"
                  // onClick={() => navigate(client.route)}
                >
                  <LiaRouteSolid className="text-4xl" />
                </div>
              </div>
              <div className="text-center">
                <h6 className="font-medium text-lg">
                  Routes <br /> Info
                </h6>
              </div>
            </div>

            <div>
              <div className="w-20 h-20 p-2">
                <div
                  className="w-full h-full iconSectionBlue border shadow-sm flex justify-center items-center rounded-lg"
                  onClick={() => setLogoutIsActive(true)}
                >
                  <LuLogOut className="text-4xl" />
                </div>
              </div>
              <div className="text-center">
                <h6 className="font-medium text-lg">Log Out</h6>
              </div>
            </div>
            <div>
              <div className="w-20 h-20 p-2">
                <div
                  className="w-full h-full iconSectionBlue border shadow-sm flex justify-center items-center rounded-lg"
                  //   onClick={handleReset}
                >
                  <BsStack className="text-4xl" />
                </div>
              </div>
              <div className="text-center">
                <h6 className="font-medium text-lg">See All</h6>
              </div>
            </div>
          </div>
        </div>
        {/* Operations END */}
      </div>

      {logoutIsActive && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-lg text-center font-medium mb-4 text-gray-800">
              Are you sure you want to log out?
            </h2>
            <br />
            <div className="flex justify-around space-x-4">
              <button
                onClick={() => setLogoutIsActive(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={logOut}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
