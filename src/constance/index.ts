import react from './../exec/react';
import vue2 from './../exec/vue2';
import vue3 from './../exec/vue3';
import svelte3 from './../exec/svelte3';
import reactMiniProgram from './../exec/react-mini-program';

// tpl fn
import moduleConfigReact from '../utils/moduleConfigReact';
import moduleConfigVue2 from '../utils/moduleConfigVue';
import moduleConfigSvelte from '../utils/moduleConfigSvelte';
import moduleConfigReactMiniProgram from '../utils/moduleConfigReactMiniProgram';

export const OK_TEXT = '👌 OK';
export const NO_TEXT = '👋 NO';

export const CSS_IN_JS: CssInJsType[] = [
  '@mui/material',
  'styled-components',
  '@emotion/styled'
];

/**
 * 创建React模块的模版集合
 */
export const EXTENSION_MODULE_MAP = [{
  type: 'rfc',
  command: 'web-template.createReactFC',
  render: react,
  options: {}
}, {
  type: 'rcc',
  command: 'web-template.createReactCC',
  render: react,
  options: {}
}];

/**
 * 创建Vue模版的集合
 */
export const EXTENSION_VUE_MODULE_MAP = [{
  type: 'vue2',
  command: 'web-template.createVue2',
  render: vue2,
  options: {}
}, {
  type: 'vue3',
  command: 'web-template.createVue3',
  render: vue3,
  options: {}
}];

/**
 * 创建Svelte模版集合
 */
export const EXTENSION_SVELTE_MODULE_MAP = [{
  type: 'svelte3',
  command: 'web-template.createSvelte3',
  render: svelte3,
  options: {}
}];

/**
 * 创建 react mini program 项目
 */
 export const REACT_MINI_PROGRAM = [{
  type: 'rcc-mp',
  command: 'web-template.createReactMiniProgramRCC',
  render: reactMiniProgram,
  options: {
    classComponent: true
  }
}, {
  type: 'rfc-mp',
  command: 'web-template.createReactMiniProgramRFC',
  render: reactMiniProgram,
  options: {
    classComponent: false
  }
}];

export const MODULE_MAP = {
  'react': {
    config: EXTENSION_MODULE_MAP,
    tplFn: moduleConfigReact
  },
  'vue': {
    config: EXTENSION_VUE_MODULE_MAP,
    tplFn: moduleConfigVue2
  },
  'svelte': {
    config: EXTENSION_SVELTE_MODULE_MAP,
    tplFn: moduleConfigSvelte
  },
  'react-mini-program': {
    config: REACT_MINI_PROGRAM,
    tplFn: moduleConfigReactMiniProgram
  }
};
