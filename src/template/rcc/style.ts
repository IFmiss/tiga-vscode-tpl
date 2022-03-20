import { tpl as tplExp } from '@tiga-cli/tpl-core';

export default function compileStyle(options: RenderTemplateOptions): string {
  const { name } = options;
  const tpl = `
    .${name.toLocaleLowerCase()} {
      position: relative;
    }
  `;
  return tplExp(tpl);
}
