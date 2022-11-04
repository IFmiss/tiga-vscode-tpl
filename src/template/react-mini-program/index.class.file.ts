import { tpl as tplExp, strUpStart } from '@tiga-cli/tpl-core';
import * as vscode from 'vscode';

export default function compileRccFileIndex(options: RenderTemplateOptions): string {
  const {
    name,
    useTypeScript,
  } = options;

  const upStartName = strUpStart(name);
  const { parameters: { miniProgramNpmOrgImport: orgName = "@hello" } } = vscode.workspace.getConfiguration('web-template');

  const tpl = `
    import React, { Component } from 'react'

    import { View } from '${orgName}/mp-components'

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
          <View>this is ${upStartName}</View>
        )
      }
    };

    export default ${upStartName};
  `;
  return tplExp(tpl);
}
