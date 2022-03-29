import { tpl as tplExp } from '@tiga-cli/tpl-core';

export default function compileIndex(options: RenderTemplateOptions): string {
  const tpl = `
    export default {
      navigationBarTitleText: '',
    };
  `;
  return tplExp(tpl);
}
