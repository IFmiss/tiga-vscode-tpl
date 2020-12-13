import tplExp from "../../utils/tplExp";

export default function compileIndex(options: RenderTemplateOptions): string {
  const {
    name,
    style,
    useCssModules,
    useTypeScript
  } = options;

  const lowerName = name.toLocaleLowerCase();

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
    <style ${useCssModules ? 'module' : 'scoped'} lang='${style}'>
      .${lowerName} {}
    </style>
  `;
  return tplExp(tpl);
}