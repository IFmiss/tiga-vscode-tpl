import { tpl as tplExp, strUpStart } from '@tiga-cli/tpl-core';
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

  const tpl = `
    import React, { Component } from 'react'

    import { View } from '@hello/mp-components'

    ${useCssModules ? `import styles from './${styleFileName}.scss';` : `import './${styleFileName}.scss';`}

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
