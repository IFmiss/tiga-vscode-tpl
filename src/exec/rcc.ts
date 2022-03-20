import renderContextFile from "../utils/renderContextFile";
import compileIndex from '../template/rcc/index';
import compileStyle from '../template/rcc/style';
import * as fsExtra from 'fs-extra';

export default function renderRCC(options: RenderTemplateOptions) {
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
    [`${name}/${name.toLocaleLowerCase()}.${styleExt}`]: renderContextFile(compileStyle, options),
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
