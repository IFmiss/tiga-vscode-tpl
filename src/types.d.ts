type TemplateType = 
  | 'rfc-ts'
  | 'rfc-js';

interface RenderTemplateOptions {
  // 项目名称
  name: string;

  // 创建的项目地址
  path: string;

  // 创建的类型
  type: TemplateType;
}

