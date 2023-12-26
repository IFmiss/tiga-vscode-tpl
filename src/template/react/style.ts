import { tpl as tplExp } from '@tiga-cli/tpl-core';
import { styleClassName, componentName } from "../../utils/name";

export default function compileStyle(options: RenderTemplateOptions): string {
  const { name, cssInJs, cssInJsType } = options;

  const cssInJsPackageName = cssInJsType ?? 'styled-components';
  const isMui = cssInJsPackageName === '@mui/material';

  const css = `
    .${styleClassName(name)} {
      position: relative;
    }
  `;

  const styledCss = `
    import styled from '${cssInJsPackageName}'
    ${isMui ? `import { Box } from '@mui/system';` : '--rm-row--'}
    ${isMui ? `import type { Theme } from '@mui/material/styles';` : '--rm-row--'}

    export const Styled${componentName(name)} = ${!isMui ? 'styled.div' : 'styled(Box)<{ theme?: Theme }>'}\`
      position: relative;
    \`;
  `;

  return tplExp(cssInJs ? styledCss : css);
}
