import { tpl as tplExp, strUpStart } from '@tiga-cli/tpl-core';

export default function compileIndex(options: RenderSvelteTemplateOptions) {
  const {
    name
  } = options;

  const lowerName = name.toLocaleLowerCase();
  const upStartName = strUpStart(name);

  const tpl = `
    <script>
      import { onMount } from 'svelte';
      export let name = '${upStartName}';
      onMount(() => {
        // ${upStartName} mounted
      });
    </script>

    <div class='${lowerName}'>this is {name}</div>

    <style>
      .${lowerName} {
        position: relative;
      }
    </style>
  `;
  return tplExp(tpl);
}