type TemplateType = 
  | 'rfc'
  | 'rcc'
  | 'vue2'
  | 'vue3'
  | 'svelte3';

type TplStyleType = 
  | 'less'
  | 'css'
  | 'scss';

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
}

type ImportStyleType = 
  | 'scoped'
  | 'css-module'
  | 'none';

type RenderVueTemplateOptions = Omit<RenderTemplateOptions, 'useCssModules'> & {
  importStyleType: ImportStyleType
};

type RenderSvelteTemplateOptions = Omit<RenderTemplateOptions, 'useCssModules' | 'style' | 'useTypeScript'>;
