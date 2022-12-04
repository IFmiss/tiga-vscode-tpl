import { tpl as tplExp } from '@tiga-cli/tpl-core';
import { styleClassName } from '../../utils/name';

export default function compileIndex(options: RenderVueTemplateOptions): string {
  const {
    name,
    style,
    importStyleType,
    useTypeScript
  } = options;

  const className = styleClassName(name);

  const getStyleTag = () => {
    if (importStyleType === 'scoped') {
      return `scoped lang='${style}'`;
    } else if (importStyleType === 'css-module') {
      return `module lang='${style}'`;
    }
    return `lang='${style}'`;
  };

  const getDivTag = () => {
    if (importStyleType === 'css-module') {
      return `:class='$style.${className}'`;
    }
    return `class='${className}'`;
  };

  const tpl = `
    <template>
      <div ${getDivTag()}>
        this is ${className}
      </div>
    </template>

    <script${useTypeScript ? ` lang='ts'` : ''}>
    import Vue from 'vue';
    export default Vue.extend({
      name: '${className}',
      ${useTypeScript ? `props: {
        // title: String
      }`: ''}
    });
    </script>
    <style ${getStyleTag()}>
      .${className} {
        position: relative;
      }
    </style>
  `;
  return tplExp(tpl);
}