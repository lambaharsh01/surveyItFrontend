import { localStorageResponse } from "../models/utilityInterface";
import { localStorageItems } from "../constants/localStorageDataDictionary";
import errorMessage from "./errorMessage";

export const setToken = async (
  parameter: string
): Promise<localStorageResponse> => {
  try {
    localStorage.setItem(localStorageItems.token, parameter);
    return { success: true };
  } catch (error) {
    throw new Error(errorMessage(error));
  }
};
