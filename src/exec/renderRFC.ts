import renderContextFile from "../utils/renderContextFile";
import compileIndex from './../../template/rfc/index';

export default function renderRFC (options: any) {
  console.info('options', options);
  const TPL_MAP = {
    'index.tsx': renderContextFile(compileIndex, options)
  };
  console.info(JSON.stringify(TPL_MAP));
};
