import { tpl as tplExp, strUpStart } from '@tiga-cli/tpl-core';
import * as vscode from 'vscode';
import { styleClassName, styleFileName as sFileName } from "../../utils/style";

export default function compileIndex(options: RenderTemplateOptions): string {
  const {
    name,
    useTypeScript,
    useCssModules
  } = options;

  const className = styleClassName(name);
  const styleFileName = sFileName(name);
  const upStartName = strUpStart(name);
  const { parameters: { miniProgramNpmOrgImport: orgName = "@hello" } } = vscode.workspace.getConfiguration('web-template');

  const tpl = `
    import React, { memo } from 'react';

    import { View } from '${orgName}/mp-components'
    import { useDidHide, useDidShow, useReady } from '${orgName}/mp-service'

    ${useCssModules ? `import styles from './${styleFileName}.scss';` : `import './${styleFileName}.scss';`}

    ${useTypeScript ? `export interface ${upStartName}Props {}\n` : `--rm-row--`}
    const ${upStartName}${useTypeScript ? `: React.FC<${upStartName}Props>` : ''} = () => {
      useDidHide(() => {})

      useDidShow(() => {})

      useReady(() => {})

      return (
        <View className=${useCssModules ? `{styles.${className}}` : `'${className}'`}>this is ${upStartName}</View>
      );
    };

    export default memo(${upStartName});
  `;
  return tplExp(tpl);
}
