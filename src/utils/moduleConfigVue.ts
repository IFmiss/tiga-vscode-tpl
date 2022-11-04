import * as vscode from 'vscode';
import { NO_TEXT, OK_TEXT } from '../constance';
import { mkdir } from '@tiga-cli/utils';
import suffix from './suffix';
import checkValidName from './checkValidName';

const title = 'Create svelte page/module/component. Press `Esc` to exsit';

// 创建模块的模版
export default async function moduleConfigVue(parmas: any, options: Pick<RenderVueTemplateOptions, 'type'>): Promise<RenderVueTemplateOptions> {
  const fPath = parmas?.fsPath;

  const inputNameOpt: vscode.InputBoxOptions = {
    prompt: 'input module(component) name',
    placeHolder: 'module(component) name',
    title,
  };
  const name = await vscode.window.showInputBox(inputNameOpt);
  if (!name) {
    return Promise.reject();
  }
  if (!checkValidName(name)) {
    vscode.window.showErrorMessage('Please enter a valid file/component name', {
      modal: true,
      detail: 'try hello / hello.vue'
    });
    return Promise.reject();
  }

  // just create a vue file
  if (suffix(name, 'vue')) {
    return Promise.resolve<RenderVueTemplateOptions>({
      ...options,
      path: fPath,
      name: name,
      onlyFile: true,
      importStyleType: 'none'
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

  const selecStyleOpt: vscode.QuickPickOptions = {
    placeHolder: 'select style type',
    title
  };
  const style = await vscode.window.showQuickPick([
    'scss',
    'less',
    'css'
  ], selecStyleOpt);

  if (typeof style === 'undefined') {
    return Promise.reject();
  }

  const importStyleTypeOpt: vscode.QuickPickOptions = {
    placeHolder: 'use CSS Modules?',
    title
  };
  const importStyleType = await vscode.window.showQuickPick([
    'scoped',
    'css-module',
    'none'
  ], importStyleTypeOpt) as ImportStyleType;

  if (typeof importStyleType === 'undefined') {
    return Promise.reject();
  }

  await mkdir(`${fPath}/${name}`);

  return Promise.resolve<RenderVueTemplateOptions>({
    ...options,
    path: fPath,
    name: name,
    useTypeScript: useTypeScript === OK_TEXT,
    style: style as TplStyleType,
    importStyleType
  });
};
