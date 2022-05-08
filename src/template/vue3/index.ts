import { tpl as tplExp } from '@tiga-cli/tpl-core';
import { styleName } from '../../utils/style';

export default function compileIndex(options: RenderVueTemplateOptions): string {
  const {
    name,
    style,
    importStyleType,
    useTypeScript
  } = options;

  const className = styleName(name);

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
        {{ ${className} }}
      </div>
    </template>

    <script setup ${useTypeScript ? `lang='ts'` : ''}>
    import { ref } from 'vue';

    const name = ref('${className}')
    </script>
    <style ${getStyleTag()}>
      .${className} {
        position: relative;
      }
    </style>
  `;
  return tplExp(tpl);
}