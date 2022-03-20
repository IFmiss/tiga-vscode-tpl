import renderContextFile from "../utils/renderContextFile";
import compileIndex from '../template/vue2/index';
import * as fsExtra from 'fs-extra';

export default function renderRFC(options: RenderTemplateOptions) {
  const {
    name,
    path,
    useTypeScript: ts,
  } = options;
  console.info(options);

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
