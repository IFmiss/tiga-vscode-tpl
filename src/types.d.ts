type TemplateType = 
  | 'rfc'
  | 'rcc';

interface RenderTemplateOptions {
  // 项目名称
  name: string;

  // 创建的项目地址
  path: string;

  // 创建的类型
  type: TemplateType;

  // 是否是typescript
  useTypeScript: boolean;

  // css预处理 less scss css;
  style?: 'less' | 'css' | 'scss';

  // 是否使用cssmodules；
  cssModules?: boolean;
}

