import { objectStructure } from "../models/utilityInterface";

type ReturnValue = { value: objectStructure; label: string };

const convertArrayIntoSearchStream = (
  array: objectStructure[],
  labelValue: string
): ReturnValue[] =>
  array.map((elem: objectStructure) => ({ value: elem, label: elem[labelValue] }));

export default convertArrayIntoSearchStream;