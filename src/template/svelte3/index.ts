import { tpl as tplExp } from '@tiga-cli/tpl-core';
import { componentName, styleClassName } from '../../utils/name';

export default function compileIndex(options: RenderSvelteTemplateOptions) {
  const {
    name
  } = options;

  const className = styleClassName(name);
  const upStartName = componentName(name);

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