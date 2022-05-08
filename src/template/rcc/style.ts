import { tpl as tplExp } from '@tiga-cli/tpl-core';
import { styleName } from '../../utils/style';

export default function compileStyle(options: RenderTemplateOptions): string {
  const { name } = options;
  const tpl = `
    .${styleName(name)} {
      position: relative;
    }
  `;
  return tplExp(tpl);
}
