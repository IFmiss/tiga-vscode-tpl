import { tpl as tplExp, strUpStart } from '@tiga-cli/tpl-core';
import { styleComponentsName, styleFileName as sFileName } from '../../utils/style';
import * as vscode from 'vscode';

export default function compileIndex(options: RenderTemplateOptions): string {
  const {
    name,
    useTypeScript
  } = options;

  const styleFileName = sFileName(name);
  const upStartName = strUpStart(name);
  const styledComponentsName = styleComponentsName(name);
  const { parameters: { displayReactPropType } } = vscode.workspace.getConfiguration('web-template');

  const tpl = `
    import React, { memo } from 'react';
    import { Styled${name} } from './${styleFileName}';
    ${displayReactPropType ? `// import PropTypes from 'prop-types';` : '--rm-row--'}

    ${useTypeScript ? `export interface ${upStartName}Props {}\n` : `--rm-row--`}
    const ${upStartName}${useTypeScript ? `: React.FC<${upStartName}Props>` : ''} = () => {
      return (
        <Styled${styledComponentsName}>this is ${upStartName}</Styled${styledComponentsName}>
      );
    };

    ${tplExp(
      displayReactPropType ? `
        //${upStartName}.propTypes = {
        //	props: PropTypes.string
        //};
      ` : '--rm-row--',
    )}
    export default memo(${upStartName});
  `;
  return tplExp(tpl);
}
