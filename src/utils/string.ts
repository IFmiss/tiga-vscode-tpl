export const toLowerCaseFirst = (str: string): string => {
  return str.slice(0, 1).toLocaleLowerCase().concat(str.slice(1));
};
