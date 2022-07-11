import { renderContextFile } from "@tiga-cli/tpl-core";
import compileRccIndex from '../template/react/index.rcc';
import compileRccStyledIndex from '../template/react/index.rcc.styled';
import compileFccIndex from '../template/react/index';
import compileFccStyledIndex from '../template/react/index.styled';
import compileStyle from '../template/react/style';
import * as fsExtra from 'fs-extra';
import { styleFileName } from "../utils/style";

export default function render(options: RenderTemplateOptions) {
  const {
    name,
    path,
    useTypeScript: ts,
    style,
    type,
    cssInJs
  } = options;

  const reactExt = ts ? 'tsx' : 'jsx';
  const styleExt = style;
  const scriptExt = ts ? 'ts' : 'js';
  let TPL_MAP;

  if (type === 'rcc') {
    if (cssInJs) {
      TPL_MAP = {
        [`${name}/index.${reactExt}`]: renderContextFile(compileRccStyledIndex, options),
        [`${name}/${styleFileName(name)}.${scriptExt}`]: renderContextFile(compileStyle, options),
      };
    } else {
      TPL_MAP = {
        [`${name}/index.${reactExt}`]: renderContextFile(compileRccIndex, options),
        [`${name}/${styleFileName(name)}.${styleExt}`]: renderContextFile(compileStyle, options),
      };
    }
  } else {
    if (cssInJs) {
      TPL_MAP = {
        [`${name}/index.${reactExt}`]: renderContextFile(compileFccStyledIndex, options),
        [`${name}/${styleFileName(name)}.${scriptExt}`]: renderContextFile(compileStyle, options),
      };
    } else {
      TPL_MAP = {
        [`${name}/index.${reactExt}`]: renderContextFile(compileFccIndex, options),
        [`${name}/${styleFileName(name)}.${styleExt}`]: renderContextFile(compileStyle, options),
      };
    }
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
