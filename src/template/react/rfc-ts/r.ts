import * as vscode from 'vscode';
import {
  createFolder,
  renderContextFile
} from '../../render';

export default function runR (options: RenderTemplateOptions) {
  const {
    name,
    path
  } = options;

  const res = renderContextFile({
    name: 'H'
  });

  createFolder(`${path}/${name}`);
  vscode.window.showInformationMessage(res);
  console.info(res);
}
