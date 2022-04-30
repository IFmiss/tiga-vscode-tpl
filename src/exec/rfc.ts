import { renderContextFile } from "@tiga-cli/tpl-core";
import compileIndex from '../template/rfc/index';
import compileStyle from '../template/rfc/style';
import * as fsExtra from 'fs-extra';
import { toLowerCaseFirst } from "../utils/string";

export default function render(options: RenderTemplateOptions) {
  const {
    name,
    path,
    useTypeScript: ts,
    style
  } = options;

  const reactExt = ts ? 'tsx' : 'jsx';
  const styleExt = style;

  const TPL_MAP = {
    [`${name}/index.${reactExt}`]: renderContextFile(compileIndex, options),
    [`${name}/${toLowerCaseFirst(name)}.${styleExt}`]: renderContextFile(compileStyle, options),
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
