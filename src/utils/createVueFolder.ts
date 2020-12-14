import * as vscode from 'vscode';
import { NO_TEXT, OK_TEXT } from '../constance';
import mkdir from './mkdir';

// 创建模块的模版 
export default async function createTplFolder(parmas: any, options: Pick<RenderVueTemplateOptions, 'type'>): Promise<RenderVueTemplateOptions> {
  const fPath = parmas?.fsPath;

  const inputNameOpt: vscode.InputBoxOptions = {
    prompt: '请输入模块名称',
    placeHolder: '模块名',
  };
  const name = await vscode.window.showInputBox(inputNameOpt);
  if (!name) { return Promise.reject(); }

  const selectTsOpt: vscode.QuickPickOptions = {
    placeHolder: '是否使用 TypeScript',
  };
  const useTypeScript = await vscode.window.showQuickPick([
    OK_TEXT,
    NO_TEXT
  ], selectTsOpt);

  const selecStyleOpt: vscode.QuickPickOptions = {
    placeHolder: '请选style样式'
  };
  const style = await vscode.window.showQuickPick([
    'less',
    'css',
    'scss'
  ], selecStyleOpt);

  const importStyleTypeOpt: vscode.QuickPickOptions = {
    placeHolder: 'style 引入类型',
  };
  const importStyleType = await vscode.window.showQuickPick([
    'scoped',
    'css-module',
    'none'
  ], importStyleTypeOpt) as ImportStyleType;

  await mkdir(fPath, name);

  return Promise.resolve<RenderVueTemplateOptions>({
    ...options,
    path: fPath,
    name: name,
    useTypeScript: useTypeScript === OK_TEXT,
    style: style as TplStyleType,
    importStyleType
  });
};
