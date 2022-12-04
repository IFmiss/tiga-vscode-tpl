import { tpl as tplExp } from '@tiga-cli/tpl-core';
import { componentName, cssInJsFileName } from '../../utils/name';
import * as vscode from 'vscode';

export default function compileRccStyledIndex(options: RenderTemplateOptions): string {
  const {
    name,
    useTypeScript
  } = options;

  const styleFileName = cssInJsFileName(name);
  const upStartName = componentName(name);
  const styledComponentsName = componentName(name);
  const { parameters: { displayReactPropType } } = vscode.workspace.getConfiguration('web-template');

  const tpl = `
    import React from 'react';
    import { Styled${styledComponentsName} } from './${styleFileName}';
    ${displayReactPropType ? `// import PropTypes from 'prop-types';` : '--rm-row--'}

    ${useTypeScript ? `interface ${upStartName}Props {}` : `--rm-row--`}
    ${useTypeScript ? `interface ${upStartName}State {}\n` : `--rm-row--`}
    class ${upStartName} extends React.Component${useTypeScript ? `<${upStartName}Props, ${upStartName}State>` : ''} {
      constructor(props${useTypeScript ? `: Readonly<${upStartName}Props>` : ''}) {
        super(props);
        this.state = {};
      };

      componentDidMount () {
        // monunted
      };

      render () {
        return (
          <Styled${styledComponentsName}>this is ${upStartName}</Styled${styledComponentsName}>
        )
      }
    };

    ${tplExp(
      displayReactPropType ? `
        //${upStartName}.propTypes = {
        //	props: PropTypes.string
        //};
      ` : '--rm-row--',
    )}
    export default ${upStartName};
  `;
  return tplExp(tpl);
}
