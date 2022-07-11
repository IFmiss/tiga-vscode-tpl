import * as vscode from 'vscode';
import { CSS_IN_JS, NO_TEXT, OK_TEXT } from '../constance';
import { mkdir } from '@tiga-cli/utils';

// 创建模块的模版
export default async function moduleConfigReact(parmas: any, options: Pick<RenderTemplateOptions, 'type'>): Promise<RenderTemplateOptions> {
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

  const selectStyleOpt: vscode.QuickPickOptions = {
    placeHolder: 'select style type'
  };
  const style = await vscode.window.showQuickPick([
    'styled-components',
    'scss',
    'less',
    'css'
  ], selectStyleOpt) as TplStyleType;


  let useCssModules;
  const cssInJs = CSS_IN_JS.includes(style);

  if (!cssInJs) {
    const selectCssModulesOpt: vscode.QuickPickOptions = {
      placeHolder: 'use CSS Modules?',
    };
    useCssModules = await vscode.window.showQuickPick([
      OK_TEXT,
      NO_TEXT
    ], selectCssModulesOpt);
  }

  await mkdir(`${fPath}/${name}`);

  return Promise.resolve<RenderTemplateOptions>({
    ...options,
    path: fPath,
    name: name,
    useTypeScript: useTypeScript === OK_TEXT,
    style: style as TplStyleType,
    useCssModules: useCssModules === OK_TEXT,
    cssInJs
  });
};
