import * as vscode from 'vscode';
import mkdir from './mkdir';
import * as fsExtra from 'fs-extra';
import getTplPath from './getTplPath';

export default async function createTplFolder(parmas: any, options: Omit<RenderTemplateOptions, 'name' | 'path'>): Promise<RenderTemplateOptions> {
  const fPath = parmas?.fsPath;

  if (!fPath) {
    vscode.window.showInformationMessage('请在资源列表中新建Tpl模版');
    return Promise.reject();
  }

  const inputNameOpt: vscode.InputBoxOptions = {
    prompt: '请输入组件名称',
    placeHolder: '组件名',
  };
  const name = await vscode.window.showInputBox(inputNameOpt);
  if (!name) { return Promise.reject(); }

  const selectTsOpt: vscode.QuickPickOptions = {
    placeHolder: '请选择语言类型',
  };
  const useTypeScript = await vscode.window.showQuickPick([
    'ts',
    'js'
  ], selectTsOpt);

  const selecStyleOpt: vscode.QuickPickOptions = {
    placeHolder: '请选style样式',
  };
  const style = await vscode.window.showQuickPick([
    'less',
    'css',
    'scss'
  ], selecStyleOpt);

  const selectCssModulesOpt: vscode.QuickPickOptions = {
    placeHolder: '是否使用 CSS Modules',
  };
  const cssModules = await vscode.window.showQuickPick([
    '👌',
    '👎'
  ], selectCssModulesOpt);

  await mkdir(fPath, name);

  return Promise.resolve({
    ...options,
    path: fPath,
    name: name,
    useTypeScript: useTypeScript === 'ts',
    style: style as any,
    cssModules: cssModules === '👌'
  });
};
