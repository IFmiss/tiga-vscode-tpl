import * as vscode from 'vscode';
import compileCode from './../rfc-ts/index';
import mkdir from './../../../utils/mkdir';
import renderContextFile from './../../../utils/renderContextFile';

export default async function runR (options: RenderTemplateOptions) {
  const {
    name,
    path
  } = options;

  mkdir(path, name);

  const res = renderContextFile(compileCode, {
    name
  });

  vscode.window.showInformationMessage(res);
  console.info(res);
};
