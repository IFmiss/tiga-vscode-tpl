import { tpl as tplExp, strUpStart } from '@tiga-cli/tpl-core';
import * as vscode from 'vscode';

export default function compileIndex(options: RenderTemplateOptions): string {
  const {
    name,
    useTypeScript
  } = options;

  const lowerName = name.toLocaleLowerCase();
  const upStartName = strUpStart(name);
  const { parameters: { miniProgramNpmOrgImport: orgName = "@hello" } } = vscode.workspace.getConfiguration('web-template');

  const tpl = `
    import React, { memo } from 'react';

    import { View } from '${orgName}/mp-components'
    import { useDidHide, useDidShow, useReady } from '${orgName}/mp-service'

    import './index.scss'

    ${useTypeScript ? `export interface ${upStartName}Props {}\n` : `--rm-row--`}
    const ${upStartName}${useTypeScript ? `: React.FC<${upStartName}Props>` : ''} = () => {
      useDidHide(() => {})

      useDidShow(() => {})

      useReady(() => {})

      return (
        <View className='${lowerName}'>this is ${upStartName}</View>
      );
    };

    export default memo(${upStartName});
  `;
  return tplExp(tpl);
}
