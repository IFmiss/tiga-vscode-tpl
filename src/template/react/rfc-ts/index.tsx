export default function compileCode (options: RenderTemplateOptions) {
  const { name } = options;
  return `
    import React from 'react';
    // import PropTypes from 'prop-types';

    export interface ${name}Props {};

    const ${name}: React.FC<${name}Props> = () => {
      return (
        <div>this is ${name}</div>
      );
    };

    //${name}.propTypes = {
    //	props: PropTypes.string
    //};

    export default ${name};
  `;
}
