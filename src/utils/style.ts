import { toLowerCaseFirst } from "./string";
import * as vscode from 'vscode';
import { strUpStart } from "@tiga-cli/tpl-core";

export const styleFileName = (name: string): string => {
  const { parameters: { styleName = "" } } = vscode.workspace.getConfiguration('web-template');
  return styleName || toLowerCaseFirst(name);
};

export const styleClassName = (name: string): string => {
  return toLowerCaseFirst(name);
};

export const styleComponentsName = (name: string): string => {
  return strUpStart(name);
};
