import tplExp from "../../utils/tplExp";

export default function compileIndex(options: RenderTemplateOptions): string {
  const {
    name,
    style: styleExt,
    useCssModules,
    useTypeScript
  } = options;

  const lowerName = name.toLocaleLowerCase();

  const tpl = `
    import React from 'react';
    ${useCssModules ? `import styles from './${lowerName}.${styleExt}';` : `import './${lowerName}.${styleExt}';`}
    // import PropTypes from 'prop-types';

    ${useTypeScript ? `export interface ${name}Props {};\n` : `--rm--`}
    const ${name}${useTypeScript ? `: React.FC<${name}Props>` : ''} = () => {
      return (
        <div className={${useCssModules ? `styles.${lowerName}` : 'name'}}>this is ${name}</div>
      );
    };

    //${name}.propTypes = {
    //	props: PropTypes.string
    //};

    export default ${name};
    `;
  return tplExp(tpl);
}
