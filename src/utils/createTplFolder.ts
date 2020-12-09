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
    placeHolder: '组件名'
  };
  
  const name = await vscode.window.showInputBox(inputNameOpt);
  if (!name) { return Promise.reject(); }

  await mkdir(fPath, name);

  return Promise.resolve({
    path: fPath,
    name: name,
    ...options
  });
};
