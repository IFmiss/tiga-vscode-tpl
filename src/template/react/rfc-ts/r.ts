import { renderContextFile } from '../../render';
import code from './index';
export default function runR () {
  const res = renderContextFile(code, {
    name: 'H'
  });
  
  console.info(res);
}
