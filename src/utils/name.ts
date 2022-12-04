import { toLowerCaseFirst, toUpperCaseFirst } from "./string";
import * as vscode from 'vscode';

/**
 * format name for component
 * @param name name
 */
export const formatName = (name: string, up: boolean = true): string => {
  return name.split('-')?.map(item => {
    return up ? toUpperCaseFirst(item) : toLowerCaseFirst(item);
  }).join('');
};

export const styleFileName = (name: string): string => {
  const { parameters: { styleName = "" } } = vscode.workspace.getConfiguration('web-template');
  return styleName || toLowerCaseFirst(name);
};

export const cssInJsFileName = (name: string): string => {
  const { parameters: { cssInJsFileName = "" } } = vscode.workspace.getConfiguration('web-template');
  return cssInJsFileName || toLowerCaseFirst(name);
};

export const styleClassName = (name: string): string => {
  return toLowerCaseFirst(formatName(name));
};

export const componentName = (name: string): string => {
  return formatName(name);
};

export const componentFolderName = (name: string): string => {
  return name;
};
