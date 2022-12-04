import { tpl as tplExp } from '@tiga-cli/tpl-core';
import { styleClassName } from "../../utils/name";

export default function compileStyle(options: RenderTemplateOptions): string {
  const { name } = options;
  const tpl = `
    .${styleClassName(name)} {
      position: relative;
    }
  `;
  return tplExp(tpl);
}
