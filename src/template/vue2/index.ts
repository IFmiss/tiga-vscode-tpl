import { fmtUpStart } from "../../utils/str";
import tplExp from "../../utils/tplExp";

export default function compileIndex(options: RenderVueTemplateOptions): string {
  const {
    name,
    style,
    importStyleType,
    useTypeScript
  } = options;

  const lowerName = name.toLocaleLowerCase();
  const upStartName = fmtUpStart(name);

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
        this is ${upStartName}
      </div>
    </template>

    <script${useTypeScript ? ` lang='ts'` : ''}>
    import Vue from 'vue';
    export default Vue.extend({
      name: '${upStartName}',
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
    --rm-space--`;
  return tplExp(tpl);
}