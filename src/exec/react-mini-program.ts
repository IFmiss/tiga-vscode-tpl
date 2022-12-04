import { renderContextFile, strUpStart } from "@tiga-cli/tpl-core";
import compileIndex from '../template/react-mini-program/index';
import compileClassIndex from '../template/react-mini-program/index.class';
import compileStyle from '../template/react-mini-program/style';
import compileConfig from '../template/react-mini-program/config';

import * as fsExtra from 'fs-extra';
import compileRccFileIndex from "../template/react-mini-program/index.class.file";
import compileFileIndex from "../template/react-mini-program/index.file";

export default function render(options: RenderTemplateOptions & {
  classComponent?: boolean
}) {
  const {
    name,
    path,
    onlyFile,
    useTypeScript: ts,
    classComponent
  } = options;

  const reactExt = ts ? 'tsx' : 'jsx';
  const scriptExt = ts ? 'ts' : 'js';

  let TPL_MAP = {
    [`${name}/index.${reactExt}`]: renderContextFile(classComponent ? compileClassIndex : compileIndex, options),
    [`${name}/index.config.${scriptExt}`]: renderContextFile(compileConfig, options),
    [`${name}/index.scss`]: renderContextFile(compileStyle, options),
  };

  if (onlyFile) {
    // just create tsx/jsx file
    TPL_MAP = {
      [name]: renderContextFile(classComponent ? compileRccFileIndex : compileFileIndex, {
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
