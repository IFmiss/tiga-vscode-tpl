import vm from 'vm';

function renderContextFile<T> (code: string, options: T) {
  const context = {
    ...options
  };
  
  vm.createContext(context);
  const res = vm.runInContext(code, context);
  console.info(res);
}

export {
  renderContextFile
};
