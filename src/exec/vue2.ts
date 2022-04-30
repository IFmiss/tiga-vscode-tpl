import { renderContextFile } from "@tiga-cli/tpl-core";
import * as vscode from 'vscode';
import compileIndex from '../template/vue2/index';
import * as fsExtra from 'fs-extra';

export default function render(options: RenderTemplateOptions) {
  const {
    name,
    path,
    useTypeScript: ts,
  } = options;

  console.info('vscode', vscode.workspace.getConfiguration('web-template'));
  const v = vscode.workspace.getConfiguration('web-template');

  const vueExt = 'vue';

  const TPL_MAP = {
    [`${name}/index${JSON.stringify(v)}.${vueExt}`]: renderContextFile(compileIndex, options),
  };

  for (let [k, v] of Object.entries(TPL_MAP)) {
    try {
      fsExtra.writeFileSync(`${path}/${k}`, v);
    } catch (e) {
      console.error(e);
      fsExtra.rmdir(path);
    }
  }
};
