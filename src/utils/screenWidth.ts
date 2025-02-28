export const getScreenWidth = (): number => {
  return window.innerWidth;
};
export const isMoreScreenWidth = (): number => {
  return window.innerWidth;
};


export const shouldDisplayCheckboxesInColumn = (labels: string[]): boolean => {
  const screenWidth: number = window.innerWidth;
  const totalStringLength: number = labels.reduce((sum, label) => sum + label.length, 0);
  const threshold: number = screenWidth / 11;

  return totalStringLength > threshold;
};
