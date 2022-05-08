import { tpl as tplExp, strUpStart } from '@tiga-cli/tpl-core';
import { styleName } from '../../utils/style';

export default function compileIndex(options: RenderSvelteTemplateOptions) {
  const {
    name
  } = options;

  const className = styleName(name);
  const upStartName = strUpStart(name);

  const tpl = `
    <script>
      import { onMount } from 'svelte';
      export let name = '${upStartName}';
      onMount(() => {
        // ${upStartName} mounted
      });
    </script>

    <div class='${className}'>this is {name}</div>

    <style>
      .${className} {
        position: relative;
      }
    </style>
  `;
  return tplExp(tpl);
}