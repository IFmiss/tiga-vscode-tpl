import tplExp from "../../utils/tplExp";

export default function compileIndex(options: RenderTemplateOptions): string {
  const {
    name,
    style: styleExt,
    useCssModules,
    useTypeScript
  } = options;

  const lowerName = name.toLocaleLowerCase();

  const tpl = `import React from 'react';
    ${useCssModules ? `import styles from './${lowerName}.${styleExt}';` : `import './${lowerName}.${styleExt}';`}
    // import PropTypes from 'prop-types';

    ${useTypeScript ? `interface ${name}Props {};` : `--rm--`}
    ${useTypeScript ? `interface ${name}State {};\n` : `--rm--`}
    class ${name} extends React.Component${useTypeScript ? `<${name}Props, ${name}State>` : ''} {
      constructor(props${useTypeScript ? `: Readonly<${name}Props>` : ''}) {
        super(props);
        this.state = {};
      };
    
      componentDidMount () {
        // monunted
      };
    
      render () {
        return (
          <div className={${useCssModules ? `styles.${lowerName}` : 'name'}}>this is ${name}</div>
        )
      }
    };

    //${name}.propTypes = {
    //	props: PropTypes.string
    //};
    
    export default ${name};
  `;
  return tplExp(tpl);
}
