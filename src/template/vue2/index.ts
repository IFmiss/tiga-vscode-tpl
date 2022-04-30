import { tpl as tplExp } from '@tiga-cli/tpl-core';
import { toLowerCaseFirst } from '../../utils/string';

export default function compileIndex(options: RenderVueTemplateOptions): string {
  const {
    name,
    style,
    importStyleType,
    useTypeScript
  } = options;

  const lowerName = toLowerCaseFirst(name);

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
      return `:class='$style.${lowerName}'`;
    }
    return `class='${lowerName}'`;
  };

  const tpl = `
    <template>
      <div ${getDivTag()}>
        this is ${lowerName}
      </div>
    </template>

    <script${useTypeScript ? ` lang='ts'` : ''}>
    import Vue from 'vue';
    export default Vue.extend({
      name: '${lowerName}',
      ${useTypeScript ? `props: {
        // title: String
      }`: ''}
    });
    </script>
    <style ${getStyleTag()}>
      .${lowerName} {
        position: relative;
      }
    </style>
  `;
  return tplExp(tpl);
}