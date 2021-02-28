import tplExp from "../../utils/tplExp";

export default function compileStyle(options: RenderTemplateOptions): string {
  const { name } = options;
  const tpl = `
    .${name.toLocaleLowerCase()} {
      position: relative;
    }
  --rm-space--`;
  return tplExp(tpl);
}
