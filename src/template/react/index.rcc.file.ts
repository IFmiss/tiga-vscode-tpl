import { tpl as tplExp } from '@tiga-cli/tpl-core';
import * as vscode from 'vscode';
import { componentName } from '../../utils/name';

export default function compileRccFileIndex(options: RenderTemplateOptions): string {
  const {
    name,
    useTypeScript
  } = options;

  const upStartName = componentName(name);
  const { parameters: { displayReactPropType } } = vscode.workspace.getConfiguration('web-template');

  const tpl = `
    import React from 'react';
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
          <div>this is ${upStartName}</div>
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
