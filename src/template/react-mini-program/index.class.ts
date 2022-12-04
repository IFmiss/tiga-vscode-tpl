import { tpl as tplExp } from '@tiga-cli/tpl-core';
import { componentName, styleClassName, styleFileName as sFileName } from "../../utils/name";
import * as vscode from 'vscode';

export default function compileIndex(options: RenderTemplateOptions): string {
  const {
    name,
    useTypeScript,
    useCssModules
  } = options;

  const className = styleClassName(name);
  const upStartName = componentName(name);
  const { parameters: { miniProgramNpmOrgImport: orgName = "@hello" } } = vscode.workspace.getConfiguration('web-template');

  const tpl = `
    import React, { Component } from 'react'

    import { View } from '${orgName}/mp-components'

    ${useCssModules ? `import styles from './index.scss';` : `import './index.scss';`}

    ${useTypeScript ? `interface ${upStartName}Props {}` : `--rm-row--`}
    ${useTypeScript ? `interface ${upStartName}State {}\n` : `--rm-row--`}
    class ${upStartName} extends Component${useTypeScript ? `<${upStartName}Props, ${upStartName}State>` : ''} {
      constructor(props${useTypeScript ? `: Readonly<${upStartName}Props>` : ''}) {
        super(props);
        this.state = {};
      };

      componentWillMount () {};

      componentDidMount () {};

      componentWillUnMount () {};

      componentDidShow () {};

      componentDidHide () {};

      render () {
        return (
          <View className=${useCssModules ? `{styles.${className}}` : `'${className}'`}>this is ${upStartName}</View>
        )
      }
    };

    export default ${upStartName};
  `;
  return tplExp(tpl);
}
