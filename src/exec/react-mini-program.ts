import { renderContextFile } from "@tiga-cli/tpl-core";
import compileIndex from '../template/react-mini-program/index';
import compileClassIndex from '../template/react-mini-program/index.class';
import compileStyle from '../template/rfc/style';
import compileConfig from '../template/react-mini-program/config';

import * as fsExtra from 'fs-extra';

export default function render(options: RenderTemplateOptions & {
  classComponent?: boolean
}) {
  const {
    name,
    path,
    useTypeScript: ts,
    classComponent
  } = options;

  const reactExt = ts ? 'tsx' : 'jsx';
  const scriptExt = ts ? 'ts' : 'js';

  const TPL_MAP = {
    [`${name}/index.${reactExt}`]: renderContextFile(classComponent ? compileClassIndex :  compileIndex, options),
    [`${name}/index.config.${scriptExt}`]: renderContextFile(compileConfig, options),
    [`${name}/index.scss`]: renderContextFile(compileStyle, options),
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
