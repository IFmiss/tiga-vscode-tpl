import * as fs from 'fs-extra';
import * as vscode from 'vscode';


export default async function createFolder(path: string, name: string) {
  try {
    await fs.mkdirSync(`${path}/${name}`);
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
