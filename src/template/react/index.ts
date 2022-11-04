import { tpl as tplExp, strUpStart } from '@tiga-cli/tpl-core';
import { styleClassName, styleFileName as sFileName } from '../../utils/style';
import * as vscode from 'vscode';

export default function compileFccIndex(options: RenderTemplateOptions): string {
  const {
    name,
    style: styleExt,
    useCssModules,
    useTypeScript
  } = options;

  const styleFileName = sFileName(name);
  const className = styleClassName(name);
  const upStartName = strUpStart(name);
  const { parameters: { displayReactPropType } } = vscode.workspace.getConfiguration('web-template');

  const tpl = `
    import React, { memo } from 'react';
    ${useCssModules ? `import styles from './${styleFileName}.${styleExt}';` : `import './${styleFileName}.${styleExt}';`}
    ${displayReactPropType ? `// import PropTypes from 'prop-types';` : '--rm-row--'}

    ${useTypeScript ? `export interface ${upStartName}Props {}\n` : `--rm-row--`}
    const ${upStartName}${useTypeScript ? `: React.FC<${upStartName}Props>` : ''} = () => {
      return (
        <div className=${useCssModules ? `{styles.${className}}` : `'${className}'`}>this is ${upStartName}</div>
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
