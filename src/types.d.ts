type TemplateType =
  | 'rfc'
  | 'rcc'
  | 'vue2'
  | 'vue3'
  | 'svelte3'
  | 'react-mini-program';

type TplStyleType =
  | 'less'
  | 'css'
  | 'scss'
  | 'css-in-js';

type CssInJsType = 'styled-components' | '@emotion/styled';

interface RenderTemplateOptions {
  // 项目名称
  name: string;

  // 创建的项目地址
  path: string;

  // 创建的类型
  type: TemplateType;

  // 是否是typescript
  useTypeScript?: boolean;

  // css预处理 less scss css;
  style?: TplStyleType;

  // 是否使用cssmodules；
  useCssModules?: boolean;

  // 是否是css in js  styled-components
  cssInJs?: boolean;

  cssInJsType?: CssInJsType
}

type ImportStyleType =
  | 'scoped'
  | 'css-module'
  | 'none';

type RenderVueTemplateOptions = Omit<RenderTemplateOptions, 'useCssModules'> & {
  importStyleType: ImportStyleType
};

type RenderSvelteTemplateOptions = Omit<RenderTemplateOptions, 'useCssModules' | 'style' | 'useTypeScript'>;
