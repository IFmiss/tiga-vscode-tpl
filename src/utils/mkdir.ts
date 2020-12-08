import * as fsExtra from 'fs-extra';
import * as vscode from 'vscode';


export default async function mkdir(path: string, name: string) {
  try {
    await fsExtra.mkdirSync(`${path}/${name}`);
    return Promise.resolve();
  } catch(e) {
    if (e.errno === -17) {
      vscode.window.showInformationMessage(`文件夹${name}已存在该目录`);
    } else {
      vscode.window.showInformationMessage(JSON.stringify(e));
    }
    return Promise.reject();
  };
}
