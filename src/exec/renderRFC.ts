import renderContextFile from "../utils/renderContextFile";
import compileIndex from './../../template/rfc/index';

export default function renderRFC (options: any) {
  const TPL_MAP = {
    'index.tsx': renderContextFile(compileIndex, options)
  };
};
