import * as vscode from 'vscode';
import { NO_TEXT, OK_TEXT } from '../constance';
import { mkdir } from '@tiga-cli/utils';

// 创建模块的模版
export default async function moduleConfigReactMiniProgram(parmas: any, options: Pick<RenderTemplateOptions, 'type'>): Promise<RenderTemplateOptions> {
  const fPath = parmas?.fsPath;

  const inputNameOpt: vscode.InputBoxOptions = {
    prompt: 'input module(component) name',
    placeHolder: 'module(component) name',
  };
  const name = await vscode.window.showInputBox(inputNameOpt);
  if (!name) { return Promise.reject(); }

  const selectTsOpt: vscode.QuickPickOptions = {
    placeHolder: 'use TypeScript?',
  };
  const useTypeScript = await vscode.window.showQuickPick([
    OK_TEXT,
    NO_TEXT
  ], selectTsOpt);

  await mkdir(`${fPath}/${name}`);

  return Promise.resolve<RenderTemplateOptions>({
    ...options,
    path: fPath,
    name: name,
    useTypeScript: useTypeScript === OK_TEXT
  });
};
