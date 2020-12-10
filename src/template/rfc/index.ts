import tplExp from "../../utils/tplExp";

export default function compileIndex(options: RenderTemplateOptions): string {
  const {
    name: moduleName,
    style: styleExt,
    cssModules,
    useTypeScript
  } = options;

  const name = moduleName.toLocaleLowerCase();

  const str = `import React from 'react';
    ${cssModules ? `import styles from './${name}.${styleExt}';` : `import './${name}.${styleExt}';`}
    // import PropTypes from 'prop-types';

    ${useTypeScript ? `export interface ${name}Props {};\n` : `--rm--`}
    const ${name}${useTypeScript ? `: React.FC<${name}Props>` : ''} = () => {
      return (
        <div className={${cssModules ? `styles.${name}` : 'name'}}>this iss ${name}</div>
      );
    };

    //${name}.propTypes = {
    //	props: PropTypes.string
    //};

    export default ${name};
    `;
  return tplExp(str);
}
