import * as vscode from 'vscode';
import mkdir from './mkdir';
import * as fsExtra from 'fs-extra';
import getTplPath from './getTplPath';

export default async function createTplFolder(parmas: any, type: TemplateType) {
  const fPath = parmas?.fsPath;

  if (!fPath) {
    vscode.window.showInformationMessage('请在资源列表中新建Tpl模版');
    return;
  }

  const options: vscode.InputBoxOptions = {
    prompt: '请输入组件名称',
    placeHolder: '组件名'
  };
  
  const name = await vscode.window.showInputBox(options);
  if (!name) { return; }

  await mkdir(fPath, name);

  const tplPath = getTplPath(type);
  console.log('tplPath', tplPath);
  const res = fsExtra.readdirSync(tplPath);

  console.log('res', res);
};
