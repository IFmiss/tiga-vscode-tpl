export const toLowerCaseFirst = (str: string): string => {
  return str.slice(0, 1).toLocaleLowerCase().concat(str.slice(1));
};

export const toUpperCaseFirst = (str: string): string => {
  return str.slice(0, 1).toLocaleUpperCase().concat(str.slice(1));
};
