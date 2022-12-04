import { tpl as tplExp } from '@tiga-cli/tpl-core';
import * as vscode from 'vscode';
import { componentName } from '../../utils/name';

export default function compileFileIndex(options: RenderTemplateOptions): string {
  const {
    name,
    useTypeScript
  } = options;

  const upStartName = componentName(name);
  const { parameters: { displayReactPropType } } = vscode.workspace.getConfiguration('web-template');

  const tpl = `
    import React, { memo } from 'react';
    ${displayReactPropType ? `// import PropTypes from 'prop-types';` : '--rm-row--'}

    ${useTypeScript ? `export interface ${upStartName}Props {}\n` : `--rm-row--`}
    const ${upStartName}${useTypeScript ? `: React.FC<${upStartName}Props>` : ''} = () => {
      return (
        <div>this is ${upStartName}</div>
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
