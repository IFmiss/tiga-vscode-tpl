import { tpl as tplExp, strUpStart } from '@tiga-cli/tpl-core';
import * as vscode from 'vscode';
import { styleClassName, styleFileName as sFileName } from "../../utils/style";

export default function compileFileIndex(options: RenderTemplateOptions): string {
  const {
    name,
    useTypeScript,
    useCssModules
  } = options;

  const className = styleClassName(name);
  const upStartName = strUpStart(name);
  const { parameters: { miniProgramNpmOrgImport: orgName = "@hello" } } = vscode.workspace.getConfiguration('web-template');

  const tpl = `
    import React, { memo } from 'react';

    import { View } from '${orgName}/mp-components'
    import { useDidHide, useDidShow, useReady } from '${orgName}/mp-service'

    ${useCssModules ? `import styles from './index.scss';` : `import './index.scss';`}

    ${useTypeScript ? `export interface ${upStartName}Props {}\n` : `--rm-row--`}
    const ${upStartName}${useTypeScript ? `: React.FC<${upStartName}Props>` : ''} = () => {
      useDidHide(() => {})

      useDidShow(() => {})

      useReady(() => {})

      return (
        <View>this is ${upStartName}</View>
      );
    };

    export default memo(${upStartName});
  `;
  return tplExp(tpl);
}
