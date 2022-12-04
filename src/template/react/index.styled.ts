import { tpl as tplExp } from '@tiga-cli/tpl-core';
import { componentName, cssInJsFileName } from '../../utils/name';
import * as vscode from 'vscode';

export default function compileFccStyledIndex(options: RenderTemplateOptions): string {
  const {
    name,
    useTypeScript
  } = options;

  const styleFileName = cssInJsFileName(name);
  const upStartName = componentName(name);
  const styledComponentsName = componentName(name);
  const { parameters: { displayReactPropType } } = vscode.workspace.getConfiguration('web-template');

  const tpl = `
    import React, { memo } from 'react';
    import { Styled${styledComponentsName} } from './${styleFileName}';
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
