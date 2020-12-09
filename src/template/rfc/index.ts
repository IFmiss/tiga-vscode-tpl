export default function compileIndex(options: RenderTemplateOptions): string {
  const {
    name,
    type,
  } = options;

  return(`import React from 'react';
    import './${name}.less';
    // import PropTypes from 'prop-types';

    export interface ${name}Props {};

    const ${name}: React.FC<${name}Props> = () => {
      return (
        <div>this iss ${name}</div>
      );
    };

    //${name}.propTypes = {
    //	props: PropTypes.string
    //};

    export default ${name};
    `
  ).replace(/^    /gm, '');
}
