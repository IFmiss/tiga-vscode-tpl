import tplExp from "../../utils/tplExp";

export default function compileIndex(options: RenderVueTemplateOptions): string {
  const {
    name,
    style,
    importStyleType,
    useTypeScript
  } = options;

  const lowerName = name.toLocaleLowerCase();

  const getStyleTag = () => {
    if (importStyleType === 'scoped') {
      return `<style 'scoped' lang='${style}'`;
    } else if (importStyleType === 'css-module') {
      return `<style 'module' lang='${style}'`;
    }
    return `<style lang='${style}'`;
  }

  let classNameStr = ''

  const tpl = `
    <template>
      <div ${useCssModules ? `class='${lowerName}'` : `:class='$style.red'`}>
        this is ${name}
      </div>
    </template>

    <script${useTypeScript ? `  lang='ts'` : ''}>
    import Vue from "vue";
    export default Vue.extend({
      name: '${name}',
      props: {
        // title: String
      }
    });
    </script>
    <style ${styleStrTag}>
      .${lowerName} {}
    </style>
  `;
  return tplExp(tpl);
}