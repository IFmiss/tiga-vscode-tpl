import { fmtUpStart } from "../../utils/str";
import tplExp from "../../utils/tplExp";

export default function compileIndex(options: RenderSvelteTemplateOptions) {
  const {
    name
  } = options;

  const lowerName = name.toLocaleLowerCase();
  const upStartName = fmtUpStart(name);
  
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
    --rm-space--`;
  return tplExp(tpl);
}