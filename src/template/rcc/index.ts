import { tpl as tplExp, strUpStart } from '@tiga-cli/tpl-core';
import { styleName } from '../../utils/style';

export default function compileIndex(options: RenderTemplateOptions): string {
  const {
    name,
    style: styleExt,
    useCssModules,
    useTypeScript
  } = options;

  const className = styleName(name);
  const upStartName = strUpStart(name);

  const tpl = `
    import React from 'react';
    ${useCssModules ? `import styles from './${className}.${styleExt}';` : `import './${className}.${styleExt}';`}
    // import PropTypes from 'prop-types';

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
          <div className=${useCssModules ? `{styles.${className}}` : `'${className}'`}>this is ${upStartName}</div>
        )
      }
    };

    //${upStartName}.propTypes = {
    //	props: PropTypes.string
    //};

    export default ${upStartName};
  `;
  return tplExp(tpl);
}
