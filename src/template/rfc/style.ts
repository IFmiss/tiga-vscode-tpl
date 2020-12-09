import { N } from "../../constance";

export default function compileIndex(options: RenderTemplateOptions): string {
  const { name } = options;
  return `.${name.toLocaleLowerCase()} {} ${
    N}`;
}
