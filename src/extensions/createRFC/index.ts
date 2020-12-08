import * as vscode from 'vscode';
import createTplFolder from '../../utils/createTplFolder';
import renderRFC from './../../exec/renderRFC';

const createRFC = (context: vscode.ExtensionContext) => {
  return vscode.commands.registerCommand('tiga-tpl.createReactFC', async (parmas) => {
    vscode.window.showInformationMessage('111');
    try {
      const data = await createTplFolder(parmas, 'rfc-ts');
      // 执行移动操作
      renderRFC(data);
    } catch (e) {
      console.info(e);
    }
	});
};

export default createRFC;
