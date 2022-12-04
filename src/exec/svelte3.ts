import { renderContextFile, strUpStart } from "@tiga-cli/tpl-core";
import compileIndex from '../template/svelte3/index';
import * as fsExtra from 'fs-extra';

export default function render(options: RenderTemplateOptions) {
  const {
    name,
    path,
    onlyFile,
  } = options;

  const ext = 'svelte';

  let TPL_MAP = {
    [`${name}/index.${ext}`]: renderContextFile(compileIndex, options),
  };

  if (onlyFile) {
    // just create svelte file
    TPL_MAP = {
      [name]: renderContextFile(compileIndex, {
        ...options,
        name: name.split('.')[0]
      }),
    };
  }

  for (let [k, v] of Object.entries(TPL_MAP)) {
    try {
      fsExtra.writeFileSync(`${path}/${k}`, v);
    } catch (e) {
      console.error(e);
      fsExtra.rmdir(path);
    }
  }
};
