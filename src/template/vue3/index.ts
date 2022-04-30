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
        {{ ${lowerName} }}
      </div>
    </template>

    <script setup ${useTypeScript ? `lang='ts'` : ''}>
    import { ref } from 'vue';

    const name = ref('${lowerName}')
    </script>
    <style ${getStyleTag()}>
      .${lowerName} {
        position: relative;
      }
    </style>
  `;
  return tplExp(tpl);
}