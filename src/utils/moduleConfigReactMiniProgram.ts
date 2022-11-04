import * as vscode from 'vscode';
import { NO_TEXT, OK_TEXT } from '../constance';
import { mkdir } from '@tiga-cli/utils';
import suffix from './suffix';
import checkValidName from './checkValidName';

const title = 'Create Mini-program page. Press `Esc` to exsit';

// 创建模块的模版
export default async function moduleConfigReactMiniProgram(parmas: any, options: Pick<RenderTemplateOptions, 'type'>): Promise<RenderTemplateOptions> {
  const fPath = parmas?.fsPath;

  const inputNameOpt: vscode.InputBoxOptions = {
    prompt: 'input module(component) name',
    placeHolder: 'module(component) name',
    title
  };
  const name = await vscode.window.showInputBox(inputNameOpt);
  if (!name) {
    return Promise.reject();
  }
  if (!checkValidName(name)) {
    vscode.window.showErrorMessage('Please enter a valid file/component name', {
      modal: true,
      detail: 'try hello / hello.tsx / hello.jsx'
    });
    return Promise.reject();
  }

  // just create a jsx/tsx file
  if (suffix(name, 'tsx', 'jsx')) {
    return Promise.resolve<RenderTemplateOptions>({
      ...options,
      path: fPath,
      name: name,
      useTypeScript: name.split('.').slice(-1).toString() === 'tsx',
      onlyFile: true
    });
  }

  const selectTsOpt: vscode.QuickPickOptions = {
    placeHolder: 'use TypeScript?',
    title
  };
  const useTypeScript = await vscode.window.showQuickPick([
    OK_TEXT,
    NO_TEXT
  ], selectTsOpt);
  if (typeof useTypeScript === 'undefined') {
    return Promise.reject();
  }

  let useCssModules;
  const selectCssModulesOpt: vscode.QuickPickOptions = {
    placeHolder: 'use CSS Modules?',
    title
  };
  useCssModules = await vscode.window.showQuickPick([
    OK_TEXT,
    NO_TEXT
  ], selectCssModulesOpt);
  if (typeof useCssModules === 'undefined') {
    return Promise.reject();
  }

  await mkdir(`${fPath}/${name}`);

  return Promise.resolve<RenderTemplateOptions>({
    ...options,
    path: fPath,
    name: name,
    useTypeScript: useTypeScript === OK_TEXT,
    useCssModules: useCssModules === OK_TEXT
  });
};
