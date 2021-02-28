import rfc from './../exec/rfc';
import rcc from './../exec/rcc';
import vue2 from './../exec/vue2';

// tpl fn
import createReactFolder from './../utils/createReactFolder';
import createVueFolder from './../utils/createVueFolder';

// import vue3 from './../exec/vue3';

export const N = '\n';

export const OK_TEXT = '👌 OK';
export const NO_TEXT = '👋 NO';

/**
 * 创建React模块的模版集合
 */
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

/**
 * 创建Vue模版的集合
 */
export const EXTENSION_VUE_MODULE_MAP = [{
  type: 'vue2',
  command: 'tiga-tpl.createVue2',
  render: vue2,
  options: {}
}];

export const MODULE_MAP = {
  'react': {
    config: EXTENSION_MODULE_MAP,
    tplFn: createReactFolder
  },
  'vue': {
    config: EXTENSION_VUE_MODULE_MAP,
    tplFn: createVueFolder
  },
};
