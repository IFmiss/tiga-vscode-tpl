import rfc from './../exec/rfc';
import rcc from './../exec/rcc';

export const N = '\n';

export const OK_TEXT = '👌 好';
export const NO_TEXT = '👋 不使用';

// 创建模块的模版集合
export const EXTENSION_MODULE_MAP = [{
  type: 'rfc',
  command: 'tiga-tpl.createReactFC',
  render: rfc,
  options: {}
}, {
  type: 'rcc',
  command: 'tiga-tpl.createReactCC',
  render: rcc,
  options: {}
}];
