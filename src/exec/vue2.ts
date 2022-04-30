import { renderContextFile } from "@tiga-cli/tpl-core";
import compileIndex from '../template/vue2/index';
import * as fsExtra from 'fs-extra';

export default function render(options: RenderTemplateOptions) {
  const {
    name,
    path,
    useTypeScript: ts,
  } = options;

  const vueExt = 'vue';

  const TPL_MAP = {
    [`${name}/index.${vueExt}`]: renderContextFile(compileIndex, options),
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
