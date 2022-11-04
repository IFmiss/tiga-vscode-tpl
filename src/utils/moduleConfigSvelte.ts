import * as vscode from 'vscode';
import { mkdir } from '@tiga-cli/utils';
import suffix from './suffix';
import checkValidName from './checkValidName';

const title = 'Create svelte module/component. Press `Esc` to exsit';

export default async function moduleConfigSvelte(parmas: any, options: Pick<RenderVueTemplateOptions, 'type'>) {
  const fPath = parmas?.fsPath;
  const inputNameOpt: vscode.InputBoxOptions = {
    prompt: 'input module(component) name',
    placeHolder: 'module(component) name',
    title
  };

  const name = await vscode.window.showInputBox(inputNameOpt);
  if (!name) {
    return Promise.reject();
  }
  if (!checkValidName(name)) {
    vscode.window.showErrorMessage('Please enter a valid file/component name', {
      modal: true,
      detail: 'try hello / hello.svelte'
    });
    return Promise.reject();
  }

  // just create a svelte file
  if (suffix(name, 'svelte')) {
    return Promise.resolve<RenderTemplateOptions>({
      ...options,
      path: fPath,
      name: name,
      onlyFile: true
    });
  }

  await mkdir(`${fPath}/${name}`);

  return Promise.resolve<RenderSvelteTemplateOptions>({
    ...options,
    name: name,
    path: fPath
  });
};