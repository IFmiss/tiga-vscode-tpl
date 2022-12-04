import { tpl as tplExp } from '@tiga-cli/tpl-core';
import { styleClassName, componentName } from "../../utils/name";

export default function compileStyle(options: RenderTemplateOptions): string {
  const { name, cssInJs, cssInJsType } = options;

  const cssInJsPackageName = cssInJsType ?? 'styled-components';

  const css = `
    .${styleClassName(name)} {
      position: relative;
    }
  `;

  const styledCss = `
    import styled from '${cssInJsPackageName}'

    export const Styled${componentName(name)} = styled.div\`
      position: 'relative';
    \`;
  `;

  return tplExp(cssInJs ? styledCss : css);
}
