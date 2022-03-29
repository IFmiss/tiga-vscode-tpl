import * as vscode from 'vscode';
import { mkdir } from '@tiga-cli/utils';

export default async function moduleConfigSvelte(parmas: any, options: Pick<RenderVueTemplateOptions, 'type'>) {
  const fPath = parmas?.fsPath;
  const inputNameOpt: vscode.InputBoxOptions = {
    prompt: 'input module(component) name',
    placeHolder: 'module(component) name',
  };

  const name = await vscode.window.showInputBox(inputNameOpt);
  if (!name) { return Promise.reject(); }

  await mkdir(`${fPath}/${name}`);

  return Promise.resolve<RenderSvelteTemplateOptions>({
    ...options,
    name: name,
    path: fPath
  });
};