import { localStorageItems } from "../constants/localStorageDataDictionary";

export const getToken = (): string | null => {
  return localStorage.getItem(localStorageItems.token);
};


