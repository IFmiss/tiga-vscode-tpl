import rfc from './../exec/rfc';
// import rcc from './../exec/rcc';

export const N = '\n';

export const EXTENSIONS_MAP = [{
  type: 'rfc',
  command: 'tiga-tpl.createReactFC',
  render: rfc,
  options: {}
}, {
  type: 'rcc',
  command: 'tiga-tpl.createReactCC',
  // render: rcc,
  options: {}
}];
