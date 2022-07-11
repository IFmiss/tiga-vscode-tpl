import { tpl as tplExp } from '@tiga-cli/tpl-core';
import { styleClassName, styleComponentsName } from "../../utils/style";

export default function compileStyle(options: RenderTemplateOptions): string {
  const { name, cssInJs } = options;

  const css = `
    .${styleClassName(name)} {
      position: relative;
    }
  `;

  const styledCss = `
    import styled from 'styled-components'

    export const Styled${styleComponentsName(name)} = styled.div\`
      position: 'relative';
    \`;
  `;

  return tplExp(cssInJs ? styledCss : css);
}
