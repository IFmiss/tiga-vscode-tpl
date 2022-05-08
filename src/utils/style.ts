import { toLowerCaseFirst } from "./string";

export const styleName = (name: string): string => {
  return toLowerCaseFirst(name);
};
