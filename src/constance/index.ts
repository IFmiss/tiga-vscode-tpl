import * as path from 'path';

export const TMPLATE_DIR_MAP: {
  [k in TemplateType]: string
} = {
  'rfc-ts': path.resolve(__dirname, './../../template/rfc-ts'),
  'rfc-js': 'rfc-ts',
  'rcc': path.resolve(__dirname, './../../template/rfc-ts'),
};
