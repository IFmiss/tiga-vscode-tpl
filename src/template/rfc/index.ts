import { tpl as tplExp, strUpStart } from '@tiga-cli/tpl-core';
import { styleName } from "../../utils/style";

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
    import React, { memo } from 'react';
    ${useCssModules ? `import styles from './${className}.${styleExt}';` : `import './${className}.${styleExt}';`}
    // import PropTypes from 'prop-types';

    ${useTypeScript ? `export interface ${upStartName}Props {}\n` : `--rm-row--`}
    const ${upStartName}${useTypeScript ? `: React.FC<${upStartName}Props>` : ''} = () => {
      return (
        <div className=${useCssModules ? `{styles.${className}}` : `'${className}'`}>this is ${upStartName}</div>
      );
    };

    //${upStartName}.propTypes = {
    //	props: PropTypes.string
    //};

    export default memo(${upStartName});
  `;
  return tplExp(tpl);
}
