import { tpl as tplExp, strUpStart } from '@tiga-cli/tpl-core';
import { styleClassName } from "../../utils/style";

export default function compileIndex(options: RenderTemplateOptions): string {
  const {
    name,
    useTypeScript
  } = options;

  const className = styleClassName(name);
  const upStartName = strUpStart(name);

  const tpl = `
    import React, { Component } from 'react'

    import { View } from '@hello/mp-components'

    import './index.scss'

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
          <View className='${className}'>this is ${upStartName}</View>
        )
      }
    };

    export default ${upStartName};
  `;
  return tplExp(tpl);
}
