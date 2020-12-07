import * as vm from 'vm';
import * as fs from 'fs-extra';
import compileCode from './react/rfc-ts/index';

function renderContextFile<T> (options: T) {
  let c;
  try {
    const parsingContext = vm.createContext({
      options,
      compile: compileCode
    });
    
    const codeFn = "return compile(options)";
    const fn = vm.compileFunction(codeFn, [], { parsingContext });
    c = fn();
  } catch (e) {
    console.log('e', JSON.stringify(e));
  }
  return c;
}

async function createFolder(path: string) {
  await fs.mkdirSync(path);
}

export {
  renderContextFile,
  createFolder
};
