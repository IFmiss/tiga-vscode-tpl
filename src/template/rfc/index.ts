import { fmtUpStart } from "../../utils/str";
import tplExp from "../../utils/tplExp";

export default function compileIndex(options: RenderTemplateOptions): string {
  const {
    name,
    style: styleExt,
    useCssModules,
    useTypeScript
  } = options;

  const lowerName = name.toLocaleLowerCase();
  const upStartName = fmtUpStart(name);
  
  const tpl = `
    import React, { memo } from 'react';
    ${useCssModules ? `import styles from './${lowerName}.${styleExt}';` : `import './${lowerName}.${styleExt}';`}
    // import PropTypes from 'prop-types';

    ${useTypeScript ? `export interface ${upStartName}Props {}\n` : `--rm--`}
    const ${upStartName}${useTypeScript ? `: React.FC<${upStartName}Props>` : ''} = () => {
      return (
        <div className=${useCssModules ? `{styles.${lowerName}}` : `'${lowerName}'`}>this is ${upStartName}</div>
      );
    };

    //${upStartName}.propTypes = {
    //	props: PropTypes.string
    //};

    export default memo(${upStartName});
    `;
  return tplExp(tpl);
}
